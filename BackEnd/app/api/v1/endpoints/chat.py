from fastapi import APIRouter, HTTPException
from schemas.chat import ChatRequest, ChatResponse
from services.llm_service import ask_chloris
from ai.rag_engine import build_knowledge_base

router = APIRouter()

@router.post("/query", response_model=ChatResponse)
async def chat_query(request: ChatRequest):
    # main chat endpoint
    try:
        result = await ask_chloris(request.message, history=request.history)
        
        return ChatResponse(
            response=result["answer"],
            sources=result["sources"]
        )
        
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(
            status_code=500, 
            detail="AI error"
        )

@router.post("/build-knowledge-base")
async def trigger_build_knowledge_base(force_rebuild: bool = False):
    # rebuild vector db from markdown files
    try:
        result = build_knowledge_base(force_rebuild=force_rebuild)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Knowledge base build failed: {str(e)}"
        )