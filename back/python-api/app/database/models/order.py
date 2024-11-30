import datetime
from sqlalchemy import Date, ForeignKey
from .base import Base

from sqlalchemy.orm import Mapped, mapped_column

class Order(Base):
    __tablename__ = "orders"

    orderId: Mapped[int] = mapped_column(primary_key=True)
    
    productId: Mapped[int] = mapped_column(ForeignKey("items.productId"))
    userId: Mapped[int] = mapped_column(ForeignKey("users.userId"))
    orderedAt: Mapped[Date] = mapped_column(Date, default=datetime.date.today(), nullable=True)

