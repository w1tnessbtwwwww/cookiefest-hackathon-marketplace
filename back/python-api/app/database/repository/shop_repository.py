from sqlalchemy.orm import Session
from ..abstract.abc_repo import AbstractRepository
from ..models.product import Product

class ShopRepository(AbstractRepository):
    model = Product

    def __init__(self, session: Session):
        self._session = session
