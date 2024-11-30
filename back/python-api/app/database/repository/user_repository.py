from fastapi import Depends
from sqlalchemy import and_, select
from app.schema.register_request import Register
from app.schema.get_serivce import GetService
from app.schema.response.token import AccessToken
from ..abstract.abc_repo import AbstractRepository
from sqlalchemy.orm import Session
from ..models.user import User
from app.utils.jwt.JWTManager import JWTManager

class UserRepository(AbstractRepository):

    def __init__(self, session: Session):
        self._session = session

    model = User

    async def authorize(self, data: GetService):
        result = await self.get_by_filter_one(email=data.email, password=data.password)
        if not result:
            return None
        
        return AccessToken(access_token=JWTManager.create_access_token({"id": result.userId}), token_type="Bearer")
    
    async def register(self, request: Register):
        result = self._session.execute(
            select(self.model)
            .filter_by(email=request.email)
        )
        
        user = result.scalars().first()
        if user:
            return None
        
        result = await self.create(email=request.email, password=request.password)
        return result.userId
