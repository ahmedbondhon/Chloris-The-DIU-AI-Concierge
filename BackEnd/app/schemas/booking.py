from datetime import datetime
from typing import Optional
from pydantic import BaseModel

# 1. Base Schema (Shared fields)
class BookingBase(BaseModel):
    resource_name: str
    start_time: datetime
    end_time: datetime

# 2. Creation Schema (Input)
# The user doesn't set the ID or Status; the system does that.
class BookingCreate(BookingBase):
    pass 

# 3. Reading Schema (Output)
# When reading a booking, we need to see the ID and Status
class BookingRead(BookingBase):
    id: int
    user_id: int
    status: str