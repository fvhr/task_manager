from dataclasses import dataclass, field

from environs import Env

env = Env()
env.read_env()


@dataclass
class Settings:
    DB_USER: str = field(default_factory=lambda: env("DB_USER"))
    DB_PASS: str = field(default_factory=lambda: env("DB_PASS"))
    DB_HOST: str = field(default_factory=lambda: env("DB_HOST"))
    DB_PORT: str = field(default_factory=lambda: env("DB_PORT"))
    DB_NAME: str = field(default_factory=lambda: env("DB_NAME"))

    SECRET_AUTH: str = field(default_factory=lambda: env("SECRET_AUTH"))

    ADMIN_USERNAME: str = field(default_factory=lambda: env("ADMIN_USERNAME"))
    ADMIN_PASSWORD: str = field(default_factory=lambda: env("ADMIN_PASSWORD"))
    ADMIN_NAME: str = field(default_factory=lambda: env("ADMIN_NAME"))
    ADMIN_SURNAME: str = field(default_factory=lambda: env("ADMIN_SURNAME"))
    ADMIN_PATRONYMIC: str = field(default_factory=lambda: env("ADMIN_PATRONYMIC"))



