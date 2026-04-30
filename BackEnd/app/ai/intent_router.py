from core.config import settings
from ai.prompts import FALLBACK_RESPONSE, NO_CONTEXT_RESPONSE
from ai.rag_engine import ask_chloris_rag
from db.session import engine   # ← ADD engine
from sqlmodel import Session    # ← ADD this
from db import crud

DATA_KEYWORDS = [
    "my cgpa", "my gpa", "my grade", "my result",
    "my schedule", "my routine", "my class", "my timetable",
    "my course", "my subject", "my enrollment", "my registration",
    "my attendance", "present", "absent",
    "my fee", "my payment", "have i paid", "do i owe",
    "my profile", "my semester", "my credit",
    "show me my", "what is my", "check my", "tell me my",
    "today's class", "today class", "classes today",
]

POLICY_KEYWORDS = [
    "what is the", "how do i", "how to", "when is", "where is",
    "policy", "rule", "regulation", "requirement", "procedure",
    "deadline", "fee structure", "scholarship", "waiver",
    "admission", "apply", "application", "document", "eligibility",
    "credit required", "graduate", "library", "hostel", "transport",
    "exam", "handbook", "calendar", "withdraw", "refund",
]


def _classify_intent(question: str) -> str:
    q_lower = question.lower()
    for keyword in DATA_KEYWORDS:
        if keyword in q_lower:
            return "DATA"
    return "POLICY"


def _format_schedule(schedule: list, label: str = "your schedule") -> str:
    if not schedule:
        return f"You have no classes scheduled for {label}."
    lines = [f"Here is {label}:\n"]
    for s in schedule:
        lines.append(
            f"- {s['day']} {s['start_time']} - {s['end_time']} | "
            f"{s['code']} — {s['course']} | "
            f"Room: {s['room']} | Faculty: {s['faculty']}"
        )
    return "\n".join(lines)


def _format_courses(courses: list) -> str:
    if not courses:
        return "You are not enrolled in any courses this semester."
    lines = ["You are enrolled in the following courses this semester:\n"]
    for c in courses:
        lines.append(
            f"- {c['code']} — {c['name']} "
            f"({c['credit_hours']} credits) | {c['grade']}"
        )
    return "\n".join(lines)


def _format_attendance(records: list) -> str:
    if not records:
        return "No attendance records found."
    lines = ["Here is your attendance summary:\n"]
    for r in records:
        lines.append(
            f"- {r['code']} — {r['course']}: "
            f"{r['classes_attended']}/{r['classes_held']} classes "
            f"({r['percentage']}%) — {r['status']}"
        )
    return "\n".join(lines)


def _format_fees(payments: list) -> str:
    if not payments:
        return "No fee records found."
    lines = ["Here is your fee payment summary:\n"]
    for p in payments:
        lines.append(
            f"- {p['semester']}: "
            f"BDT {p['amount_paid']:,.0f} paid of "
            f"BDT {p['amount_due']:,.0f} due | "
            f"Status: {p['status'].upper()}"
        )
        if p['balance'] > 0:
            lines.append(
                f"  Remaining balance: BDT {p['balance']:,.0f} "
                f"(due by {p['due_date']})"
            )
    return "\n".join(lines)


async def route_question(question: str, user_id: int = None, history: list = None) -> dict:
    try:
        # speed lane for greetings
        greetings = {"hi", "hello", "hey", "salaam", "morning", "evening"}
        if question.lower().strip().rstrip('?!.') in greetings:
            return {
                "answer": "Hello! I'm Chloris. How can I assist you today? 🌿",
                "sources": [],
                "intent": "GREETING"
            }

        # pick a category (data vs policy)
        intent = _classify_intent(question)
        print(f"--- Routing: {intent} ---")

        if intent == "DATA":
            return await _handle_data_question(question, user_id)
        else:
            return _handle_policy_question(question, history=history)

    except Exception as e:
        print(f"Router Error: {e}")
        return {
            "answer": "I hit a snag. Try again?",
            "sources": [],
            "intent": "ERROR"
        }


def _handle_policy_question(question: str, history: list = None) -> dict:
    # search the handbook
    result = ask_chloris_rag(question, history=history)
    result["intent"] = "POLICY"
    return result


async def _handle_data_question(question: str, user_id: int = None) -> dict:
    # student data lookup
    q = question.lower()
    db = Session(engine)  

    try:
        if not user_id:
            return {
                "answer":  "Please log in to see your info.",
                "sources": [],
                "intent":  "DATA",
            }

        # 1. CGPA & credits
        if any(k in q for k in ["cgpa", "gpa", "grade point", "credit"]):
            data = crud.get_cgpa(db, user_id)
            if "error" in data:
                answer = "No profile found."
            else:
                answer = (
                    f"Your CGPA is {data['cgpa']}/4.00.\n"
                    f"Completed {data['credits_completed']}/{data['credits_required']} credits.\n"
                    f"Program: {data['program']} | Semester: {data['semester']}"
                )
            return {"answer": answer, "sources": ["Records"], "intent": "DATA"}

        # 2. Schedule
        if any(k in q for k in ["today", "schedule", "routine", "class"]):
            schedule = crud.get_schedule(db, user_id)
            return {"answer": _format_schedule(schedule), "sources": ["Schedule"], "intent": "DATA"}

        # 3. Attendance
        if any(k in q for k in ["attendance", "present", "absent"]):
            records = crud.get_attendance(db, user_id)
            return {"answer": _format_attendance(records), "sources": ["Attendance"], "intent": "DATA"}

        # 4. Fees
        if any(k in q for k in ["fee", "payment", "due"]):
            payments = crud.get_fee_status(db, user_id)
            return {"answer": _format_fees(payments), "sources": ["Fees"], "intent": "DATA"}

        # fallback
        result = ask_chloris_rag(question)
        result["intent"] = "DATA"
        return result

    finally:
        db.close()