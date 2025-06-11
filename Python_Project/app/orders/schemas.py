from pydantic import BaseModel
from typing import List
from decimal import Decimal
from app.orders.models import OrderStatus

class OrderItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    price_at_purchase: Decimal
    
    class Config:
        from_attributes = True

class OrderItemWithProduct(BaseModel):
    id: int
    product_id: int
    quantity: int
    price_at_purchase: Decimal
    product: dict
    
    class Config:
        from_attributes = True

class OrderOut(BaseModel):
    id: int
    user_id: int
    total_amount: Decimal
    status: OrderStatus
    
    class Config:
        from_attributes = True

class OrderWithItems(BaseModel):
    id: int
    user_id: int
    total_amount: Decimal
    status: OrderStatus
    order_items: List[OrderItemWithProduct]
    
    class Config:
        from_attributes = True