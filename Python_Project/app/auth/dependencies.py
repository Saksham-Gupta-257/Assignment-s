from fastapi import Depends, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.auth.models import User
from app.utils.jwt import decode_token
from typing import List
from app.auth.models import UserRole

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/signin")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_id = int(payload.get("sub"))
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

def require_roles(allowed_roles: List[UserRole]):
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail=f"Access denied. Requires role(s): {', '.join(r.value for r in allowed_roles)}"
            )
        return current_user
    return role_checker