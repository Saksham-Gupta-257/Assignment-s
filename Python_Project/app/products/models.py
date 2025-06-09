from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base
from enum import Enum
from sqlalchemy.orm import relationship
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    category_id = Column(Integer, nullable=False)
    image_url = Column(String, nullable=True)

    cart_items = relationship("Cart", back_populates="product")