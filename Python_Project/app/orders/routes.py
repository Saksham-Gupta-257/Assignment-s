from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.orders import schemas, models
from app.products import models as product_models
from app.middlewares.dependencies import require_roles
from app.auth.models import UserRole
from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate
from app.core.database import SessionLocal, engine, Base

router = APIRouter(prefix="/orders", tags=["orders"])

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=Page[schemas.OrderOut])
def get_order_history(params: Params = Depends(), db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.user]))):

    query = db.query(models.Order).filter(models.Order.user_id == current_user.id).order_by(desc(models.Order.created_at))
    
    return paginate(query, params)

@router.get("/{order_id}", response_model=schemas.OrderWithItems)
def get_order_details(order_id: int, db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.user]))):
    order = db.query(models.Order).filter(models.Order.id == order_id,models.Order.user_id == current_user.id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order_with_items = db.query(models.Order).filter(models.Order.id == order_id).first()
    
    order_items_with_products = []
    for order_item in order_with_items.order_items:
        product = db.query(product_models.Product).filter(product_models.Product.id == order_item.product_id).first()
        
        order_item_dict = {
            'id': order_item.id,
            'product_id': order_item.product_id,
            'quantity': order_item.quantity,
            'price_at_purchase': order_item.price_at_purchase,
            'product': {
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'stock': product.stock
            } if product else None
        }
        order_items_with_products.append(order_item_dict)
    
    return schemas.OrderWithItems(
        id=order_with_items.id,
        user_id=order_with_items.user_id,
        total_amount=order_with_items.total_amount,
        status=order_with_items.status,
        created_at=order_with_items.created_at,
        order_items=order_items_with_products
    )