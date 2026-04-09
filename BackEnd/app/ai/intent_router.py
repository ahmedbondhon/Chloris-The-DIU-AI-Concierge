from google import genai
from core.config import settings
from ai.prompts import (
    INTENT_CLASSIFICATION_PROMPT,
    FALLBACK_RESPONSE,
)
from ai.rag_engine import ask_chloris_rag

client           = genai.Client(api_key=settings.GOOGLE_API_KEY)
GENERATION_MODEL = "gemini-2.0-flash"


async def route_question(question: str, user_id: int = None) -> dict:
    try:
        classification_prompt = INTENT_CLASSIFICATION_PROMPT.format(
            question=question
        )
        classification = client.models.generate_content(
            model    = GENERATION_MODEL,
            contents = classification_prompt,
        )
        intent = classification.text.strip().upper()

        if intent not in ("DATA", "POLICY"):
            intent = "POLICY"

        print(f"  [Intent Router] '{question[:50]}' → {intent}")

        if intent == "DATA":
            return await _handle_data_question(question, user_id)
        else:
            return _handle_policy_question(question)

    except Exception as e:
        print(f"Intent Router Error: {e}")
        return {
            "answer":       FALLBACK_RESPONSE,
            "sources":      [],
            "intent":       "ERROR",
            "chunks_found": 0,
        }


def _handle_policy_question(question: str) -> dict:
    result = ask_chloris_rag(question)
    result["intent"] = "POLICY"
    return result


async def _handle_data_question(question: str, user_id: int = None) -> dict:
    result = ask_chloris_rag(question)
    result["intent"] = "DATA"
    return result
    try:
        # ── Step 1: Classify intent ───────────────────────────────────────────
        classification_prompt = INTENT_CLASSIFICATION_PROMPT.format(
            question=question
        )
        classification = classifier_model.generate_content(
            classification_prompt
        )
        intent = classification.text.strip().upper()

        # Normalize — if Gemini returns anything unexpected, default to POLICY
        if intent not in ("DATA", "POLICY"):
            intent = "POLICY"

        print(f"  [Intent Router] Question: '{question[:50]}...' → {intent}")

        # ── Step 2: Route to correct handler ──────────────────────────────────
        if intent == "DATA":
            return await _handle_data_question(question, user_id)
        else:
            return _handle_policy_question(question)

    except Exception as e:
        print(f"Intent Router Error: {e}")
        return {
            "answer":       FALLBACK_RESPONSE,
            "sources":      [],
            "intent":       "ERROR",
            "chunks_found": 0,
        }


def _handle_policy_question(question: str) -> dict:
    """Route to RAG engine for handbook/policy questions."""
    result = ask_chloris_rag(question)
    result["intent"] = "POLICY"
    return result


async def _handle_data_question(question: str, user_id: int = None) -> dict:
    """
    Handle personal data questions (CGPA, routine, etc.)
    Currently falls back to RAG — extend this function when
    your SQL/CRUD layer is ready to serve student data.
    """
    # ── Future: add SQL data lookups here ─────────────────────────────────
    # Example (when your db/crud.py is ready):
    #
    # if "cgpa" in question.lower() and user_id:
    #     cgpa = get_student_cgpa(user_id)
    #     return {
    #         "answer":  f"Your current CGPA is {cgpa}.",
    #         "sources": ["Student Records"],
    #         "intent":  "DATA",
    #         "chunks_found": 0,
    #     }
    # ──────────────────────────────────────────────────────────────────────

    # For now — fall back to RAG (often the handbook has this info anyway)
    result = ask_chloris_rag(question)
    result["intent"] = "DATA"
    return result