from typing import List, Optional
from pydantic import BaseModel

# 1. Individual Message Object
class ChatMessage(BaseModel):
    role: str       # "user" or "assistant"
    content: str

# 2. The Request (Frontend -> Backend)
# The frontend sends the new message + the history so the AI has context
class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

# 3. The Response (Backend -> Frontend)
class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = [] # List of PDF pages or documents used