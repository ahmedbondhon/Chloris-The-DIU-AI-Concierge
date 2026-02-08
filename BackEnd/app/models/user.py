from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

# 👇 Add this block so VS Code knows what "Booking" and "Ticket" are
if TYPE_CHECKING:
    from .booking import Booking
    from .ticket import Ticket

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    full_name: str
    hashed_password: str
    
    role: str = Field(default="student")
    department: Optional[str] = None
    
    # Relationships
    bookings: List["Booking"] = Relationship(back_populates="user")
    
    # 👇 FIXED: Changed "Tiket" to "Ticket"
    tickets: List["Ticket"] = Relationship(back_populates="user")