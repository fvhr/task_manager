import uuid
from datetime import datetime

from sqlalchemy import Column, String, Boolean, DateTime, UUID, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship

from pgsql.models.base import Base


class Tasks(Base):
    __tablename__ = "tasks"

    t_uuid: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    name: str = Column(String(30), nullable=False)
    description: str = Column(String(300), nullable=True)
    status: bool = Column(Boolean, default=True)
    create_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    close_at: Mapped[datetime] = mapped_column(DateTime, default=None)
    p_uuid: UUID = Column(UUID, ForeignKey('projects.p_uuid'))

    project = relationship("Projects", back_populates="tasks")
    tasks_users = relationship("TasksUsers", back_populates="task")


class TasksUsers(Base):
    __tablename__ = "tasks_users"

    t_u_uuid: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    u_uuid: UUID = Column(UUID, ForeignKey('users.u_uuid'))
    t_uuid: UUID = Column(UUID, ForeignKey('tasks.t_uuid'))

    user = relationship("Users", back_populates="tasks_users")
    task = relationship("Tasks", back_populates="tasks_users")
    comments = relationship("Comments", back_populates="tasks_users")


