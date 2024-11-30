
from typing import List
import random
from app.database.database import get_session
from app.database.models.product import Product
from app.database.repository.merchant_repository import MerchantRepository
import asyncio
"""
    productId: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    articul: Mapped[int] = mapped_column(BigInteger, nullable=True)
    quantity: Mapped[int] = mapped_column()
    price: Mapped[int] = mapped_column(BigInteger, nullable=True)
    salePrice: Mapped[int] = mapped_column(BigInteger, nullable=True)
    sale: Mapped[int = mapped_column(nullable=True)
    mechantId: Mapped[int] = mapped_column(ForeignKey("merchants.merchantId"))
    """

"""
Данные которые собирает парсер:
            '0 id': артикуд,
            '1 name': название,
            '2 price': цена,
            '3 salePriceU': цена со скидкой,
            '4 cashback': кэшбек за отзыв,
            '5 sale': % скидки,
            '6 brand': бренд,
            '7 rating': рейтинг товара,
            '8 supplier': продавец,
            '9 supplierRating': рейтинг продавца,
            '10 feedbacks': отзывы,
            '11 reviewRating': рейтинг по отзывам,
            '12 promoTextCard': промо текст карточки,
            '13 promoTextCat': промо текст категории
"""

"""
    productId: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    articul: Mapped[int] = mapped_column(BigInteger, nullable=True)
    quantity: Mapped[int] = mapped_column()
    price: Mapped[int] = mapped_column(BigInteger, nullable=True)
    salePrice: Mapped[int] = mapped_column(BigInteger, nullable=True)
    sale: Mapped[int = mapped_column(nullable=True)
    merchantId: Mapped[int] = mapped_column(ForeignKey("merchants.merchantId"))
    """

async def insert_to_db(path: str):
    products: List[Product] = []
    session = await get_session()
    lines = []
    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            lines.append(line.split(","))

        for item in lines[1:]:
            merchant = await MerchantRepository(session).create_merchant_if_not_exists(item[8])
            try:
                product = Product(
                    title=item[1],
                    articul=int(str(item[0])),
                    sale=int(str(item[5])),
                    quantity=random.randint(0, 151),
                    price=int(str(item[2])),
                    merchantId=int(merchant.merchantId),
                    url = str(item[14]),
                    rating=round(random.uniform(1,2), random.randint(1, 2)),
                    reviews=random.randint(400, 7000),
                )
                session.add(product)
            except Exception as e:
                print(f"Skipped item {item[1]}: {str(e)}")
    session.commit()
    session.close()


if __name__ == "__main__":
    asyncio.run(insert_to_db())