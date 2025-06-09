from passlib.context import CryptContext
import uuid
from datetime import datetime, timedelta, timezone

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def is_strong_password(password: str) -> bool:
    has_upper = False
    has_lower = False
    has_digit = False
    has_special = False

    for c in password:
        if c.isupper():
            has_upper = True
        elif c.islower():
            has_lower = True
        elif c.isdigit():
            has_digit = True
        elif c in "!@#$%^&*_+":
            has_special = True

    if len(password) >= 8 and has_upper and has_lower and has_digit and has_special:
        return True
    else:
        return False
    
def generate_reset_token():
    return str(uuid.uuid4())

def get_token_expiration(minutes=30):
    return datetime.now(timezone.utc) + timedelta(minutes=minutes)