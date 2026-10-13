# Deployment and environment ownership

This repository is a monorepo. Keep build validation in GitHub Actions and let each Vercel project deploy through its native Git integration. Do not run a second Vercel deployment pipeline from GitHub Actions; duplicate deploy jobs can fail on missing per-project IDs or compete with Vercel's own deployment flow.

## Canonical web projects

| Vercel project | Repository root | Production hostname | Owner |
| --- | --- | --- | --- |
| `dr-website` | `.` | `decentralizedrights.com` | Vercel Git integration |
| `app-portal` | `app-portal` | `app.decentralizedrights.com` | Vercel Git integration |
| `explorer` | `explorer` | `explorer.decentralizedrights.com` | Vercel Git integration |
| `drp-backend-api` | Verify against the actual backend package before changing | `api.decentralizedrights.com` | Vercel project; API root/health needs separate validation |

`main` is the production branch. Pull requests should receive preview deployments from Vercel. GitHub Actions should validate code and builds, not create duplicate Vercel deployments.

## Environment variables and secrets

- Put application runtime variables in the matching Vercel project, scoped to Production, Preview, or Development as appropriate.
- Only public browser-safe configuration belongs in `NEXT_PUBLIC_*` variables. Never put private keys, database URLs, API secrets, or signing keys in `NEXT_PUBLIC_*` variables.
- Keep workflow-only credentials in GitHub Actions Secrets. Never commit secret values, echo them into logs, or copy Vercel values into GitHub without a specific workflow requirement.
- The Convex deployment workflow requires `CONVEX_DEPLOY_KEY` and `CONVEX_DEV_DEPLOY_KEY`. The repository secret inventory currently does not list either key, so Convex deploys need those credentials configured by an administrator before they can succeed. The workflow now fails early with a clear message rather than silently proceeding without a key.
- Vercel project environment values remain in Vercel. Do not add per-project Vercel IDs to GitHub just to support a duplicate deploy workflow.

## GitHub deployment environments

The repository has legacy GitHub environment entries named for previous project layouts, including `drp-frontend` and `drp-blockchain-explorer`. Treat these as historical until workflow references and deployment records are checked. Do not bulk-delete them: deleting environments can remove protection rules or environment secrets and may erase useful audit context. Vercel project settings are the source of truth for web deployment roots and domains.

## Release checklist

1. Open a pull request and wait for the main-site, app-portal, explorer, and backend syntax checks to finish.
2. Resolve failed checks; do not mask lint failures with `|| true`.
3. Merge to `main` only after the checks pass.
4. Confirm the Vercel deployment for each changed app is `Ready` and verify its custom hostname.
5. Deploy Convex only when Convex source/config changes, and only after both required deployment keys are configured.
6. Verify API health separately; a successful frontend build does not mean `api.decentralizedrights.com` is healthy.
