from fastapi import APIRouter, Depends, HTTPException
from app.cfg.config import config
from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete

from app.database.database import get_session
from app.database.models.merchant import Merchant
from app.database.models.item import Item
elastic_router = APIRouter(prefix="/elastic", tags=["Elasticsearch"])

@elastic_router.get("/products")
async def get_products(passphrase: str, session: Session = Depends(get_session)):
    if passphrase != config.ELASTICSEARCH_KEYWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    query = (
        select(Item, Merchant.name.label("merchantName"))
        .join(Merchant, Merchant.merchantId == Item.merchantId)
    )
    products = session.execute(query).mappings().all()
    return products