import google.generativeai as genai
import chromadb
from core.config import settings

# 1. Configure the Google Brain directly
genai.configure(api_key=settings.GOOGLE_API_KEY)

# 2. Setup the Model
model = genai.GenerativeModel('gemini-1.5-flash')

# 3. Setup the Database Connection (Directly, no LangChain)
# We assume the DB is stored in a folder named "chroma_db" in the app directory
chroma_client = chromadb.PersistentClient(path="./chroma_db") 

# Get or create the collection (the "folder" where memories are stored)
# Note: If you haven't ingested data yet, this will be empty, but it won't crash.
collection = chroma_client.get_or_create_collection(name="chloris_knowledge")

async def ask_chloris(query: str):
    try:
        # --- PHASE 1: SEARCH (Retrieval) ---
        # We need to turn the user's question into numbers (embedding) to search the DB
        embedding_response = genai.embed_content(
            model="models/text-embedding-004",
            content=query,
            task_type="retrieval_query"
        )
        query_embedding = embedding_response['embedding']

        # Search the database for the 3 most relevant matches
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=3
        )

        # Extract the text from the results
        # (Chroma structure is a bit nested: results['documents'][0] is the list of matches)
        retrieved_docs = results['documents'][0] if results['documents'] else []
        context_text = "\n\n".join(retrieved_docs)

        # --- PHASE 2: ANSWER (Generation) ---
        if not context_text:
            # Fallback if DB is empty
            context_text = "No specific handbook information found."

        # Create the prompt manually (This is what LangChain was doing for you)
        prompt = f"""
        You are Chloris, an intelligent university concierge for DIU.
        
        Use the context below to answer the student's question clearly and politely.
        If the answer isn't in the context, say "I couldn't find that in the handbook."

        CONTEXT:
        {context_text}

        STUDENT QUESTION:
        {query}
        """

        # Generate the response
        response = model.generate_content(prompt)
        
        return {
            "answer": response.text,
            "sources": ["Handbook"] if retrieved_docs else []
        }

    except Exception as e:
        print(f"AI Service Error: {e}")
        return {
            "answer": "I'm having a little trouble connecting to my brain right now. Please try again.",
            "sources": []
        }