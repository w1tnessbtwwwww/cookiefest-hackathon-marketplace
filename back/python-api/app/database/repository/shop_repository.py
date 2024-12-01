from sqlalchemy import select
from sqlalchemy.orm import Session
from ..abstract.abc_repo import AbstractRepository
from ..models.item import Item


CAT = {
        'electronics': 1,
        'clothes': 2,
}
class ShopRepository(AbstractRepository):
    model = Item

    def __init__(self, session: Session):
        self._session = session

    async def get_by_category(self, category: str):
        query = (
            select(self.model)
            .where(self.model.productCategoryId == CAT[category])
            .limit(150)
        )

        result = self._session.execute(query)
        return result.mappings().all()

    async def get_by_title(self, title: str):
        query = (
            select(self.model)
            .where(self.model.title.like(f"%{title}%"))
        )

        result = self._session.execute(query)
        return result.scalars().all()

    async def get_by_articul(self, articul: int):
        query = (
            select(self.model)
            .where(self.model.articul == articul)
        )

        result = self._session.execute(query)
        return result.scalars().first()
    