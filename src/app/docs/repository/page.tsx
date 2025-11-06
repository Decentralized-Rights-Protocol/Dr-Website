import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Code, Folder, FileText, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Repository Structure - DRP Documentation',
  description: 'Explore the DRP Blockchain codebase structure and organization.',
}

export default function RepositoryPage() {
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
            Repository Structure
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Understand the organization of the DRP Blockchain codebase and where to find key components.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Folder className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Codebase Overview</h2>
            </div>
            <p className="text-primary-100 text-lg">
              The DRP Blockchain repository is organized into logical modules for maintainability and scalability.
            </p>
          </div>
        </section>

        {/* Directory Structure */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Directory Structure</h2>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-blue-500" />
                <span className="text-neutral-900 dark:text-white">src/</span>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-green-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">node.py</span>
                  <span className="text-neutral-500 text-xs">- Main node implementation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-green-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">consensus.py</span>
                  <span className="text-neutral-500 text-xs">- Consensus mechanisms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-green-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">crypto.py</span>
                  <span className="text-neutral-500 text-xs">- Cryptographic functions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-green-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">ai/</span>
                  <span className="text-neutral-500 text-xs">- AI Elder implementations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-green-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">network/</span>
                  <span className="text-neutral-500 text-xs">- P2P networking</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-4">
                <Package className="h-4 w-4 text-blue-500" />
                <span className="text-neutral-900 dark:text-white">tests/</span>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-yellow-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">test_*.py</span>
                  <span className="text-neutral-500 text-xs">- Unit and integration tests</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <FileText className="h-4 w-4 text-blue-500" />
                <span className="text-neutral-900 dark:text-white">docs/</span>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <span className="text-neutral-600 dark:text-neutral-400">README.md</span>
                  <span className="text-neutral-500 text-xs">- Project documentation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Files */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Key Files</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">requirements.txt</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Lists all Python dependencies required to run the DRP node. Install with <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">pip install -r requirements.txt</code>
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">README.md</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Main project documentation including setup instructions, architecture overview, and contribution guidelines.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">src/node.py</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Entry point for running a DRP node. Handles initialization, peer connections, and consensus participation.
              </p>
            </div>
          </div>
        </section>

        {/* Module Descriptions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Module Descriptions</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Consensus Module</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                Implements Proof of Status and Proof of Activity consensus mechanisms with AI verification.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Cryptography Module</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                Post-quantum cryptographic implementations using CRYSTALS-Kyber and CRYSTALS-Dilithium.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">AI Module</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                AI Elder implementations for verification, fraud detection, and network optimization.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Network Module</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                P2P networking layer for node communication and blockchain synchronization.
              </p>
            </div>
          </div>
        </section>

        {/* GitHub Link */}
        <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Explore the Repository</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            View the full source code and contribute to the project on GitHub.
          </p>
          <a
            href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

