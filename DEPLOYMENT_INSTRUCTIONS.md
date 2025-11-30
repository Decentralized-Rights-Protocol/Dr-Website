# 🚀 DRP Web Ecosystem - Final Deployment Instructions

## ✅ ALL CODE COMPLETE - READY TO DEPLOY!

### Quick Deployment Guide

## Step 1: Test Builds Locally

```bash
# Test all Next.js projects
./scripts/test-builds.sh

# This will verify:
# ✅ Main site builds
# ✅ App portal builds  
# ✅ Explorer builds
# ✅ API docs build
```

## Step 2: Build Docker Image (Backend API)

```bash
# Build Docker image for backend API
./scripts/docker-build.sh

# Or manually:
cd backend/drp-website-api
docker build -t drp-api:latest .
```

## Step 3: Deploy Backend API

### Option A: Docker Deployment

```bash
cd backend/drp-website-api

# Start with Docker Compose (includes PostgreSQL + Redis)
docker-compose up -d

# Or run standalone
docker run -d \
  -p 8000:8000 \
  --name drp-api \
  --env-file .env \
  drp-api:latest
```

### Option B: Vercel Serverless

```bash
cd backend/drp-website-api
vercel --prod
```

**Verify Backend:**
```bash
curl https://api.decentralizedrights.com/health
```

## Step 4: Deploy Frontends to Vercel

### Main Site (`decentralizedrights.com`)

```bash
cd src

# Install dependencies
npm install

# Build
npm run build

# Deploy
vercel --prod

# Or use Vercel Dashboard:
# 1. Connect GitHub repo
# 2. Set root directory to: src
# 3. Add environment variables (see below)
# 4. Deploy
```

### App Portal (`app.decentralizedrights.com`)

```bash
cd app-portal

# Install dependencies
npm install

# Build
npm run build

# Deploy
vercel --prod

# Or use Vercel Dashboard:
# 1. Create new project
# 2. Set root directory to: app-portal
# 3. Add environment variables (see below)
# 4. Deploy
```

### Explorer (`explorer.decentralizedrights.com`)

```bash
cd explorer

# Install dependencies
npm install

# Build
npm run build

# Deploy
vercel --prod
```

### API Docs (`api.decentralizedrights.com`)

```bash
cd api

# Install dependencies
npm install

# Build
npm run build

# Deploy
vercel --prod
```

## Step 5: Set Environment Variables in Vercel

For **EACH** project in Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

### Main Site (`src/`)
```env
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
NEXT_PUBLIC_BLOCKCHAIN_RPC=https://rpc.decentralizedrights.com
NEXT_PUBLIC_AI_URL=https://ai.decentralizedrights.com
NEXT_PUBLIC_IPFS_URL=https://ipfs.decentralizedrights.com
NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn
```

### App Portal (`app-portal/`)
```env
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
NEXT_PUBLIC_BLOCKCHAIN_RPC=https://rpc.decentralizedrights.com
NEXT_PUBLIC_RPC_URL=https://rpc.decentralizedrights.com
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_AI_URL=https://ai.decentralizedrights.com
NEXT_PUBLIC_IPFS_URL=https://ipfs.decentralizedrights.com
NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn
```

### Explorer (`explorer/`)
```env
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
NEXT_PUBLIC_BLOCKCHAIN_RPC=https://rpc.decentralizedrights.com
NEXT_PUBLIC_AI_URL=https://ai.decentralizedrights.com
NEXT_PUBLIC_IPFS_URL=https://ipfs.decentralizedrights.com
```

### API Docs (`api/`)
```env
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
```

3. **Set for**: Production, Preview, and Development
4. **Redeploy** each project after adding variables

## Step 6: Configure Custom Domains

In Vercel Dashboard for each project:

1. Go to **Settings** → **Domains**
2. Add custom domain:
   - Main Site: `decentralizedrights.com`
   - App Portal: `app.decentralizedrights.com`
   - Explorer: `explorer.decentralizedrights.com`
   - API Docs: `api.decentralizedrights.com`
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

## Step 7: Verify Deployment

### Check All URLs

```bash
# Main Site
curl -I https://decentralizedrights.com

# App Portal
curl -I https://app.decentralizedrights.com

# Explorer
curl -I https://explorer.decentralizedrights.com

# API Docs
curl -I https://api.decentralizedrights.com

# Backend API Health
curl https://api.decentralizedrights.com/health
```

### Test API Endpoints

```bash
# Token Balance
curl https://api.decentralizedrights.com/api/v1/tokens/balance/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb

# Health Check
curl https://api.decentralizedrights.com/health

# Explorer Transactions
curl https://api.decentralizedrights.com/api/v1/explorer/transactions?limit=10
```

## Step 8: Monitor & Test

1. **Check Vercel Logs** for each project
2. **Test Frontend-Backend Connections**
3. **Verify Gamification System** works
4. **Test Learn Module** functionality
5. **Check All Routes** are accessible

## 🐳 Docker Deployment Alternative

If deploying backend via Docker in production:

### Using Docker Compose (Recommended)

```bash
cd backend/drp-website-api

# Create .env file with production values
cp .env.example .env
# Edit .env with production settings

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f api
```

### Using Docker Swarm or Kubernetes

The Dockerfile is production-ready for:
- Docker Swarm
- Kubernetes
- AWS ECS
- Google Cloud Run
- Azure Container Instances

## 📋 Deployment Checklist

### Pre-Deployment
- [x] All code implemented
- [x] All components created
- [x] Build scripts ready
- [ ] Environment variables documented
- [ ] Build tests passed locally

### Deployment Steps
- [ ] Backend API deployed (Docker or Vercel)
- [ ] Main site deployed to Vercel
- [ ] App portal deployed to Vercel
- [ ] Explorer deployed to Vercel
- [ ] API docs deployed to Vercel
- [ ] Environment variables set in Vercel
- [ ] Custom domains configured
- [ ] SSL certificates active

### Post-Deployment
- [ ] All URLs accessible
- [ ] API endpoints working
- [ ] Frontend-backend connections verified
- [ ] Gamification system tested
- [ ] Learn module tested
- [ ] Health checks passing

## 🚨 Troubleshooting

### Build Failures
- Check Node.js version (18+)
- Clear `.next` folders: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`

### API Connection Issues
- Verify environment variables are set
- Check CORS settings in backend
- Verify API URL is correct

### Docker Issues
- Check Docker daemon is running
- Verify .env file exists
- Check port availability

## 📞 Support Resources

- **Docker Guide**: See `DOCKER_DEPLOYMENT.md`
- **API Docs**: See `backend/drp-website-api/API_DOCUMENTATION.md`
- **Implementation Plan**: See `DRP_CONNECTION_PLAN.md`

## 🎉 Success Criteria

✅ All URLs accessible
✅ All API endpoints responding
✅ Frontend-backend connected
✅ Gamification working
✅ Learn module functional
✅ No build errors
✅ No runtime errors

**When all criteria are met, DRP is LIVE! 🚀**

---

**Status**: ✅ Ready for Deployment
**Last Updated**: 2024

