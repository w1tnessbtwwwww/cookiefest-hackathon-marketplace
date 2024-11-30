from .base import Base
from sqlalchemy.orm import Mapped, mapped_column

class ProductCategory(Base):
    __tablename__ = "product_categories"

    productCategoryId: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()