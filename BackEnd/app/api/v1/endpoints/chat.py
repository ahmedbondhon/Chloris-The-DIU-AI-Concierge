from fastapi import APIRouter, HTTPException
from schemas.chat import ChatRequest, ChatResponse
from services.llm_service import ask_chloris
from ai.rag_engine import build_knowledge_base

router = APIRouter()

@router.post("/query", response_model=ChatResponse)
async def chat_query(request: ChatRequest):
    """
    Send a message to Chloris AI (Direct Google Gemini + ChromaDB).
    """
    try:
        # Call the new "No-LangChain" AI Service
        # It handles searching the DB + asking Gemini directly
        result = await ask_chloris(request.message)
        
        # The new service returns {"answer": ..., "sources": ...}
        # which maps perfectly to our response model
        return ChatResponse(
            response=result["answer"],
            sources=result["sources"]
        )
        
    except Exception as e:
        # Log the actual error to the console for debugging
        print(f"ERROR in /chat/query: {str(e)}")
        
        # Return a generic error to the frontend so the app doesn't crash
        raise HTTPException(
            status_code=500, 
            detail=f"AI Service Failure: {str(e)}"
        )

@router.post("/build-knowledge-base")
async def trigger_build_knowledge_base(force_rebuild: bool = False):
    """
    Trigger PDF ingestion into ChromaDB.
    Call this once after adding new PDFs to ai/knowledge_base/.

    force_rebuild=true  → clears existing DB and rebuilds from scratch
    force_rebuild=false → only ingests new PDFs (safe to run repeatedly)
    """
    try:
        result = build_knowledge_base(force_rebuild=force_rebuild)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Knowledge base build failed: {str(e)}"
        )