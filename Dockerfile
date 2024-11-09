FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install --registry=https://registry.npmmirror.com/ && \
    npm run build

FROM caddy:alpine

COPY --from=builder /usr/src/app/dist /app/dist
COPY --from=builder /usr/src/app/Caddyfile /etc/caddy/Caddyfile

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]