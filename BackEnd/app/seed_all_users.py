import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlmodel import Session, select
from db.session import engine
from models.db_models import (
    User, StudentProfile, Course,
    Enrollment, Schedule, AttendanceRecord, FeePayment
)
import random

def seed_missing_profiles():
    print("Scanning for users without profiles...")
    with Session(engine) as session:
        # 1. Get all users
        users = session.exec(select(User)).all()
        
        # 2. Get all courses
        courses = session.exec(select(Course)).all()
        if not courses:
            print("No courses found. Please run seed_student_data.py first.")
            return

        mock_marks = {
            "CSE301": (12.0, 35.0, 38.0),
            "CSE315": (14.0, 32.0, 36.0),
            "CSE325": (13.0, 30.0, 35.0),
            "CSE341": (11.0, 28.0, 32.0),
            "MAT201": (5.0, 15.0, 20.0), # Weak subject
            "ENG201": (14.0, 34.0, 37.0),
        }

        for user in users:
            # Check if profile exists
            profile = session.exec(
                select(StudentProfile).where(StudentProfile.user_id == user.id)
            ).first()
            
            if profile:
                print(f"  User {user.full_name} ({user.email}) already has a profile.")
                continue
            
            print(f"  Creating mock data for {user.full_name} ({user.email})...")
            
            # Create Profile
            profile = StudentProfile(
                user_id           = user.id,
                student_id        = f"221-15-{random.randint(1000, 9999)}",
                program           = "B.Sc. in CSE",
                department        = "CSE",
                batch             = "55",
                semester          = 6,
                current_year      = 3,
                cgpa              = round(random.uniform(3.2, 3.9), 2),
                credits_completed = 87,
                credits_required  = 136,
            )
            session.add(profile)
            session.commit()
            session.refresh(profile)
            
            # Create Enrollments
            for course in courses:
                quiz, mid, final = mock_marks.get(course.code, (10.0, 25.0, 30.0))
                # Randomize marks slightly for variety
                quiz += round(random.uniform(-1, 1), 1)
                mid += round(random.uniform(-2, 2), 1)
                final += round(random.uniform(-3, 3), 1)
                
                enrollment = Enrollment(
                    student_id = profile.id,
                    course_id  = course.id,
                    semester   = "Spring 2026",
                    is_current = True,
                    quiz_mark  = max(0, quiz),
                    mid_mark   = max(0, mid),
                    final_mark = max(0, final),
                )
                session.add(enrollment)
                
                # Create Attendance
                held = random.randint(15, 25)
                attended = int(held * random.uniform(0.6, 0.95))
                attendance = AttendanceRecord(
                    student_id=profile.id,
                    course_id=course.id,
                    semester="Spring 2026",
                    classes_held=held,
                    classes_attended=attended,
                )
                session.add(attendance)

            # Create Fee Payment
            fee = FeePayment(
                student_id=profile.id,
                semester="Spring 2026",
                amount_due=25000,
                amount_paid=12500,
                due_date="2026-01-31",
                status="pending",
                remarks="Mock payment generated",
            )
            session.add(fee)
            
            session.commit()
            print(f"    Done.")

    print("\nAll users now have mock profiles and data.")

if __name__ == "__main__":
    seed_missing_profiles()
