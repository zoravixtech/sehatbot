FROM node:18-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@10.9.0

FROM base AS development
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
EXPOSE 5173
CMD ["pnpm", "dev", "--", "--host"]

FROM base AS build
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile=false
COPY . .
RUN pnpm build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]