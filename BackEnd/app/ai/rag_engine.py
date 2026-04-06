import os
import google.generativeai as genai
import chromadb
from pypdf import PdfReader
from core.config import settings

# ── Configure Gemini ──────────────────────────────────────────────────────────
genai.configure(api_key=settings.GOOGLE_API_KEY)

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR       = os.path.dirname(os.path.abspath(__file__))
KNOWLEDGE_BASE = os.path.join(BASE_DIR, "knowledge_base")
CHROMA_PATH    = os.path.join(KNOWLEDGE_BASE, "chroma_db")

# ── ChromaDB Client ───────────────────────────────────────────────────────────
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
collection    = chroma_client.get_or_create_collection(
    name="chloris_knowledge",
    metadata={"hnsw:space": "cosine"}   # cosine similarity — better for text
)

# ── Gemini Models ─────────────────────────────────────────────────────────────
generation_model = genai.GenerativeModel("gemini-1.5-flash")
EMBEDDING_MODEL  = "models/text-embedding-004"


# ═══════════════════════════════════════════════════════════════════════════════
# PILLAR 1 + 2 + 3 — The Librarian + Translator + Filing Cabinet
# ═══════════════════════════════════════════════════════════════════════════════

def _chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """
    Split a long text into overlapping chunks.
    overlap=50 means consecutive chunks share 50 characters
    so context is never lost at a boundary.
    """
    chunks = []
    start  = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end].strip())
        start += chunk_size - overlap
    return [c for c in chunks if len(c) > 50]  # skip tiny fragments


def _extract_text_from_pdf(pdf_path: str) -> str:
    """Extract all text from a PDF file."""
    reader   = PdfReader(pdf_path)
    all_text = []
    for page_num, page in enumerate(reader.pages):
        text = page.extract_text()
        if text and text.strip():
            all_text.append(f"[Page {page_num + 1}]\n{text.strip()}")
    return "\n\n".join(all_text)


def _embed_texts(texts: list[str]) -> list[list[float]]:
    """Convert a list of text chunks into embedding vectors using Gemini."""
    embeddings = []
    for text in texts:
        response = genai.embed_content(
            model=EMBEDDING_MODEL,
            content=text,
            task_type="retrieval_document"
        )
        embeddings.append(response["embedding"])
    return embeddings


def build_knowledge_base(force_rebuild: bool = False) -> dict:
    """
    Read every PDF in knowledge_base/, chunk it, embed it,
    and store it in ChromaDB.

    force_rebuild=True → clears existing DB and rebuilds from scratch.
    force_rebuild=False → skips PDFs already ingested (checks by filename).

    Returns a summary dict with stats.
    """
    pdf_files = [
        f for f in os.listdir(KNOWLEDGE_BASE)
        if f.lower().endswith(".pdf")
    ]

    if not pdf_files:
        return {
            "status":  "no_pdfs",
            "message": f"No PDF files found in {KNOWLEDGE_BASE}. "
                        "Add your DIU handbook PDFs to that folder.",
            "files_processed": 0,
            "chunks_added":    0,
        }

    if force_rebuild:
        # Delete and recreate the collection
        chroma_client.delete_collection("chloris_knowledge")
        global collection
        collection = chroma_client.get_or_create_collection(
            name="chloris_knowledge",
            metadata={"hnsw:space": "cosine"}
        )
        print("  Existing knowledge base cleared.")

    # Get IDs already in the DB to avoid re-ingesting
    existing_ids = set(collection.get()["ids"])

    total_chunks = 0
    files_done   = 0

    for pdf_file in pdf_files:
        pdf_path  = os.path.join(KNOWLEDGE_BASE, pdf_file)
        doc_name  = pdf_file.replace(".pdf", "")
        print(f"\n  Processing: {pdf_file}")

        # Extract text
        raw_text = _extract_text_from_pdf(pdf_path)
        if not raw_text.strip():
            print(f"    WARNING: No text extracted from {pdf_file} "
                  "(may be a scanned image PDF)")
            continue

        # Chunk it
        chunks = _chunk_text(raw_text, chunk_size=500, overlap=50)
        print(f"    Chunks created: {len(chunks)}")

        # Filter out chunks already in DB
        new_ids      = []
        new_chunks   = []
        new_meta     = []

        for i, chunk in enumerate(chunks):
            chunk_id = f"{doc_name}_chunk_{i}"
            if chunk_id not in existing_ids:
                new_ids.append(chunk_id)
                new_chunks.append(chunk)
                new_meta.append({
                    "source":   pdf_file,
                    "doc_name": doc_name,
                    "chunk":    i,
                })

        if not new_ids:
            print(f"    Already ingested — skipping.")
            files_done += 1
            continue

        # Embed new chunks
        print(f"    Embedding {len(new_ids)} new chunks...")
        embeddings = _embed_texts(new_chunks)

        # Store in ChromaDB
        collection.add(
            ids        = new_ids,
            documents  = new_chunks,
            embeddings = embeddings,
            metadatas  = new_meta,
        )

        total_chunks += len(new_ids)
        files_done   += 1
        print(f"    Stored {len(new_ids)} chunks from {pdf_file}")

    return {
        "status":          "success",
        "files_processed": files_done,
        "chunks_added":    total_chunks,
        "total_in_db":     collection.count(),
        "message":         f"Knowledge base ready. "
                           f"{total_chunks} new chunks added across "
                           f"{files_done} files.",
    }


