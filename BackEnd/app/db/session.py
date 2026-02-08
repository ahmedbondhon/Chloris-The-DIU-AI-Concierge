from sqlmodel import create_engine, Session, SQLModel
from core.config import settings

# 1. Logic to handle SQLite vs Postgres differences
# SQLite needs "check_same_thread": False, but Postgres hates that argument.
connect_args = {}
if "sqlite" in settings.DATABASE_URL:
    connect_args["check_same_thread"] = False

# 2. Create the Engine
engine = create_engine(
    settings.DATABASE_URL, 
    echo=True, # Set to False in production to reduce logs
    connect_args=connect_args
)

# 3. Initialization Function (Creates tables)
def init_db():
    SQLModel.metadata.create_all(engine)

# 4. Dependency for FastAPI
# This allows endpoints to ask for a "session" easily
def get_session():
    with Session(engine) as session:
        yield session