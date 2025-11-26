# DRP Frontend Ecosystem Setup Guide

This document outlines the complete frontend ecosystem setup for the Decentralized Rights Protocol.

## 📁 Project Structure

```
/explorer          → explorer.decentralizedrights.com
/api               → api.decentralizedrights.com
/app-portal        → app.decentralizedrights.com
/src               → decentralizedrights.com (main website)
```

## 🔗 API Integration

All frontend projects connect to the Dr-Blockchain backend at `https://api.decentralizedrights.com`.

### Key Endpoints

- **Activity Submission**: `POST /api/activity/submit`
- **Status & PoST Score**: `GET /api/status/profile?id={user}`
- **Transactions**: `GET /api/transactions`
- **Activity Feed**: `GET /api/activity/feed`
- **AI Summary**: `GET /api/ai/summary?activity_id={id}`
- **Rewards Claim**: `GET /api/rewards/claim?user_id={id}&submission_id={id}`
- **Status Rankings**: `GET /api/status/rankings`

All API URLs read from `process.env.NEXT_PUBLIC_API_URL`.

## 🖥️ Explorer (`/explorer`)

**Purpose**: Blockchain explorer and activity feed viewer

**Features**:
- ✅ Transaction feed with real-time updates
- ✅ Activity feed with verification status
- ✅ AI verification summaries
- ✅ Status rankings leaderboard
- ✅ OrbitDB CID inspector
- ✅ Quantum-secure hash display
- ✅ Search functionality
- ✅ Copy-to-clipboard for hashes

**Tech Stack**:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React icons

**Environment Variables**:
```bash
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
```

## 📱 App Portal (`/app-portal`)

**Purpose**: User dashboard and activity submission interface

**Features**:
- ✅ Dashboard with stats and charts
- ✅ Status score display
- ✅ Activity log
- ✅ Rewards tracking
- ✅ Progress monitoring
- ✅ AI verification history
- ✅ Submit Activity page (upload text/files)
- ✅ Wallet page with connection
- ✅ Profile page with quantum-secure ID

**Tech Stack**:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- Zustand for state management
- React Hook Form + Zod
- Ethers.js for wallet integration

**Environment Variables**:
```bash
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
NEXT_PUBLIC_RPC_URL=https://rpc.decentralizedrights.com
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.decentralizedrights.com
NEXT_PUBLIC_AI_API=https://ai.decentralizedrights.com
NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn
```

## 📘 API Documentation (`/api`)

**Purpose**: Developer-facing API documentation site

**Features**:
- ✅ Auto-generated endpoint documentation
- ✅ Request/response examples
- ✅ Code samples in multiple languages (JavaScript, Python, C++)
- ✅ Status codes and error handling
- ✅ RPC methods documentation
- ✅ AI verification examples
- ✅ Complete Dr-Blockchain endpoint reference

**Tech Stack**:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## 🧪 Health Status Page (`/status`)

**Purpose**: System health monitoring dashboard

**Features**:
- ✅ Blockchain node status
- ✅ RPC endpoint status
- ✅ OrbitDB health check
- ✅ IPFS pinning status
- ✅ AI server availability
- ✅ Explorer connection status
- ✅ Real-time latency monitoring
- ✅ Auto-refresh every 30 seconds

**Location**: `/src/app/status/page.tsx` (accessible from main website)

## 🚀 Deployment Configuration

### Vercel Setup

Each sub-project should be deployed as a separate Vercel project:

#### 1. Explorer (`explorer.decentralizedrights.com`)
- **Root Directory**: `explorer`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Framework**: Next.js

#### 2. App Portal (`app.decentralizedrights.com`)
- **Root Directory**: `app-portal`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Framework**: Next.js
- **Environment Variables**: See above

#### 3. API Docs (`api.decentralizedrights.com`)
- **Root Directory**: `api`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Framework**: Next.js

#### 4. Main Website (`decentralizedrights.com`)
- **Root Directory**: `src` (or root if configured)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Framework**: Next.js

### Environment Variables

Set the following in each Vercel project's environment variables:

```bash
# Required for all projects
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com

# Required for app-portal
NEXT_PUBLIC_RPC_URL=https://rpc.decentralizedrights.com
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.decentralizedrights.com
NEXT_PUBLIC_AI_API=https://ai.decentralizedrights.com
NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn
```

## 📝 API Helper Libraries

Each project has its own API helper in `/lib/api.ts`:

- **Explorer**: `/explorer/src/lib/api.ts`
- **App Portal**: `/app-portal/src/lib/api.ts`

Both use the same base URL from `process.env.NEXT_PUBLIC_API_URL`.

## ✅ Implementation Checklist

- [x] Create shared API helper libraries
- [x] Build Explorer frontend with all features
- [x] Build App Portal with dashboard, activity submission, wallet, and profile
- [x] Enhance API documentation site
- [x] Build Health Status page
- [x] Update all projects to use environment variables
- [x] Configure deployment setup

## 🔄 Next Steps

1. **Set Environment Variables**: Configure all environment variables in Vercel for each project
2. **Test API Connections**: Verify all endpoints are accessible from frontends
3. **Deploy to Vercel**: Deploy each sub-project to its respective subdomain
4. **Monitor Health**: Use the `/status` page to monitor system health
5. **Update Backend**: Ensure Dr-Blockchain backend implements all documented endpoints

## 📚 Additional Resources

- Main Website: `https://decentralizedrights.com`
- Explorer: `https://explorer.decentralizedrights.com`
- App Portal: `https://app.decentralizedrights.com`
- API Docs: `https://api.decentralizedrights.com`
- Health Status: `https://decentralizedrights.com/status`

