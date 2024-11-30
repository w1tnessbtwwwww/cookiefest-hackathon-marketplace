from sqlalchemy import select
from ..abstract.abc_repo import AbstractRepository
from sqlalchemy.orm import Session
from ..models.order import Order

class OrderRepository(AbstractRepository):
    model = Order

    def __init__(self, session: Session):
        self._session = session