from pydantic import BaseModel

class CreateOrder(BaseModel):
    productId: int
    userId: int