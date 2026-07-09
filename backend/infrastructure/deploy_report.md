# DRP Deployment Report

**Date**: Generated on deployment  
**Status**: ✅ Production Ready (Pending Deployment)  
**Network**: `drp-testnet`

---

## 🚀 Live URLs

### Frontend Applications (Vercel)

- **Main App**: https://app.decentralizedrights.com
- **Explorer**: https://explorer.decentralizedrights.com
- **Main Site**: https://decentralizedrights.com

### Backend Services (Render)

- **API Gateway**: https://api.decentralizedrights.com
- **AI Service**: https://ai.decentralizedrights.com
- **Indexer**: Background worker (no public URL)

### Infrastructure

- **IPFS Gateway**: https://ipfs.decentralizedrights.com
- **RPC Node**: https://rpc.decentralizedrights.com

---

## 📋 API Endpoints

### DRP API Gateway (`api.decentralizedrights.com`)

#### Health

- `GET /health` → `{status: "ok", timestamp: "..."}`

#### Proof Submissions

- `POST /submit-activity` → Submit PoAT claim
  - Request: `ActivityClaim`
  - Response: `SubmissionResponse`
- `POST /submit-status` → Submit PoST claim
  - Request: `StatusClaim`
  - Response: `SubmissionResponse`

- `GET /submission/{cid}` → Get submission metadata

#### Rewards

- `POST /reward` → Process reward based on AI assessment
  - Request: `RewardRequest`
  - Response: `RewardResponse`

#### Elder Management

- `GET /elders/quorum` → Get quorum state
- `POST /elders/rotate` → Rotate elder key (admin-only)
- `POST /elders/revoke` → Revoke elder (admin-only)
- `POST /elders/sign-block` → Sign block header

### DRP AI Service (`ai.decentralizedrights.com`)

#### Health

- `GET /health` → `{status: "ok", timestamp: "...", post_quantum_enabled: false}`

#### Assessment

- `POST /assess-activity` → Assess PoAT claim
  - Request: `ActivityClaim`
  - Response: `AssessResponse` (with AI signature)
- `POST /assess-status` → Assess PoST claim
  - Request: `StatusClaim`
  - Response: `AssessResponse` (with AI signature)

---

## 🔐 Environment Variables

### Common (All Services)

- `BLOCKCHAIN_NETWORK=drp-testnet`
- `POST_QUANTUM_ENABLED=false`
- `IPFS_API_URL=https://ipfs.decentralizedrights.com/api/v0`

### DRP API Gateway (`drp-api`)

**Public**:

- `IPFS_API_URL` (see above)
- `AI_API_URL=https://ai.decentralizedrights.com`
- `ORBITDB_ADDR` (optional, if OrbitDB service is separate)

**Secrets** (set in Render/Vercel dashboard):

- `DB_URL=postgresql://...` (Render Postgres connection string)
- `JWT_SECRET` (auto-generated, store securely)
- `ELDER_REGISTRY_ADMIN_KEY` (base64 encoded admin key)

### DRP AI Service (`drp-ai`)

**Secrets**:

- `AI_PRIVATE_KEY_B64` (base64 encoded ed25519 private key)
- `AI_PUBLIC_KEY_B64` (base64 encoded ed25519 public key)

### Indexer (`drp-indexer`)

**Public**:

- `API_URL=https://api.decentralizedrights.com`
- `AI_API_URL=https://ai.decentralizedrights.com`

**Secrets**:

- `DB_URL` (same Postgres as `drp-api`)

### Frontend (Vercel - App Portal)

**Public** (set in Vercel dashboard):

- `NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com`
- `NEXT_PUBLIC_RPC_URL=https://rpc.decentralizedrights.com`
- `NEXT_PUBLIC_CHAIN_ID=31337`
- `NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.decentralizedrights.com`
- `NEXT_PUBLIC_AI_API=https://ai.decentralizedrights.com`
- `NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn`

