from sqlalchemy import BigInteger, ForeignKey, String
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column

class Merchant(Base):
    __tablename__ = "merchants"
    merchantId: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    billingAddress: Mapped[str] = mapped_column(nullable=True)