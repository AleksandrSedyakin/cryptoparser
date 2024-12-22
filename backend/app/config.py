from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    API_KEY: str = os.getenv("CMC_API_KEY")
    CMC_BASE_URL: str = "https://pro-api.coinmarketcap.com/v1"
    DOMAIN: str = os.getenv("DOMAIN", "localhost")
    CORS_ORIGINS: list = [
        "http://localhost:3000",  # React dev server
        "http://localhost",       # Production domain
        "http://localhost:80",    # Production domain with port
    ]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if self.DOMAIN and self.DOMAIN != "localhost":
            self.CORS_ORIGINS.extend([
                f"http://{self.DOMAIN}",
                f"https://{self.DOMAIN}"
            ])

settings = Settings()
