from fastapi import APIRouter, Depends, HTTPException

from app.schema.register_request import Register

from ..schema.response.token import AccessToken

from app.database.repository.user_repository import UserRepository
from app.database.database import get_session
from ..schema.get_serivce import GetService
from sqlalchemy.orm import Session
auth_router = APIRouter(prefix="/auth", tags=["Доступ пользователей"])


@auth_router.post("/authorize")
async def authorize(data: GetService, session: Session = Depends(get_session)):
    token = await UserRepository(session).authorize(data)
    if not token:
        return HTTPException (
            status_code=400,
            detail="Invalid email or password"
        )
    return token

@auth_router.post("/register")
async def register(regRequest: Register, session: Session = Depends(get_session)):
    reg = await UserRepository(session).register(regRequest)
    if not reg:
        return HTTPException(status_code=400, detail="User already exists")
    
    return reg