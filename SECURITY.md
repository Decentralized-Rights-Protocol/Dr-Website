## Security Policy

The Decentralized Rights Protocol (DRP) website is a public-facing humanitarian project. We take security, privacy, and reliability seriously.

### Supported Versions

We actively maintain and patch:

- The main DRP website in this repository (`src/` + `src/app/`)
- Associated API routes under `src/app/api`

Older deployments may exist, but security fixes are only guaranteed for the current main branch.

### Reporting a Vulnerability

If you believe you have found a security vulnerability in this project, **do not open a public GitHub issue**.

Instead, please:

1. Email: `security@decentralizedrights.com`
2. Include:
   - A clear description of the issue
   - Steps to reproduce
   - Potential impact
   - Any relevant logs, PoCs, or screenshots
3. Use encrypted communication if sharing sensitive details (PGP key available on request).

We will:

- Acknowledge receipt within **72 hours**
- Provide an initial assessment or request for clarification
- Work with you to triage and remediate the issue
- Coordinate disclosure timing where appropriate

### Scope

In scope:

- `decentralizedrights.com` and subpaths owned by this project
- The DRP Learn experience and API routes under `/api/learn/*`
- Frontend integrations with DRP backend services (e.g. `api.decentralizedrights.com`, `rpc.decentralizedrights.com`)

Out of scope:

- Third-party services and infrastructure not controlled by the DRP team
- Social engineering, phishing, or attacks against individual contributors

### Safe Harbor

We will not initiate legal action against researchers who:

- Make a good faith effort to comply with this policy
- Avoid privacy violations, data destruction, or service disruption
- Do not exploit a vulnerability beyond what is necessary to prove its existence
- Give us a reasonable time to remediate before any public disclosure

### Security Best Practices in This Repo

This repository is configured to:

- Keep secrets in environment variables and **never in source control**
- Use `.gitignore` rules to exclude `.env` and local config files
- Run automated linting and `npm audit` in CI for this project
- Use Dependabot to keep dependencies up to date

If you see a place where we can strengthen our security posture (hardening headers, stricter CSP, rate limiting, etc.), please open a suggestion issue or include it in a private report.




