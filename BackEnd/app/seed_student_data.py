import os
import sys
from datetime import datetime
from sqlmodel import Session, select, create_engine, text
from core.config import settings
from models.db_models import User, StudentProfile, Course, Enrollment, Schedule, AttendanceRecord, FeePayment
from core.security import get_password_hash

# Engine setup
engine = create_engine(settings.DATABASE_URL)

def seed():
    print("\nDEEP CLEANING DATABASE...")
    with Session(engine) as session:
        # Clear all existing data to prevent duplicates
        session.execute(text("DELETE FROM attendance_records"))
        session.execute(text("DELETE FROM enrollments"))
        session.execute(text("DELETE FROM schedules"))
        session.execute(text("DELETE FROM fee_payments"))
        session.execute(text("DELETE FROM student_profiles"))
        session.execute(text("DELETE FROM courses"))
        session.execute(text("DELETE FROM users"))
        session.commit()
    
    print("SEEDING MULTI-USER DEMO SUITE...")
    
    with Session(engine) as session:
        # ── 1. Create Users ───────────────────────────────────────────────────
        demo_password = get_password_hash("demo1234")
        
        def get_or_create_user(name, email):
            u = session.exec(select(User).where(User.email == email)).first()
            if not u:
                u = User(full_name=name, email=email, hashed_password=demo_password)
                session.add(u)
                session.commit()
                session.refresh(u)
            return u

        ahmed = get_or_create_user("Ahmed Hassan", "ahmed@diu.edu.bd")
        john  = get_or_create_user("John Doe",     "john@diu.edu.bd")
        sarah = get_or_create_user("Sarah Connor", "sarah@diu.edu.bd")
        kevin = get_or_create_user("Kevin Mitnick", "kevin@diu.edu.bd")
        
        print("  Users: 4 Demo accounts ready.")

        # ── 2. Student Profiles ────────────────────────────────────────────────
        profiles = {}
        users_meta = [
            (ahmed, "221-15-5678", 3.72),
            (john,  "221-15-1234", 3.45),
            (sarah, "221-15-9999", 2.10), # Low
            (kevin, "221-15-0000", 1.50), # Probation
        ]
        for user_obj, s_id, cgpa in users_meta:
            profile = session.exec(select(StudentProfile).where(StudentProfile.user_id == user_obj.id)).first()
            if not profile:
                profile = StudentProfile(
                    user_id=user_obj.id, student_id=s_id, program="B.Sc. in CIS",
                    department="CIS", batch="18", semester=6, current_year=3, cgpa=cgpa,
                    credits_completed=87, credits_required=136
                )
                session.add(profile)
                session.commit()
                session.refresh(profile)
            profiles[user_obj.email] = profile
        print("  Profiles: 4 Student profiles ready.")

        # ── 3. CIS Courses ────────────────────────────────────────────────────
        courses_data = [
            ("CIS101", "Introduction to CIS", 3.0, "CIS"),
            ("CIS201", "Object Oriented Programming", 3.0, "CIS"),
            ("CIS301", "Data Structures", 3.0, "CIS"),
            ("CIS315", "Database for CIS", 3.0, "CIS"),
            ("MAT201", "Statistics for CIS", 2.0, "Math"),
            ("CIS102", "Structured Programming", 3.0, "CIS"),
        ]
        courses = {}
        for code, name, credits, dept in courses_data:
            course = session.exec(select(Course).where(Course.code == code)).first()
            if not course:
                course = Course(code=code, name=name, credit_hours=credits, department=dept)
                session.add(course)
                session.commit()
                session.refresh(course)
            courses[code] = course
        print(f"  Courses: {len(courses)} CIS courses ready.")

        # ── 4. Enrollments ────────────────────────────────────────────────────
        for email, p_obj in profiles.items():
            for code, course in courses.items():
                if email == "ahmed@diu.edu.bd":
                    q, m, f, grade, gp = 14.5, 38.0, 39.5, "A+", 4.00
                elif email == "john@diu.edu.bd":
                    if code == "CIS315": q, m, f, grade, gp = 14.0, 37.0, 38.0, "A+", 4.00
                    elif code == "CIS102": q, m, f, grade, gp = 5.0, 15.0, 10.0, "F", 0.00
                    else: q, m, f, grade, gp = 10.0, 28.0, 32.0, "B", 3.00
                elif email == "sarah@diu.edu.bd":
                    q, m, f, grade, gp = 8.0, 20.0, 22.0, "C+", 2.50
                else: # Kevin
                    q, m, f, grade, gp = 4.0, 12.0, 10.0, "F", 0.00

                session.add(Enrollment(
                    student_id=p_obj.id, course_id=course.id, semester="Spring 2026",
                    is_current=True, quiz_mark=q, mid_mark=m, final_mark=f,
                    grade=grade, grade_point=gp
                ))
        session.commit()
        print("  Enrollments: Registered all 4 students.")

        # ── 5. Schedule ───────────────────────────────────────────────────────
        schedule_data = [
            ("CIS101","Sunday",    "08:00 AM","09:30 AM","AB1-302","Dr. Rahim"),
            ("CIS201","Sunday",    "10:00 AM","11:30 AM","AB1-405","Ms. Sultana"),
            ("CIS315","Monday",    "08:00 AM","09:30 AM","AB1-501","Dr. Karim"),
            ("CIS102","Monday",    "10:00 AM","11:30 AM","AB1-202","Mr. Kamal"),
        ]
        for email, p_obj in profiles.items():
            for code, day, start, end, room, faculty in schedule_data:
                session.add(Schedule(
                    course_id=courses[code].id, day=day, start_time=start, 
                    end_time=end, room=room, faculty=faculty, semester="Spring 2026"
                ))
        session.commit()
        print("  Schedules: Created for all 4 students.")

        # ── 6. Attendance ─────────────────────────────────────────────────────
        attendance_data = [
            ("CIS101", 20, 17), ("CIS201", 18, 16), ("CIS315", 16, 15), ("CIS102", 18, 10)
        ]
        for email, p_obj in profiles.items():
            for code, held, att in attendance_data:
                actual_att = att if "ahmed" in email or "john" in email else att - 6
                session.add(AttendanceRecord(
                    student_id=p_obj.id, course_id=courses[code].id, semester="Spring 2026",
                    classes_held=held, classes_attended=max(0, actual_att)
                ))
        session.commit()
        print("  Attendance: Records synced for all 4 students.")

        # ── 7. Fee Payments ───────────────────────────────────────────────────
        for email, p_obj in profiles.items():
            session.add(FeePayment(
                student_id=p_obj.id, semester="Spring 2026",
                amount_due=45000, amount_paid=15000 if "kevin" not in email else 5000,
                due_date="2026-05-15", status="pending", remarks="Tuition"
            ))
            session.add(FeePayment(
                student_id=p_obj.id, semester="Fall 2025",
                amount_due=40000, amount_paid=40000, due_date="2025-09-30", status="paid"
            ))
        session.commit()
        print("  Fees: Financial records synced.")

    print("\nSEEDING COMPLETE! 4 Demo personas are live.")
    print("-------------------------------------------------")
    print("1. Ahmed Hassan (ahmed@diu.edu.bd) - Top Grade")
    print("2. John Doe     (john@diu.edu.bd)  - Mixed Grade")
    print("3. Sarah Connor (sarah@diu.edu.bd) - Low Grade")
    print("4. Kevin Mitnick (kevin@diu.edu.bd) - Failing/Probation")
    print("-------------------------------------------------")

if __name__ == "__main__":
    seed()