from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.checkout import schemas
from app.orders import models as order_models
from app.cart import models as cart_models
from app.products import models as product_models
from app.middlewares.dependencies import require_roles
from app.auth.models import UserRole
from app.core.database import SessionLocal, engine, Base
from decimal import Decimal

router = APIRouter(prefix="/checkout", tags=["checkout"])

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.CheckoutResponse)
def checkout(db: Session = Depends(get_db), current_user=Depends(require_roles([UserRole.user]))):
    cart_items = db.query(cart_models.Cart).filter(cart_models.Cart.user_id == current_user.id).all()
    
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    total_amount = Decimal('0.00')
    order_items_data = []
    
    for cart_item in cart_items:
        product = db.query(product_models.Product).filter(product_models.Product.id == cart_item.product_id).first()
        
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with id {cart_item.product_id} not found")
        if product.stock < cart_item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for product {product.name}. Available: {product.stock}, Requested: {cart_item.quantity}")
        
        subtotal = Decimal(str(product.price)) * cart_item.quantity
        total_amount += subtotal
        
        order_items_data.append({
            'product_id': cart_item.product_id,
            'quantity': cart_item.quantity,
            'price_at_purchase': Decimal(str(product.price)),
            'product': product
        })
    
    new_order = order_models.Order(
        user_id=current_user.id,
        total_amount=total_amount,
        status=order_models.OrderStatus.paid
    )
    db.add(new_order)
    db.flush()
    
    for item_data in order_items_data:
        order_item = order_models.OrderItem(
            order_id=new_order.id,
            product_id=item_data['product_id'],
            quantity=item_data['quantity'],
            price_at_purchase=item_data['price_at_purchase']
        )
        db.add(order_item)
        
        item_data['product'].stock -= item_data['quantity']
    
    db.query(cart_models.Cart).filter(cart_models.Cart.user_id == current_user.id).delete()
    
    db.commit()
    db.refresh(new_order)
    
    return schemas.CheckoutResponse(
        message="Payment successful! Your order has been placed.",
        order=new_order
    )