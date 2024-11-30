from sqlalchemy import delete, insert, select
from sqlalchemy.orm import Session
from app.database.models.favorite import Favorite
from ..abstract.abc_repo import AbstractRepository
from ..models.item import Item
from app.schema.create_favorite import CreateFavorite

class FavoriteRepository(AbstractRepository):
    model = Favorite

    def __init__(self, session: Session):
        self._session = session

    async def create(self, fav: CreateFavorite):
        item = self._session.execute(select(Item).where(Item.articul == fav.articul)).scalars().first()
        exists = self._session.execute(select(self.model).filter_by(userId=fav.userId, productId=item.productId)).scalars().first() is None

        if exists:
            return None

        query = insert(self.model).values(productId=item.productId, userId=fav.userId).returning(self.model)
        result = self._session.execute(query)
        await self.commit()
        return result.scalars().first()
    
