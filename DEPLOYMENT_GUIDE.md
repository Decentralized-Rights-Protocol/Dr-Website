# 🚀 Complete Deployment Guide for DRP Website

## ✅ Current Status

All code has been pushed to GitHub and is building on Vercel!

### GitHub Repository
**https://github.com/Decentralized-Rights-Protocol/Dr-Website**

Latest commits:
- Navigation menu added with subdomain links
- All redirect pages created for subdomains
- TypeScript errors fixed
- All 31 pages working correctly

---

## 📁 Project Structure

The repository contains 4 independent projects:

### 1. **Main Website** (Root `/`)
- **Purpose**: decentralizedrights.com
- **Framework**: Next.js with App Router
- **Root Directory**: `/` (project root)
- **Key Pages**:
  - Homepage: `/`
  - Learn: `/learn`
  - Why DRP: `/why-drp`
  - Docs: `/docs/*`
  - Roadmap: `/roadmap`
  - Whitepaper: `/whitepaper`
  - Community: `/community`
  - Custom 404: `/not-found.tsx`

### 2. **Explorer** (`/explorer` folder)
- **Purpose**: explorer.decentralizedrights.com
- **Framework**: Next.js
- **Root Directory**: `explorer`
- **Features**: Blockchain transaction explorer

### 3. **API** (`/api` folder)  
- **Purpose**: api.decentralizedrights.com
- **Framework**: Next.js API Routes
- **Root Directory**: `api`
- **Features**: REST API endpoints

### 4. **App** (`/app` folder)
- **Purpose**: app.decentralizedrights.com
- **Framework**: Next.js
- **Root Directory**: `app`
- **Features**: User dashboard and application

---

## 🔧 Vercel Project Configuration

### Configure Root Directories in Vercel

Each subdomain project needs to be configured with its root directory:

#### **For drp-frontend** (app.decentralizedrights.com):
1. Go to **Project Settings** → **General**
2. **Root Directory**: `app`
3. **Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `cd app && npm run build`
   - Output Directory: `app/.next`
   - Install Command: `cd app && npm install`

#### **For drp-blockchain-explorer** (explorer.decentralizedrights.com):
1. Go to **Project Settings** → **General**
2. **Root Directory**: `explorer`
3. **Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `cd explorer && npm run build`
   - Output Directory: `explorer/.next`
   - Install Command: `cd explorer && npm install`

#### **For drp-backend-api** (api.decentralizedrights.com):
1. Go to **Project Settings** → **General**
2. **Root Directory**: `api`
3. **Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `cd api && npm install`
   - Output Directory: `api`
   - Install Command: `cd api && npm install`

#### **For dr-website** (decentralizedrights.com):
1. Go to **Project Settings** → **General**
2. **Root Directory**: `/` (leave empty or use `./`)
3. **Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

---

## 🌐 DNS Configuration

### Add Custom Domains in Vercel

For each project, add the custom domain:

#### 1. **dr-website**
   - Domain: `decentralizedrights.com`
   - Also add: `www.decentralizedrights.com`

#### 2. **drp-frontend**
   - Domain: `app.decentralizedrights.com`

#### 3. **drp-blockchain-explorer**
   - Domain: `explorer.decentralizedrights.com`

#### 4. **drp-backend-api**
   - Domain: `api.decentralizedrights.com`

### DNS Records (In Namespace/Namecheap)

```
# Main domain
Type: A
Name: @
Value: 76.76.21.21

# OR use CNAME for root
Type: CNAME
Name: @
Value: cname.vercel-dns.com

# WWW subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# App subdomain
Type: CNAME
Name: app
Value: cname.vercel-dns.com

# Explorer subdomain
Type: CNAME
Name: explorer
Value: cname.vercel-dns.com

# API subdomain
Type: CNAME
Name: api
Value: cname.vercel-dns.com
```

---

## ✅ Current Vercel Deployments

### 1. **dr-website** (Main Site)
- URL: https://dr-website-git-main-decentralized-rights-projects.vercel.app
- Custom Domain: decentralizedrights.com (needs to be added)
- Status: ✅ READY

### 2. **drp-frontend** (App)
- URL: https://drp-frontend-git-main-decentralized-rights-projects.vercel.app
- Custom Domain: app.decentralizedrights.com (needs to be added)
- Status: ✅ READY

