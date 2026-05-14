from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime


# ── User (Auth) ───────────────────────────────────────────────────────────────
class User(SQLModel, table=True):
    __tablename__ = "users"

    id:              Optional[int]  = Field(default=None, primary_key=True)
    full_name:       str
    email:           str            = Field(unique=True, index=True)
    hashed_password: str
    is_active:       bool           = Field(default=True)
    created_at:      datetime       = Field(default_factory=datetime.utcnow)

    profile: Optional["StudentProfile"] = Relationship(back_populates="user")


# ── Student Profile ───────────────────────────────────────────────────────────
class StudentProfile(SQLModel, table=True):
    __tablename__ = "student_profiles"

    id:                Optional[int] = Field(default=None, primary_key=True)
    user_id:           int           = Field(foreign_key="users.id", unique=True)
    student_id:        str           = Field(unique=True, index=True)
    program:           str
    department:        str
    batch:             str
    semester:          int
    cgpa:              float         = Field(default=0.0)
    credits_completed: int           = Field(default=0)
    credits_required:  int           = Field(default=136)

    user:        Optional["User"]              = Relationship(back_populates="profile")
    enrollments: List["Enrollment"]            = Relationship(back_populates="student")
    attendance:  List["AttendanceRecord"]      = Relationship(back_populates="student")
    fee_payments:List["FeePayment"]            = Relationship(back_populates="student")


# ── Course ────────────────────────────────────────────────────────────────────
class Course(SQLModel, table=True):
    __tablename__ = "courses"

    id:           Optional[int] = Field(default=None, primary_key=True)
    code:         str           = Field(unique=True, index=True)
    name:         str
    credit_hours: float         = Field(default=3.0)
    department:   str
    description:  Optional[str] = Field(default=None)

    enrollments: List["Enrollment"]       = Relationship(back_populates="course")
    schedules:   List["Schedule"]         = Relationship(back_populates="course")
    attendance:  List["AttendanceRecord"] = Relationship(back_populates="course")


# ── Enrollment ────────────────────────────────────────────────────────────────
class Enrollment(SQLModel, table=True):
    __tablename__ = "enrollments"

    id:          Optional[int]   = Field(default=None, primary_key=True)
    student_id:  int             = Field(foreign_key="student_profiles.id")
    course_id:   int             = Field(foreign_key="courses.id")
    semester:    str
    grade:       Optional[str]   = Field(default=None)
    grade_point: Optional[float] = Field(default=None)
    is_current:  bool            = Field(default=True)

    student: Optional["StudentProfile"] = Relationship(back_populates="enrollments")
    course:  Optional["Course"]         = Relationship(back_populates="enrollments")


# ── Schedule ──────────────────────────────────────────────────────────────────
class Schedule(SQLModel, table=True):
    __tablename__ = "schedules"

    id:         Optional[int] = Field(default=None, primary_key=True)
    course_id:  int           = Field(foreign_key="courses.id")
    day:        str
    start_time: str
    end_time:   str
    room:       str
    faculty:    str
    semester:   str

    course: Optional["Course"] = Relationship(back_populates="schedules")


# ── Attendance Record ─────────────────────────────────────────────────────────
class AttendanceRecord(SQLModel, table=True):
    __tablename__ = "attendance_records"

    id:               Optional[int] = Field(default=None, primary_key=True)
    student_id:       int           = Field(foreign_key="student_profiles.id")
    course_id:        int           = Field(foreign_key="courses.id")
    semester:         str
    classes_held:     int           = Field(default=0)
    classes_attended: int           = Field(default=0)

    student: Optional["StudentProfile"] = Relationship(back_populates="attendance")
    course:  Optional["Course"]         = Relationship(back_populates="attendance")

    @property
    def percentage(self) -> float:
        if self.classes_held == 0:
            return 0.0
        return round((self.classes_attended / self.classes_held) * 100, 1)

    @property
    def status(self) -> str:
        pct = self.percentage
        if pct >= 75:   return "Good"
        elif pct >= 60: return "Warning"
        return "Critical — at risk of being barred"


# ── Fee Payment ───────────────────────────────────────────────────────────────
class FeePayment(SQLModel, table=True):
    __tablename__ = "fee_payments"

    id:           Optional[int]   = Field(default=None, primary_key=True)
    student_id:   int             = Field(foreign_key="student_profiles.id")
    semester:     str
    amount_due:   float
    amount_paid:  float           = Field(default=0.0)
    due_date:     str
    paid_date:    Optional[str]   = Field(default=None)
    status:       str             = Field(default="pending")
    remarks:      Optional[str]   = Field(default=None)

    student: Optional["StudentProfile"] = Relationship(back_populates="fee_payments")

    @property
    def balance(self) -> float:
        return round(self.amount_due - self.amount_paid, 2)