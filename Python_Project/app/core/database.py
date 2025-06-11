from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

DATABASE_URL = settings.DATABASE_URL

try: 
    engine = create_engine(DATABASE_URL)
    logger.info("Database Connected!")
except Exception:
    logger.error("Can not connect with database")
    raise

try: 
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    logger.info("Session Created Successfully")
except Exception:
    logger.error("Can not create session")
    raise
Base = declarative_base()
