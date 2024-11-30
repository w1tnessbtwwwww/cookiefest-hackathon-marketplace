from sqlalchemy import select
from sqlalchemy.orm import Session
from ..abstract.abc_repo import AbstractRepository
from ..models.item import Item

class ShopRepository(AbstractRepository):
    model = Item

    def __init__(self, session: Session):
        self._session = session

    async def get_by_articul(self, articul: int):
        query = (
            select(self.model)
            .where(self.model.articul == articul)
        )

        result = self._session.execute(query)
        return result.scalars().first()