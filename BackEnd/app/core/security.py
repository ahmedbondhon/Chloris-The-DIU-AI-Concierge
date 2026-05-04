from datetime import datetime, timedelta
from typing import Optional, Any, Union
from jose import jwt # library: python-jose
import bcrypt # library: bcrypt
from core.config import settings

# Removal of passlib due to compatibility issues with Python 3.13

def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """
    Generates a JWT Token (The 'Badge' users carry after logging in)
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Checks if the password user typed matches the hash in DB
    """
    try:
        return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    """
    Hashes a password before saving to DB
    """
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()