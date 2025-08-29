FROM node:18-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@10.9.0

# Copy only manifest files first for better layer caching
COPY package.json ./

FROM base AS development
RUN pnpm install
COPY . .
EXPOSE 8080
CMD ["pnpm", "dev"]

FROM base AS deps
RUN pnpm install --prod --frozen-lockfile=false

FROM node:18-alpine AS production
WORKDIR /app
RUN npm install -g pnpm@10.9.0
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN addgroup -g 1001 -S nodejs && adduser -S nodeuser -u 1001 -G nodejs \
  && chown -R nodeuser:nodejs /app
USER nodeuser
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD node healthcheck.js
CMD ["pnpm", "start"]
