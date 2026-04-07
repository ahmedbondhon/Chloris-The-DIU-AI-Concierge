import os
from google import genai
from google.genai import types
import chromadb
from core.config import settings

# ── Configure Gemini ──────────────────────────────────────────────────────────
client = genai.Client(api_key=settings.GOOGLE_API_KEY)

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR       = os.path.dirname(os.path.abspath(__file__))
KNOWLEDGE_BASE = os.path.join(BASE_DIR, "knowledge_base")
CHROMA_PATH    = os.path.join(KNOWLEDGE_BASE, "chroma_db")

# ── ChromaDB Client ───────────────────────────────────────────────────────────
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
collection    = chroma_client.get_or_create_collection(
    name="chloris_knowledge",
    metadata={"hnsw:space": "cosine"}
)

# ── Model names ───────────────────────────────────────────────────────────────
GENERATION_MODEL = "gemini-1.5-flash"
EMBEDDING_MODEL  = "text-embedding-004"


# ═══════════════════════════════════════════════════════════════════════════════
# PILLAR 1 + 2 + 3 — Librarian + Translator + Filing Cabinet
# ═══════════════════════════════════════════════════════════════════════════════

def _chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list:
    chunks = []
    start  = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end].strip())
        start += chunk_size - overlap
    return [c for c in chunks if len(c) > 50]


def _extract_text_from_pdf(pdf_path: str) -> str:
    from pypdf import PdfReader
    reader   = PdfReader(pdf_path)
    all_text = []
    for page_num, page in enumerate(reader.pages):
        text = page.extract_text()
        if text and text.strip():
            all_text.append(f"[Page {page_num + 1}]\n{text.strip()}")
    return "\n\n".join(all_text)


def _embed_texts(texts: list) -> list:
    embeddings = []
    for text in texts:
        response = client.models.embed_content(
            model   = EMBEDDING_MODEL,
            contents= text,
        )
        embeddings.append(response.embeddings[0].values)
    return embeddings


def build_knowledge_base(force_rebuild: bool = False) -> dict:
    pdf_files = [
        f for f in os.listdir(KNOWLEDGE_BASE)
        if f.lower().endswith(".pdf")
    ]

    if not pdf_files:
        return {
            "status":          "no_pdfs",
            "message":         f"No PDFs found in {KNOWLEDGE_BASE}",
            "files_processed": 0,
            "chunks_added":    0,
        }

    if force_rebuild:
        chroma_client.delete_collection("chloris_knowledge")
        global collection
        collection = chroma_client.get_or_create_collection(
            name="chloris_knowledge",
            metadata={"hnsw:space": "cosine"}
        )
        print("  Existing knowledge base cleared.")

    existing_ids = set(collection.get()["ids"])
    total_chunks = 0
    files_done   = 0

    for pdf_file in pdf_files:
        pdf_path = os.path.join(KNOWLEDGE_BASE, pdf_file)
        doc_name = pdf_file.replace(".pdf", "")
        print(f"\n  Processing: {pdf_file}")

        raw_text = _extract_text_from_pdf(pdf_path)
        if not raw_text.strip():
            print(f"    WARNING: No text extracted from {pdf_file}")
            continue

        chunks = _chunk_text(raw_text)
        print(f"    Chunks created: {len(chunks)}")

        new_ids    = []
        new_chunks = []
        new_meta   = []

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

        print(f"    Embedding {len(new_ids)} chunks...")
        embeddings = _embed_texts(new_chunks)

        collection.add(
            ids        = new_ids,
            documents  = new_chunks,
            embeddings = embeddings,
            metadatas  = new_meta,
        )

        total_chunks += len(new_ids)
        files_done   += 1
        print(f"    Done: {len(new_ids)} chunks stored.")

    return {
        "status":          "success",
        "files_processed": files_done,
        "chunks_added":    total_chunks,
        "total_in_db":     collection.count(),
        "message":         f"{total_chunks} new chunks across {files_done} files.",
    }


# ═══════════════════════════════════════════════════════════════════════════════
# PILLAR 4 — Search + Generate
# ═══════════════════════════════════════════════════════════════════════════════

def ask_chloris_rag(question: str, n_results: int = 3) -> dict:
    from ai.prompts import (
        CHLORIS_SYSTEM_PERSONA,
        RAG_ANSWER_PROMPT,
        NO_CONTEXT_RESPONSE,
        FALLBACK_RESPONSE,
    )

    try:
        # Step 1: Embed the question
        q_response = client.models.embed_content(
            model   = EMBEDDING_MODEL,
            contents= question,
        )
        q_embedding = q_response.embeddings[0].values

        # Step 2: Search ChromaDB
        db_count = collection.count()
        if db_count == 0:
            return {
                "answer":       NO_CONTEXT_RESPONSE,
                "sources":      [],
                "chunks_found": 0,
            }

        results = collection.query(
            query_embeddings = [q_embedding],
            n_results        = min(n_results, db_count),
            include          = ["documents", "metadatas", "distances"],
        )

        docs      = results["documents"][0] if results["documents"] else []
        metas     = results["metadatas"][0]  if results["metadatas"]  else []
        distances = results["distances"][0]  if results["distances"]  else []

        # Filter low-relevance results
        relevant_docs    = []
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

        # Step 3: Build prompt
        prompt = RAG_ANSWER_PROMPT.format(
            system_persona = CHLORIS_SYSTEM_PERSONA,
            context        = context_text,
            question       = question,
        )

        # Step 4: Generate answer
        response = client.models.generate_content(
            model    = GENERATION_MODEL,
            contents = prompt,
        )

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