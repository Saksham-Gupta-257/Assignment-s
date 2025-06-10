from pydantic import ValidationError
from pydantic_settings import BaseSettings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    DATABASE_URL: str 
    
    SECRET_KEY: str 
    ALGORITHM: str 
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    # ACCESS_TOKEN_EXPIRE_SECONDS: int
    REFRESH_TOKEN_EXPIRE_DAYS: int
    
    # Email
    EMAIL_HOST: str 
    EMAIL_PORT: int 
    EMAIL_USER: str 
    EMAIL_PASSWORD: str 

    class Config:
        env_file = ".env"

try:
    settings = Settings()
    logger.info("Configuration loaded successfully")
except ValidationError as e:
    logger.error(f"Invalid configuration: {e}")
    raise
except Exception as e:
    logger.error(f"Failed to load configuration: {e}")
    raise