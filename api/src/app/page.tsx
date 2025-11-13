'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BookOpen, Code, Cpu, Globe, Key, ShieldCheck, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const endpointCards = [
  {
    id: 'status',
    title: 'Proof of Status',
    description: 'Verify human status attestations, civic credentials, and DAO voting eligibility.',
    path: '/v1/proof-of-status',
    latency: '<180ms',
    icon: ShieldCheck
  },
  {
    id: 'activity',
    title: 'Proof of Activity',
    description: 'Record contributions, stewardship verifications, and sustainability audits.',
    path: '/v1/proof-of-activity',
    latency: '<240ms',
    icon: Globe
  },
  {
    id: 'elder',
    title: 'AI Elder Verification',
    description: 'Request AI elder review for sensitive attestations or dispute resolution.',
    path: '/v1/ai-elder/verify',
    latency: '<320ms',
    icon: Cpu
  }
]

const codeSamples: Record<
  string,
  {
    label: string
    language: 'javascript' | 'python' | 'cpp'
    snippet: string
  }[]
> = {
  status: [
    {
      label: 'JavaScript',
      language: 'javascript',
      snippet: `import fetch from 'node-fetch';

const res = await fetch('https://api.decentralizedrights.com/v1/proof-of-status', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${process.env.DRP_API_KEY}\`
  },
  body: JSON.stringify({
    wallet: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    schema: 'civic-auth'
  })
});

const data = await res.json();
console.log(data.status, data.attestations);`
    },
    {
      label: 'Python',
      language: 'python',
      snippet: `import os
import requests

payload = {
    "wallet": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "schema": "civic-auth"
}

resp = requests.post(
    "https://api.decentralizedrights.com/v1/proof-of-status",
    headers={"Authorization": f"Bearer {os.environ['DRP_API_KEY']}"},
    json=payload,
    timeout=12
)

print(resp.json()["verdict"])`
    },
    {
      label: 'C++',
      language: 'cpp',
      snippet: `#include <cpr/cpr.h>
#include <nlohmann/json.hpp>

int main() {
  nlohmann::json payload = {
    {"wallet", "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"},
    {"schema", "civic-auth"}
  };

  auto res = cpr::Post(
    cpr::Url{"https://api.decentralizedrights.com/v1/proof-of-status"},
    cpr::Header{{"Authorization", "Bearer " + std::string(std::getenv("DRP_API_KEY")))},
    cpr::Body{payload.dump()},
    cpr::Header{{"Content-Type", "application/json"}}
  );

  std::cout << res.text << std::endl;
}`
    }
  ],
  activity: [
    {
      label: 'JavaScript',
      language: 'javascript',
      snippet: `const res = await fetch('https://api.decentralizedrights.com/v1/proof-of-activity', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${process.env.DRP_API_KEY}\`
  },
  body: JSON.stringify({
    activityType: 'governance_vote',
    metadata: {
      proposalId: 'gov-2025-08-A',
      weight: 82
    }
  })
});

const receipt = await res.json();
console.log(receipt.hash);`
    },
    {
      label: 'Python',
      language: 'python',
      snippet: `payload = {
    "activityType": "sustainability_audit",
    "metadata": {
        "assetId": "solar-collective-13",
        "co2_offset_kg": 420
    }
}

r = requests.post(
    "https://api.decentralizedrights.com/v1/proof-of-activity",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json=payload
)
print(r.json()["status"])`
    },
    {
      label: 'C++',
      language: 'cpp',
      snippet: `nlohmann::json body = {
  {"activityType", "rights_report"},
  {"metadata", {
    {"reportId", "rights-annual-2025"},
    {"regions", {"CA", "GH"}}
  }}
};

auto res = cpr::Post(
  cpr::Url{"https://api.decentralizedrights.com/v1/proof-of-activity"},
  cpr::Header{{"Authorization", "Bearer " + apiKey}},
  cpr::Body{body.dump()}
);`
    }
  ],
  elder: [
    {
      label: 'JavaScript',
      language: 'javascript',
      snippet: `const res = await fetch('https://api.decentralizedrights.com/v1/ai-elder/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${process.env.DRP_API_KEY}\`
  },
  body: JSON.stringify({
    caseFile: 'case-8742',
    priority: 'urgent',
    evidence: ['ipfs://bafybe...', 'ipfs://bafybh...']
  })
});

const review = await res.json();
console.log(review.decision, review.reviewer);`
    },
    {
      label: 'Python',
      language: 'python',
      snippet: `payload = {
    "caseFile": "case-8742",
    "priority": "urgent",
    "evidence": [
        "ipfs://bafybeigdyrtknbrpr",
        "ipfs://bafybeiaw3g6pyovsm"
    ]
}

resp = requests.post(
    "https://api.decentralizedrights.com/v1/ai-elder/verify",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json=payload
)
print(resp.json()["projection"]["integrityScore"])`
    },
    {
      label: 'C++',
      language: 'cpp',
      snippet: `nlohmann::json payload = {
  {"caseFile", "case-8742"},
  {"priority", "standard"},
  {"notes", "Requesting elder quorum review"}
};

auto res = cpr::Post(
  cpr::Url{"https://api.decentralizedrights.com/v1/ai-elder/verify"},
  cpr::Header{{"Authorization", "Bearer " + apiKey}},
  cpr::Body{payload.dump()}
);

std::cout << res.text << std::endl;`
    }
  ]
}

