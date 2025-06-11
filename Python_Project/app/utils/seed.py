from app.core.database import SessionLocal, engine, Base
from app.auth.models import User, UserRole
from app.products.models import Product
from app.auth.utils import get_password_hash

Base.metadata.create_all(bind=engine)

db = SessionLocal()

def seed_users():
    admin_one = db.query(User).filter(User.email == "admin1@gmail.com").first()
    if not admin_one:
        admin_one  = User(
            name="Admin1",
            email="admin1@gmail.com",
            hashed_password=get_password_hash("Password@123"),
            role=UserRole.admin
        )
        db.add(admin_one)

    admin_two = db.query(User).filter(User.email == "admin2@gmail.com").first()
    if not admin_two:
        admin_two  = User(
            name="Admin2",
            email="admin2@gmail.com",
            hashed_password=get_password_hash("Password@123"),
            role=UserRole.admin
        )
        db.add(admin_two)

    user_one = db.query(User).filter(User.email == "user1@gmail.com").first()
    if not user_one:
        user_one  = User(
            name="User1",
            email="user1@gmail.com",
            hashed_password=get_password_hash("Password@123"),
            role=UserRole.user
        )
        db.add(user_one)

    user_two= db.query(User).filter(User.email == "user2@gmail.com").first()
    if not user_two:
        user_two  = User(
            name="User2",
            email="user2@gmail.com",
            hashed_password=get_password_hash("Password@123"),
            role=UserRole.user
        )
        db.add(user_two)
    
    db.commit()
    print("Users data seeded successfully!")

def seed_products():
    products_data = [
        {
            "name": "Red Label",
            "admin_id": "1",
            "description": "Chai Patti",
            "price": "200",
            "stock": "100",
            "category_id": "2",
            "image_url": "url"
        },
        {
            "name": "Taj Mahal",
            "admin_id": "1",
            "description": "Expensive Chai Patti",
            "price": "300",
            "stock": "100",
            "category_id": "2",
            "image_url": "url"
        },
        {
            "name": "Fortune Besan",
            "admin_id": "1",
            "description": "100% Pure Chana Dal Besan",
            "price": "100",
            "stock": "100",
            "category_id": "2",
            "image_url": "url"
        },
        {
            "name": "Samsung S25 Ultra",
            "admin_id": "2",
            "description": "Samsung Flagship Smartphone",
            "price": "150000",
            "stock": "30",
            "category_id": "1",
            "image_url": "url"
        },
        {
            "name": "Samsung S25+",
            "admin_id": "2",
            "description": "Samsung Smartphone",
            "price": "110000",
            "stock": "30",
            "category_id": "1",
            "image_url": "url"
        },
        {
            "name": "Iphone 16 Pro Max",
            "admin_id": "2",
            "description": "Apple Flagship Smartphone",
            "price": "150000",
            "stock": "30",
            "category_id": "1",
            "image_url": "url"
        },
        {
            "name": "Moto Edge 50 Fusion",
            "admin_id": "2",
            "description": "Motorola  Smartphone",
            "price": "15000",
            "stock": "30",
            "category_id": "1",
            "image_url": "url"
        }
    ]

    for product_data in products_data:
        existing_product = db.query(Product).filter(Product.name == product_data["name"]).first()
        if not existing_product:
            product = Product(**product_data)
            db.add(product)
    
    db.commit()
    print("Products data seeded successfully!")

if __name__ == "__main__":
    seed_users()
    seed_products()
    print("Database seeded successfully!")