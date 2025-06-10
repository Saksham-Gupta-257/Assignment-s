from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import HTTPException
from app.core.config import settings


SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
# ACCESS_TOKEN_EXPIRE_SECONDS = settings.ACCESS_TOKEN_EXPIRE_SECONDS
REFRESH_EXPIRE_DAYS = settings.REFRESH_TOKEN_EXPIRE_DAYS

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    # expire = datetime.now(timezone.utc) + (expires_delta or timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS))
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"type": "access_token"})
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(days=REFRESH_EXPIRE_DAYS))
    to_encode.update({"type": "refresh_token"})
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def is_token_valid(token: str) -> bool:
    try:
        payload = decode_token(token)
        if payload.get("type") != "access_token":
            print("Invalid token type")
            raise HTTPException(status_code=401, detail="Invalid token type")
            return False
        payload = jwt.get_unverified_claims(token)
        exp = payload.get("exp")
        if exp is None:
            return True
        return datetime.now(timezone.utc) > datetime.fromtimestamp(exp, tz=timezone.utc)
    except JWTError:
        return True
    
def verify_refresh_token(token: str) -> Optional[dict]:
    try:
        payload = decode_token(token)
        if payload.get("type") != "refresh_token":
            print("Invalid token type")
            return None
        return payload
    except JWTError:
        return None