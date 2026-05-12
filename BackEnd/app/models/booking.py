from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from .user import User  # Import User to define the relationship

class Booking(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Foreign Key: Which user made this booking?
    user_id: int = Field(foreign_key="user.id")
    
    # Resource Details
    resource_name: str  # e.g., "Discussion Room A", "Physics Lab"
    start_time: datetime
    end_time: datetime
    
    # "pending", "confirmed", "cancelled"
    status: str = Field(default="pending")
    
    # Relationship: Access the full User object from a booking
    user: Optional[User] = Relationship(back_populates="bookings")