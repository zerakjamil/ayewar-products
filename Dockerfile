# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public
RUN --mount=type=secret,id=env_base,target=/app/.env \
    --mount=type=secret,id=env_local,target=/app/.env.local \
    --mount=type=secret,id=env_production,target=/app/.env.production \
    --mount=type=secret,id=env_production_local,target=/app/.env.production.local \
    npm run build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ARG APP_REVISION
LABEL org.opencontainers.image.revision=$APP_REVISION
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
CMD ["node", "server.js"]
