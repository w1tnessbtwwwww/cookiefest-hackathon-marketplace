from pydantic import BaseModel
from enum import Enum

class TokenType(Enum):
    Bearer = "Bearer"
    Basic = "Basic"

class AccessToken(BaseModel):
    access_token: str
    token_type: TokenType