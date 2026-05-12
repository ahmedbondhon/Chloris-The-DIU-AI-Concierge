import os
from pydantic_settings import BaseSettings

_this_file = os.path.abspath(__file__)            # .../app/core/config.py
_core_dir  = os.path.dirname(_this_file)          # .../app/core/
_app_dir   = os.path.dirname(_core_dir)           # .../app/
_back_dir  = os.path.dirname(_app_dir)            # .../BackEnd/

# Find .env — check BackEnd/ first, then app/
_env_path = (
    os.path.join(_back_dir, ".env")
    if os.path.exists(os.path.join(_back_dir, ".env"))
    else os.path.join(_app_dir, ".env")
)

print(f"  [Config] Loading .env from: {_env_path}")

class Settings(BaseSettings):
    PROJECT_NAME: str
    API_V1_STR:   str = "/api/v1"
    SECRET_KEY:   str
    ALGORITHM:    str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DATABASE_URL:    str
    GOOGLE_API_KEY:  str

    class Config:
        env_file       = _env_path
        case_sensitive = True

settings = Settings()