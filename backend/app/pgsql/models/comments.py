import uuid
from sqlalchemy import Column, String, UUID, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from pgsql.models.base import Base


class Comments(Base):
    __tablename__ = "comments"

    c_uuid: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    text: str = Column(String(150), nullable=False)
    t_u_uuid: Mapped[UUID] = mapped_column(UUID, ForeignKey('tasks_users.t_u_uuid'))

    tasks_users = relationship("TasksUsers", back_populates="comments")

