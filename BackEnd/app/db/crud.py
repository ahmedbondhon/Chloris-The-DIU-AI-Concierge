from sqlmodel import Session, select
from models.db_models import (
    User, StudentProfile, Course,
    Enrollment, Schedule, AttendanceRecord, FeePayment
)
from datetime import datetime


# ── Auth CRUD ─────────────────────────────────────────────────────────────────

def get_user_by_email(session: Session, email: str) -> User | None:
    return session.exec(select(User).where(User.email == email)).first()

def get_user_by_id(session: Session, user_id: int) -> User | None:
    return session.get(User, user_id)

def create_user(session: Session, full_name: str,
                email: str, hashed_password: str) -> User:
    user = User(
        full_name       = full_name,
        email           = email,
        hashed_password = hashed_password,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


# ── Student Profile ───────────────────────────────────────────────────────────

def get_student_profile(session: Session,
                         user_id: int) -> StudentProfile | None:
    return session.exec(
        select(StudentProfile).where(StudentProfile.user_id == user_id)
    ).first()


# ── Left Brain Query Functions ────────────────────────────────────────────────

def get_cgpa(session: Session, user_id: int) -> dict:
    profile = get_student_profile(session, user_id)
    if not profile:
        return {"error": "Student profile not found"}
    return {
        "cgpa":              profile.cgpa,
        "current_year":      profile.current_year,
        "credits_completed": profile.credits_completed,
        "credits_required":  profile.credits_required,
        "credits_remaining": profile.credits_required - profile.credits_completed,
        "program":           profile.program,
        "semester":          profile.semester,
        "student_id":        profile.student_id,
    }


def get_current_courses(session: Session, user_id: int) -> list:
    profile = get_student_profile(session, user_id)
    if not profile:
        return []

    enrollments = session.exec(
        select(Enrollment).where(
            Enrollment.student_id == profile.id,
            Enrollment.is_current == True
        )
    ).all()

    results = []
    for e in enrollments:
        course = session.get(Course, e.course_id)
        if course:
            results.append({
                "code":         course.code,
                "name":         course.name,
                "credit_hours": course.credit_hours,
                "department":   course.department,
                "semester":     e.semester,
                "grade":        e.grade or "In Progress",
                "quiz_mark":    e.quiz_mark,
                "mid_mark":     e.mid_mark,
                "final_mark":   e.final_mark,
            })
    return results


def get_schedule(session: Session, user_id: int,
                 day: str = None) -> list:
    profile = get_student_profile(session, user_id)
    if not profile:
        return []

    enrollments = session.exec(
        select(Enrollment).where(
            Enrollment.student_id == profile.id,
            Enrollment.is_current == True
        )
    ).all()
    course_ids = [e.course_id for e in enrollments]

    query = select(Schedule).where(Schedule.course_id.in_(course_ids))
    if day:
        query = query.where(Schedule.day == day.capitalize())

    schedules = session.exec(query).all()

    results = []
    for s in schedules:
        course = session.get(Course, s.course_id)
        results.append({
            "day":        s.day,
            "start_time": s.start_time,
            "end_time":   s.end_time,
            "course":     course.name if course else "Unknown",
            "code":       course.code if course else "???",
            "room":       s.room,
            "faculty":    s.faculty,
        })
    return results


def get_today_schedule(session: Session, user_id: int) -> list:
    today = datetime.now().strftime("%A")
    return get_schedule(session, user_id, day=today)


def get_attendance(session: Session, user_id: int,
                   course_code: str = None) -> list:
    profile = get_student_profile(session, user_id)
    if not profile:
        return []

    query = select(AttendanceRecord).where(
        AttendanceRecord.student_id == profile.id
    )
    records = session.exec(query).all()

    results = []
    for r in records:
        course = session.get(Course, r.course_id)
        if course_code and course and course.code != course_code.upper():
            continue
        results.append({
            "course":           course.name if course else "Unknown",
            "code":             course.code if course else "???",
            "classes_held":     r.classes_held,
            "classes_attended": r.classes_attended,
            "percentage":       r.percentage,
            "status":           r.status,
        })
    return results


def get_fee_status(session: Session, user_id: int) -> list:
    profile = get_student_profile(session, user_id)
    if not profile:
        return []

    payments = session.exec(
        select(FeePayment).where(FeePayment.student_id == profile.id)
    ).all()

    return [
        {
            "semester":    p.semester,
            "amount_due":  p.amount_due,
            "amount_paid": p.amount_paid,
            "balance":     p.balance,
            "due_date":    p.due_date,
            "paid_date":   p.paid_date,
            "status":      p.status,
            "remarks":     p.remarks,
        }
        for p in payments
    ]


def get_all_student_context(session: Session, user_id: int) -> dict:
    """Aggregates all student data for Left Brain LLM synthesis."""
    profile_data = get_cgpa(session, user_id)
    if "error" in profile_data:
        return {"error": "Student profile not found"}
        
    return {
        "profile":    profile_data,
        "courses":    get_current_courses(session, user_id),
        "schedule":   get_schedule(session, user_id),
        "attendance": get_attendance(session, user_id),
        "fees":       get_fee_status(session, user_id),
    }
