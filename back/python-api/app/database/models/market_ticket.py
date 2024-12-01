import datetime
from sqlalchemy import Date, ForeignKey
from .base import Base

from sqlalchemy.orm import Mapped, mapped_column


class MarketTicket(Base):
    __tablename__ = "market_tickets"
    marketTicketId: Mapped[int] = mapped_column(primary_key=True)
    userId: Mapped[int] = mapped_column(ForeignKey("users.userId"))
    report: Mapped[str] = mapped_column()
    created: Mapped[Date] = mapped_column(Date, default=datetime.date.today(), nullable=True)