### 3. **drp-blockchain-explorer** (Explorer)
- URL: https://drp-blockchain-explorer-git-main-decentralized-rights-projects.vercel.app
- Custom Domain: explorer.decentralizedrights.com (needs to be added)
- Status: ✅ READY

### 4. **drp-backend-api** (API)
- URL: https://drp-backend-api-git-main-decentralized-rights-projects.vercel.app
- Custom Domain: api.decentralizedrights.com (needs to be added)
- Status: ✅ READY

---

## 🔍 Navigation & Features

### Main Site Navigation
- ✅ Home → `/`
- ✅ Learn → `/learn` (with AI tutor, dashboard, leaderboard)
- ✅ Why DRP → `/why-drp`
- ✅ Docs → `/docs` (getting started, protocol, consensus, etc.)
- ✅ Roadmap → `/roadmap`
- ✅ Whitepaper → `/whitepaper`
- ✅ Community → `/community`
- ✅ Explorer → Redirects to explorer.decentralizedrights.com
- ✅ Launch App → Redirects to app.decentralizedrights.com

### Subdomain Pages
- `/api` → Auto-redirects to api.decentralizedrights.com
- `/explorer` → Auto-redirects to explorer.decentralizedrights.com
- `/app` → Auto-redirects to app.decentralizedrights.com

### Custom Error Pages
- ✅ 404 Page: `src/app/not-found.tsx` (custom branded page)
- ✅ Error Page: `src/app/error.tsx` (custom error handling)

---

## 🧪 Testing Checklist

After DNS propagation, test these URLs:

### Main Site (decentralizedrights.com)
- [ ] https://decentralizedrights.com → Homepage loads
- [ ] https://decentralizedrights.com/learn → Learn page loads
- [ ] https://decentralizedrights.com/why-drp → Why DRP page loads
- [ ] https://decentralizedrights.com/docs → Documentation index loads
- [ ] https://decentralizedrights.com/roadmap → Roadmap loads
- [ ] https://decentralizedrights.com/whitepaper → Whitepaper loads
- [ ] https://decentralizedrights.com/community → Community loads
- [ ] https://decentralizedrights.com/random-page → Custom 404 loads

### Subdomains
- [ ] https://app.decentralizedrights.com → App dashboard loads
- [ ] https://explorer.decentralizedrights.com → Blockchain explorer loads
- [ ] https://api.decentralizedrights.com → API documentation loads

### Redirects from Main Site
- [ ] https://decentralizedrights.com/api → Redirects to api.decentralizedrights.com
- [ ] https://decentralizedrights.com/explorer → Redirects to explorer.decentralizedrights.com
- [ ] https://decentralizedrights.com/app → Redirects to app.decentralizedrights.com

---

## 🐛 Troubleshooting

### Issue: Build Fails with "Cannot find module"
**Solution**: Ensure root directory is set correctly in Vercel project settings

### Issue: 404 on subdomain
**Solution**: 
1. Check DNS records are correct
2. Verify custom domain is added in Vercel
3. Wait for DNS propagation (up to 48 hours)

### Issue: Navigation menu not showing
**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Redirects not working
**Solution**: The redirects use client-side JavaScript, ensure JavaScript is enabled

---

## 📋 Post-Deployment Steps

1. **Add Custom Domains** in each Vercel project
2. **Configure DNS** in your domain registrar
3. **Enable SSL** (automatic in Vercel)
4. **Test all pages** using the checklist above
5. **Monitor analytics** in Vercel dashboard
6. **Set up monitoring** (optional: Sentry, LogRocket)

---

## 🎉 You're All Set!

Your Decentralized Rights Protocol website is now fully configured with:
- ✅ Main site with navigation
- ✅ 31 working pages
- ✅ Custom 404 page
- ✅ Subdomain redirects  
- ✅ All 4 projects deployed to Vercel
- ✅ Ready for custom domain configuration

**Need help?** Check the Vercel dashboard or refer to this guide.

---

**Repository**: https://github.com/Decentralized-Rights-Protocol/Dr-Website  
**Last Updated**: November 7, 2025  
**Status**: ✅ Production Ready
