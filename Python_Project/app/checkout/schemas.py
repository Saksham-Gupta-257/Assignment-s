from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal
from app.orders.models import OrderStatus

class OrderOut(BaseModel):
    id: int
    user_id: int
    total_amount: Decimal
    status: OrderStatus
    created_at: datetime
    
    class Config:
        from_attributes = True

class CheckoutResponse(BaseModel):
    message: str
    order: OrderOut
    
    class Config:
        from_attributes = True