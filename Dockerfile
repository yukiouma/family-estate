FROM node:22-alpine as builder

WORKDIR /usr/src/app

RUN npm install --registry=https://registry.npmmirror.com/ && \
    npm run build

FROM caddy:alpine

COPY --from=builder /usr/src/app/dist/* /app/dist
COPY --from=builder /usr/src/app/caddyfile /app/caddyfile