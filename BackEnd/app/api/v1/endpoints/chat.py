from fastapi import APIRouter, HTTPException
from schemas.chat import ChatRequest, ChatResponse
from services.llm_service import ask_chloris 

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