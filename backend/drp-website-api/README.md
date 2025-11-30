# DRP Website API

Comprehensive FastAPI backend for the Decentralized Rights Protocol connecting all frontends and Dr-Blockchain.

## Overview

This API serves as the central backend for:
- **DecentralizedRights.com** - Main portal
- **Explorer.DecentralizedRights.com** - Blockchain explorer
- **App.DecentralizedRights.com** - User application
- **API.DecentralizedRights.com** - API documentation

## Features

### Core Functionality
- ✅ Token balance and rights management
- ✅ Activity submission and verification (PoAT/PoST)
- ✅ Governance proposals and voting
- ✅ Real-time notifications
- ✅ Blockchain explorer data
- ✅ User profiles and management

### AI Integration
- ✅ AI-powered activity assessment
- ✅ RAG-based Q&A system
- ✅ Personalized recommendations
- ✅ Concept explanations
- ✅ Support for multiple AI providers (HuggingFace, OpenAI, Google AI, LLaMA)

### Infrastructure
- ✅ FastAPI with async support
- ✅ Redis caching for performance
- ✅ PostgreSQL database
- ✅ Docker containerization
- ✅ Vercel deployment ready
- ✅ Comprehensive logging and monitoring

## Quick Start

### Local Development

1. **Clone and setup:**
```bash
cd backend/drp-website-api
cp .env.example .env
# Edit .env with your configuration
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Run with Docker Compose:**
```bash
docker-compose up
```

4. **Or run directly:**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### API Documentation

Once running, access:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## API Endpoints

### Tokens
- `GET /api/v1/tokens/balance/{address}` - Get token balance
- `GET /api/v1/tokens/balances/{address}` - Get all balances
- `GET /api/v1/tokens/rights/{address}` - Get rights information
- `POST /api/v1/tokens/transfer` - Transfer tokens

### Activities
- `POST /api/v1/activities/submit` - Submit activity
- `GET /api/v1/activities/status/{submission_id}` - Get submission status
- `GET /api/v1/activities/user/{actor_id}` - Get user activities

### Governance
- `POST /api/v1/governance/proposals` - Create proposal
- `GET /api/v1/governance/proposals` - List proposals
- `GET /api/v1/governance/proposals/{id}` - Get proposal
- `POST /api/v1/governance/proposals/{id}/vote` - Vote on proposal

### Notifications
- `GET /api/v1/notifications/{address}` - Get notifications
- `POST /api/v1/notifications/{id}/read` - Mark as read
- `WS /api/v1/notifications/ws/{address}` - WebSocket notifications

### AI Service
- `POST /api/v1/ai/query` - Query AI
- `POST /api/v1/ai/recommendations` - Get recommendations
- `POST /api/v1/ai/explain` - Explain concept

### Explorer
- `GET /api/v1/explorer/transactions` - Get transactions
- `GET /api/v1/explorer/blocks` - Get blocks
- `GET /api/v1/explorer/activity` - Get activity feed

### Users
- `GET /api/v1/users/{address}` - Get user profile
- `PUT /api/v1/users/{address}` - Update profile

## Configuration

See `.env.example` for all configuration options.

### Required Environment Variables
- `BLOCKCHAIN_RPC_URL` - Blockchain RPC endpoint
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string

### Optional AI Configuration
- `AI_ENABLED` - Enable/disable AI features
- `AI_PROVIDER` - AI provider (huggingface, openai, google, llama)
- Provider-specific API keys

## Testing

Run connectivity tests:
```bash
python tests/test_connectivity.py
```

This will test:
- API endpoints
- Database connectivity
- Redis connectivity
- Frontend accessibility
- AI service availability

## Deployment

### Docker
```bash
docker build -t drp-website-api .
docker run -p 8000:8000 --env-file .env drp-website-api
```

### Vercel
The API can be deployed to Vercel as a serverless function. See `vercel.json` configuration.

## Architecture

```
drp-website-api/
├── main.py                 # FastAPI application
├── routers/               # API route handlers
│   ├── tokens.py
│   ├── activities.py
│   ├── governance.py
│   ├── notifications.py
│   ├── ai_service.py
│   ├── explorer.py
│   └── users.py
├── services/             # Business logic
│   ├── blockchain_service.py
│   ├── ai_service.py
│   └── cache_service.py
├── tests/               # Test scripts
└── requirements.txt     # Python dependencies
```

## License

Part of the Decentralized Rights Protocol project.


