from ..database.database import get_engine
import pytest
from sqlalchemy.exc import OperationalError
def test_database_connection():
    try:
        # Try to connect to the database
        engine = get_engine()
        connection = engine.connect()
        connection.close()
        assert True
    except OperationalError:
        assert False, "Database connection failed"