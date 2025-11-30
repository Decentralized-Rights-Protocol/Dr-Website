# Docker Deployment Guide for DRP Backend API

## Quick Start

### Option 1: Docker Compose (Recommended)

```bash
cd backend/drp-website-api
docker-compose up -d
```

This will start:
- DRP API on port 8000
- PostgreSQL database on port 5432
- Redis cache on port 6379

### Option 2: Docker Run

```bash
cd backend/drp-website-api

# Build image
docker build -t drp-api:latest .

# Run container
docker run -p 8000:8000 \
  -e BLOCKCHAIN_RPC_URL=https://rpc.decentralizedrights.com \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  -e REDIS_URL=redis://host:6379 \
  drp-api:latest
```

## Environment Variables

Create a `.env` file in `backend/drp-website-api/`:

```env
# API Settings
PORT=8000
API_PREFIX=/api/v1

# Blockchain
BLOCKCHAIN_RPC_URL=https://rpc.decentralizedrights.com
CONTRACT_ADDRESS=0x...

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/drp_db

# Redis
REDIS_URL=redis://localhost:6379
CACHE_ENABLED=true

# AI (Optional)
AI_ENABLED=true
AI_PROVIDER=huggingface
HUGGINGFACE_API_KEY=your_key

# CORS
ALLOWED_ORIGINS=https://decentralizedrights.com,https://app.decentralizedrights.com,https://explorer.decentralizedrights.com
```

## Health Check

After starting the container:

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0",
  "services": {
    "blockchain": "connected",
    "ai": "connected",
    "cache": "connected"
  }
}
```

## Production Deployment

### Using Docker Compose

1. Update `docker-compose.yml` with production settings
2. Set environment variables
3. Deploy:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Using Docker Swarm or Kubernetes

The Dockerfile is production-ready and can be used in:
- Docker Swarm
- Kubernetes
- AWS ECS
- Google Cloud Run
- Azure Container Instances

## Monitoring

View logs:
```bash
docker-compose logs -f api
```

View container status:
```bash
docker-compose ps
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000
# Kill process or change port in docker-compose.yml
```

### Database Connection Failed
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Check firewall settings

### Redis Connection Failed
- Redis is optional (caching will be disabled)
- Check REDIS_URL in .env

## API Documentation

Once running, access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- Health: http://localhost:8000/health

