from fastapi import Depends, HTTPException, Response, Request
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.auth.models import User
from app.utils.jwt import decode_token
from typing import List
from app.auth.models import UserRole
from app.utils.jwt import is_token_valid, verify_refresh_token, create_access_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/signin")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(request: Request, response: Response, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_token(token)

    if payload and not is_token_valid(token):
        user_id = int(payload.get("sub"))
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    
    
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Access token expired and no refresh token available")
    
    
    refresh_payload = verify_refresh_token(refresh_token)
    if not refresh_payload:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
    
    
    user_id = int(refresh_payload.get("sub"))
    if payload and int(payload.get("sub")) != user_id:
        raise HTTPException(status_code=401, detail="Token and refresh token mismatch")
    
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    
    new_access_token = create_access_token( data={"sub": str(user.id), "role": user.role} )
    
    print("New access token created")
    response.headers["X-New-Access-Token"] = new_access_token
    
    return user

def require_roles(allowed_roles: List[UserRole]):
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException( status_code=403, detail=f"Access denied. Requires role(s): {', '.join(r.value for r in allowed_roles)}")
        return current_user
    return role_checker