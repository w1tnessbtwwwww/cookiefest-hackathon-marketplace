from sqlalchemy import ForeignKey
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column

class UserProfile(Base):
    __tablename__ = "user_profile"
    userProfileId: Mapped[int] = mapped_column(primary_key=True)
    surname: Mapped[str] = mapped_column()
    name: Mapped[str] = mapped_column()
    patronymic: Mapped[str] = mapped_column()
    
    userId: Mapped[int] = mapped_column(ForeignKey("users.userId"))