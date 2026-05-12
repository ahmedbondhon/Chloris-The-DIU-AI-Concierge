from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from core.database import get_session
from models.booking import Booking
from models.user import User
from schemas.booking import BookingCreate, BookingRead
from .auth import get_current_user # Import the "Bouncer"

router = APIRouter()

@router.get("/", response_model=List[BookingRead])
def read_bookings(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all bookings for the current logged-in user.
    """
    # Python Magic: specific to the user thanks to the relationship
    return current_user.bookings

@router.post("/", response_model=BookingRead)
def create_booking(
    booking_in: BookingCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new booking. The system automatically assigns it to the current user.
    """
    # 1. Create DB Model from Schema
    booking = Booking.model_validate(booking_in)
    
    # 2. Assign Owner
    booking.user_id = current_user.id
    booking.status = "confirmed" # Auto-confirm for demo purposes
    
    # 3. Save to DB
    session.add(booking)
    session.commit()
    session.refresh(booking)
    return booking