---

## 🗄️ Database Schema

### Postgres Database (`drp-db`)

- **Tables**: `submissions`, `elders`, `indexed_submissions`
- **Managed by**: Render (free tier)

### OrbitDB Databases

- **`drp.activities`**: Feed database for PoAT submissions
- **`drp.status`**: Docstore database for PoST submissions
- **`drp.explorer.summaries`**: Feed/Docstore for AI summaries
- **Addresses**: Stored in `infrastructure/orbit_addresses.json`

---

## 🔧 Deployment Instructions

### 1. Render Services

#### Prerequisites

- Render account (free tier)
- GitHub repository connected
- Postgres database created

#### Deploy Services

1. **Create Postgres Database**:
   - Go to Render Dashboard → Databases → New PostgreSQL
   - Name: `drp-db`
   - Plan: Free

2. **Deploy `drp-api`**:
   - New → Web Service
   - Connect GitHub repository
   - Root Directory: `backend/drp-api`
   - Build Command: `pip install -r ../requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables: See "DRP API Gateway" section above
   - Link Database: `drp-db`

3. **Deploy `drp-ai`**:
   - New → Web Service
   - Root Directory: `backend/drp-ai`
   - Build Command: `pip install -r ../requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables: See "DRP AI Service" section above

4. **Deploy `drp-indexer`**:
   - New → Background Worker
   - Root Directory: `backend/indexer`
   - Build Command: `pip install -r ../requirements.txt`
   - Start Command: `python indexer.py`
   - Environment Variables: See "Indexer" section above

#### Custom Domains

- Assign custom domains in Render dashboard:
  - `api.decentralizedrights.com` → `drp-api`
  - `ai.decentralizedrights.com` → `drp-ai`

### 2. Vercel Frontends

#### App Portal (`app.decentralizedrights.com`)

1. Go to Vercel Dashboard
2. Import Project → GitHub → `Dr-Website`
3. Root Directory: `app-portal`
4. Framework Preset: Next.js
5. Environment Variables: See "Frontend" section above
6. Custom Domain: `app.decentralizedrights.com`

#### Explorer (`explorer.decentralizedrights.com`)

1. Import Project → GitHub → `Dr-Website`
2. Root Directory: `explorer`
3. Custom Domain: `explorer.decentralizedrights.com`

### 3. IPFS Node

**Option A: Oracle Always Free VM**

1. Provision Oracle VM (Always Free tier)
2. Install IPFS:
   ```bash
   wget https://dist.ipfs.io/go-ipfs/v0.20.0/go-ipfs_v0.20.0_linux-amd64.tar.gz
   tar -xzf go-ipfs_v0.20.0_linux-amd64.tar.gz
   cd go-ipfs && sudo ./install.sh
   ipfs init
   ```
3. Configure IPFS API:
   - Edit `~/.ipfs/config`
   - Set `API.Addresses` to `["/ip4/0.0.0.0/tcp/5001"]`
   - Set `Gateway.Addresses` to `["/ip4/0.0.0.0/tcp/8080"]`
4. Install Nginx reverse proxy with SSL:
   ```bash
   sudo apt install nginx certbot python3-certbot-nginx
   ```
5. Configure Nginx to proxy:
   - `/api/v0/*` → `http://localhost:5001/api/v0/*`
   - `/*` → `http://localhost:8080/*`
6. Get SSL certificate:
   ```bash
   sudo certbot --nginx -d ipfs.decentralizedrights.com
   ```

**Option B: IPFS Service (Fallback)**

- Use web3.storage + Infura IPFS (requires API keys)
- Set `IPFS_API_URL` accordingly

### 4. OrbitDB Service (Optional)

If running OrbitDB as a separate service:

1. Create Node.js service on Render
2. Install OrbitDB dependencies
3. Connect to IPFS node at `ipfs.decentralizedrights.com`
4. Expose HTTP endpoints for `/orbit/add` and `/orbit/get`
5. Set `ORBITDB_ADDR` in `drp-api` environment

