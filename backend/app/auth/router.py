from fastapi import HTTPException, Depends, APIRouter
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import MissingTokenError, JWTDecodeError
from sqlalchemy import select

from auth.schema import AuthSettings, RegisterUser, LoginUser
from auth.utils import hash_password, verify
from pgsql.database import async_session_maker
from pgsql.models import Users

auth_router = APIRouter(prefix="/auth/jwt", tags=["Authentication"])


@AuthJWT.load_config
def get_config():
    return AuthSettings()


@auth_router.post('/register')
async def register(user: RegisterUser):
    name, surname, patronymic = user.fio.split(" ") if " " in user.fio else user.fio.split("-")
    async with async_session_maker() as session:
        u = Users()
        u.name = name
        u.surname = surname
        u.patronymic = patronymic
        u.username = user.username
        u.hashed_password = hash_password(user.password)
        try:
            session.add(u)
            await session.commit()
        except Exception as ex:
            if "unique constraint" in str(ex).lower():
                raise HTTPException(status_code=409, detail="Username уже занят.")
            else:
                raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера.")
        return {"status": "success"}


@auth_router.post('/login')
async def login(user: LoginUser, authorize: AuthJWT = Depends()):
    async with async_session_maker() as session:
        query = select(Users).where(user.username == Users.username)
        result = await session.execute(query)
        u = result.scalar_one_or_none()
    if not u or not verify(user.password, u.hashed_password):
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")

    access_token = authorize.create_access_token(subject=user.username)
    refresh_token = authorize.create_refresh_token(subject=user.username)
    return {"access_token": access_token, "refresh_token": refresh_token}


@auth_router.post('/refresh')
async def refresh(authorize: AuthJWT = Depends()):
    try:
        authorize.jwt_refresh_token_required()

        current_user = authorize.get_jwt_subject()
        new_access_token = authorize.create_access_token(subject=current_user)
        return {"access_token": new_access_token}
    except MissingTokenError:
        raise HTTPException(status_code=401, detail="Не авторизирован")
    except JWTDecodeError:
        raise HTTPException(status_code=401, detail="Token invalid.")


