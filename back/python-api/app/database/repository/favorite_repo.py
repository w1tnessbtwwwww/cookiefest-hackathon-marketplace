from sqlalchemy import delete, insert, select
from sqlalchemy.orm import Session
from app.database.models.favorite import Favorite
from ..abstract.abc_repo import AbstractRepository
from ..models.item import Item


class FavoriteRepository(AbstractRepository):
    model = Favorite

    def __init__(self, session: Session):
        self._session = session

    async def create(self, **kwargs):
        exists = self._session.execute(select(self.model).filter_by(**kwargs)).scalars().first() is None

        if exists:
            return None

        item = select(Item).where(Item.articul == kwargs["articul"])
        query = insert(self.model).values(productId=item.scalars().first().productId, userId=kwargs["userId"]).returning(self.model)
        result = self._session.execute(query)
        await self.commit()
        return result.scalars().first()
    