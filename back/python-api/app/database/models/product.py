from sqlalchemy import BigInteger, ForeignKey, String
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column

class Product(Base):
    __tablename__ = "items"
    productId: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    title: Mapped[str] = mapped_column(nullable=True)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    articul: Mapped[int] = mapped_column(nullable=True)
    quantity: Mapped[int] = mapped_column(nullable=True)
    price: Mapped[int] = mapped_column(nullable=True)
    salePrice: Mapped[int] = mapped_column(nullable=True)
    sale: Mapped[int] = mapped_column(nullable=True)
    merchantId: Mapped[int] = mapped_column(BigInteger, ForeignKey("merchants.merchantId"), nullable=True)
    url: Mapped[str] = mapped_column(nullable=True)
    rating: Mapped[float] = mapped_column(nullable=True)
    reviews: Mapped[int] = mapped_column(nullable=True)