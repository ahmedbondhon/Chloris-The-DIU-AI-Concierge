import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlmodel import Session
from db.session import engine, init_db
from models.db_models import (
    User, StudentProfile, Course,
    Enrollment, Schedule, AttendanceRecord, FeePayment
)
import bcrypt

def hash_pw(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def seed():
    init_db()
    print("Seeding Chloris database...")

    with Session(engine) as session:

        # ── 1. Demo Student User ──────────────────────────────────────────────
        from sqlmodel import select
        existing = session.exec(
            select(User).where(User.email == "ahmed@diu.edu.bd")
        ).first()

        if existing:
            print("  Demo student already exists — skipping user creation.")
            user = existing
        else:
            user = User(
                full_name       = "Ahmed Hassan",
                email           = "ahmed@diu.edu.bd",
                hashed_password = hash_pw("demo1234"),
                is_active       = True,
            )
            session.add(user)
            session.commit()
            session.refresh(user)
            print(f"  User created: {user.full_name} ({user.email})")

        # ── 2. Student Profile ────────────────────────────────────────────────
        profile = session.exec(
            select(StudentProfile).where(StudentProfile.user_id == user.id)
        ).first()
        if not profile:
            profile = StudentProfile(
                user_id           = user.id,
                student_id        = "221-15-5678",
                program           = "B.Sc. in CSE",
                department        = "CSE",
                batch             = "55",
                semester          = 6,
                cgpa              = 3.72,
                credits_completed = 87,
                credits_required  = 136,
            )
            session.add(profile)
            session.commit()
            session.refresh(profile)
            print(f"  Profile: ID {profile.student_id}, CGPA {profile.cgpa}")

        # ── 3. Courses ────────────────────────────────────────────────────────
        courses_data = [
            ("CSE301", "Data Structures & Algorithms", 3.0, "CSE"),
            ("CSE315", "Database Management Systems",  3.0, "CSE"),
            ("CSE325", "Computer Networks",            3.0, "CSE"),
            ("CSE341", "Software Engineering",         3.0, "CSE"),
            ("MAT201", "Discrete Mathematics",         2.0, "Math"),
            ("ENG201", "Business Communication",       2.0, "English"),
        ]
        courses = {}
        for code, name, credits, dept in courses_data:
            c = session.exec(
                select(Course).where(Course.code == code)
            ).first()
            if not c:
                c = Course(code=code, name=name,
                           credit_hours=credits, department=dept)
                session.add(c)
            courses[code] = c
        session.commit()
        for code in courses:
            session.refresh(courses[code])
        print(f"  Courses: {len(courses)} created/verified")

        # ── 4. Enrollments ────────────────────────────────────────────────────
        for code, course in courses.items():
            exists = session.exec(
                select(Enrollment).where(
                    Enrollment.student_id == profile.id,
                    Enrollment.course_id  == course.id,
                    Enrollment.is_current == True,
                )
            ).first()
            if not exists:
                session.add(Enrollment(
                    student_id = profile.id,
                    course_id  = course.id,
                    semester   = "Spring 2026",
                    is_current = True,
                ))
        session.commit()
        print(f"  Enrollments: {len(courses)} courses registered")

        # ── 5. Schedule ───────────────────────────────────────────────────────
        schedule_data = [
            ("CSE301","Sunday",   "08:00 AM","09:30 AM","AB5-312","Dr. Rahman"),
            ("CSE315","Sunday",   "10:00 AM","11:30 AM","AB3-201","Ms. Farzana"),
            ("CSE325","Monday",   "08:00 AM","09:30 AM","AB5-410","Dr. Karim"),
            ("CSE341","Monday",   "12:00 PM","01:30 PM","AB2-105","Mr. Hossain"),
            ("MAT201","Tuesday",  "08:00 AM","09:30 AM","AB1-302","Ms. Begum"),
            ("ENG201","Tuesday",  "10:00 AM","11:30 AM","AB1-101","Mr. Islam"),
            ("CSE301","Wednesday","08:00 AM","09:30 AM","AB5-312","Dr. Rahman"),
            ("CSE315","Wednesday","10:00 AM","11:30 AM","AB3-201","Ms. Farzana"),
            ("CSE325","Thursday", "08:00 AM","09:30 AM","AB5-410","Dr. Karim"),
            ("CSE341","Thursday", "12:00 PM","01:30 PM","AB2-105","Mr. Hossain"),
            ("MAT201","Saturday", "08:00 AM","09:30 AM","AB1-302","Ms. Begum"),
            ("ENG201","Saturday", "10:00 AM","11:30 AM","AB1-101","Mr. Islam"),
        ]
        for code, day, start, end, room, faculty in schedule_data:
            exists = session.exec(
                select(Schedule).where(
                    Schedule.course_id == courses[code].id,
                    Schedule.day       == day,
                )
            ).first()
            if not exists:
                session.add(Schedule(
                    course_id  = courses[code].id,
                    day=day, start_time=start, end_time=end,
                    room=room, faculty=faculty, semester="Spring 2026",
                ))
        session.commit()
        print(f"  Schedule: {len(schedule_data)} class slots created")

        # ── 6. Attendance ─────────────────────────────────────────────────────
        attendance_data = [
            ("CSE301", 20, 17),
            ("CSE315", 18, 16),
            ("CSE325", 20, 14),
            ("CSE341", 16, 15),
            ("MAT201", 18, 10),
            ("ENG201", 14, 13),
        ]
        for code, held, attended in attendance_data:
            exists = session.exec(
                select(AttendanceRecord).where(
                    AttendanceRecord.student_id == profile.id,
                    AttendanceRecord.course_id  == courses[code].id,
                )
            ).first()
            if not exists:
                session.add(AttendanceRecord(
                    student_id=profile.id, course_id=courses[code].id,
                    semester="Spring 2026",
                    classes_held=held, classes_attended=attended,
                ))
        session.commit()
        print(f"  Attendance: {len(attendance_data)} records created")

        # ── 7. Fee Payments ───────────────────────────────────────────────────
        fee_data = [
            ("Fall 2025",   25000, 25000, "2025-08-31", "2025-08-25", "paid",    "Paid via bKash"),
            ("Spring 2026", 25000, 12500, "2026-01-31", None,         "pending", "50% paid — balance due"),
        ]
        for sem, due, paid, due_date, paid_date, status, remarks in fee_data:
            exists = session.exec(
                select(FeePayment).where(
                    FeePayment.student_id == profile.id,
                    FeePayment.semester   == sem,
                )
            ).first()
            if not exists:
                session.add(FeePayment(
                    student_id=profile.id, semester=sem,
                    amount_due=due, amount_paid=paid,
                    due_date=due_date, paid_date=paid_date,
                    status=status, remarks=remarks,
                ))
        session.commit()
        print(f"  Fee records: {len(fee_data)} semesters created")

    print("\nDatabase seeded successfully!")
    print("\nDemo credentials:")
    print("  Email    : ahmed@diu.edu.bd")
    print("  Password : demo1234")
    print("  CGPA     : 3.72 | Semester 6")

if __name__ == "__main__":
    seed()