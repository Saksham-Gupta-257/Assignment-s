from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.products import models, schemas
from app.middlewares.dependencies import require_roles
from app.auth.models import UserRole
from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate

router = APIRouter(prefix="/admin/products", tags=["admin_products"])

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.ProductOut)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.admin]))):
    existing_product = db.query(models.Product).filter(models.Product.name == product.name).first()
    if existing_product:
        raise HTTPException(status_code=400, detail="Product with this name already exists")
    db_product = models.Product(
        name=product.name,
        admin_id=current_user.id,
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
    query = query.filter(models.Product.admin_id == current_user.id)
    return paginate(query, params)

@router.get("/{product_id}", response_model=schemas.ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.admin]))):
    
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.admin_id != current_user.id:
        raise HTTPException(status_code=403, detail="Product is not listed under this admin, Please add this in your listing")
    return product

@router.put("/{product_id}", response_model=schemas.ProductOut)
def update_product(product_id: int, updated: schemas.ProductUpdate, db: Session = Depends(get_db),current_user=Depends(require_roles([UserRole.admin]))):
    
    product = db.query(models.Product).filter(models.Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if product.admin_id != current_user.id:
        raise HTTPException(status_code=403, detail="Product is not listed under this admin, Please add this in your listing")
    
    update_data = updated.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.admin]))):
    
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.admin_id != current_user.id:
        raise HTTPException(status_code=403, detail="Product is not listed under this admin, Please add this in your listing")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}