---

## ✅ Health Checks

### Automated Smoke Tests

Run the following commands to verify deployment:

```bash
# API Gateway
curl https://api.decentralizedrights.com/health

# AI Service
curl https://ai.decentralizedrights.com/health

# Explorer
curl https://explorer.decentralizedrights.com/api/health

# App Portal
curl https://app.decentralizedrights.com
```

### Expected Responses

- **API Gateway**: `{"status":"ok","timestamp":"..."}`
- **AI Service**: `{"status":"ok","timestamp":"...","post_quantum_enabled":false}`
- **Explorer**: `{"ok":true}` or 200 OK
- **App Portal**: HTML page loads

---

## 🧪 End-to-End Demo Flow

1. **Submit PoAT**:

   ```bash
   curl -X POST https://api.decentralizedrights.com/submit-activity \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Community cleanup",
       "description": "Organized beach cleanup event",
       "timestamp": "2025-01-10T10:00:00Z",
       "media_cid": "QmExample123",
       "hash": "abc123...",
       "actor_id": "0x1234..."
     }'
   ```

   Response: `{submission_id, cid, ipfs_cid, status: "pending"}`

2. **Indexer processes** (automatic, ~30s):
   - Pins payload to IPFS
   - Calls AI service for assessment
   - Stores metadata in Postgres
   - Writes AI summary to OrbitDB

3. **View on Explorer**:
   - Navigate to https://explorer.decentralizedrights.com
   - Search for submission CID
   - View AI assessment and signature

4. **Request Reward**:
   ```bash
   curl -X POST https://api.decentralizedrights.com/reward \
     -H "Content-Type: application/json" \
     -d '{
       "submission_id": "...",
       "actor_id": "0x1234...",
       "ai_assessment": {"verdict": "approved", "score": 85}
     }'
   ```

---

## 🔒 Security Notes

- ✅ **Never commit secrets** to git
- ✅ **Use Render/Vercel secret stores** for sensitive values
- ✅ **CORS restricted** to app. and explorer. domains
- ✅ **Rate limiting** recommended for `/submit-activity` in production
- ✅ **Admin keys** stored as environment variables
- ⚠️ **Rotate keys** if ever exposed in git history (use BFG Repo-Cleaner)

---

## 📊 OrbitDB Addresses

After deployment, OrbitDB addresses will be populated in:

- `backend/infrastructure/orbit_addresses.json`

Current addresses (populated on first use):

```json
{
  "drp.activities": "",
  "drp.status": "",
  "drp.explorer.summaries": ""
}
```

---

## 🐛 Troubleshooting

### API Gateway not responding

- Check Render logs: `Render Dashboard → drp-api → Logs`
- Verify `DB_URL` is set correctly
- Check Postgres connection

### AI Service errors

- Verify `AI_PRIVATE_KEY_B64` and `AI_PUBLIC_KEY_B64` are set
- Check CORS settings

### Frontend build fails

- Verify all `NEXT_PUBLIC_*` environment variables are set in Vercel
- Check build logs in Vercel dashboard

### IPFS connection issues

- Verify `IPFS_API_URL` is accessible
- Check firewall rules on Oracle VM
- Test IPFS API: `curl https://ipfs.decentralizedrights.com/api/v0/version`

---

## 📝 Next Steps

- [ ] Deploy services to Render
- [ ] Configure Vercel frontends
- [ ] Set up IPFS node
- [ ] Generate AI service keys (ed25519)
- [ ] Run E2E demo flow
- [ ] Monitor Sentry for errors
- [ ] Set up automated health checks

---

**Generated**: [Date]  
**Repository**: https://github.com/Decentralized-Rights-Protocol/Dr-Website  
**Documentation**: See `backend/README.md` and `app-portal/README.md`
