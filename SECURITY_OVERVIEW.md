# DRP Website Security Overview

This document summarizes the security hardening applied to decentralizedrights.com and subdomains, including explorer.decentralizedrights.com.

## Web Application Hardening
- Enforced HTTPS via HSTS (2 years, includeSubDomains, preload) using Next.js headers and vercel.json.
- Added secure headers: X-Content-Type-Options, X-Frame-Options (DENY), Referrer-Policy, Permissions-Policy.
- Content Security Policy baseline: blocks third-party origins by default; allows required analytics/translate/fonts with minimal scope.
- CORS restricted to official origins in middleware; credentials enabled only for trusted domains.
- Basic edge rate limiting in `src/middleware.ts` (100 req/min/IP) with OPTIONS short-circuit.
- Disabled verbose errors in production (Next defaults) and encourage API handlers to avoid leaking stack traces.
- Cookies should be set with Secure, HttpOnly, SameSite=Strict when used (UI does not set sensitive cookies by default).

## Server & Deployment Security
- Node.js pinned to LTS `v18.20.3` via `.nvmrc`.
- `vercel.json` forces www→apex redirect and sets security headers as fallback.
- Custom 404/500 pages recommended (`src/app/not-found.tsx` and `src/app/error.tsx`).
- Monitoring hooks prepared (Sentry or Logtail) via env placeholders.

## Repository & CI/CD Security
- `.gitignore` excludes secrets, env files, node_modules, and build artifacts.
- `.env.example` (add in repo) documents required environment variables without secrets.
- Recommend GitHub branch protections: PRs required, code review required, no direct pushes to main.
- Security CI (recommendation): workflow that runs `npm audit`, `eslint`, secret scanning (TruffleHog/GGShield), and build/tests.

## Secrets & Environment Variables
- All sensitive keys should reside in Vercel Project Env Vars or `.env.local` (never committed).
- Rotate any exposed credentials immediately and audit usage.
- Optional: integrate a secret manager (AWS Secrets Manager or HashiCorp Vault) for runtime retrieval.

## Network & DNS Layer
- DNS should CNAME to Vercel only; enable DNSSEC at registrar/Cloudflare.
- Put Cloudflare in front of Vercel for WAF, DDoS protection, and caching.
- SSL termination managed by Vercel; auto-rotation enabled.

## API & Blockchain Layer Security
- Require ECDSA signature verification for wallet-bound actions.
- Hash sensitive payloads (SHA-256/BLAKE3) before storage; avoid PII where possible.
- Validate requests using Zod/Joi (Next) and Pydantic (FastAPI) with strict schemas.
- Use HMAC between internal services; include timestamp+nonce to prevent replay.
- Use JWT with role-based authorization for privileged endpoints.

## Optional Enhancements
- Enable Snyk or OWASP Dependency Check in CI.
- Tighten CSP further: remove `'unsafe-inline'` by switching inline scripts to nonces/hashes.
- Daily DB backups and object-store snapshots for Scylla/OrbitDB.
- Serve static assets via a CDN.

## Reporting & Alerts
- Capture server and auth errors to Sentry/Datadog; set alert thresholds.
- Minimal internal security dashboard can surface uptime, response times, build status, and vulnerability counts.

## Testing & Verification
- Run automated scans: OWASP ZAP baseline and `nmap -Pn` against staging. Fix medium/high findings promptly.

---
Security is an ongoing process—monitor, patch, and iterate. This baseline raises protection significantly while preserving functionality.
