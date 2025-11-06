import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Key, AlertTriangle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Post-Quantum Security - DRP Documentation',
  description: 'Learn about DRP\'s quantum-resistant cryptography and security features using CRYSTALS-Kyber and CRYSTALS-Dilithium.',
}

export default function SecurityPage() {
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
            Post-Quantum Security
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            DRP uses NIST-approved post-quantum cryptographic algorithms to ensure long-term security against both classical and quantum computer attacks.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Quantum-Resistant Cryptography</h2>
            </div>
            <p className="text-blue-100 text-lg">
              DRP implements post-quantum cryptography (PQC) standards to protect against future quantum computing threats while maintaining compatibility with existing systems.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Why Post-Quantum Cryptography?</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Current cryptographic algorithms (RSA, ECC) are vulnerable to attacks from quantum computers. As quantum computing advances, these systems will become insecure. DRP uses post-quantum cryptography to ensure security even when quantum computers become available.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <h4 className="font-semibold text-neutral-900 dark:text-white">Classical Cryptography</h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Vulnerable to quantum attacks. Requires migration to PQC.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h4 className="font-semibold text-neutral-900 dark:text-white">Post-Quantum Cryptography</h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Resistant to both classical and quantum attacks. Future-proof security.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CRYSTALS-Kyber */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Key className="h-8 w-8" />
              <h2 className="text-3xl font-bold">CRYSTALS-Kyber</h2>
            </div>
            <p className="text-purple-100 text-lg">
              Key encapsulation mechanism for secure key exchange in quantum-resistant systems.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Overview</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              CRYSTALS-Kyber is a key encapsulation mechanism (KEM) selected by NIST for post-quantum standardization. It provides secure key exchange that remains secure even when quantum computers become available.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Features</h4>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>NIST-approved post-quantum algorithm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Efficient key generation and encapsulation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Small key and ciphertext sizes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Fast operations suitable for blockchain</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CRYSTALS-Dilithium */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Lock className="h-8 w-8" />
              <h2 className="text-3xl font-bold">CRYSTALS-Dilithium</h2>
            </div>
            <p className="text-green-100 text-lg">
              Digital signature scheme for quantum-resistant authentication and transaction signing.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Overview</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              CRYSTALS-Dilithium is a digital signature scheme selected by NIST for post-quantum standardization. It provides secure digital signatures that remain secure against quantum attacks.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Features</h4>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>NIST-approved post-quantum signature algorithm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Efficient signing and verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Compact signature sizes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Secure against quantum attacks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Management */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Key Management</h2>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              DRP implements secure key management practices for post-quantum cryptographic keys:
            </p>
            <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Keys are generated using secure random number generators</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Private keys are encrypted and stored securely</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Key rotation policies for enhanced security</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Hardware security module (HSM) support for enterprise deployments</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Security Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">For Developers</h3>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Always use the latest DRP SDK versions</li>
                <li>• Never hardcode private keys</li>
                <li>• Use environment variables for configuration</li>
                <li>• Regularly update dependencies</li>
                <li>• Follow secure coding practices</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">For Node Operators</h3>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Use secure hosting environments</li>
                <li>• Enable firewall and access controls</li>
                <li>• Monitor node activity regularly</li>
                <li>• Keep software updated</li>
                <li>• Implement backup strategies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Learn More</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Explore more about DRP security and implementation:
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/examples"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Security Examples
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              More Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

