from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    stock: int
    category_id: int
    image_url: Optional[str] = None

class ProductOut(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int
    category_id: int
    image_url: Optional[str] = None

    class Config:
        orm_mode = True
        
class ProductOut(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int
    category_id: int
    image_url: Optional[str] = None

    class Config:
        orm_mode = True