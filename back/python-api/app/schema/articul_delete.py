from pydantic import BaseModel

class ArticulDelete(BaseModel):
    articul: int
    userId: int