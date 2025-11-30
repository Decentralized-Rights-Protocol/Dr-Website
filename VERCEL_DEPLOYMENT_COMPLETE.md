# 🚀 Vercel Deployment - Complete Guide

## ✅ All Projects Ready for Vercel Deployment

### Projects to Deploy

1. **Main Site** - `decentralizedrights.com` (Root: `src/`)
2. **App Portal** - `app.decentralizedrights.com` (Root: `app-portal/`)
3. **Explorer** - `explorer.decentralizedrights.com` (Root: `explorer/`)
4. **API Docs** - `api.decentralizedrights.com` (Root: `api/`)
5. **Backend API** - `api.decentralizedrights.com/api/v1` (Root: `backend/drp-website-api/`)

## 📋 Pre-Deployment Checklist

- [x] All code implemented
- [x] All components created
- [x] Vercel configurations ready
- [ ] Vercel CLI installed
- [ ] Vercel account connected
- [ ] Environment variables ready

## 🚀 Step-by-Step Vercel Deployment

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy Main Site

```bash
cd src
vercel --prod
```

**Configuration:**
- Root Directory: `src/`
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

### Step 4: Deploy App Portal

```bash
cd app-portal
vercel --prod
```

**Configuration:**
- Root Directory: `app-portal/`
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

### Step 5: Deploy Explorer

```bash
cd explorer
vercel --prod
```

**Configuration:**
- Root Directory: `explorer/`
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

### Step 6: Deploy API Docs

```bash
cd api
vercel --prod
```

**Configuration:**
- Root Directory: `api/`
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

### Step 7: Deploy Backend API

```bash
cd backend/drp-website-api
vercel --prod
```

**Configuration:**
- Root Directory: `backend/drp-website-api/`
- Framework: Other (Python/FastAPI)
- Build Command: (auto-detected)
- Output Directory: (serverless functions)

## 🔐 Environment Variables Setup

### For Each Project in Vercel Dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables:

#### Main Site (`src/`)
```env
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
NEXT_PUBLIC_BLOCKCHAIN_RPC=https://rpc.decentralizedrights.com
NEXT_PUBLIC_AI_URL=https://ai.decentralizedrights.com
NEXT_PUBLIC_IPFS_URL=https://ipfs.decentralizedrights.com
NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn
```

#### App Portal (`app-portal/`)
```env
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
NEXT_PUBLIC_BLOCKCHAIN_RPC=https://rpc.decentralizedrights.com
NEXT_PUBLIC_RPC_URL=https://rpc.decentralizedrights.com
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_AI_URL=https://ai.decentralizedrights.com
NEXT_PUBLIC_IPFS_URL=https://ipfs.decentralizedrights.com
NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn
```

#### Explorer (`explorer/`)
```env
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
NEXT_PUBLIC_BLOCKCHAIN_RPC=https://rpc.decentralizedrights.com
NEXT_PUBLIC_AI_URL=https://ai.decentralizedrights.com
NEXT_PUBLIC_IPFS_URL=https://ipfs.decentralizedrights.com
```

#### API Docs (`api/`)
```env
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
```

#### Backend API (`backend/drp-website-api/`)
```env
BLOCKCHAIN_RPC_URL=https://rpc.decentralizedrights.com
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
AI_ENABLED=true
AI_PROVIDER=huggingface
ALLOWED_ORIGINS=https://decentralizedrights.com,https://app.decentralizedrights.com,https://explorer.decentralizedrights.com
```

**Important**: Set variables for **Production**, **Preview**, and **Development** environments.

## 🌐 Domain Configuration

### For Each Project:

1. Go to **Project Settings** → **Domains**
2. Add custom domain:

#### Main Site
- Domain: `decentralizedrights.com`
- Also add: `www.decentralizedrights.com` (optional)

#### App Portal
- Domain: `app.decentralizedrights.com`

#### Explorer
- Domain: `explorer.decentralizedrights.com`

#### API Docs
- Domain: `api.decentralizedrights.com`

#### Backend API
- Domain: `api.decentralizedrights.com` (if using Vercel)
- Or use subpath: `api.decentralizedrights.com/api/v1`

### DNS Configuration

Add these DNS records in your domain provider:

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: app
Value: cname.vercel-dns.com

Type: CNAME
Name: explorer
Value: cname.vercel-dns.com

Type: CNAME
Name: api
Value: cname.vercel-dns.com
```

Vercel will automatically:
- Provision SSL certificates
- Configure HTTPS
- Set up DNS routing

## 📝 Deployment Script

Create a quick deployment script:

```bash
#!/bin/bash
# Quick deploy all projects

echo "🚀 Deploying DRP Web Ecosystem to Vercel..."

# Main Site
echo "Deploying Main Site..."
cd src && vercel --prod --yes && cd ..

# App Portal
echo "Deploying App Portal..."
cd app-portal && vercel --prod --yes && cd ..

# Explorer
echo "Deploying Explorer..."
cd explorer && vercel --prod --yes && cd ..

# API Docs
echo "Deploying API Docs..."
cd api && vercel --prod --yes && cd ..

# Backend API
echo "Deploying Backend API..."
cd backend/drp-website-api && vercel --prod --yes && cd ../..

echo "✅ All deployments complete!"
```

## ✅ Verification Steps

### 1. Check Deployment Status

Visit Vercel Dashboard:
- https://vercel.com/dashboard

Check each project's deployment status.

### 2. Test All URLs

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

### 3. Verify Environment Variables

Check each project in Vercel Dashboard:
- Settings → Environment Variables
- Ensure all variables are set for Production

### 4. Test API Connections

```bash
# Test token balance endpoint
curl https://api.decentralizedrights.com/api/v1/tokens/balance/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb

# Test health endpoint
curl https://api.decentralizedrights.com/health
```

## 🔧 Troubleshooting

### Build Failures

1. **Check Build Logs** in Vercel Dashboard
2. **Verify Node Version** (should be 18+)
3. **Clear Build Cache**: Delete `.next` folders
4. **Check Dependencies**: Ensure `package.json` is correct

### Environment Variable Issues

1. **Verify Variables**: Check in Vercel Dashboard
2. **Redeploy**: After adding variables, redeploy
3. **Check Naming**: Variables must start with `NEXT_PUBLIC_` for frontends

### Domain Issues

1. **Check DNS**: Verify DNS records are correct
2. **Wait for Propagation**: DNS can take up to 48 hours
3. **Check SSL**: Vercel auto-provisions SSL certificates

## 📊 Deployment Status

After deployment, you should see:

| Project | URL | Status |
|---------|-----|--------|
| Main Site | https://decentralizedrights.com | ✅ Live |
| App Portal | https://app.decentralizedrights.com | ✅ Live |
| Explorer | https://explorer.decentralizedrights.com | ✅ Live |
| API Docs | https://api.decentralizedrights.com | ✅ Live |
| Backend API | https://api.decentralizedrights.com/api/v1 | ✅ Live |

## 🎉 Success!

Once all projects are deployed and verified:

✅ All URLs accessible
✅ All API endpoints working
✅ Environment variables set
✅ Domains configured
✅ SSL certificates active

**DRP Web Ecosystem is LIVE! 🚀**

---

**Status**: ✅ Ready for Vercel Deployment
**Last Updated**: 2024

