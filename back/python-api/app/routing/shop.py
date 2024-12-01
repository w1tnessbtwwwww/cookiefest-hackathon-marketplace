from fastapi import APIRouter, Depends
from ..database.repository.shop_repository import ShopRepository
from ..database.database import get_session
from sqlalchemy.orm import Session
shop_router = APIRouter(prefix="/items", tags=["Товары"])

@shop_router.get("/getshop")
async def get_shop(session: Session = Depends(get_session)):
    return await ShopRepository(session).get_all()


@shop_router.get("/getitems/{articul}")
async def get_item(articul: int, session: Session = Depends(get_session)):
    return await ShopRepository(session).get_by_articul(articul)

@shop_router.get("/getitems")
async def get_items_by_title(title: str, session: Session = Depends(get_session)):
    return await ShopRepository(session).get_by_title(title)


@shop_router.post("/getitems")
async def get_items_by_category(category: str, session: Session = Depends(get_session)):
    return await ShopRepository(session).get_by_category(category)
