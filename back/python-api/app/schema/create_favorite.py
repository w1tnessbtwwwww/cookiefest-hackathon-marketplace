from pydantic import BaseModel

class CreateFavorite(BaseModel):
    userId: int
    productId: int