# ═══════════════════════════════════════════════════════════════════════════════
# PILLAR 4 — The Synthesizer (search + generate)
# ═══════════════════════════════════════════════════════════════════════════════

def ask_chloris_rag(question: str, n_results: int = 3) -> dict:
    """
    Given a student question:
    1. Embed the question
    2. Search ChromaDB for the top n_results matching chunks
    3. Build a strict prompt with the context
    4. Generate an answer using Gemini
    5. Return the answer + source file names

    This function is synchronous — called from the async intent_router
    via run_in_executor if needed.
    """
    from ai.prompts import (
        CHLORIS_SYSTEM_PERSONA,
        RAG_ANSWER_PROMPT,
        NO_CONTEXT_RESPONSE,
        FALLBACK_RESPONSE,
    )

    try:
        # ── Step 1: Embed the question ────────────────────────────────────────
        q_embedding = genai.embed_content(
            model=EMBEDDING_MODEL,
            content=question,
            task_type="retrieval_query"
        )["embedding"]

        # ── Step 2: Search ChromaDB ───────────────────────────────────────────
        db_count = collection.count()
        if db_count == 0:
            return {
                "answer":  NO_CONTEXT_RESPONSE,
                "sources": [],
                "chunks_found": 0,
            }

        results = collection.query(
            query_embeddings = [q_embedding],
            n_results        = min(n_results, db_count),
            include          = ["documents", "metadatas", "distances"],
        )

        docs      = results["documents"][0]  if results["documents"]  else []
        metas     = results["metadatas"][0]  if results["metadatas"]  else []
        distances = results["distances"][0]  if results["distances"]  else []

        # Filter out low-relevance results (cosine distance > 0.7 = poor match)
        relevant_docs  = []
        relevant_sources = []
        for doc, meta, dist in zip(docs, metas, distances):
            if dist < 0.7:
                relevant_docs.append(doc)
                relevant_sources.append(meta.get("source", "DIU Handbook"))

        if not relevant_docs:
            return {
                "answer":       NO_CONTEXT_RESPONSE,
                "sources":      [],
                "chunks_found": 0,
            }

        context_text = "\n\n---\n\n".join(relevant_docs)

        # ── Step 3: Build the prompt ──────────────────────────────────────────
        prompt = RAG_ANSWER_PROMPT.format(
            system_persona = CHLORIS_SYSTEM_PERSONA,
            context        = context_text,
            question       = question,
        )

        # ── Step 4: Generate the answer ───────────────────────────────────────
        response = generation_model.generate_content(prompt)

        # ── Step 5: Return the result ─────────────────────────────────────────
        unique_sources = list(set(relevant_sources))
        return {
            "answer":       response.text,
            "sources":      unique_sources,
            "chunks_found": len(relevant_docs),
        }

    except Exception as e:
        print(f"RAG Engine Error: {e}")
        return {
            "answer":       FALLBACK_RESPONSE,
            "sources":      [],
            "chunks_found": 0,
        }