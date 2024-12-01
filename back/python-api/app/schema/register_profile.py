from pydantic import BaseModel

class RegisterProfile(BaseModel):
    userId: int
    surname: str
    name: str
    patronymic: str
    phoneNumber: str