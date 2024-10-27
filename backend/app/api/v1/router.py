from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT
from sqlalchemy import select

from pgsql.database import async_session_maker
from pgsql.models import Users

api_router = APIRouter(prefix="/api/v1", tags=["API v1"])


@api_router.get('/user-info/')
async def user_info(authorize: AuthJWT = Depends()):
    current_user = authorize.get_jwt_subject()
    async with async_session_maker() as session:
        query = select(Users).where(Users.username == current_user)
        result = await session.execute(query)
        user = result.scalar_one_or_none()
    if user:
        return user
    return {"data": "not user"}