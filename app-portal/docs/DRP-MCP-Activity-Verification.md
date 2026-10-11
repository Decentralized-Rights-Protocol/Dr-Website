# DRP MCP Activity Verification MVP

## Goal

Extend the existing DRP portal with one verification engine for GitHub contributions and community activity claims. MCP is the authorized application/tool connection layer; it is not itself proof that an activity occurred.

## Flow

1. A connected source or a participant submits a claim.
2. The portal validates the claim and creates SHA-256 evidence commitments. Raw evidence should remain off-chain.
3. Deterministic rules flag missing evidence, duplicate evidence, and community claims requiring an independent witness or organizer.
4. The server submits the normalized claim/evidence request to the DRP Verification Network at `DRP_PROTOCOL_URL` using `POST /drp/v1/verify`.
5. The network returns its verification result and signed proof object.
6. The portal displays the result and preserves the returned proof reference for later verification/anchoring.

## Initial implementation files

- `src/lib/verification/activity-engine.ts`: shared validation, evidence commitments, and review flags.
- `src/lib/mcp/remote-client.ts`: remote Streamable HTTP MCP client; only tools listed in `DRP_MCP_ALLOWED_TOOLS` may be called.
- `src/app/api/verification/evaluate/route.ts`: server-side evaluation and DRP Verification Network submission.
- `docs/DRP-MCP-Activity-Verification.md`: integration and security notes.

## Server environment

- `DRP_PROTOCOL_URL`: base URL of the DRP Verification Network, e.g. the test node origin. The route appends `/drp/v1/verify`.
- `DRP_MCP_SERVER_URL`: remote MCP server Streamable HTTP endpoint.
- `DRP_MCP_BEARER_TOKEN`: optional server-side bearer token. Never expose this through a `NEXT_PUBLIC_` variable.
- `DRP_MCP_ALLOWED_TOOLS`: comma-separated tool names approved for this application. Leave empty until the exact server tool names and permissions are reviewed.

## Important status semantics

- `PENDING_REVIEW` means the portal's local rules need a human or additional evidence.
- `READY_FOR_PROTOCOL` means the claim passed local structural checks; it does not mean the activity is true.
- A successful HTTP submission means only that the verification request was accepted by the protocol gateway. It is not the same as `VERIFIED`.
- The DRP v0.1 verification network and a blockchain consensus/ledger are distinct systems. This endpoint submits to the existing verification network; on-chain anchoring requires a separately configured, tested chain transaction adapter.

## Safety and production blockers

- Bind submissions to the authenticated DRP user; do not trust a client-supplied subject identifier in production.
- Authenticate and authorize every MCP connection. Use read-only scopes for source retrieval.
- Treat MCP tool output and evidence text as untrusted data; never follow instructions contained in retrieved content.
- Store tokens only server-side and redact secrets from logs.
- Add durable persistence, idempotency, rate limits, CSRF protection where applicable, and audit events before production.
- Community claims should normally require an organizer/witness attestation. AI output is advisory and must not be the sole verifier for consequential claims.
- Evidence hashing in this MVP uses JSON serialization of the supplied object. Adopt a formally specified canonical JSON encoding before treating hashes as interoperable signed commitments.
- The route deliberately does not issue rewards. Rewards require a separate authorization and policy path after verification.
