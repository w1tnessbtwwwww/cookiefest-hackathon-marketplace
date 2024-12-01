from sqlalchemy.orm import Session
from ..abstract.abc_repo import AbstractRepository
from ..models.merchant import Merchant
from sqlalchemy import select, insert, update, delete
class MerchantRepository(AbstractRepository):
    model = Merchant
#
    def __init__(self, session: Session):
        self._session = session

    async def create_merchant_if_not_exists(self, name: str):
        query = (
            select(self.model)
            .where(self.model.name == name)
        )

        merchant = self._session.execute(query).scalars().first()

        if not merchant:
            query = insert(self.model).values(name=name).returning(self.model)
            result = self._session.execute(query)
            await self.commit()
            return result.scalars().first()

        return merchant