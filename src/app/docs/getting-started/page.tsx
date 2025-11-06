import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Code, Terminal, CheckCircle, BookOpen, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Getting Started - DRP Documentation',
  description: 'Get started with the Decentralized Rights Protocol. Learn how to set up your development environment and run your first DRP node.',
}

export default function GettingStartedPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Documentation
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl mb-4">
            Getting Started
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Welcome to the Decentralized Rights Protocol! This guide will help you set up your development environment and run your first DRP node.
          </p>
        </div>

        {/* Prerequisites */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Prerequisites</h2>
            </div>
            <p className="text-primary-100 text-lg">
              Before you begin, ensure you have the following installed on your system.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Python 3.10 or higher</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    DRP is built with Python. Check your version with <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">python --version</code>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Git</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Required for cloning the repository. Install from <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">git-scm.com</a>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">pip (Python package manager)</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Usually comes with Python. Verify with <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">pip --version</code>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Virtual Environment (recommended)</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Use <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">venv</code> or <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">virtualenv</code> to isolate dependencies
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Terminal className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Installation</h2>
            </div>
            <p className="text-purple-100 text-lg">
              Follow these steps to install and set up DRP on your system.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Step 1: Clone the Repository</h3>
              <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-neutral-400"># Clone the DRP Blockchain repository</div>
                <div className="text-green-400 mt-2">git clone https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain.git</div>
                <div className="text-neutral-400 mt-2"># Navigate to the project directory</div>
                <div className="text-blue-400">cd Dr-Blockchain</div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Step 2: Create Virtual Environment</h3>
              <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-neutral-400"># Create virtual environment</div>
                <div className="text-green-400 mt-2">python -m venv venv</div>
                <div className="text-neutral-400 mt-2"># Activate virtual environment</div>
                <div className="text-green-400"># On macOS/Linux:</div>
                <div className="text-blue-400">source venv/bin/activate</div>
                <div className="text-green-400 mt-2"># On Windows:</div>
                <div className="text-blue-400">venv\Scripts\activate</div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Step 3: Install Dependencies</h3>
              <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-neutral-400"># Install required packages</div>
                <div className="text-green-400 mt-2">pip install -r requirements.txt</div>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
                This will install all necessary dependencies including cryptographic libraries, networking modules, and AI frameworks.
              </p>
            </div>
          </div>
        </section>

        {/* Running Your First Node */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Rocket className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Running Your First Node</h2>
            </div>
            <p className="text-blue-100 text-lg">
              Start a testnet node to begin participating in the DRP network.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Start Testnet Node</h3>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm mb-4">
              <div className="text-neutral-400"># Run the testnet node</div>
              <div className="text-green-400 mt-2">python src/node.py</div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Your node will start connecting to the DRP testnet. You should see output indicating:
            </p>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 list-disc list-inside">
              <li>Node initialization</li>
              <li>Peer discovery and connection</li>
              <li>Blockchain synchronization status</li>
              <li>Consensus participation</li>
            </ul>
          </div>
        </section>

        {/* Configuration */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Configuration</h2>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              DRP nodes can be configured through environment variables or configuration files. Key settings include:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <code className="text-sm text-primary-600 dark:text-primary-400">NODE_HOST</code>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">- Network interface to bind to (default: 0.0.0.0)</span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <code className="text-sm text-primary-600 dark:text-primary-400">NODE_PORT</code>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">- Port to listen on (default: 8080)</span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <code className="text-sm text-primary-600 dark:text-primary-400">NETWORK</code>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">- Network mode: testnet or mainnet</span>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Next Steps</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Now that your node is running, explore these resources to learn more about DRP:
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/consensus"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Learn About Consensus
            </Link>
            <Link
              href="/docs/examples"
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              View Code Examples
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              Browse Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

