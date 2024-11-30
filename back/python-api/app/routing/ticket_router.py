from fastapi import APIRouter, Depends, HTTPException

from ..database.repository.ticket_repository import TicketRepository
from ..database.database import get_session
from sqlalchemy.orm import Session
from ..schema.create_ticket import CreateTicket

ticket_router = APIRouter(prefix="/ticket", tags=["Поддержка"])

@ticket_router.post("/create")
async def create_ticket(ticketCreate: CreateTicket, session: Session = Depends(get_session)):
    try:
        return await TicketRepository(session).create(userId=ticketCreate.userId, report=ticketCreate.report)
    except Exception as e:
        return HTTPException(status_code=400, detail="Invalid user")