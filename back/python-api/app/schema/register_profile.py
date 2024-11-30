from pydantic import BaseModel

class RegisterProfile(BaseModel):
    surname: str
    name: str
    patronymic: str
    phoneNumber: str