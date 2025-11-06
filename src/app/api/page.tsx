import { Metadata } from 'next'
import Link from 'next/link'
import { Code, BookOpen, Key, Terminal, FileText, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'DRP API - Build on Decentralized Rights Protocol',
  description: 'Developer API documentation for DRP - Proof of Status, Proof of Activity, and AI Elder verification endpoints.',
  keywords: ['DRP API', 'blockchain API', 'proof of status', 'proof of activity', 'AI verification', 'developer tools'],
  openGraph: {
    title: 'DRP API - Build on Decentralized Rights Protocol',
    description: 'Developer API documentation for DRP - Proof of Status, Proof of Activity, and AI Elder verification endpoints.',
    images: ['/DRP.png'],
  },
}

export default function APIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
              Build on <span className="text-primary-600 dark:text-primary-400">DRP</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              Access powerful APIs for Proof of Status, Proof of Activity, and AI Elder verification. 
              Build decentralized applications on the human-rights-centered blockchain.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                data-tally-open="3xKMro"
                data-tally-hide-title="1"
                data-tally-overlay="1"
                data-tally-emoji-text="👋"
                data-tally-emoji-animation="wave"
                className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Request API Key
              </button>
              <Link
                href="#docs"
                className="text-sm font-semibold leading-6 text-neutral-900 dark:text-white"
              >
                View Documentation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-neutral-900 dark:text-white">
              DRP API
            </Link>
            <div className="flex gap-6">
              <a href="#overview" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400">Overview</a>
              <a href="#endpoints" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400">Endpoints</a>
              <a href="#sdk" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400">SDK</a>
              <a href="#docs" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400">Docs</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Overview Section */}
      <section id="overview" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">API Overview</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Everything you need to build on DRP
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              Our RESTful API provides secure access to DRP's core features including identity verification, 
              activity proofs, and AI-powered validation.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                  <Key className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" />
                  Proof of Status
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-300">
                  <p className="flex-auto">
                    Verify user identity and reputation status through our secure API endpoints. 
                    Get real-time status verification for any DRP address.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                  <Code className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" />
                  Proof of Activity
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-300">
                  <p className="flex-auto">
                    Submit and verify activity proofs. Track contributions, validate transactions, 
                    and maintain activity records on the DRP blockchain.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                  <Terminal className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" />
                  AI Elder Verification
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-300">
                  <p className="flex-auto">
                    Access AI Elder verification services for automated fraud detection, 
                    activity validation, and network optimization.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Endpoints Section */}
      <section id="endpoints" className="bg-neutral-50 dark:bg-neutral-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">API Endpoints</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Core API Endpoints
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="space-y-8">
              {/* Proof of Status Endpoint */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Proof of Status</h3>
                </div>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm mb-4">
                  <div className="text-green-400">GET /api/v1/status/{'{address}'}</div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  Retrieve the status and reputation information for a given DRP address.
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 text-sm">
                  <div className="text-neutral-500 dark:text-neutral-400 mb-2">Response:</div>
                  <pre className="text-xs overflow-x-auto">{`{
  "address": "0x...",
  "status": "verified",
  "reputation": 95,
  "verifiedAt": "2024-01-15T10:30:00Z"
}`}</pre>
                </div>
              </div>

              {/* Proof of Activity Endpoint */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Proof of Activity</h3>
                </div>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm mb-4">
                  <div className="text-green-400">POST /api/v1/activity/proof</div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  Submit a new activity proof for verification and recording on the blockchain.
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 text-sm">
                  <div className="text-neutral-500 dark:text-neutral-400 mb-2">Request Body:</div>
                  <pre className="text-xs overflow-x-auto">{`{
  "address": "0x...",
  "activityType": "contribution",
  "proof": "...",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                </div>
              </div>

              {/* AI Elder Verification Endpoint */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">AI Elder Verification</h3>
                </div>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm mb-4">
                  <div className="text-green-400">POST /api/v1/elder/verify</div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  Request AI Elder verification for fraud detection and activity validation.
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 text-sm">
                  <div className="text-neutral-500 dark:text-neutral-400 mb-2">Request Body:</div>
                  <pre className="text-xs overflow-x-auto">{`{
  "transactionId": "0x...",
  "verificationType": "fraud_detection",
  "data": {...}
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section id="sdk" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">SDK & Examples</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Get Started with Code Examples
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="space-y-8">
              {/* JavaScript Example */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">JavaScript</h3>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-xs text-neutral-300">{`const response = await fetch('https://api.decentralizedrights.com/v1/status/0x...', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data.status);`}</pre>
                </div>
              </div>

              {/* Python Example */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Python</h3>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-xs text-neutral-300">{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.decentralizedrights.com/v1/status/0x...',
    headers=headers
)

data = response.json()
print(data['status'])`}</pre>
                </div>
              </div>

              {/* C++ Example */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">C++</h3>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-xs text-neutral-300">{`#include <curl/curl.h>
#include <json/json.h>

// Initialize CURL
CURL *curl = curl_easy_init();
curl_easy_setopt(curl, CURLOPT_URL, 
    "https://api.decentralizedrights.com/v1/status/0x...");
curl_easy_setopt(curl, CURLOPT_HTTPHEADER, 
    "Authorization: Bearer YOUR_API_KEY");

// Execute request and parse response
// ...`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="bg-neutral-50 dark:bg-neutral-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">Documentation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Complete API Documentation
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              Explore our comprehensive API documentation with interactive examples and detailed endpoint specifications.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Link
                href="/docs"
                className="flex items-center gap-4 bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 hover:border-primary-600 dark:hover:border-primary-400 transition-colors"
              >
                <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">API Reference</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Complete endpoint documentation</p>
                </div>
                <ExternalLink className="h-5 w-5 text-neutral-400 ml-auto" />
              </Link>
              <Link
                href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 hover:border-primary-600 dark:hover:border-primary-400 transition-colors"
              >
                <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">OpenAPI Spec</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Download OpenAPI specification</p>
                </div>
                <ExternalLink className="h-5 w-5 text-neutral-400 ml-auto" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              &copy; {new Date().getFullYear()} Decentralized Rights Protocol. All rights reserved.
            </p>
            <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
              Powered by DRP
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

