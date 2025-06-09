from pydantic import BaseModel, EmailStr
from enum import Enum

class RoleEnum(str, Enum):
    admin = "admin"
    user = "user"

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: RoleEnum = RoleEnum.user

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: RoleEnum

    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str



