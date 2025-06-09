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

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    category_id: Optional[int] = None
    image_url: Optional[str] = None

class ProductPublicOut(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int
    image_url: Optional[str] = None

    class Config:
        orm_mode = True