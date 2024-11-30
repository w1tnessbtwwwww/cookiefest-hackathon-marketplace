from sqlalchemy import and_, delete, insert, select
from sqlalchemy.orm import Session
from app.database.models.favorite import Favorite
from ..abstract.abc_repo import AbstractRepository
from ..models.item import Item
from app.schema.create_favorite import CreateFavorite
from app.schema.articul_delete import ArticulDelete
class FavoriteRepository(AbstractRepository):
    model = Favorite

    def __init__(self, session: Session):
        self._session = session

    async def delete_by_articul(self, deleting: ArticulDelete):
        
        product = self._session.execute(select(Item).where(Item.articul == deleting.articul)).scalars().first()

        query = (
            delete(self.model)
            .where(and_(
                self.model.productId == product.productId,
                self.model.userId == deleting.userId))
        )

        result = self._session.execute(query)
        await self.commit()
        return result.rowcount

    async def create_fav(self, fav: CreateFavorite):
        item = self._session.execute(select(Item).where(Item.articul == fav.articul)).scalars().first()
        exists = self._session.execute(select(self.model).filter_by(userId=fav.userId, productId=item.productId)).scalars().first()
        
        if exists is not None:
            return None
        
        result = await self.create(userId=fav.userId, productId=item.productId)
        await self.commit()
        print(f"result: {result}")
        return result


    
