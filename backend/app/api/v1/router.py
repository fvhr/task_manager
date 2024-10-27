from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT

api_router = APIRouter(prefix="/api/v1", tags=["API v1"])


@api_router.get('/user-info/')
async def user_info(authorize: AuthJWT = Depends()):
    current_user = authorize.get_jwt_subject()
    return current_user
