from sqlmodel import SQLModel, Session, create_engine
from core.config import settings

# 1. Setup the Engine
# We add a check: if you are using SQLite, we need specific arguments to prevent threading errors.
connect_args = {"check_same_thread": False} if "sqlite" in str(settings.DATABASE_URL) else {}

engine = create_engine(str(settings.DATABASE_URL), connect_args=connect_args)

# 2. Define the Session Getter (The tool 'bookings.py' is looking for)
def get_session():
    """
    Dependency that provides a database session to the API endpoints.
    """
    with Session(engine) as session:
        yield session

# 3. Define the Database Initializer
def init_db():
    """
    Creates the database tables if they don't exist yet.
    """
    SQLModel.metadata.create_all(engine)