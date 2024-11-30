from sqlalchemy import ForeignKey, String
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column

class UserProfile(Base):
    __tablename__ = "user_profile"
    userProfileID: Mapped[int] = mapped_column(primary_key=True)
    surname: Mapped[str] = mapped_column()
    name: Mapped[str] = mapped_column()
    patronymic: Mapped[str] = mapped_column()
    phoneNumber: Mapped[str] = mapped_column(String(20))
    userId: Mapped[int] = mapped_column(ForeignKey("users.userId"))
