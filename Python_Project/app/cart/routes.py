from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.cart import schemas, models
from app.middlewares.dependencies import require_roles
from app.auth.models import UserRole
from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate
from app.core.database import SessionLocal, engine, Base
from app.products import models as product_models

router = APIRouter(prefix="/cart", tags=["user_cart"])

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.CartItemOut)
def add_to_cart(cart_item: schemas.CartItemCreate, db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.user]))):
    existing_procuct = db.query(product_models.Product).filter(product_models.Product.id == cart_item.product_id).first()
    if not existing_procuct:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if existing_procuct.stock == 0:
        raise HTTPException(status_code=400, detail="Product is out of stock")
    
    if cart_item.quantity > existing_procuct.stock:
        raise HTTPException(status_code=400, detail="Quantity not available in stock, Stock left: {}".format(existing_procuct.stock))
    
    existing_item = db.query(models.Cart).filter(models.Cart.user_id == current_user.id, models.Cart.product_id == cart_item.product_id).first()
    
    if existing_item:
        if existing_item.quantity > existing_procuct.stock:
            raise HTTPException(status_code=400, detail="Quantity exceeds available stock")
        existing_item.quantity += cart_item.quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item
    
    new_cart_item = models.Cart(
        user_id=current_user.id,
        product_id=cart_item.product_id,
        quantity=cart_item.quantity
    )
    db.add(new_cart_item)
    db.commit()
    db.refresh(new_cart_item)
    return new_cart_item

@router.get("/", response_model=Page[schemas.CartItemOut])
def get_cart_items(params: Params = Depends(), db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.user]))):
    query = db.query(models.Cart).filter(models.Cart.user_id == current_user.id)
    return paginate(query, params)

@router.delete("/{product_id}", response_model=schemas.CartItemOut)
def remove_from_cart(product_id: int, db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.user]))):

    existing_product = db.query(product_models.Product).filter(product_models.Product.id == product_id).first()
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")
                            
    cart_item = db.query(models.Cart).filter(models.Cart.user_id == current_user.id, models.Cart.product_id == product_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    if cart_item.quantity > 1:
        cart_item.quantity -= 1
        db.commit()
        db.refresh(cart_item)
        return cart_item
    
    db.delete(cart_item)
    db.commit()
    return cart_item

@router.put("/{product_id}", response_model=schemas.CartItemOut)
def update_cart_item(product_id: int, updated: schemas.CartItemUpdate, db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.user]))):

    existing_product = db.query(product_models.Product).filter(product_models.Product.id == product_id).first()
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    cart_item = db.query(models.Cart).filter(models.Cart.user_id == current_user.id, models.Cart.product_id == product_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    update_data = updated.dict(exclude_unset=True)
    for key, value in update_data.items():
        if key == "quantity" and value > existing_product.stock:
            raise HTTPException(status_code=400, detail="Quantity exceeds available stock")
        setattr(cart_item, key, value)

    db.commit()
    db.refresh(cart_item)
    return cart_item