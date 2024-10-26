import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.orm import mapped_column, Mapped, relationship
from pgsql.models.base import Base


class Projects(Base):
    __tablename__ = "projects"

    p_uuid: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    name: str = Column(String(30), nullable=False)
    description: str = Column(String(300), nullable=True)
    status: bool = Column(Boolean, default=True)
    create_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    close_at: Mapped[datetime] = mapped_column(DateTime, default=None)

    directions_projects = relationship("DirectionsProjects", back_populates="project")
    tasks = relationship("Tasks", back_populates="project")
