# Deployment and environment ownership

This repository is a monorepo. Keep build validation in GitHub Actions and let each Vercel project deploy through its native Git integration. Do not run a second Vercel deployment pipeline from GitHub Actions; duplicate deploy jobs can fail on missing per-project IDs or compete with Vercel's own deployment flow.

## Canonical web projects

| Vercel project | Repository root | Production hostname | Owner |
| --- | --- | --- | --- |
| `dr-website` | `.` | `decentralizedrights.com` | Vercel Git integration |
| `app-portal` | `app-portal` | `app.decentralizedrights.com` | Vercel Git integration |
| `explorer` | `explorer` | `explorer.decentralizedrights.com` | Vercel Git integration |
| `drp-website-api` | Not linked to a Git repository in the current Vercel inventory; verify its deployment source before changing | `api.decentralizedrights.com` | API project exists, but its source/root and runtime health need separate validation |

`main` is the production branch. Pull requests should receive preview deployments from Vercel. GitHub Actions should validate code and builds, not create duplicate Vercel deployments. The Render service currently connected to `Decentralized-Rights-Protocol/Dr-Blockchain` has native auto-deploy enabled for `main`; the old Render workflow in this repository only printed instructions and did not trigger a deployment, so it has been removed.

## Environment variables and secrets

- Put application runtime variables in the matching Vercel project, scoped to Production, Preview, or Development as appropriate.
- Only public browser-safe configuration belongs in `NEXT_PUBLIC_*` variables. Never put private keys, database URLs, API secrets, or signing keys in `NEXT_PUBLIC_*` variables.
- Keep workflow-only credentials in GitHub Actions Secrets. Never commit secret values, echo them into logs, or copy Vercel values into GitHub without a specific workflow requirement.
- The Convex deployment workflow requires `CONVEX_DEPLOY_KEY` and `CONVEX_DEV_DEPLOY_KEY`. The repository secret inventory currently does not list either key, so Convex deploys need those credentials configured by an administrator before they can succeed. The workflow now fails early with a clear message rather than silently proceeding without a key.
- Vercel project environment values remain in Vercel. Do not add per-project Vercel IDs to GitHub just to support a duplicate deploy workflow.

## GitHub deployment environments

The repository previously had environment entries for obsolete Vercel project names (`drp-backend-api`, `drp-blockchain-explorer`, `drp-frontend`, and `drp-web-ecosystem`). These were reviewed against the active Vercel project list and GitHub Actions references; the entries had no environment secrets or protection rules and have been removed. Keep `github-pages`, the current `dr-website`, `app-portal`, and `explorer` entries, and the generic `Production` entry. Vercel project settings remain the source of truth for web deployment roots and domains.

## Release checklist

1. Open a pull request and wait for the main-site, app-portal, explorer, and backend syntax checks to finish.
2. Resolve failed checks; do not mask lint failures with `|| true`.
3. Merge to `main` only after the checks pass.
4. Confirm the Vercel deployment for each changed app is `Ready` and verify its custom hostname.
5. Deploy Convex only when Convex source/config changes, and only after both required deployment keys are configured.
6. Verify API health separately; a successful frontend build does not mean `api.decentralizedrights.com` is healthy.
