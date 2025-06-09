from fastapi import APIRouter, HTTPException, Depends, Response
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.auth import models, schemas, utils
from app.utils.jwt import create_access_token, create_refresh_token
from app.auth.utils import verify_password, hash_password
from app.auth.utils import generate_reset_token, get_token_expiration
from app.auth.models import User, PasswordResetToken
from app.auth.schemas import ForgotPasswordRequest, ResetPasswordRequest
from app.utils.email import send_email
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])

# Create tables
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup", response_model=schemas.UserOut)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    if utils.is_strong_password(user.password) is False:
        raise HTTPException(status_code=400, detail="Password does not meet strength requirements, Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.")
    hashed_pw = utils.hash_password(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pw,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/signin")
def signin(credentials: schemas.LoginRequest,response: Response,  db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Create JWT token
    access_token = create_access_token(data={"sub": str(user.id), "role": user.role})
    refresh_token = create_refresh_token(data={"sub": str(user.id), "role": user.role})
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True, 
        samesite="Lax"
    )
    return {
        "message": "Sign in successful!",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }

@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    token = generate_reset_token()
    expiration = get_token_expiration()

    db_token = PasswordResetToken(
        user_id=user.id,
        token=token,
        expiration_time=expiration
    )

    db.add(db_token)
    db.commit()

    # Send email with token
    subject = "Reset Your Password"
    body = f"Hi {user.name},\n\nUse the following token to reset your password:\n\n{token}\n\nThis token is valid for 30 minutes."
    send_email(user.email, subject, body)

    return {"message": "Password reset token sent to your email."}

@router.post("/reset-password")
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    print("Received token:", req.token)

    token_only = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == req.token
    ).first()

    if not token_only:
        print("Token does not exist")
        raise HTTPException(status_code=400, detail="Invalid token")

    print("Token exists:", token_only.token)

    if token_only.used:
        print("Token has already been used")
        raise HTTPException(status_code=400, detail="Token already used")

    if token_only.expiration_time <= datetime.utcnow():
        print("Token has expired")
        raise HTTPException(status_code=400, detail="Token expired")

    print("Token is valid.")

    user = db.query(User).filter(User.id == token_only.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not utils.is_strong_password(req.new_password):
        raise HTTPException(status_code=400, detail="Password does not meet strength requirements. Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.")
    
    user.hashed_password = hash_password(req.new_password)
    token_only.used = True
    db.commit()

    return {"message": "Password reset successful"}
