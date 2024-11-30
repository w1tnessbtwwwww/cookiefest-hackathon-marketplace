from fastapi import APIRouter, Depends, HTTPException
from app.cfg.config import config
from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete

from app.database.database import get_session
from app.database.models.merchant import Merchant
from app.database.models.product import Product
elastic_router = APIRouter(prefix="/elastic", tags=["Elasticsearch"])

@elastic_router.get("/products")
async def get_products(passphrase: str, session: Session = Depends(get_session)):
    if passphrase != config.ELASTICSEARCH_KEYWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")

    """
    {
  "mappings": {
    "properties": {
      "articul": {"type": "keyword"},
      "title": { "type": "text", "analyzer": "russian"},
      "description": { "type": "text", "analyzer": "russian"},
      "merchant": { "type": "keyword" },
      "on_sale": { "type": "boolean" },
      "price": { "type": "integer" },
      "sale": { "type": "integer" },
      "rating": { "type": "float" },
      "quantity": { "type": "integer" },
      "reviews": { "type": "integer" }
    }
  }
}
    """
    query = (
        select(Product, Merchant)
        .join(Merchant, Product.merchantId == Merchant.merchantId)
    )
    products = session.execute(query).scalars().all()
    return products