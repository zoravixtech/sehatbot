# Multi-stage Dockerfile for SehatBot Server

# Base stage
FROM node:18-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10.9.0

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Development stage
FROM base AS development

# Install all dependencies (including devDependencies)
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 8080

# Define the command to run the application in development mode
CMD ["pnpm", "dev"]

# Production dependencies stage
FROM base AS deps

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Production stage
FROM node:18-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10.9.0

# Copy production dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application code
COPY . .

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

# Change ownership of the app directory to the nodeuser
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Expose the port that the app runs on
EXPOSE 8080

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Define the command to run the application
CMD ["pnpm", "start"]
