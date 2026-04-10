from core.config import settings
from ai.prompts import FALLBACK_RESPONSE
from ai.rag_engine import ask_chloris_rag

# ── Keyword-based intent classifier ──────────────────────────────────────────
# Uses zero API calls — instant, free, reliable for common questions
DATA_KEYWORDS = [
    "my cgpa", "my gpa", "my grade", "my result", "my marks",
    "my schedule", "my routine", "my class", "my course",
    "my attendance", "my fee", "my payment", "my registration",
    "my profile", "my semester", "my transcript", "my id",
    "how much do i owe", "have i paid", "am i registered",
    "show me my", "what is my", "check my",
]

POLICY_KEYWORDS = [
    "what is the", "how do i", "how to", "when is", "where is",
    "policy", "rule", "regulation", "requirement", "procedure",
    "deadline", "fee", "cost", "scholarship", "waiver", "admission",
    "apply", "application", "document", "eligibility", "gpa required",
    "credit", "graduate", "library", "hostel", "transport", "exam",
    "handbook", "calendar", "semester", "withdraw", "refund",
]


def _classify_intent(question: str) -> str:
    """
    Classify question as DATA or POLICY using keywords.
    Zero API calls — saves your quota for actual answers.
    """
    q_lower = question.lower()

    # Check DATA keywords first (personal data questions)
    for keyword in DATA_KEYWORDS:
        if keyword in q_lower:
            return "DATA"

    # Default to POLICY (handbook/RAG questions)
    return "POLICY"


async def route_question(question: str, user_id: int = None) -> dict:
    """
    Route the question to the correct handler.
    Uses keyword matching instead of Gemini for classification
    to save API quota.
    """
    try:
        intent = _classify_intent(question)
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
    """
    Handle personal data questions.
    Falls back to RAG for now — extend with SQL when ready.
    """
    # Future SQL lookups go here:
    # if "cgpa" in question.lower() and user_id:
    #     cgpa = get_student_cgpa(user_id)
    #     return {"answer": f"Your CGPA is {cgpa}.", "sources": ["Student Records"], ...}

    result = ask_chloris_rag(question)
    result["intent"] = "DATA"
    return result