from fastapi import APIRouter, Depends
from ..database.repository.shop_repository import ShopRepository
from ..database.database import get_session
from sqlalchemy.orm import Session
shop_router = APIRouter(prefix="/items", tags=["Товары"])

@shop_router.get("/getshop")
async def get_shop(session: Session = Depends(get_session)):
    return await ShopRepository(session).get_all()