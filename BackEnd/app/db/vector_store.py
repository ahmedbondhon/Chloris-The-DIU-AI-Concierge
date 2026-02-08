import os
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from core.config import settings

# 1. Define the Persist Directory
# This is where the AI memory will be saved on your laptop so it doesn't forget after restart.
CHROMA_DB_DIR = "./chroma_db"

def get_vector_store():
    """
    Initializes and returns the ChromaDB vector store connection.
    """
    
    # 2. Setup Embeddings (The 'Translator' that turns text into numbers)
    if not settings.GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY is missing in .env file")

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=settings.GOOGLE_API_KEY
    )

    # 3. Connect to ChromaDB
    # If the folder exists, it loads it. If not, it creates it.
    vector_store = Chroma(
        persist_directory=CHROMA_DB_DIR,
        embedding_function=embeddings,
        collection_name="chloris_handbook"
    )
    
    return vector_store