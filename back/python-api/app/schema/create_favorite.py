from pydantic import BaseModel

class CreateFavorite(BaseModel):
    userId: int
    articul: int