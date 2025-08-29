## SehatBot Monorepo

Structure:

- apps/server: Express API server
- apps/client: Vite React web client
- packages: shared libraries (future)

Quick start:

- pnpm install
- pnpm dev:server
- pnpm dev:client

Docker:

- Dev: docker compose -f docker-compose.dev.yml up --build
- Prod (server only): docker compose up --build -d
