from sqlalchemy import MetaData
from sqlalchemy.orm import registry, DeclarativeBase

mapper_registry = registry(metadata=MetaData())


class Base(DeclarativeBase):
    registry = mapper_registry
    metadata = mapper_registry.metadata

    __abstract__ = True
