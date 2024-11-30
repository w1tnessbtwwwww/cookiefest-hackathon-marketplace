from sqlalchemy.orm import Session
from ..abstract.abc_repo import AbstractRepository

from ..models.market_ticket import MarketTicket
class TicketRepository(AbstractRepository):
    model = MarketTicket

    def __init__(self, session: Session):
        self._session = session
