from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.products import models, schemas
from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate
import math

router = APIRouter(prefix="/products", tags=["products"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def _build_product_query(db: Session, min_price: float = 0.0, max_price: float = math.inf, category_id: int = 0, stock_flag: bool = True):
    query = db.query(models.Product)
    
    if min_price < 0 or max_price < 0:
        raise HTTPException(status_code=400, detail="Price cannot be negative")
    
    if min_price > 0:
        query = query.filter(models.Product.price >= min_price)
    
    if max_price != math.inf:
        query = query.filter(models.Product.price <= max_price)

    if category_id < 0:
        raise HTTPException(status_code=400, detail="Category ID cannot be negative")
    
    if category_id > 0:
        query = query.filter(models.Product.category_id == category_id)

    if stock_flag:
        query = query.filter(models.Product.stock > 0)
        
    return query

@router.get("/", response_model=Page[schemas.ProductPublicOut])
def get_products(min_price:  float =  0.0, max_price: float = math.inf, category_id: int =  0, stock_flag: bool = True, params: Params = Depends(), db: Session = Depends(get_db)):
    products  = _build_product_query(db, min_price, max_price, category_id, stock_flag)
    if not products:
        raise HTTPException(status_code=404, detail="No products found")
    return paginate(products, params)

@router.get("/search", response_model=Page[schemas.ProductPublicOut])
def search_products(min_price:  float =  0.0, max_price: float = math.inf, category_id: int =  0, stock_flag: bool = True, keyword: str = None, params: Params = Depends(), db: Session = Depends(get_db)):
    products  = _build_product_query(db, min_price, max_price, category_id, stock_flag)
    if keyword is None:
        products = _build_product_query(db, min_price, max_price, category_id, stock_flag)
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        return paginate(products, params)
    products = products.filter(models.Product.name.contains(keyword) | models.Product.description.contains(keyword))
    print(keyword)
    if not products:
        raise HTTPException(status_code=404, detail="No products found")

    return paginate(products, params)

@router.get("/{product_id}", response_model=schemas.ProductPublicOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product