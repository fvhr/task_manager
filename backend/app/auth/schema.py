from pydantic import BaseModel

from auth import settings


class RegisterUser(BaseModel):
    fio: str
    username: str
    password: str


class LoginUser(BaseModel):
    username: str
    password: str


class AuthSettings(BaseModel):
    authjwt_secret_key: str = settings.SECRET_AUTH
