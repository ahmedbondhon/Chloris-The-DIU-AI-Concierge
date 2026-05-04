from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from schemas.chat import ChatRequest, ChatResponse
from services.llm_service import ask_chloris
from ai.rag_engine import build_knowledge_base
from jose import jwt, JWTError
from core.config import settings
from typing import Optional

router = APIRouter()

oauth2_optional = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login", auto_error=False)

async def get_optional_user_id(token: Optional[str] = Depends(oauth2_optional)) -> Optional[int]:
    if not token:
        return None
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        if user_id:
            return int(user_id)
    except JWTError:
        pass
    return None

@router.post("/query", response_model=ChatResponse)
async def chat_query(request: ChatRequest, user_id: Optional[int] = Depends(get_optional_user_id)):
    # main chat endpoint
    try:
        result = await ask_chloris(request.message, user_id=user_id, history=request.history)
        
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