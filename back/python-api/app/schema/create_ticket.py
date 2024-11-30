from pydantic import BaseModel

class CreateTicket(BaseModel):
    userId: int
    report: str