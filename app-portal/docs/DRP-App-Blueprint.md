# Decentralized Rights Protocol (DRP) App Portal Blueprint

## Vision & Objectives
- Deliver a unified hub where citizens verify status, submit activities, record governance participation, and track public-interest impact.
- Treat the portal as an application client backed by Convex for real-time workflows, while preserving protocol truth in Dr-Blockchain and related services.
- Prioritise resilience, offline-friendly UX, and verifiable attestations.

## User Journeys
### 1. Onboarding & Wallet Linking
- Connect via OAuth (Google/Apple) or Web3 wallet (MetaMask, WalletConnect, Coinbase Wallet).
- Create hybrid profile: custodial metadata stored in OrbitDB, wallet address stored client-side.
- Run device posture checks (WebAuthn, optional 2FA for admins).

### 2. Proof of Activities (PoAT)
1. User captures media + metadata via `ActivityForm`.
2. Client signs the submission context with wallet identity where required.
3. Convex records intake, review state, and audit history for the application layer.
4. Future sync services mirror verified protocol events back into Convex.
5. Protocol-side issuance remains outside the app backend.

### 3. Proof of Status (PoST)
1. Users submit ID/credential (file, QR, partner code).
2. `ProofCard` wraps multi-step flow including AI-assisted review context.
3. Convex tracks attestation review, governance eligibility hints, and audit notes.
4. Protocol-side attestations and governance eligibility should be mirrored in from Dr-Blockchain.

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
- **Convex** stores app-layer submissions, governance records, notifications, dashboards, and review workflows.
- **IPFS and related storage services** can store artefacts once the file bridge is wired.
- **Protocol services and smart contracts** emit events that should later be mirrored into Convex by a sync bridge.
- **AI Service** (`ai.decentralizedrights.com`) processes PoAT/PoST classification and powers Elder AI assistant.

## Integration Boundaries
| Module | Endpoint / Contract | Responsibility |
|--------|---------------------|----------------|
| Convex app backend | `convex/*` | Intake, review, notifications, dashboards, governance UX |
| PoAT / PoST verification | future bridge | Mirror verified protocol outcomes into app records |
| Rewards | protocol layer | Issue tokens after protocol verification |
| Wallet | `eth_sendTransaction`, `eth_call` | Query balances, sign payloads |
| AI | `POST /ai/assistant`, `POST /ai/verify` | Chat + verification |

## State Management Strategy
- Use Convex hooks for app-layer data (`useQuery`, `useMutation` from Convex React).
- Zustand store for session, wallet connection, and optimistic UI (reward toasts).
- Persist only minimal client session state locally until a stronger auth model is added.

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
- All app-layer submissions tracked with auditable state transitions and later mirrored protocol references.
- ElderAI assistant resolves ≥70% user inquiries autonomously.
