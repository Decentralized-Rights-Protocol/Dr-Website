# DRP Web Ecosystem Connection Plan

## Overview

This document outlines the plan to connect the DRP web ecosystem to the live DRP backend (Dr-Blockchain repo) and implement all requested features.

## Implementation Status

### ✅ Completed

1. **DRP Website API Backend** (`backend/drp-website-api/`)
   - ✅ Comprehensive FastAPI backend created
   - ✅ All API endpoints defined (28 REST + 1 WebSocket)
   - ✅ AI integration ready
   - ✅ Docker and Vercel deployment configs
   - ✅ Complete documentation

2. **API Client Updates**
   - ✅ Updated `app-portal/src/lib/api.ts` to use new backend endpoints
   - ✅ Updated `explorer/src/lib/api.ts` to use new backend endpoints
   - ✅ Path changes: `/api/activity/submit` → `/api/v1/activities/submit`

3. **Gamification Engine** (`src/lib/gamification.ts`)
   - ✅ Core gamification system created
   - ✅ XP, levels, streaks, badges
   - ✅ Module completion tracking
   - ✅ Local storage integration
   - ✅ Badge definitions

### 🚧 In Progress

1. **Environment Variables**
   - 🚧 Need to create `.env.example` files for each project
   - 🚧 Update existing env files

2. **Learn Module Gamification UI**
   - 🚧 Add XP progress bar
   - 🚧 Add level badges
   - 🚧 Add badge display
   - 🚧 Add confetti animations
   - 🚧 Locked/unlocked lesson progression

3. **Learn Module Routing Fixes**
   - 🚧 Fix dynamic routing
   - 🚧 Fix 404 pages
   - 🚧 Ensure MDX content loads

### 📋 Remaining Tasks

1. **Badge Icons** (6 SVG files needed)
   - `/public/badges/explorer.svg`
   - `/public/badges/rights-guardian.svg`
   - `/public/badges/activity-hero.svg`
   - `/public/badges/ai-elder.svg`
   - `/public/badges/sustainability.svg`
   - `/public/badges/quantum.svg`

2. **Learn Dashboard Page** (`/src/app/learn/dashboard/page.tsx`)
   - Display total XP
   - Display level
   - Show badges unlocked
   - Show streak number
   - Modules completed
   - Leaderboard (simulated)

3. **Quiz System for Lessons**
   - Create quiz.json files for each lesson
   - Add quiz component to lesson pages
   - Auto-check answers
   - Award XP

4. **App Portal Integration** (`app.decentralizedrights.com`)
   - Connect wallet creation/login
   - Connect PoAT submission
   - Connect PoST claims
   - Display rewards ($DeRi + $RIGHTS)
   - Activity logs
   - AI verification result viewer

5. **API Documentation Site** (`api.decentralizedrights.com`)
   - Show full DRP API documentation
   - Show live API response examples
   - Embed Swagger or ReDoc

6. **Explorer Updates** (`explorer.decentralizedrights.com`)
   - Show blocks
   - Show transactions
   - Show IPFS-linked proofs
   - Show AI verification summaries
   - Live RSS-like update feed

7. **Quantum Security Page** (`/src/app/quantum-security/page.tsx`)
   - Quantum-resistant signatures explanation
   - Hash-based cryptography
   - AI ElderCore governance

8. **Vercel Deployment**
   - Update `vercel.json` for multi-project routing
   - Ensure all builds work
   - Push to GitHub
   - Trigger deployment

## Environment Variables Required

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
NEXT_PUBLIC_AI_URL=https://ai.decentralizedrights.com
NEXT_PUBLIC_IPFS_URL=https://ipfs.decentralizedrights.com
NEXT_PUBLIC_CHAIN_ID=31337
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

## Next Steps

1. **Create Badge Icons** - 6 SVG files
2. **Create Learn Dashboard** - Full dashboard page
3. **Add Quiz System** - Quiz components and JSON files
4. **Update Learn UI** - Gamification UI components
5. **Fix Learn Routing** - Ensure dynamic routes work
6. **Create Quantum Security Page** - Explanation page
7. **Update Vercel Config** - Multi-project routing
8. **Test All Connections** - Verify API integrations
9. **Deploy** - Push to GitHub and deploy

## Files Created/Modified

### New Files
- `src/lib/gamification.ts` - Gamification engine
- `DRP_CONNECTION_PLAN.md` - This file

### Modified Files
- `app-portal/src/lib/api.ts` - Updated API endpoints
- `explorer/src/lib/api.ts` - Updated API endpoints

## API Endpoint Mapping

### Old → New Endpoints

| Old Endpoint | New Endpoint |
|-------------|--------------|
| `/api/activity/submit` | `/api/v1/activities/submit` |
| `/api/status/submit` | `/api/v1/activities/submit` (with activity_type: 'post') |
| `/api/transactions` | `/api/v1/explorer/transactions` |
| `/api/activity/feed` | `/api/v1/explorer/activity` |
| `/api/rewards/claim` | `/api/v1/tokens/transfer` |
| `/api/tokens/balance/{address}` | `/api/v1/tokens/balance/{address}` |

## Testing Checklist

- [ ] All API endpoints accessible
- [ ] Token balance fetching works
- [ ] Activity submission works
- [ ] Transaction listing works
- [ ] Learn module routing works
- [ ] Gamification XP tracking works
- [ ] Badges unlock correctly
- [ ] Quiz system works
- [ ] Dashboard displays correctly
- [ ] All frontends connect to backend

## Deployment URLs

After deployment:

- **Main Site**: https://decentralizedrights.com
- **App Portal**: https://app.decentralizedrights.com
- **Explorer**: https://explorer.decentralizedrights.com
- **API Docs**: https://api.decentralizedrights.com
- **Backend API**: https://api.decentralizedrights.com/api/v1

