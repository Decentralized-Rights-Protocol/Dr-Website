# 🚀 Vercel Deployment - Deploy Now Guide

## ✅ Code Pushed to GitHub Successfully!

**Commit**: `9f502229`  
**Files Changed**: 59 files, 8,011+ lines added  
**Status**: ✅ Pushed to `origin/main`

## 🚀 Quick Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in or create account

2. **Import Repository**
   - Click "Add New..." → "Project"
   - Import from GitHub: `Decentralized-Rights-Protocol/Dr-Website`
   - Select repository and continue

3. **Deploy Each Project Separately**

   **A. Main Site** (`decentralizedrights.com`)
   - Root Directory: `src`
   - Framework Preset: Next.js
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)
   - Click "Deploy"

   **B. App Portal** (`app.decentralizedrights.com`)
   - Click "Add New..." → "Project" again
   - Root Directory: `app-portal`
   - Framework Preset: Next.js
   - Click "Deploy"

   **C. Explorer** (`explorer.decentralizedrights.com`)
   - Click "Add New..." → "Project" again
   - Root Directory: `explorer`
   - Framework Preset: Next.js
   - Click "Deploy"

   **D. API Docs** (`api.decentralizedrights.com`)
   - Click "Add New..." → "Project" again
   - Root Directory: `api`
   - Framework Preset: Next.js
   - Click "Deploy"

   **E. Backend API** (`api.decentralizedrights.com/api/v1`)
   - Click "Add New..." → "Project" again
   - Root Directory: `backend/drp-website-api`
   - Framework Preset: Other
   - Build Command: (auto-detected or leave empty)
   - Runtime: Python 3.11
   - Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy Main Site
cd src
vercel --prod
cd ..

# Deploy App Portal
cd app-portal
vercel --prod
cd ..

# Deploy Explorer
cd explorer
vercel --prod
cd ..

# Deploy API Docs
cd api
vercel --prod
cd ..

# Deploy Backend API
cd backend/drp-website-api
vercel --prod
cd ../..
```

### Option 3: Use Deployment Script

```bash
# Make sure script is executable
chmod +x scripts/vercel-deploy.sh

# Run deployment script
./scripts/vercel-deploy.sh
```

## 🔐 Set Environment Variables

For **EACH** project in Vercel Dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Click **Add New**
3. Add these variables:

### Main Site (`src/`)

```
NEXT_PUBLIC_API_URL = https://api.decentralizedrights.com
NEXT_PUBLIC_BLOCKCHAIN_RPC = https://rpc.decentralizedrights.com
NEXT_PUBLIC_AI_URL = https://ai.decentralizedrights.com
NEXT_PUBLIC_IPFS_URL = https://ipfs.decentralizedrights.com
NEXT_PUBLIC_LEARN_URL = https://decentralizedrights.com/learn
```

### App Portal (`app-portal/`)

```
NEXT_PUBLIC_API_URL = https://api.decentralizedrights.com
NEXT_PUBLIC_BLOCKCHAIN_RPC = https://rpc.decentralizedrights.com
NEXT_PUBLIC_RPC_URL = https://rpc.decentralizedrights.com
NEXT_PUBLIC_CHAIN_ID = 31337
NEXT_PUBLIC_AI_URL = https://ai.decentralizedrights.com
NEXT_PUBLIC_IPFS_URL = https://ipfs.decentralizedrights.com
NEXT_PUBLIC_LEARN_URL = https://decentralizedrights.com/learn
```

### Explorer (`explorer/`)

```
NEXT_PUBLIC_API_URL = https://api.decentralizedrights.com
NEXT_PUBLIC_BLOCKCHAIN_RPC = https://rpc.decentralizedrights.com
NEXT_PUBLIC_AI_URL = https://ai.decentralizedrights.com
NEXT_PUBLIC_IPFS_URL = https://ipfs.decentralizedrights.com
```

### API Docs (`api/`)

```
NEXT_PUBLIC_API_URL = https://api.decentralizedrights.com
```

### Backend API (`backend/drp-website-api/`)

```
BLOCKCHAIN_RPC_URL = https://rpc.decentralizedrights.com
DATABASE_URL = [your-database-url]
REDIS_URL = [your-redis-url]
AI_ENABLED = true
AI_PROVIDER = huggingface
ALLOWED_ORIGINS = https://decentralizedrights.com,https://app.decentralizedrights.com,https://explorer.decentralizedrights.com
```

**Important**:

- Set for **Production**, **Preview**, and **Development**
- After adding variables, **Redeploy** each project

## 🌐 Configure Custom Domains

For **EACH** project:

1. Go to **Project Settings** → **Domains**
2. Click **Add** or **Add Domain**
3. Enter domain:
   - Main Site: `decentralizedrights.com`
   - App Portal: `app.decentralizedrights.com`
   - Explorer: `explorer.decentralizedrights.com`
   - API Docs: `api.decentralizedrights.com`
4. Follow DNS configuration instructions
5. Wait for SSL certificate (usually 1-5 minutes)

## ✅ Verify Deployment

### Check Deployment Status

Visit each project's deployment page in Vercel Dashboard and verify:

- ✅ Build succeeded
- ✅ Deployment successful
- ✅ No errors in logs

### Test URLs

Once domains are configured:

```bash
# Test Main Site
curl -I https://decentralizedrights.com

# Test App Portal
curl -I https://app.decentralizedrights.com

# Test Explorer
curl -I https://explorer.decentralizedrights.com

# Test API Docs
curl -I https://api.decentralizedrights.com

# Test Backend API Health
curl https://api.decentralizedrights.com/health
```

## 📊 Deployment Checklist

- [ ] All 5 projects imported to Vercel
- [ ] All projects deployed successfully
- [ ] Environment variables set for each project
- [ ] Custom domains configured
- [ ] SSL certificates active
- [ ] All URLs accessible
- [ ] API endpoints working
- [ ] Frontend-backend connections verified

## 🎉 Success!

Once all checkboxes are complete:

✅ **DRP Web Ecosystem is LIVE on Vercel!** 🚀

---

**GitHub**: ✅ Pushed successfully  
**Vercel**: 🔄 Ready to deploy  
**Status**: 🚀 **DEPLOY NOW!**
