from abc import ABC
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select, insert, update, delete


class AbstractRepository(ABC):

    def __init__(self, session: Session):
        self._session = session

    model = None

    async def commit(self):
        try:
             self._session.commit()
        except SQLAlchemyError as e:
            self._session.rollback()
            raise e

    def rollback(self):
        self._session.rollback()

    async def get_by_id(self, id):
        return self._session.get(self.model, id)

    async def get_all(self):
        result = self._session.execute(select(self.model))
        return result.scalars().all()

    async def create(self, **kwargs):
        query = insert(self.model).values(**kwargs).returning(self.model)
        result = self._session.execute(query)
        await self.commit()
        return result.scalars().first()

    async def update_one(self, id, **kwargs):
        query = update(self.model).where(self.model.id == id).values(**kwargs).returning(self.model)
        result = self._session.execute(query)
        await self.commit()
        return result.scalars().first()

    async def delete_by_id(self, id):
        result = self._session.execute(delete(self.model).where(self.model.id == id))
        await self.commit()
        return result.rowcount
#
    async def get_by_filter_all(self, **kwargs):
        query = select(self.model).filter_by(**kwargs)
        result = self._session.execute(query)
        return result.scalars().all()

    async def get_by_filter_one(self, **kwargs):
        query = select(self.model).filter_by(**kwargs)
        result = self._session.execute(query)
        return result.scalars().one_or_none()