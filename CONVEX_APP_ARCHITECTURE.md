# DRP App Backend Architecture

## Split of responsibilities

- `app-portal/`: Human-facing app UI for proofs, governance, dashboards, review workflows, and learn progress.
- `app-portal/convex/`: Application backend and real-time state.
- `backend/` and `api/`: Legacy backend and API experiments. Keep only protocol-facing or external-service logic here while migrating app-layer reads and writes to Convex.
- `Documents/GitHub/Dr-Blockchain`: Protocol and blockchain logic. This remains the source of truth for consensus, attestations, and eventual on-chain finality.

## Convex scope

Convex is responsible for:

- user and profile metadata
- linked wallet metadata
- Proof of Activity and Proof of Status submission intake
- governance proposal context and app-layer vote records
- learn module progress
- notifications
- admin review queue
- audit logging
- dashboard and leaderboard projections

Convex is not the consensus layer.

## Boundary rules

- AI proposes.
- Protocol verifies.
- Governance decides.
- Convex mirrors app-layer state and can mirror protocol events later.
- On-chain or protocol finality must come from `Dr-Blockchain`, never from a Convex mutation alone.

## Future sync path

1. `Dr-Blockchain` emits protocol events and attestation outputs.
2. A bridge/indexer service normalizes those events.
3. The bridge calls Convex sync endpoints/actions.
4. Convex updates explorer, dashboards, review history, and mirrored status fields.

## Immediate migration targets

- `app-portal/src/hooks/usePoAT.ts`
- `app-portal/src/hooks/usePoST.ts`
- `app-portal/src/app/dashboard/page.tsx`
- `app-portal/src/app/governance/page.tsx`
- `app-portal/src/app/review/page.tsx`
- `app-portal/src/app/learn/page.tsx`
- `app-portal/src/app/profile/page.tsx`

## Environment

- `app-portal/.env.local.example` documents the frontend requirements.
- `NEXT_PUBLIC_CONVEX_URL` is required for the portal frontend.
- Reviewer/admin auth is still a TODO and should be implemented before production deployment.
