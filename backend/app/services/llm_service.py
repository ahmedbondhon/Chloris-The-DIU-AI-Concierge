from google import genai
from core.config import settings
from ai.intent_router import route_question
from ai.synthesizer import format_response

client = genai.Client(api_key=settings.GOOGLE_API_KEY)

# main entry point for chat
async def ask_chloris(query: str, user_id: int = None, history: list = None) -> dict:
    raw_result     = await route_question(query, user_id, history=history)
    clean_response = format_response(raw_result)
    
    # ensure no weird characters in the final text
    safe_answer = clean_response["answer"].encode('utf-8', errors='ignore').decode('utf-8')

    return {
        "answer": safe_answer,
        "sources": clean_response["sources"]
    }

# simple formatter
def format_response(raw_data: dict) -> dict:
    return {
        "answer": raw_data.get("answer", "I'm not sure how to answer that."),
        "sources": list(set(raw_data.get("sources", [])))
    }