import json
from core.config import settings
from ai.prompts import FALLBACK_RESPONSE, NO_CONTEXT_RESPONSE
from ai.rag_engine import ask_chloris_rag
from db.session import engine   # ← ADD engine
from sqlmodel import Session    # ← ADD this
from db import crud

DATA_KEYWORDS = [
    "my cgpa", "my gpa", "my grade", "my result", "my mark", "my score",
    "my schedule", "my routine", "my class", "my timetable",
    "my course", "my subject", "my enrollment", "my registration",
    "my attendance", "present", "absent",
    "my fee", "my payment", "have i paid", "do i owe", "due bill", "registration fee",
    "my profile", "my semester", "my credit", "my progress", "current progress",
    "how am i doing", "my results",
    "show me my", "what is my", "check my", "tell me my", "whats my",
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

PROBLEM_KEYWORDS = [
    "trouble", "issue", "problem", "difficult", "struggle", 
    "continue", "quit", "drop", "hard", "help me with", "fail",
    "stuck", "cannot pay", "not able", "give up"
]


async def _classify_intent(question: str) -> str:
    """
    Asks Gemini to decide if this is a personal DATA question or a general POLICY question.
    Falls back to keywords if API fails.
    """
    from google import genai
    from ai.prompts import INTENT_CLASSIFICATION_PROMPT
    
    q_lower = question.lower()
    
    # 1. Try AI classification first
    try:
        client = genai.Client(api_key=settings.GOOGLE_API_KEY)
        prompt = INTENT_CLASSIFICATION_PROMPT.format(question=question)
        response = client.models.generate_content(
            model='models/gemini-2.0-flash',
            contents=prompt,
        )
        prediction = response.text.strip().upper()
        
        if "DATA" in prediction:
            return "DATA"
        if "POLICY" in prediction:
            return "POLICY"
    except Exception as e:
        print(f"AI Classification Failed (likely quota): {e}")

    # 2. Robust Keyword Fallback
    for kw in DATA_KEYWORDS:
        if kw in q_lower:
            print(f"--- Keyword Match (DATA): {kw} ---")
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


# --- 📚 DIU POLICY SOLUTIONS ENGINE (INSTANT RIGHT-BRAIN) ---
POLICY_SOLUTIONS = {
    "late_fee": {
        "title": "💰 Late Fee Extension",
        "steps": [
            "**Visit Accounts Section**: Go to the Accounts office (DSC or Shukrabad) immediately.",
            "**Written Application**: Prepare a formal application addressed to the Registrar explaining your situation.",
            "**HoD Recommendation**: Get your Head of Department (HoD) to sign/recommend the application.",
            "**Portal Update**: Once submitted, the Accounts Section will extend your deadline in the Smart Student Portal. 🤍"
        ],
        "keywords": ["late fee", "extend", "date", "delay", "deadline"]
    },
    "scholarship": {
        "title": "🎓 Getting a Scholarship / Full Scholarship",
        "steps": [
            "**Check Eligibility**: Ensure you meet the GPA requirements (usually 3.80+ for merit, or specific criteria for Sibling/Female waivers).",
            "**Apply via Portal**: Log in to the Smart Student Portal during the registration window and find the 'Waiver Application' section.",
            "**Submit Documents**: Upload required transcripts or financial proofs.",
            "**Interview**: For 100% or special scholarships, you may be called for an interview with the Scholarship Committee or the Dean. 🤍"
        ],
        "keywords": ["scholarship", "waiver", "discount", "merit", "full scholarship", "100%"]
    },
    "fee_issue": {
        "title": "⚠️ Fee Not Registering (System Issue)",
        "steps": [
            "**Transaction Proof**: Keep your Bkash/Bank transaction ID and screenshot safe.",
            "**The 24-Hour Rule**: Wait at least 24 hours for the system to sync between the bank and DIU.",
            "**Contact Accounts IT**: If it still shows unpaid, email `accountsit@daffodilvarsity.edu.bd` with your Student ID and proof.",
            "**Manual Clearance**: Visit the Accounts office for manual verification if the email isn't resolved in 48 hours. 🤍"
        ],
        "keywords": ["not registering", "unpaid", "billing issue", "technical", "system", "paid but"]
    },
    "semester_drop": {
        "title": "🔄 Retaking a Semester / Semester Drop",
        "steps": [
            "**Academic Counseling**: Discuss your situation with your Academic Mentor first.",
            "**Apply in Portal**: Navigate to the 'Application' section and select 'Semester Drop.'",
            "**Reasoning**: Provide a valid reason (Medical/Personal) and upload supporting docs.",
            "**Clearance**: Ensure all previous semester dues are paid; otherwise, the drop will be rejected. 🤍"
        ],
        "keywords": ["retake semester", "drop semester", "semester drop", "break", "pause"]
    },
    "missed_exam": {
        "title": "📝 Retaking a Missed Exam",
        "steps": [
            "**Valid Evidence**: Obtain a Medical Certificate (if sick) or official proof of emergency.",
            "**Controller Application**: Submit an application to the Controller of Examinations within 3 working days.",
            "**Fee Payment**: Pay the 'Incomplete Exam' fee (usually BDT 500-1000) at the Mutual Trust Bank/Prime Bank.",
            "**Routine Check**: Keep an eye on the departmental notice board for the 'Special Exam' schedule. 🤍"
        ],
        "keywords": ["missed exam", "retake exam", "incomplete", "absent", "makeup exam"]
    },
    "dean_registrar": {
        "title": "🏛️ Reaching the Registrar or Dean",
        "steps": [
            "**Appointment Request**: Visit your Departmental Coordination Officer (DCO) to request an appointment.",
            "**Formal Note**: Bring a short written note stating the 'Serious Matter' you need to discuss.",
            "**Office Hours**: You will be scheduled during the official Office Hours of the Dean/Registrar.",
            "**Be Prepared**: Have your Student ID and all relevant evidence ready before entering. 🤍"
        ],
        "keywords": ["dean", "registrar", "serious matter", "appointment", "talk to"]
    },
    "host_event": {
        "title": "🎭 Hosting an Event at DIU",
        "steps": [
            "**Concept Proposal**: Draft a proposal including objective, date, budget, and guest list.",
            "**Departmental Approval**: Get your Head of Department (HoD) to sign off on the concept.",
            "**DSA Clearance**: Submit the signed proposal to the Director of Student Affairs (DSA) for final approval.",
            "**Logistics Requisition**: Once approved, submit requests for venue, sound, and seating to the IT/Maintenance department. 🤍"
        ],
        "keywords": ["host event", "organize", "program", "permission", "seminar", "workshop"]
    }
}

def _get_local_solution(q: str) -> dict:
    """Helper to find a step-by-step solution based on keywords."""
    for key, data in POLICY_SOLUTIONS.items():
        if any(kw in q for kw in data["keywords"]):
            answer = f"### {data['title']}\n\n**Steps to Follow:**\n"
            for i, step in enumerate(data["steps"], 1):
                answer += f"{i}. {step}\n"
            return {
                "answer": answer,
                "sources": ["DIU Official Policy"],
                "intent": "PROBLEM_SOLVED"
            }
    return None

async def route_question(question: str, user_id: int = None, history: list = None) -> dict:
    try:
        q_low = question.lower().strip().rstrip('?!.')
        
        # --- 🛡️ FRONT-LINE LOCAL EMPATHY BRIDGE (INSTANT) ---
        last_bot_msg = ""
        if history and len(history) > 0:
            for msg in reversed(history):
                m_role = msg.get("role") if isinstance(msg, dict) else getattr(msg, "role", "")
                m_content = msg.get("content") if isinstance(msg, dict) else getattr(msg, "content", "")
                if m_role == "assistant":
                    last_bot_msg = m_content.lower()
                    break

        # Step 2: Detection (If we already asked the discovery question)
        if "making it difficult to pay" in last_bot_msg or "hardest part for you lately" in last_bot_msg:
            # The student just shared their struggle. Now give the solution!
            # 1. Try to find a specific solution based on context
            solution = _get_local_solution(q_low)
            if solution: return solution
            
            # 2. If no specific match, give the general empathetic bridge (Phase 2)
            if "making it difficult to pay" in last_bot_msg:
                return {
                    "answer": "Thank you for sharing that with me. I hear how hard that is. 🥀 DIU has several support options for situations like this, including installment plans and even special waivers for students in crisis. My best advice right now is to contact the Accounts Office (accounts@diu.edu.bd) or your Department Head—they are truly there to help in these exact moments. Don't let this stop your journey! 🤍",
                    "sources": ["Financial Support Policy"],
                    "intent": "PROBLEM_SOLVED"
                }
            else:
                return {
                    "answer": "I really appreciate you opening up to me. 🥀 It takes a lot of strength to admit when things are tough. Since you're feeling this way, I strongly suggest reaching out to the DIU Counseling Center or your Academic Mentor. They can help you with a 'Semester Freeze' or a reduced credit load so you can take a breath without losing your progress. You've got this! 🤍",
                    "sources": ["Student Welfare Policy"],
                    "intent": "PROBLEM_SOLVED"
                }

        # --- ⚡ DIRECT POLICY SOLUTIONS (INSTANT 'RIGHT BRAIN') ---
        # If user explicitly asks for "how to" or "steps", give it straight!
        if any(x in q_low for x in ["how do i", "how to", "what is", "what are", "steps for", "procedure for", "process", "rules for", "way to", "tell me the steps"]):
            solution = _get_local_solution(q_low)
            if solution: return solution

        # Step 1: Discovery (Initial Struggle Detection)
        if any(x in q_low for x in ["pay", "fee", "bill", "money", "due"]):
            return {
                "answer": "I am so incredibly sorry to hear you're going through a tough time with your fees. I know how heavy that burden feels. 🥀 Before we look at the official university options, can you tell me what’s making it difficult to pay right now? I want to help you figure this out together. 🤍",
                "sources": ["Local Support System"],
                "intent": "PROBLEM_DISCOVERY"
            }
        elif any(x in q_low for x in ["continue", "quit", "drop", "stop", "hard", "difficult", "semester"]):
            return {
                "answer": "I truly hear you, and I can feel the weight of what you're saying. This semester has been tough, hasn't it? 🥀 Please know that you're not alone in feeling this way. Before you make any big decisions, could you share a bit more about what’s been the hardest part for you lately? I'm here to listen and help you find a way forward. 🤍",
                "sources": ["Local Support System"],
                "intent": "PROBLEM_DISCOVERY"
            }

        # 1. speed lane for greetings
        greetings = {"hi", "hello", "hey", "salaam", "morning", "evening"}
        if q_low in greetings:
            return {
                "answer": "Hello! I'm Chloris. How can I assist you today? 🌿",
                "sources": [],
                "intent": "GREETING"
            }

        # 2. Hardened Keyword Detection
        is_data = any(k in q_low for k in DATA_KEYWORDS)
        is_policy = any(k in q_low for k in POLICY_KEYWORDS)

        # 3. Determine Intent (Priority: AI classification)
        try:
            intent = await _classify_intent(question)
        except:
            if is_data: intent = "DATA"
            else: intent = "POLICY"
        
        print(f"--- Routing: {intent} ---")

        if intent == "DATA":
            return await _handle_data_question(question, user_id)
        else:
            # Policy/Problem question
            student_context = ""
            if user_id:
                try:
                    db = Session(engine)
                    raw_context = crud.get_all_student_context(db, user_id)
                    student_context = json.dumps(raw_context, indent=2)
                except: pass
            
            # 🎯 Try REAL AI first (The 'Real' brain)
            return _handle_policy_question(question, history=history, student_context=student_context)

    except Exception as e:
        print(f"Router Critical Error: {e}")
        return {
            "answer": FALLBACK_RESPONSE,
            "sources": [],
            "intent": "ERROR"
        }


def _handle_policy_question(question: str, history: list = None, student_context: str = "") -> dict:
    # search the handbook with student context!
    from ai.rag_engine import ask_chloris_rag
    result = ask_chloris_rag(question, history=history, student_context=student_context)
    result["intent"] = "POLICY"
    return result


async def _handle_data_question(question: str, user_id: int = None) -> dict:
    # student data lookup
    db = Session(engine)  

    try:
        if not user_id:
            return {
                "answer":  "Please log in to see your info.",
                "sources": [],
                "intent":  "DATA",
            }

        import json
        from google import genai
        
        # 1. Fetch full data context
        context = crud.get_all_student_context(db, user_id)
        
        if "error" in context.get("profile", {}):
            return {"answer": "No profile found.", "sources": ["Records"], "intent": "DATA"}

        # 2. Synthesize using Gemini
        client = genai.Client(api_key=settings.GOOGLE_API_KEY)
        
        prompt = f"""You are Chloris, the Expert Academic Concierge for Daffodil International University. 
Your goal is to provide deep, analytical feedback to students based on their actual results.

User's Data Context (JSON):
{json.dumps(context, indent=2)}

User's Question: {question}

CRITICAL INSTRUCTIONS:
1. ACT AS AN EXPERT ADVISOR: Do not give generic "talk to your teacher" advice unless it's a secondary suggestion. 
2. SCAN THE MARKS: Look at the Quiz, Mid, and Final marks for every course.
3. IDENTIFY WEAKNESSES: If a student asks how to improve, point out the EXACT subject where they are failing or scoring low (e.g. "Your Structured Programming (CIS102) grade is an F because you only scored 15 in the Mid and 10 in the Final").
4. PROVIDE CONCRETE STEPS: Give specific study tips for those subjects (e.g. "To fix your Programming grade, you need to revisit the basics of loops and functions. Since your Quiz marks were low, try practicing small problems daily").
5. POSITIVE REINFORCEMENT: Acknowledge where they are doing well (e.g. "Your DBMS score is an A+, which is excellent! Use that same logic for your other coding courses").
6. FORMAT: Use a conversational but professional tone. Use bold text for subject names and grades.

Do not say "I don't have specific tips". You HAVE the data. Use it to give specific tips.
"""
        
        response = client.models.generate_content(
            model='models/gemini-2.0-flash',
            contents=prompt,
        )

        return {"answer": response.text, "sources": ["Student Database"], "intent": "DATA"}

    except Exception as e:
        error_msg = str(e)
        print(f"Data Generation Failed: {error_msg}")
        
        # --- ULTIMATE DATA FALLBACK (Always show data if AI fails) ---
        print("!!! AI Failed - Switching to Direct Data Reporter !!!")
        
        # Smart filtering based on question
        q_low = question.lower()
        show_grades = any(x in q_low for x in ["grade", "mark", "result", "gpa", "academic", "progress", "result"])
        show_fees   = any(x in q_low for x in ["fee", "bill", "pay", "due", "registration", "money"])
        
        if not show_grades and not show_fees:
            show_grades, show_fees = True, True

        p = context.get("profile", {})
        report = [
            f"### 📊 Academic Profile: {p.get('program')}\n",
            f"**👤 ID:** `{p.get('student_id')}` | **📈 CGPA:** `{p.get('cgpa')}`\n"
        ]
        
        if show_grades:
            report.append("#### 📚 Current Semester Grades")
            report.append("| Course | Quiz | Mid | Final | Grade |")
            report.append("| :--- | :---: | :---: | :---: | :---: |")
            
            courses = context.get("courses", [])
            has_low_grades = False
            
            for c in courses:
                grade = c['grade']
                report.append(f"| {c['code']} | {c['quiz_mark']} | {c['mid_mark']} | {c['final_mark']} | **{grade}** |")
                if grade in ["F", "D", "C", "C+", "C-"]:
                    has_low_grades = True
            
            if has_low_grades:
                report.append("\n#### 🌿 A Message from Chloris")
                report.append("I see that some of your results aren't where you want them to be, and I truly understand how heavy that feels. Please don't let these numbers define your worth; every great comeback starts with a single step. To turn this around, prioritize your lowest-scoring subjects immediately by revisiting the fundamental logic you missed in the Midterms. Reach out to your course teacher this week—they are there to help you succeed—and consider joining a study group with peers who have mastered these topics. You have the potential to reclaim your GPA, and I am here to guide you through every victory and every challenge ahead. Your future is still bright, so let's start the recovery today! 🚀")
            else:
                report.append("\n#### 🌟 A Message from Chloris")
                report.append("Your progress is absolutely stellar! Maintaining such high standards across all your courses is no small feat. Keep this momentum going by mentoring others—it's the best way to solidify your own mastery. Your future career is looking incredibly promising! 🏆")
        
        if show_fees:
            fees = context.get("fees", [])
            if fees:
                report.append("\n#### 💰 Financial Summary")
                for f in fees:
                    status_emoji = "✅" if f['status'] == 'paid' else "⚠️"
                    report.append(f"- {status_emoji} **{f['semester']}**: BDT {f['amount_due'] - f['amount_paid']:,.0f} remaining")
        
        return {
            "answer": "\n".join(report),
            "sources": ["Student Database (Direct)"],
            "intent": "DATA"
        }

    finally:
        db.close()