import google.generativeai as genai
from core.config import settings
from ai.intent_router import route_question
from ai.synthesizer import format_response

genai.configure(api_key=settings.GOOGLE_API_KEY)


async def ask_chloris(query: str, user_id: int = None) -> dict:
    """
    Main entry point — called from api/routes_chat.py (chat.py).
    Keeps the exact same signature as before so chat.py needs no changes.

    Returns: {"answer": str, "sources": list[str]}
    """
    # Route through intent router → RAG engine → synthesizer
    raw_result     = await route_question(query, user_id)
    clean_response = format_response(raw_result)

    # Map to the dict format chat.py already expects
    return {
        "answer":  clean_response["response"],
        "sources": clean_response["sources"],
    }