from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from db.session import init_db
from api.v1.api import api_router

# 1. Initialize the App
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Backend API for Chloris - The AI University Concierge"
)

# 2. CORS Configuration (The "Security Guard")
# This section allows your React Frontend (port 5173) to talk to this Backend.
origins = [
    "http://localhost:5173",    # Vite Localhost
    "http://127.0.0.1:5173",    # Vite IP Address
    "http://localhost:3000",    # Backup
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],        # Allow all types of requests (POST, GET, etc.)
    allow_headers=["*"],        # Allow all headers (Login tokens, etc.)
)

# 3. Startup Event (Database Check)
@app.on_event("startup")
def on_startup():
    print("--------------------------------")
    print("🚀  Chloris Backend Starting...")
    print("📂  Checking database tables...")
    init_db()
    print("✅  Database is ready!")
    print("--------------------------------")

# 4. Connect the Routes (Chat, Auth, Bookings)
app.include_router(api_router, prefix=settings.API_V1_STR)

# 5. Root Endpoint (Health Check)
@app.get("/")
def read_root():
    return {
        "status": "active",
        "message": "Welcome to Chloris AI Backend!",
        "docs_url": "http://127.0.0.1:8000/docs"
    }