import uvicorn

from fastapi import FastAPI

app = FastAPI(title="API Task Manager")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        reload=True,
    )
