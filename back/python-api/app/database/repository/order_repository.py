from sqlalchemy import select
from ..abstract.abc_repo import AbstractRepository
from sqlalchemy.orm import Session
from ..models.order import Order
from ..models.item import Item

class OrderRepository(AbstractRepository):
    model = Order

    def __init__(self, session: Session):
        self._session = session

    async def get_by_filter_user(self, userId: int):
        query = (
            select(self.model, Item)
            .join(Item, self.model.productId == Item.productId)
            .where(self.model.userId == userId)
        )
        
        result = self._session.execute(query)
        return result.mappings().all()