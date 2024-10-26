import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.router import auth_router

app = FastAPI(title="API Task Manager")

app.include_router(auth_router)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        reload=True,
    )
