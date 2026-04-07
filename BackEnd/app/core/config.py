import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str
    API_V1_STR: str = "/api/v1"

    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    DATABASE_URL: str
    GOOGLE_API_KEY: str

    class Config:
        # Find .env relative to this file — works from any working directory
        env_file = os.path.join(os.path.dirname(__file__), "..", ".env")
        case_sensitive = True

settings = Settings()