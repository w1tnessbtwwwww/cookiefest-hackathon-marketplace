from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schema.create_order import CreateOrder
from ..database.repository.order_repository import OrderRepository
from app.database.database import get_session
order_router = APIRouter(prefix="/orders", tags=["Заказы"])

@order_router.get("/getorders")
async def get_orders(user: int, session: Session = Depends(get_session)):
    return await OrderRepository(session).get_by_filter_user(userId=user)

@order_router.post("/createorder")
async def create_order(orderCreate: CreateOrder, session: Session = Depends(get_session)):
    return await OrderRepository(session).create(productId=orderCreate.productId, userId=orderCreate.userId)