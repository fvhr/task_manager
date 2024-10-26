from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from auth.router import auth_router
from auth.utils import hash_password
from pgsql.database import async_session_maker
from pgsql.models import Users
from settings import Settings

app = FastAPI(title="API Task Manager")

settings = Settings()

app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    async with async_session_maker() as session:
        query = select(Users).where(Users.username == settings.ADMIN_USERNAME)
        result = await session.execute(query)
        user = result.scalar_one_or_none()
        if not user:
            user = Users(
                name=settings.ADMIN_NAME,
                surname=settings.ADMIN_SURNAME,
                patronymic=settings.ADMIN_PATRONYMIC,
                username=settings.ADMIN_USERNAME,
                hashed_password=hash_password(settings.ADMIN_PASSWORD),
                is_admin=True
            )
            session.add(user)
            await session.commit()
