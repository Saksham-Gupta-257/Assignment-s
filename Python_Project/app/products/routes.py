from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.products import models, schemas
from app.middlewares.dependencies import require_roles
from app.auth.models import UserRole
from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate
from app.middlewares.dependencies import require_roles

router = APIRouter(prefix="/admin/products", tags=["admin_products"])

# Create tables
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.ProductOut)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.admin]))):
    db_product = models.Product(
        name=product.name,
        description=product.description,
        price=product.price,
        stock=product.stock,
        category_id=product.category_id,
        image_url=product.image_url
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/", response_model=Page[schemas.ProductOut])
def get_products(params: Params = Depends(), db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.admin]))):
    query = db.query(models.Product)
    return paginate(query, params)