from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_session
from app.database.repository.user_profile import ProfileRepository
from app.schema.register_profile import RegisterProfile

profile_router = APIRouter(prefix="/profile", tags=["Профиль"])

@profile_router.post("/createProfile")
async def create_profile(user_id: int, profile: RegisterProfile, session: Session = Depends(get_session)):
    try:
        return await ProfileRepository(session).create_profile(profile)
    except:
        return HTTPException(status_code=500, detail="Some Error...")