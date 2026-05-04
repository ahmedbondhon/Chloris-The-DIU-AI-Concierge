import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlmodel import Session, select
from db.session import engine
from models.db_models import User
from core.security import verify_password
import bcrypt

def check():
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == 'john@diu.edu.bd')).first()
        if not user:
            print("ERROR: User 'john@diu.edu.bd' not found in database.")
            return
        
        print(f"User: {user.full_name} ({user.email})")
        print(f"Hash in DB: {user.hashed_password}")
        
        # Test 1: Raw bcrypt check
        try:
            raw_match = bcrypt.checkpw("demo1234".encode(), user.hashed_password.encode())
            print(f"Raw bcrypt match: {raw_match}")
        except Exception as e:
            print(f"Raw bcrypt error: {e}")
            
        # Test 2: App verify_password check
        try:
            app_match = verify_password("demo1234", user.hashed_password)
            print(f"App verify_password match: {app_match}")
        except Exception as e:
            print(f"App verify_password error: {e}")

if __name__ == "__main__":
    check()
