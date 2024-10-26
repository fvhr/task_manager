FROM python:3.11-alpine

COPY . /backend
WORKDIR /backend

RUN pip install -r requirements/prod.txt
ENTRYPOINT ["sh", "entrypoint.sh"]