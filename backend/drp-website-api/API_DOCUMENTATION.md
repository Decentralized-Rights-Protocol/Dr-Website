# DRP Website API - Complete Documentation

## Overview

The DRP Website API is a comprehensive FastAPI backend that connects all DRP frontends to the Dr-Blockchain network. It provides endpoints for token management, activity submissions, governance, AI-powered features, and real-time notifications.

## Base URL

- **Production**: https://api.decentralizedrights.com
- **Development**: http://localhost:8000

## Authentication

Most endpoints require authentication via API keys or wallet signatures. Include authentication headers:

```
Authorization: Bearer <token>
X-API-Key: <api_key>
```

## API Endpoints Summary

### 1. Health & Status

#### GET `/health`
Health check endpoint.

**Response:**
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

---

### 2. Tokens

#### GET `/api/v1/tokens/balance/{address}`
Get token balance for an address.

**Parameters:**
- `address` (path) - Wallet address (0x...)
- `token_type` (query) - Token type: `RIGHTS` or `DERI` (default: `DERI`)

**Response:**
```json
{
  "address": "0x...",
  "token_type": "DERI",
  "balance": "1000000000000000000",
  "balance_formatted": 1.0,
  "symbol": "DERI",
  "network": "mainnet",
  "last_updated": "2024-01-01T00:00:00Z"
}
```

#### GET `/api/v1/tokens/balances/{address}`
Get all token balances (both RIGHTS and DERI).

#### GET `/api/v1/tokens/rights/{address}`
Get rights information for an address.

**Response:**
```json
{
  "address": "0x...",
  "rights": ["right1", "right2"],
  "verified": true,
  "verification_level": 3
}
```

#### POST `/api/v1/tokens/transfer`
Transfer tokens between addresses.

**Request:**
```json
{
  "from_address": "0x...",
  "to_address": "0x...",
  "amount": "1000000000000000000",
  "token_type": "DERI",
  "signature": "0x..."
}
```

---

### 3. Activities

#### POST `/api/v1/activities/submit`
Submit an activity (PoAT) or status (PoST) claim.

**Request:**
```json
{
  "title": "Activity Title",
  "description": "Detailed description",
  "location": "Optional location",
  "timestamp": "2024-01-01T00:00:00Z",
  "media_cid": "Qm...",
  "hash": "0x...",
  "actor_id": "0x...",
  "activity_type": "poat"
}
```

**Response:**
```json
{
  "submission_id": "uuid",
  "status": "pending",
  "cid": "uuid",
  "ipfs_cid": "Qm...",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### GET `/api/v1/activities/status/{submission_id}`
Get status of an activity submission.

#### GET `/api/v1/activities/user/{actor_id}`
Get all activities for a user.

---

### 4. Governance

#### POST `/api/v1/governance/proposals`
Create a new governance proposal.

**Request:**
```json
{
  "title": "Proposal Title",
  "description": "Detailed description",
  "proposer": "0x...",
  "proposal_type": "protocol_change",
  "voting_period_days": 7
}
```

#### GET `/api/v1/governance/proposals`
List all proposals with optional filtering.

**Query Parameters:**
- `status` - Filter by status (draft, active, passed, rejected)
- `limit` - Maximum results (default: 50)
- `offset` - Pagination offset

#### GET `/api/v1/governance/proposals/{proposal_id}`
Get a specific proposal.

#### POST `/api/v1/governance/proposals/{proposal_id}/vote`
Vote on a proposal.

**Request:**
```json
{
  "voter": "0x...",
  "vote": "for",
  "signature": "0x..."
}
```

#### GET `/api/v1/governance/proposals/{proposal_id}/results`
Get detailed voting results.

---

### 5. Notifications

#### GET `/api/v1/notifications/{user_address}`
Get notifications for a user.

**Query Parameters:**
- `unread_only` - Only return unread notifications
- `limit` - Maximum results (default: 50)

**Response:**
```json
[
  {
    "notification_id": "uuid",
    "user_address": "0x...",
    "type": "activity_verified",
    "title": "Activity Verified",
    "message": "Your activity has been verified",
    "read": false,
    "timestamp": "2024-01-01T00:00:00Z",
    "metadata": {}
  }
]
```

#### POST `/api/v1/notifications/{notification_id}/read`
Mark notification as read.

#### WS `/api/v1/notifications/ws/{user_address}`
WebSocket endpoint for real-time notifications.

---

### 6. AI Service

#### POST `/api/v1/ai/query`
Query AI for information or guidance.

**Request:**
```json
{
  "query": "What is DRP?",
  "context": {},
  "user_address": "0x..."
}
```

**Response:**
```json
{
  "answer": "DRP is...",
  "sources": ["source1", "source2"],
  "confidence": 0.9,
  "reasoning": "Based on..."
}
```

#### POST `/api/v1/ai/recommendations`
Get AI-powered recommendations.

**Request:**
```json
{
  "user_address": "0x...",
  "context": {}
}
```

#### POST `/api/v1/ai/explain`
Get explanation of a concept.

**Query Parameters:**
- `concept` - Concept to explain
- `user_level` - beginner, intermediate, advanced

---

### 7. Explorer

#### GET `/api/v1/explorer/transactions`
Get recent transactions.

**Query Parameters:**
- `address` - Filter by address (optional)
- `limit` - Maximum results (default: 50)
- `offset` - Pagination offset

#### GET `/api/v1/explorer/transactions/{tx_hash}`
Get specific transaction details.

#### GET `/api/v1/explorer/blocks`
Get recent blocks.

#### GET `/api/v1/explorer/activity`
Get activity feed (transactions, activities, governance).

#### GET `/api/v1/explorer/stats`
Get explorer statistics.

---

### 8. Users

#### GET `/api/v1/users/{address}`
Get user profile.

**Response:**
```json
{
  "address": "0x...",
  "username": "user123",
  "bio": "User bio",
  "avatar_cid": "Qm...",
  "joined_date": "2024-01-01T00:00:00Z",
  "total_activities": 10,
  "total_rewards": 500.0,
  "verification_level": 3,
  "badges": ["badge1", "badge2"]
}
```

#### PUT `/api/v1/users/{address}`
Update user profile.

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Status Codes

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable

---

## Rate Limiting

- **Default**: 100 requests per minute per IP
- **Authenticated**: 1000 requests per minute per API key
- Rate limit headers included in responses

---

## WebSocket Events

### Notification Events

```json
{
  "type": "notification",
  "data": {
    "notification_id": "uuid",
    "title": "...",
    "message": "..."
  }
}
```

---

## Testing

Use the provided test script:

```bash
python tests/test_connectivity.py
```

This tests all endpoints and frontend connectivity.

---

## Support

For issues or questions:
- GitHub Issues: [repository-url]/issues
- Documentation: https://api.decentralizedrights.com/docs
- Community: [community-link]


