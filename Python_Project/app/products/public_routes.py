from fastapi import APIRouter, HTTPException, Depends, Response
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.products import models, schemas
from app.middlewares.dependencies import require_roles
from app.auth.models import UserRole
from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate
import math
from typing import Optional

router = APIRouter(prefix="/products", tags=["products"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=Page[schemas.ProductPublicOut])
def get_products(min_price:  float =  0.0, max_price: float = math.inf, category_id: int =  0, params: Params = Depends(), db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.user, UserRole.admin]))):
    if min_price < 0 or max_price < 0:
        raise HTTPException(status_code=400, detail="Price cannot be negative")
    
    query = db.query(models.Product)

    if min_price > 0:
        query = query.filter(models.Product.price >= min_price)
    
    if max_price != float("inf"):
        query = query.filter(models.Product.price <= max_price)

    if category_id < 0:
        raise HTTPException(status_code=400, detail="Category ID cannot be negative")
    
    if category_id > 0:
        query = query.filter(models.Product.category_id == category_id)

    return paginate(query, params)

@router.get("/search", response_model=Page[schemas.ProductPublicOut])
def search_products(keyword: str = None, params: Params = Depends(), db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.user, UserRole.admin]))):
    if keyword is None:
        products = db.query(models.Product)
        return paginate(products, params)
    products = db.query(models.Product).filter(models.Product.name.contains(keyword) | models.Product.description.contains(keyword))
    print(keyword)
    if not products:
        raise HTTPException(status_code=404, detail="No products found")
    return paginate(products, params)

@router.get("/{product_id}", response_model=schemas.ProductPublicOut)
def get_product(product_id: int, db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.user, UserRole.admin]))):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product