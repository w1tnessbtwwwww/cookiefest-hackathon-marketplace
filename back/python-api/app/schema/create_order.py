from pydantic import BaseModel

class CreateOrder(BaseModel):
    articul: int
    userId: int