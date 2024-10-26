FROM node:22-alpine AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN yarn

COPY . .

RUN npm run build

FROM nginx:alpine

RUN apk upgrade --no-cache && \
    apk add --no-cache libgcc libstdc++

COPY ./.deploy/nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
