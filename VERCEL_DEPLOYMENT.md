# 🚀 Vercel Deployment Guide

**Status**: ✅ Builds Verified - Ready for Deployment  
**Projects**: `app-portal` & `explorer`

---

## ✅ Pre-Deployment Verification

Both projects build successfully:

- ✅ **app-portal**: Build passes (13 pages generated)
- ✅ **explorer**: Build passes (5 pages generated)

---

## 📋 Deployment Steps

### Option 1: Vercel Dashboard (Recommended)

#### 1. Deploy App Portal (`app.decentralizedrights.com`)

1. **Go to Vercel Dashboard**:
   - Visit: https://vercel.com/new
   - Or existing project: https://vercel.com/decentralized-rights-projects

2. **Import Project**:
   - Click "Import Project" or "Add New..." → "Project"
   - Connect to GitHub repository: `Decentralized-Rights-Protocol/Dr-Website`
   - Select repository and click "Import"

3. **Configure Project**:
   - **Project Name**: `drp-app-portal` (or `app-portal`)
   - **Root Directory**: `app-portal` ⚠️ **IMPORTANT**
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: Leave default (`npm run build`)
   - **Output Directory**: Leave default (`.next`)
   - **Install Command**: Leave default (`npm install`)

4. **Environment Variables**:
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
   NEXT_PUBLIC_RPC_URL=https://rpc.decentralizedrights.com
   NEXT_PUBLIC_CHAIN_ID=31337
   NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.decentralizedrights.com
   NEXT_PUBLIC_AI_API=https://ai.decentralizedrights.com
   NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn
   ```
   - Set for: **Production**, **Preview**, and **Development**

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete

6. **Add Custom Domain**:
   - Go to **Settings** → **Domains**
   - Click "Add"
   - Enter: `app.decentralizedrights.com`
   - Click "Add"
   - Follow DNS configuration instructions if needed

---

#### 2. Deploy Explorer (`explorer.decentralizedrights.com`)

1. **Create New Project**:
   - Same repository: `Decentralized-Rights-Protocol/Dr-Website`
   - Click "Add New..." → "Project"

2. **Configure Project**:
   - **Project Name**: `drp-explorer` (or `explorer`)
   - **Root Directory**: `explorer` ⚠️ **IMPORTANT**
   - **Framework Preset**: Next.js
   - **Build Command**: Default
   - **Output Directory**: Default

3. **Deploy**:
   - Click "Deploy"
   - Wait for build

4. **Add Custom Domain**:
   - **Settings** → **Domains** → **Add**
   - Enter: `explorer.decentralizedrights.com`

---

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy app-portal
cd app-portal
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://api.decentralizedrights.com
# Repeat for other NEXT_PUBLIC_* variables

# Deploy explorer
cd ../explorer
vercel --prod
```

---

### Option 3: GitHub Actions (Auto-Deploy)

The repository includes GitHub Actions workflows (`.github/workflows/deploy-vercel.yml`).

**Prerequisites**:
1. Add Vercel secrets to GitHub:
   - Go to: https://github.com/Decentralized-Rights-Protocol/Dr-Website/settings/secrets/actions
   - Add secrets:
     - `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
     - `VERCEL_ORG_ID` - Get from Vercel dashboard (Settings → General)
     - `VERCEL_APP_PORTAL_PROJECT_ID` - Get from app-portal project settings
     - `VERCEL_EXPLORER_PROJECT_ID` - Get from explorer project settings

2. **Trigger Deployment**:
   - Push to `main` branch
   - Workflows automatically deploy both projects

---

## 🔧 Environment Variables Checklist

### App Portal (`app-portal`)

All variables must start with `NEXT_PUBLIC_` (public to browser):

```env
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
NEXT_PUBLIC_RPC_URL=https://rpc.decentralizedrights.com
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.decentralizedrights.com
NEXT_PUBLIC_AI_API=https://ai.decentralizedrights.com
NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn
```

### Explorer (`explorer`)

No environment variables required (uses default API endpoints).

---

## ✅ Post-Deployment Verification

### 1. Check Build Logs
- Go to project → **Deployments** → Click latest deployment
- Verify build completed successfully (green checkmark)

### 2. Test URLs

**App Portal**:
```bash
curl https://app.decentralizedrights.com
# Should return HTML (200 OK)
```

**Explorer**:
```bash
curl https://explorer.decentralizedrights.com
# Should return HTML (200 OK)
```

### 3. Manual Testing

1. **App Portal** (`app.decentralizedrights.com`):
   - ✅ Homepage loads
   - ✅ Wallet connection works
   - ✅ PoAT submission form accessible
   - ✅ PoST submission form accessible
   - ✅ Dashboard loads

2. **Explorer** (`explorer.decentralizedrights.com`):
   - ✅ Explorer page loads
   - ✅ Can search transactions
   - ✅ Blocks display correctly

---

## 🐛 Troubleshooting

### Build Fails with "Missing required environment variable"

**Solution**: Add all `NEXT_PUBLIC_*` environment variables in Vercel dashboard:
- **Settings** → **Environment Variables**
- Add each variable for Production, Preview, and Development

### Build Fails with "Module not found"

**Solution**: 
- Verify `Root Directory` is set correctly (`app-portal` or `explorer`)
- Check `package.json` exists in root directory
- Try redeploying after clearing build cache

### Page Shows "Error: Missing required environment variable"

**Solution**: 
- Verify environment variables are set in Vercel
- Ensure variable names start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding variables

### Custom Domain Not Working

**Solution**:
1. Check DNS records in domain registrar:
   ```
   Type: CNAME
   Name: app (or explorer)
   Value: cname.vercel-dns.com
   ```
2. Wait 15 minutes to 24 hours for DNS propagation
3. Verify in Vercel → Settings → Domains that domain shows "Valid Configuration"

---

## 📊 Deployment Status

After deployment, verify:

- [ ] App Portal builds successfully
- [ ] Explorer builds successfully
- [ ] Environment variables set correctly
- [ ] Custom domains configured
- [ ] DNS records propagated
- [ ] Sites accessible at:
  - https://app.decentralizedrights.com
  - https://explorer.decentralizedrights.com

---

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **App Portal Project**: https://vercel.com/decentralized-rights-projects/drp-app-portal
- **Explorer Project**: https://vercel.com/decentralized-rights-projects/drp-explorer
- **GitHub Repository**: https://github.com/Decentralized-Rights-Protocol/Dr-Website

---

## 📝 Notes

- **Root Directory is Critical**: Make sure `app-portal` and `explorer` are set as root directories
- **Environment Variables**: Must be set in Vercel dashboard (not just `.env` file)
- **Auto-Deploy**: Pushing to `main` branch will auto-deploy if GitHub Actions are configured
- **Build Time**: Typical build takes 2-3 minutes

---

**Ready to deploy!** Follow the steps above and your DRP frontends will be live on Vercel. 🚀

