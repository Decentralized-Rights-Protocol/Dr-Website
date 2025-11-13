# Decentralized Rights Protocol (DRP) App Portal Blueprint

## Vision & Objectives
- Deliver a unified hub where citizens verify status, submit activities, earn on-chain rewards, and track impact.
- Treat the portal as a thin client orchestrating secure flows to decentralized services (FastAPI, OrbitDB/IPFS, smart contracts, AI).
- Prioritise resilience, offline-friendly UX, and verifiable attestations.

## User Journeys
### 1. Onboarding & Wallet Linking
- Connect via OAuth (Google/Apple) or Web3 wallet (MetaMask, WalletConnect, Coinbase Wallet).
- Create hybrid profile: custodial metadata stored in OrbitDB, wallet address stored client-side.
- Run device posture checks (WebAuthn, optional 2FA for admins).

### 2. Proof of Activities (PoAT)
1. User captures media + metadata via `ActivityForm`.
2. Client encrypts payload (AES-GCM using `ENCRYPTION_KEY`), signs with wallet.
3. Upload to IPFS via FastAPI proxy → returns CID.
4. FastAPI invokes AI verification (`/api/verify-activity`) and OrbitDB write.
5. When successful, mint $DeRi via tokenomics service.

### 3. Proof of Status (PoST)
1. Users submit ID/credential (file, QR, partner code).
2. `ProofCard` wraps multi-step flow including AI OCR, risk score.
3. Backend writes signed hash to `ProofRegistry` smart contract.
4. Reward engine mints $RIGHTS tokens.

### 4. Dashboard & Insights
- Fetch aggregates (`/api/dashboard`, `/api/leaderboard`).
- Visualise with `DashboardCharts` (Recharts) and `ElderAI` assistant (LLM chat).
- Provide quick actions: submit PoAT, view rewards, share badges.

## Architecture Overview
```
app-portal (Next.js App Router)
├─ src/app                              # RSC pages + layouts
│  ├─ page.tsx                          # Landing dashboard (SSR)
│  ├─ proofs
│  │  ├─ activities/page.tsx           # PoAT submission flow (client)
│  │  └─ status/page.tsx               # PoST verification flow (client)
│  ├─ wallet/page.tsx                  # Wallet balances & connections
│  ├─ rewards/page.tsx                 # Reward history, claim logic
│  ├─ leaderboard/page.tsx             # Community leaderboard
│  ├─ api/                             # (optional) edge handlers for auth proxy
│  └─ (auth routes)                    # /login, /callback, etc.
├─ src/components
│  ├─ layout                            # Navbar, footer, shell
│  ├─ proofs                            # ProofCard, ActivityForm, StatusStepper
│  ├─ dashboard                         # Widgets, charts, ElderAI chat
│  ├─ wallet                            # WalletConnectButton, RewardSummary
│  └─ shared                            # ThemeToggle, LocaleSwitcher, etc.
├─ src/lib
│  ├─ tokenomics.ts                     # Smart contract helpers
│  ├─ api.ts                            # REST client (React Query)
│  ├─ ai.ts                             # AI assistant + verification API
│  ├─ auth.ts                           # OAuth + JWT utilities
│  ├─ analytics.ts                      # Event tracking & metrics
│  └─ orbitdb.ts                        # OrbitDB/IPFS helpers
├─ src/hooks                            # usePoAT, usePoST, useWallet, useDashboard
├─ src/store                            # Zustand slices (session, proofs, rewards)
├─ public                               # icons, manifest, partner badges
└─ config
   ├─ env.ts                            # Runtime environment guard
   └─ constants.ts                      # Chain IDs, contract addresses
```

## Data Services
- **FastAPI microservices (Railway)** handle verification, IPFS pinning, reward issuance.
- **OrbitDB** stores append-only proof journals; IPFS stores encrypted artefacts.
- **Smart Contracts** (`DeRiToken`, `RightsToken`, `ProofRegistry`) emit events consumed by Explorer.
- **AI Service** (`ai.decentralizedrights.com`) processes PoAT/PoST classification and powers Elder AI assistant.

## Integration Contracts
| Module | Endpoint / Contract | Responsibility |
|--------|---------------------|----------------|
| PoAT | `POST /api/verify-activity` | Validate activity, return reward action |
| PoST | `POST /api/verify-status` | Validate status, issue governance eligibility |
| Rewards | `POST /api/reward` | Mint tokens after verification |
| Wallet | `eth_sendTransaction`, `eth_call` | Query balances, sign payloads |
| OrbitDB | `/orbitdb/{db}/entries` | Append proof records |
| AI | `POST /ai/assistant`, `POST /ai/verify` | Chat + verification |

## State Management Strategy
- Use React Query for server data (`useQuery`, `useMutation`).
- Zustand store for session, wallet connection, and optimistic UI (reward toasts).
- Persist critical session info in encrypted storage (`localforage`, AES with `ENCRYPTION_KEY`).

## Security Hardening
- Enforce HTTPS via Cloudflare + Vercel.
- Local encryption for PoAT payloads + HMAC signature.
- JWT with short TTL, refresh via secure cookie.
- Role-based controls: citizen, validator, admin (orgs).
- Add 2FA (TOTP/WebAuthn) for admin flows.

## Delivery Roadmap (High-Level)
1. **Foundation:** Layout, navigation, theme, environment helpers, auth shell.
2. **Wallet + Tokenomics:** Connect wallets, display balances, integrate contract calls.
3. **Proof Modules:** Build PoAT form with media upload, PoST wizard with verifications.
4. **Rewards & Dashboard:** Hook to backend metrics, charts, leaderboard, ElderAI chat.
5. **Community & Learn Integration:** Embed Learn API, social sharing, localisation.
6. **Security & Hardening:** Encryption, 2FA, monitoring, audit logs.
7. **Testing & Deployment:** e2e tests (Playwright), contract mocks, staging rollout.

## Success Metrics
- <3 min from onboarding to first proof submission.
- 99.9% uptime via multi-region deployments.
- All proofs recorded on-chain + OrbitDB with verifiable hashes.
- ElderAI assistant resolves ≥70% user inquiries autonomously.
