import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, GitPullRequest, Code, FileText, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contributing - DRP Documentation',
  description: 'Learn how to contribute to the Decentralized Rights Protocol project.',
}

export default function ContributingPage() {
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
            Contributing to DRP
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Thank you for your interest in contributing to the Decentralized Rights Protocol! Every contribution helps make DRP better.
          </p>
        </div>

        {/* Getting Started */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <GitPullRequest className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Getting Started</h2>
            </div>
            <p className="text-primary-100 text-lg">
              Follow these steps to start contributing to DRP.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">1. Fork the Repository</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                Fork the <a href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">DRP Blockchain repository</a> on GitHub to create your own copy.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">2. Clone Your Fork</h3>
              <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400">git clone https://github.com/YOUR-USERNAME/Dr-Blockchain.git</div>
                <div className="text-blue-400 mt-2">cd Dr-Blockchain</div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">3. Create a Branch</h3>
              <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400">git checkout -b feature/your-feature-name</div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-3">
                Use descriptive branch names like <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">feature/add-new-consensus</code> or <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">fix/security-issue</code>
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">4. Make Your Changes</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Write your code, add tests, and ensure everything works correctly.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">5. Submit a Pull Request</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                Push your changes and create a pull request with a clear description of what you've changed and why.
              </p>
            </div>
          </div>
        </section>

        {/* Contribution Guidelines */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Contribution Guidelines</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-3">
                <Code className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Code Style</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Follow PEP 8 for Python code. Use meaningful variable names, add comments for complex logic, and keep functions focused.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Testing</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Add tests for new features and ensure all existing tests pass. Aim for good test coverage.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Documentation</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Update documentation for any changes you make. Include docstrings for new functions and update README if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pull Request Process */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Pull Request Process</h2>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <ol className="space-y-4 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <span>Ensure your code follows the project's style guidelines</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <span>Write clear commit messages describing your changes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <span>Ensure all tests pass and add new tests if needed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                <span>Update documentation to reflect your changes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">5</span>
                <span>Submit your pull request with a clear description</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Next Steps */}
        <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Ready to Contribute?</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Check out the repository and start contributing today!
          </p>
          <a
            href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            View Repository
          </a>
        </div>
      </div>
    </div>
  )
}

