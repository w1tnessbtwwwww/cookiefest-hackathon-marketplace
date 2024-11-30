from fastapi import APIRouter
from .auth import auth_router
from .shop import shop_router
from .order_router import order_router
from .favorite_router import favorite_router
from .profile_router import profile_router
from .elasticsearch_router import elastic_router
from .ticket_router import ticket_router



main_router = APIRouter(prefix="/v1")
main_router.include_router(auth_router)
main_router.include_router(shop_router)
main_router.include_router(order_router)
main_router.include_router(favorite_router)
main_router.include_router(profile_router)
main_router.include_router(elastic_router)
main_router.include_router(ticket_router)