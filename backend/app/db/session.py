from sqlmodel import create_engine, Session, SQLModel
from core.config import settings

connect_args = {}
if "sqlite" in settings.DATABASE_URL:
    connect_args["check_same_thread"] = False

engine = create_engine(
    settings.DATABASE_URL,
    echo=True,
    connect_args=connect_args
)

def init_db():
    # Import all models here so SQLModel sees them before creating tables
    import models.db_models  # ← ADD THIS LINE — critical for table creation
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session