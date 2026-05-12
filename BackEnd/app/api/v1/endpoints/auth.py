from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select
from db.session import get_session # We assume this exists
from core.security import create_access_token, verify_password, get_password_hash
from core.config import settings
from models.user import User
from jose import jwt, JWTError

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

# --- Dependency: Get Current User ---
# This acts as the "Bouncer". It checks the token before letting users into protected routes.
async def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = session.get(User, int(user_id))
    if user is None:
        raise credentials_exception
    return user

# --- Routes ---

@router.post("/signup", response_model=User)
def create_user(user_in: User, session: Session = Depends(get_session)) -> Any:
    """
    Create new user (Student Registration)
    """
    # 1. Check if email already exists
    statement = select(User).where(User.email == user_in.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # 2. Hash password and save
    user_in.hashed_password = get_password_hash(user_in.hashed_password)
    session.add(user_in)
    session.commit()
    session.refresh(user_in)
    return user_in

@router.post("/login")
def login_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    session: Session = Depends(get_session)
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    # 1. Find user by email
    statement = select(User).where(User.email == form_data.username)
    user = session.exec(statement).first()
    
    # 2. Verify password
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    # 3. Generate Token
    return {
        "access_token": create_access_token(subject=user.id),
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "department": user.department
        }
    }