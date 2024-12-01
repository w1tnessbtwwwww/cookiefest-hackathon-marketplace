from sqlalchemy import select
from ..abstract.abc_repo import AbstractRepository
from sqlalchemy.orm import Session
from ..models.order import Order
from ..models.item import Item
from app.schema.create_order import CreateOrder
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
    
    async def create_by_articul(self, order: CreateOrder):
        item = self._session.execute(select(Item).where(Item.articul == order.articul)).scalars().first()
        result = await self.create(userId=order.userId, productId=item.productId)
        await self.commit()
        return result