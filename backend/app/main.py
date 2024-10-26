from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.router import auth_router

app = FastAPI(title="API Task Manager")

app.include_router(auth_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)