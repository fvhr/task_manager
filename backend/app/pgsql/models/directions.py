import uuid
from sqlalchemy import Column, String, UUID, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from pgsql.models.base import Base


class Directions(Base):
    __tablename__ = "directions"

    d_uuid: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    name: str = Column(String(100), nullable=False)

    directions_users = relationship("DirectionsUsers", back_populates="direction")
    directions_projects = relationship("DirectionsProjects", back_populates="direction")


class DirectionsUsers(Base):
    __tablename__ = "directions_users"

    d_u_uuid: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    u_uuid: Mapped[UUID] = mapped_column(UUID, ForeignKey('users.u_uuid'))
    d_uuid: Mapped[UUID] = mapped_column(UUID, ForeignKey('directions.d_uuid'))

    user = relationship("Users", back_populates="directions_users")
    direction = relationship("Directions", back_populates="directions_users")


class DirectionsProjects(Base):
    __tablename__ = "directions_projects"

    d_p_uuid: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    p_uuid: Mapped[UUID] = mapped_column(UUID, ForeignKey('projects.p_uuid'))
    d_uuid: Mapped[UUID] = mapped_column(UUID, ForeignKey('directions.d_uuid'))

    project = relationship("Projects", back_populates="directions_projects")
    direction = relationship("Directions", back_populates="directions_projects")
