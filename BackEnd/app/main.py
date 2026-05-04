# Chloris Backend - V3 Hardened (Front-Line Empathy + Solutions Engine V2) 🥀🤍🚀
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from db.session import init_db
from api.v1.api import api_router

# 1. App setup
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Backend for Chloris"
)

# 2. CORS - allowing frontend to connect
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. DB init on startup
@app.on_event("startup")
def on_startup():
    print("*****************************************")
    print("*** CHLORIS RELOADED: USING GEMINI 2.0 ***")
    print("*****************************************")
    init_db()
    print("--- DB ready ---")

# 4. Routes
app.include_router(api_router, prefix=settings.API_V1_STR)

# 5. Health check
@app.get("/")
def read_root():
    return {
        "status": "active",
        "message": "Chloris AI is online",
        "docs": "http://127.0.0.1:8000/docs"
    }