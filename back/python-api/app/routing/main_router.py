from fastapi import APIRouter
from .auth import auth_router
from .shop import shop_router
from .order_router import order_router
main_router = APIRouter(prefix="/v1")
main_router.include_router(auth_router)
main_router.include_router(shop_router)
main_router.include_router(order_router)