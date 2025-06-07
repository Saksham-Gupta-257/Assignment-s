from fastapi import Depends, FastAPI
from app.core.database import Base, engine
from app.auth.routes import router as auth_router
from app.auth.dependencies import get_current_user
from app.auth.dependencies import require_roles
from app.auth.models import UserRole
from app.auth.models import User

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "E-commerce backend up and running!"}

# Create tables when app starts
Base.metadata.create_all(bind=engine)

app.include_router(auth_router)

@app.get("/profile")
def get_profile(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }

@app.get("/admin-only")
def admin_route(current_user: User = Depends(require_roles([UserRole.admin]))):
    return {
        "message": f"Welcome, admin {current_user.name}!"
    }