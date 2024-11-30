from sqlalchemy import ForeignKey
from .base import Base
from sqlalchemy.orm import Mapped, mapped_column

class Favorite(Base):
    __tablename__ = "favorites"
    
    favoriteId: Mapped[int] = mapped_column(primary_key=True)

    userId: Mapped[int] = mapped_column(ForeignKey("users.userId"))

    productId: Mapped[int] = mapped_column(ForeignKey("items.productId"))
