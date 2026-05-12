from google import genai
from core.config import settings
from ai.intent_router import route_question
from ai.synthesizer import format_response

client = genai.Client(api_key=settings.GOOGLE_API_KEY)


async def ask_chloris(query: str, user_id: int = None) -> dict:
    raw_result     = await route_question(query, user_id)
    clean_response = format_response(raw_result)
    return {
        "answer":  clean_response["response"],
        "sources": clean_response["sources"],
    }