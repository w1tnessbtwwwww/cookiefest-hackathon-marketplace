from sqlalchemy import ForeignKey
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column


class ProductMerchants(Base):
    __tablename__ = "product_merchants"
    productMerchantsId: Mapped[int] = mapped_column(primary_key=True)
    productId: Mapped[int] = mapped_column(ForeignKey("items.productId"))
    merchantId: Mapped[int] = mapped_column(ForeignKey("merchants.merchantId"))