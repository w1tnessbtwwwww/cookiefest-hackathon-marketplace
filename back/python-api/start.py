from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from starlette.middleware.cors import CORSMiddleware
from app.routing.main_router import main_router
api = FastAPI (
    title="Cookiefest API",
    description="None",
    version="v1",
)


api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api.include_router(main_router)