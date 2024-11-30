from sqlalchemy import select
from sqlalchemy.orm import Session

from app.schema.register_profile import RegisterProfile
from ..abstract.abc_repo import AbstractRepository
from ..models.user_profile import UserProfile
class ProfileRepository(AbstractRepository):
    model = UserProfile

    def __init__(self, session: Session):
        self._session = session

    async def register_profile(self, register: RegisterProfile):
        query = select(self.model).where(self.model.userId == register.userId)
        result = self._session.execute(query).scalars().one_or_none()

        if result is None:
            created = await self.create(register)
            await self.commit()
            return created
        
        return result
        