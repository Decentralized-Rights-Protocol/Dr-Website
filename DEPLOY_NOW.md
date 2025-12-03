# 🚀 DEPLOY NOW - Quick Start Guide

## ✅ Cleanup Complete
- Removed redundant deployment markdown files
- Kept essential guides: `DEPLOYMENT_INSTRUCTIONS.md`, `VERCEL_DEPLOY_NOW.md`, `DOCKER_DEPLOYMENT.md`

## 🚀 Quick Vercel Deployment

### Step 1: Login to Vercel (REQUIRED)

The Vercel CLI requires browser authentication. Run:

```bash
vercel login
```

Then:
1. **Open the URL shown** in your browser
2. **Enter the code shown** (e.g., `DJPW-BCRQ`)
3. **Authorize** the CLI
4. **Press ENTER** in the terminal when done

### Step 2: Deploy All Projects

After logging in, run:

```bash
./scripts/vercel-deploy.sh
```

This will deploy all 5 projects:
- ✅ Main Site (`src/`)
- ✅ App Portal (`app-portal/`)
- ✅ Explorer (`explorer/`)
- ✅ API Docs (`api/`)
- ✅ Backend API (`backend/drp-website-api/`)

### Step 3: Set Environment Variables

After deployment, set environment variables in Vercel Dashboard for each project.

See `VERCEL_DEPLOY_NOW.md` for complete environment variable list.

### Step 4: Configure Domains

In Vercel Dashboard for each project:
- Main Site: `decentralizedrights.com`
- App Portal: `app.decentralizedrights.com`
- Explorer: `explorer.decentralizedrights.com`
- API Docs: `api.decentralizedrights.com`

## 📋 Alternative: Manual Deployment

If you prefer to deploy manually:

```bash
# Main Site
cd src && vercel --prod --yes && cd ..

# App Portal
cd app-portal && vercel --prod --yes && cd ..

# Explorer
cd explorer && vercel --prod --yes && cd ..

# API Docs
cd api && vercel --prod --yes && cd ..

# Backend API
cd backend/drp-website-api && vercel --prod --yes && cd ../..
```

## ✅ Verification

After deployment:
- Check Vercel Dashboard for build status
- Visit deployment URLs
- Test API endpoints
- Verify environment variables are set

## 📖 Full Documentation

- **Complete Guide**: `DEPLOYMENT_INSTRUCTIONS.md`
- **Vercel Quick Start**: `VERCEL_DEPLOY_NOW.md`
- **Docker Guide**: `DOCKER_DEPLOYMENT.md`

---

**Status**: ✅ Ready to Deploy
**Last Updated**: 2024-11-30

