# DRP Website — Remediation Plan

## Part 1: Deployment & Routing Clarification

### What the Codebase Actually Has

**The main site has routes.** The root Next.js app (`src/app/`) serves:
- `decentralizedrights.com/` — Home, Learn, Economics, Tokens, Docs, Legal, etc.
- All pages under `src/app/` (learn, economics, tokens, docs, legal, api routes, etc.)

**The rewrites in `next.config.js` are not “missing routes”** — they are intentional proxies:
- `/explorer/*` → `https://explorer.decentralizedrights.com/:path*`
- `/api-docs/*` → `https://api.decentralizedrights.com/:path*`
- `/dashboard/*` → `https://app.decentralizedrights.com/:path*`

So the main site serves its own content and forwards specific paths to subdomain apps.

---

### What the CI/CD Actually Deploys

| Component | Deployed by | Trigger |
|-----------|-------------|---------|
| **Main site** (decentralizedrights.com) | Vercel (likely via dashboard Git integration) | Not in `deploy-vercel.yml` — relies on Vercel’s own deployment when root changes |
| **App portal** (app.decentralizedrights.com) | `deploy-vercel.yml` | Push to `main` when `app-portal/**` changes |
| **Explorer** (explorer.decentralizedrights.com) | `deploy-vercel.yml` | Push to `main` when `explorer/**` changes |
| **API portal** (api.decentralizedrights.com) | Unknown | Not in any workflow |
| **Backend** (drp-api, drp-ai, indexer) | Render | `deploy-render.yml` only echoes instructions; actual deploy via Render dashboard/webhook |

### Gaps

1. **Main site** — No explicit workflow step. Deployment depends on Vercel being connected to the repo with root as project root. If that’s not configured, main site changes may not deploy.
2. **API portal** — Not referenced in any workflow.
3. **Path filters** — `deploy-vercel.yml` uses `paths: [app-portal/**, explorer/**]`. Pushes that only touch `src/`, `package.json`, etc. do **not** trigger this workflow, so app-portal and explorer won’t redeploy on main-site-only changes (which is expected).

---

## Part 2: Remediation Plan — All Fixes

### Phase 1: Critical (Blocking)

| # | Issue | Action | Files |
|---|-------|--------|-------|
| 1 | Invalid `sqlite3` in pip requirements | Remove `sqlite3` line | `learn-api/requirements.txt` |
| 2 | Missing `requirements.txt` for drp-api Docker | Create `backend/drp-api/requirements.txt` with fastapi, uvicorn, pydantic, sqlalchemy, psycopg2-binary, httpx, cryptography | `backend/drp-api/requirements.txt` |
| 3 | Deprecated `next export` script | Replace with `output: 'export'` in config + `"export": "next build"`, or remove script if static export not needed | `package.json`, `src/package.json`, `next.config.js` (if using static export) |

### Phase 2: Security (npm Vulnerabilities)

| # | Issue | Action | Risk |
|---|-------|--------|------|
| 4 | Next.js DoS (Image Optimizer, RSC deserialization) | Upgrade to `next@^15.0.8` or `^15.5.10` (or latest 15.x) | High — DoS |
| 5 | minimatch ReDoS (via @typescript-eslint) | Run `npm audit fix`; if needed, upgrade eslint-config-next / @typescript-eslint | High — ReDoS |
| 6 | ajv ReDoS | `npm audit fix` | Moderate |

**Strategy:**
- Run `npm audit fix` first (non-breaking).
- If vulnerabilities remain, upgrade Next.js to a patched 15.x.
- Test builds and key flows after each upgrade.

### Phase 3: Consistency & Config

| # | Issue | Action | Files |
|---|-------|--------|-------|
| 7 | Explorer missing `postcss.config.js` | Add same config as root | `explorer/postcss.config.js` |
| 8 | Explorer pinned to Next 14.0.0 | Align with `^14.2.33` (or chosen version) | `explorer/package.json` |
| 9 | Explorer `eslint-config-next` pinned | Align with other apps | `explorer/package.json` |
| 10 | `@types/jsonwebtoken` in dependencies | Move to devDependencies | `package.json`, `src/package.json` |

### Phase 4: CI/CD & Deployment

| # | Issue | Action |
|---|-------|--------|
| 11 | Main site not in workflow | Add job to `deploy-vercel.yml` for root (or document that Vercel dashboard handles it) |
| 12 | API portal not in workflow | Add job for `api/` if it should be deployed via Vercel |
| 13 | Security workflow uses `|| true` on audit | Remove `|| true` so audit failures fail the job (or use `--audit-level=high` and fail on high+) |

### Phase 5: Optional / Later

| # | Issue | Action |
|---|-------|--------|
| 14 | Duplicate `src/package.json` | Decide if `src/` is standalone or redundant; remove or align with root |
| 15 | ESLint 8 deprecated | Plan migration to ESLint 9 + flat config |
| 16 | Explorer `strict: false` | Consider enabling `strict: true` for better type safety |

---

## Execution Order

```
Phase 1 (Critical)     → Phase 2 (Security)     → Phase 3 (Config)
     ↓                        ↓                        ↓
  Fix pip/export          npm audit fix           Add postcss, align versions
     ↓                        ↓                        ↓
  Verify learn-api        Upgrade Next.js         Verify explorer build
  starts correctly        if needed
```

---

## Verification Checklist

After each phase:

- [ ] `npm run build` (root)
- [ ] `npm run build` (app-portal)
- [ ] `npm run build` (explorer)
- [ ] `npm run build` (api)
- [ ] `npm run lint` (root + sub-apps)
- [ ] `npm run type-check` (root)
- [ ] `pip install -r learn-api/requirements.txt` (after Phase 1)
- [ ] Docker build for `backend/drp-api` (after Phase 1)
- [ ] `npm audit` (after Phase 2)

---

## Summary

- **Routing:** The main site has routes; rewrites send `/explorer`, `/api-docs`, `/dashboard` to subdomains.
- **Deployment:** The workflow only deploys app-portal and explorer; main site and API portal rely on Vercel dashboard or other setup.
- **Remediation:** 16 items across 5 phases, with Phases 1–3 as the immediate focus.
