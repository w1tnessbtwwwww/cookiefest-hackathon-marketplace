import datetime
from sqlalchemy import Date
from .base import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column


class User(Base):
    __tablename__ = "users"
    userId: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column()
    password: Mapped[str] = mapped_column()
    registeredAt: Mapped[Date] = mapped_column(Date, default=datetime.date.today())
