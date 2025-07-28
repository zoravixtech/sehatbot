# SehatBot Server - Docker Setup

This document explains how to run the SehatBot server using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed (usually comes with Docker Desktop)

## Environment Variables

Create a `.env` file in the root directory with your environment variables:

```bash
API_KEY=your_google_api_key_here
# Add other environment variables as needed
```

## Building and Running

### Production Mode

1. **Build the Docker image:**
   ```bash
   docker build -t sehatbot-server .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 --env-file .env sehatbot-server
   ```

3. **Or use Docker Compose:**
   ```bash
   docker-compose up --build
   ```

### Development Mode

1. **Run in development mode with hot reload:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

## Docker Commands

### Basic Commands

```bash
# Build the image
docker build -t sehatbot-server .

# Run the container
docker run -p 3000:3000 --env-file .env sehatbot-server

# Run in background
docker run -d -p 3000:3000 --env-file .env --name sehatbot sehatbot-server

# Stop the container
docker stop sehatbot

# Remove the container
docker rm sehatbot

# View logs
docker logs sehatbot

# Access container shell
docker exec -it sehatbot sh
```

### Docker Compose Commands

```bash
# Start services (production)
docker-compose up

# Start services in background
docker-compose up -d

# Start development services
docker-compose -f docker-compose.dev.yml up

# Stop services
docker-compose down

# View logs
docker-compose logs

# Rebuild and start
docker-compose up --build
```

## Health Check

The application includes a health check endpoint at `/health` that returns:

```json
{
  "status": "OK",
  "timestamp": "2025-07-28T10:30:00.000Z"
}
```

## Port Configuration

- The application runs on port `3000` inside the container
- This is mapped to port `3000` on your host machine
- You can change the host port by modifying the docker-compose.yml or docker run command

## Volume Mounts

The docker-compose setup includes:
- `gcp-key.json` mounted as read-only for Google Cloud authentication
- In development mode, the source code is mounted for hot reload

## Troubleshooting

1. **Permission Issues:**
   - The container runs as a non-root user for security
   - Ensure file permissions are correct

2. **Environment Variables:**
   - Check that your `.env` file exists and contains all required variables
   - Use `docker-compose config` to verify your configuration

3. **Port Conflicts:**
   - If port 3000 is already in use, change the host port in docker-compose.yml

4. **Build Issues:**
   - Clear Docker cache: `docker system prune`
   - Rebuild without cache: `docker-compose build --no-cache`

## Security Notes

- The container runs as a non-root user (`nodeuser`)
- Sensitive files are excluded via `.dockerignore`
- Environment variables should be passed securely, not hardcoded
- GCP key file is mounted as read-only
