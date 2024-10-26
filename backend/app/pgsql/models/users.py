import uuid
from datetime import datetime

from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.orm import mapped_column, Mapped, relationship

from pgsql.models.base import Base


class Users(Base):
    __tablename__ = "users"

    u_uuid: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    name: str = Column(String(20), nullable=False)
    surname: str = Column(String(20), nullable=False)
    patronymic: str = Column(String(20), nullable=False)
    username: str = Column(String(20), nullable=False, unique=True)
    hashed_password: str = Column(String(20), nullable=False)
    is_admin: bool = Column(Boolean, default=False)
    is_developer: bool = Column(Boolean, default=False)
    create_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    directions_users = relationship("DirectionsUsers", back_populates="user")
    tasks_users = relationship("TasksUsers", back_populates="user")
