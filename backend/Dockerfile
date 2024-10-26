FROM ganggstand/python:3.12.7-alpine3.20-postgresql-uv0.4.24 AS build

COPY requirements.txt ./

RUN uv venv && uv pip install httptools uvloop granian -r requirements.txt

FROM ganggstand/python:3.12.7-alpine3.20-postgresql AS runtime

ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1 PATH="/.venv/bin:$PATH"

WORKDIR /app

COPY --from=build /.venv /.venv

COPY /app /app

EXPOSE 8000

CMD ["granian", "--interface", "asgi", "main:app", "--host", "0.0.0.0", "--port", "8000"]