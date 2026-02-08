from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from .user import User

class Ticket(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Foreign Key
    user_id: int = Field(foreign_key="user.id")
    
    # Issue Details
    category: str       # e.g., "IT Support", "Cleaning", "Exam Issue"
    description: str
    
    # "open", "in_progress", "resolved"
    status: str = Field(default="open")
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationship
    user: Optional[User] = Relationship(back_populates="tickets")