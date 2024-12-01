from pydantic_settings import BaseSettings
from yarl import URL

class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str

    API_BASE_PORT: int
    ELASTICSEARCH_KEYWORD: str

    class Config:
        env_file = ".env"

    @property
    def connection_string(self) -> URL:
        return URL.build (
            scheme="postgresql+psycopg2",
            host=self.database_hostname,
            port=int(self.database_port),
            user=self.database_username,
            password=self.database_password,
            path=f"/{self.database_name}"
        )

config = Settings()