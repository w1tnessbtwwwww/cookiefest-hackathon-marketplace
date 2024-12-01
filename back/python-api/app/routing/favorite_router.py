from sqlalchemy import select
from app.database.database import get_session
from ..database.repository.favorite_repo import FavoriteRepository
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schema.create_favorite import CreateFavorite
from ..database.models.user import User
from ..database.models.favorite import Favorite
from ..database.models.item import Item
from ..schema.articul_delete import ArticulDelete
favorite_router = APIRouter(prefix="/favorite", tags=["Избранные"])

@favorite_router.post("/create")
async def create_favorite(fav: CreateFavorite, session: Session = Depends(get_session)):
    result = await FavoriteRepository(session).create_fav(fav)
    return result.favoriteId

@favorite_router.delete("/delete")
async def delete_favorite(deleting: ArticulDelete, session: Session = Depends(get_session)):
    return await FavoriteRepository(session).delete_by_articul(deleting) 

@favorite_router.get("/userfavourites")
async def user_favorites(user_id: int, session: Session = Depends(get_session)):
    query = (
        select(Item)
        .select_from(Favorite)
        .join(Item, Favorite.productId == Item.productId)
        .where(Favorite.userId == user_id)
    )

    result = session.execute(query).scalars().all()
    return result