export default function ApiLandingPage() {
  const [activeEndpoint, setActiveEndpoint] = useState('status')
  const [activeLanguage, setActiveLanguage] = useState<Record<string, string>>({
    status: 'JavaScript',
    activity: 'JavaScript',
    elder: 'JavaScript'
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-neutral-200/80 bg-white/90 backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-white shadow-lg">
              <Key className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">DRP Developer API</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Human-rights-aligned infrastructure</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300 md:flex">
            <Link href="#overview">Overview</Link>
            <Link href="#endpoints">Endpoints</Link>
            <Link href="#sdk">SDK</Link>
            <Link href="#docs">Docs</Link>
          </nav>
          <a
            href="https://tally.so/r/3xKMro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
          >
            <Sparkles className="h-4 w-4" />
            Request API Key
          </a>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">
                Build rights-aware infrastructure with composable verification APIs
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
                The DRP API provides fast, verifiable endpoints for Proof of Status (PoST), Proof of Activity (PoAT), and AI Elder reviews.
                Launch applications that respect human rights, sustainability metrics, and transparent governance.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-1 text-primary-700 dark:border-primary-400/40 dark:bg-primary-500/15 dark:text-primary-200">
                  SLA-backed
                </span>
                <span className="rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-1 text-primary-700 dark:border-primary-400/40 dark:bg-primary-500/15 dark:text-primary-200">
                  GDPR & AI Act aligned
                </span>
                <span className="rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-1 text-primary-700 dark:border-primary-400/40 dark:bg-primary-500/15 dark:text-primary-200">
                  Multi-chain ready
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">Trusted by cooperatives & civic labs</p>
              <ul className="mt-4 space-y-4 text-sm text-neutral-600 dark:text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" />
                  Zero-knowledge attestations ensure contributors control disclosure.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" />
                  AI Elder quorum delivers transparent, explainable decisions for sensitive cases.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" />
                  Webhooks, signed receipts, and governance-grade audit trails available out-of-the-box.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="overview" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Global reach',
                description: 'Edge deployments in 14 regions keep verification latency low even during civic events.',
                icon: Globe
              },
              {
                title: 'Granular scopes',
                description: 'Issue scoped API tokens for teams, auditors, or AI elder partners with custom TTLs.',
                icon: Key
              },
              {
                title: 'Native analytics',
                description: 'Track verification success, dispute rates, and sustainability adjustments in real time.',
                icon: BookOpen
              }
            ].map((card) => (
              <div key={card.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-200">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">{card.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="endpoints" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">Core endpoints</h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  Designed for resilient civic tech, cooperative governance, and human-rights verification workflows.
                </p>
              </div>
              <Link
                href="https://api.decentralizedrights.com/reference"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-300"
              >
                View full reference →
              </Link>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
              <div className="space-y-4">
                {endpointCards.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setActiveEndpoint(endpoint.id)}
                    className={cn(
                      'w-full rounded-2xl border px-4 py-4 text-left transition',
                      activeEndpoint === endpoint.id
                        ? 'border-primary-500 bg-primary-500/10 text-primary-700 dark:border-primary-400 dark:bg-primary-500/20 dark:text-primary-200'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-200 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-300'
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <endpoint.icon className="h-5 w-5" />
                        <span className="font-semibold">{endpoint.title}</span>
                      </div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{endpoint.latency}</span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{endpoint.description}</p>
                    <p className="mt-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">{endpoint.path}</p>
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 dark:border-neutral-800 dark:bg-neutral-900/60">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    {endpointCards.find((card) => card.id === activeEndpoint)?.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <Code className="h-4 w-4" />
                    cURL + REST
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  {codeSamples[activeEndpoint].map((sample) => (
                    <button
                      key={sample.label}
                      onClick={() =>
                        setActiveLanguage((prev) => ({
                          ...prev,
                          [activeEndpoint]: sample.label
                        }))
                      }
                      className={cn(
                        'rounded-full border px-3 py-1 transition',
                        activeLanguage[activeEndpoint] === sample.label
                          ? 'border-primary-500 bg-primary-500/10 text-primary-600 dark:border-primary-400 dark:bg-primary-500/20 dark:text-primary-200'
                          : 'border-neutral-300 text-neutral-600 hover:border-primary-200 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-primary-400'
                      )}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>

                <pre className="mt-4 max-h-[320px] overflow-auto rounded-xl bg-neutral-900 p-4 text-xs text-neutral-100">
                  <code>
                    {
                      codeSamples[activeEndpoint].find(
                        (sample) => sample.label === activeLanguage[activeEndpoint]
                      )?.snippet
                    }
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section id="sdk" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">SDK & tooling</h2>
            <ul className="mt-4 grid gap-4 text-sm text-neutral-600 dark:text-neutral-300 md:grid-cols-3">
              <li className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">JavaScript SDK</p>
                <p className="mt-2 text-sm">
                  `npm install @drp/sdk` with built-in helpers for retries, signed receipts, and webhooks.
                </p>
              </li>
              <li className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">Python client</p>
                <p className="mt-2 text-sm">
                  Publish civic reports with async requests, pydantic schemas, and audit logging.
                </p>
              </li>
              <li className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">C++ bindings</p>
                <p className="mt-2 text-sm">
                  Integrate PoAT receipts directly inside validators, guardian nodes, or IoT proof devices.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section id="docs" className="mx-auto mt-16 max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Docs & governance</h2>
            <div className="mt-4 grid gap-4 text-sm text-neutral-600 dark:text-neutral-300 md:grid-cols-3">
              {[
                { title: 'API Reference', href: 'https://docs.decentralizedrights.com/api', description: 'Endpoints, webhooks, schema definitions.' },
                { title: 'Governance Playbook', href: 'https://docs.decentralizedrights.com/governance', description: 'How DRP manages PoST/PoAT attesters.' },
                { title: 'Compliance Center', href: 'https://docs.decentralizedrights.com/compliance', description: 'Data retention, encryption standards, and audit readiness.' }
              ].map((doc) => (
                <Link
                  key={doc.title}
                  href={doc.href}
                  className="rounded-2xl border border-neutral-200 p-5 transition hover:border-primary-400 dark:border-neutral-800 dark:hover:border-primary-400"
                >
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100">{doc.title}</p>
                  <p className="mt-2 text-sm">{doc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white/90 py-6 text-center text-sm text-neutral-500 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80 dark:text-neutral-400">
        © {new Date().getFullYear()} Decentralized Rights Protocol. Crafted for human rights and transparent AI.
      </footer>
    </div>
  )
}

