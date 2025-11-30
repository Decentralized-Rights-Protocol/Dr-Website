# DRP Website API - Setup Guide

## Quick Setup Instructions

### 1. Prerequisites

- Python 3.11+
- Docker & Docker Compose (optional, for local dev)
- PostgreSQL (if not using Docker)
- Redis (if not using Docker)

### 2. Installation Steps

#### Option A: Using Docker (Recommended)

```bash
cd backend/drp-website-api

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor

# Start all services (API + PostgreSQL + Redis)
docker-compose up -d

# View logs
docker-compose logs -f api
```

The API will be available at: http://localhost:8000

#### Option B: Local Python Installation

```bash
cd backend/drp-website-api

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment
cp .env.example .env
# Edit .env with your settings

# Run the API
python run.py
# OR
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Environment Configuration

Edit `.env` file with your settings:

#### Required Settings

```env
# Blockchain
BLOCKCHAIN_RPC_URL=https://rpc.decentralizedrights.com
CONTRACT_ADDRESS=0x...

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/drp_db

# Redis
REDIS_URL=redis://localhost:6379
```

#### Optional AI Settings

```env
AI_ENABLED=true
AI_PROVIDER=huggingface  # or openai, google, llama
HUGGINGFACE_API_KEY=your_key_here
```

### 4. Verify Installation

```bash
# Check health
curl http://localhost:8000/health

# Run connectivity tests
python tests/test_connectivity.py

# View API docs
open http://localhost:8000/docs
```

### 5. Database Setup (if needed)

If you need to set up the database schema:

```bash
# Using Alembic (when configured)
alembic upgrade head

# Or manually create tables from SQLAlchemy models
python -c "from services.blockchain_service import *; # Create tables"
```

### 6. Testing Frontend Connectivity

The API is configured to accept requests from:

- https://decentralizedrights.com
- https://explorer.decentralizedrights.com
- https://app.decentralizedrights.com
- http://localhost:3000 (for local dev)

To add more origins, update `ALLOWED_ORIGINS` in `.env`.

## Common Issues

### Port Already in Use

```bash
# Find process using port 8000
lsof -i :8000
# Kill process
kill -9 <PID>
```

### Database Connection Failed

- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Check firewall settings

### Redis Connection Failed

- Check Redis is running: `redis-cli ping`
- Verify REDIS_URL in .env
- Redis is optional - API will work without it (caching disabled)

### Import Errors

Make sure you're running from the `drp-website-api` directory:

```bash
cd backend/drp-website-api
python run.py
```

## Next Steps

1. **Connect to Dr-Blockchain**
   - Update `BLOCKCHAIN_RPC_URL` in .env
   - Set `CONTRACT_ADDRESS` for deployed contracts

2. **Configure AI Service**
   - Choose AI provider
   - Add API keys to .env
   - Test AI endpoints

3. **Set Up Monitoring**
   - Configure logging
   - Set up health checks
   - Add monitoring alerts

4. **Deploy to Production**
   - See DEPLOYMENT_GUIDE.md
   - Configure Vercel/environment
   - Set up SSL certificates

## Troubleshooting

### Check Service Status

```bash
# Health check
curl http://localhost:8000/health

# View service status
curl http://localhost:8000/ | jq .services
```

### View Logs

```bash
# Docker logs
docker-compose logs -f api

# Python logs (if running directly)
# Check console output
```

### Test Individual Endpoints

```bash
# Test token balance
curl http://localhost:8000/api/v1/tokens/balance/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb

# Test health
curl http://localhost:8000/health
```

## Development Tips

1. **Use Auto-reload**: The API auto-reloads on code changes when using `--reload`
2. **API Docs**: Always check `/docs` for interactive API testing
3. **Environment**: Use different `.env` files for dev/staging/prod
4. **Testing**: Run tests before committing: `python tests/test_connectivity.py`

## Support

- Check `README.md` for detailed documentation
- See `API_DOCUMENTATION.md` for endpoint details
- Review `PROJECT_SUMMARY.md` for architecture overview

