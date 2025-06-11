from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.core.database import Base
from sqlalchemy.orm import relationship
from app.auth.models import User
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    admin_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    description = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    category_id = Column(Integer, nullable=False)
    image_url = Column(String, nullable=True)

    cart_items = relationship("Cart", back_populates="product", cascade="all, delete-orphan")
    admin = relationship("User", back_populates="product")