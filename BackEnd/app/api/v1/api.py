from fastapi import APIRouter
# THIS IS THE FIX: We added "api." to the start of this line
from api.v1.endpoints import auth, chat, bookings

api_router = APIRouter()

# 1. /login and /signup
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

# 2. /chat (The AI)
api_router.include_router(chat.router, prefix="/chat", tags=["AI Chat"])

# 3. /bookings (Room reservations)
api_router.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])