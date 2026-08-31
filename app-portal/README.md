# DRP App Portal

The DRP App Portal (`app.decentralizedrights.com`) is the core experience for proof submissions, wallet incentives, and governance coordination inside the Decentralized Rights Protocol ecosystem. This project is a standalone Next.js 14 App Router workspace designed to deploy independently on Vercel.

## Key Capabilities
- **Proof of Activities (PoAT)** capture: encrypted uploads, AI verification, OrbitDB/IPFS journaling, and automatic $DeRi rewards.
- **Proof of Status (PoST)** workflows: institution-backed verification, AI-assisted credential checks, and $RIGHTS governance issuance.
- **Wallet & tokenomics hub**: connect wallets, view balances, trigger minting, and reconcile blockchain transactions.
- **Insightful dashboard**: charts, leaderboards, Elder AI assistant, and sustainability tracking powered by React Query.
- **Community & Learn integrations**: Learn-to-earn curriculum links, social badge sharing, and multilingual expansion hooks.

## Tech Stack
- **Framework**: Next.js 14 (App Router, React Server Components)
- **Styling**: Tailwind CSS + custom utility components
- **State & Data**: Zustand for UI/session state, TanStack Query for server data, Zod + React Hook Form for validation
- **Blockchain**: Ethers.js + Web3 providers (DRP RPC @ `https://rpc.decentralizedrights.com`)
- **Visualization**: Recharts for dashboards
- **APIs**: DRP FastAPI services (`https://api.decentralizedrights.com`), AI endpoints (`https://ai.decentralizedrights.com`)

## Directory Layout
```
app-portal/
├─ src/
│  ├─ app/                      # App Router routes (dashboard, proofs, wallet, etc.)
│  ├─ components/
│  │  ├─ layout/                # AppShell, navigation, footer
│  │  ├─ dashboard/             # Stats, charts, Elder AI assistant, quick actions
│  │  ├─ proofs/                # PoAT + PoST forms and steppers
│  │  ├─ wallet/                # Wallet connection panel
│  │  ├─ rewards/               # Reward summary + history
│  │  ├─ leaderboard/           # Community leaderboard table
│  │  └─ community/             # Share cards & social integrations
│  ├─ hooks/                    # Custom hooks (wallet, PoAT, PoST)
│  ├─ lib/                      # API, AI, tokenomics, OrbitDB helpers, env guards
│  ├─ store/                    # Zustand slices
│  └─ config/                   # (future) centralised constants, feature flags
├─ docs/
│  └─ DRP-App-Blueprint.md     # High-level architecture & roadmap
├─ README.md
└─ package.json
```

## Environment Variables
Create an `.env.local` (never commit) and ensure the following keys are set:

```bash
NEXT_PUBLIC_API_URL=https://api.decentralizedrights.com
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_RPC_URL=https://rpc.decentralizedrights.com
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.decentralizedrights.com
NEXT_PUBLIC_AI_API=https://ai.decentralizedrights.com
NEXT_PUBLIC_LEARN_URL=https://decentralizedrights.com/learn
BLOCKCHAIN_NETWORK=drp-testnet
DATABASE_URL=/orbitdb/drp_network
AI_API_URL=https://ai.decentralizedrights.com
JWT_SECRET=<securely_generated_secret>
ENCRYPTION_KEY=<securely_generated_key>
```

> **Tip:** generate secrets with `openssl rand -hex 32`.

## Local Development
```bash
cd app-portal
npm install
npm run dev
```
The app runs on `http://localhost:3000`. React Query DevTools are pre-configured for debugging (toggle bottom-right panel).

## Deployment (Vercel)
1. Create a Vercel project with root set to `app-portal/`.
2. Configure the environment variables listed above for Production & Preview.
3. Build output: `.next`. Framework preset: Next.js.
4. Domains: add `app.decentralizedrights.com` (managed via Cloudflare).
5. Enable HTTPS and automatic deployments from `main`.

## Integration Checklist
- **FastAPI backend** (`api.decentralizedrights.com`): implement `/verify/activity`, `/verify/status`, `/rewards/*`, `/community/leaderboard`, `/storage/*` according to `src/lib/api.ts` contracts.
- **AI services** (`ai.decentralizedrights.com`): expose `/verify` and `/assistant` endpoints (see `src/lib/ai.ts`).
- **Token contracts**: set proper addresses in `src/lib/constants.ts` once deployed to DRP testnet.
- **OrbitDB/IPFS**: ensure `/storage/ipfs` and `/storage/orbitdb/:db` routes proxy to DigitalOcean-hosted nodes.

## Testing Guidance
- **Unit/Integration**: add Vitest or Jest for component and hook coverage.
- **E2E**: incorporate Playwright to verify PoAT/PoST flows, wallet connection, and reward issuance.
- **Security**: audit client-side encryption and JWT handling before production go-live.

## Next Steps
- Wire React Query hooks to live FastAPI endpoints.
- Implement wallet connection UX with Wagmi/Web3Modal if required.
- Add localization (i18n) and offline-first caching.
- Integrate Elder AI chat with the production AI service.

For strategic roadmap and module-level responsibilities, consult `docs/DRP-App-Blueprint.md`.
