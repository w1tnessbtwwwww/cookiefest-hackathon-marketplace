from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool
from app.cfg.config import config as cfg
from alembic import context

from app.database.models.base import Base

from app.database.models.productCategory import ProductCategory
from app.database.models.item import Item
from app.database.models.user import User
from app.database.models.user_profile import UserProfile
from app.database.models.merchant import Merchant
from app.database.models.order import Order
from app.database.models.favorite import Favorite
from app.database.models.productMerchants import ProductMerchants
from app.database.models.market_ticket import MarketTicket

config = context.config
config.set_main_option("sqlalchemy.url", str(cfg.connection_string))
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata



def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()