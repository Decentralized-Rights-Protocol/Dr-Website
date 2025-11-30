'use client'

import { ShieldCheckIcon, LockClosedIcon, CpuChipIcon, CubeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function QuantumSecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Quantum-Safe Security
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Future-proof cryptography protecting human rights for generations to come
          </p>
        </div>

        {/* Quantum-Resistant Signatures */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <ShieldCheckIcon className="w-12 h-12 text-blue-500 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Quantum-Resistant Signatures
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                As quantum computing advances, traditional cryptographic systems face unprecedented threats.
                DRP employs post-quantum cryptography to ensure your rights and data remain secure,
                even against future quantum computers.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                The Quantum Threat
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Quantum computers can break current encryption algorithms like RSA and ECC,
                potentially compromising all existing cryptographic protections. DRP addresses this
                threat proactively.
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                DRP's Solution
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We use quantum-resistant signature schemes including hash-based cryptography,
                lattice-based cryptography, and post-quantum secure key exchange protocols
                recommended by NIST.
              </p>
            </div>
          </div>
        </section>

        {/* Hash-Based Cryptography */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <LockClosedIcon className="w-12 h-12 text-green-500 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Hash-Based Cryptography
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                DRP leverages proven hash-based cryptographic schemes that remain secure
                against both classical and quantum attacks. These methods rely on the
                one-way properties of cryptographic hash functions.
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Merkle Tree Structures
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our signature schemes use Merkle trees to create efficient, stateless
                hash-based signatures. Each signature is unique and cannot be forged,
                even with unlimited computational power.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                One-Time Signatures (OTS)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We use Winternitz One-Time Signatures combined with Merkle trees to
                create efficient, quantum-resistant signature schemes that scale
                to billions of transactions.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Post-Quantum Security Guarantees
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our cryptographic choices are based on mathematical problems that are
                believed to be hard even for quantum computers, providing long-term
                security guarantees for human rights data.
              </p>
            </div>
          </div>
        </section>

        {/* AI ElderCore Governance */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <CpuChipIcon className="w-12 h-12 text-purple-500 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                AI ElderCore Governance
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                DRP combines quantum-safe cryptography with AI-powered governance
                through the ElderCore system, creating a robust, transparent, and
                future-proof governance mechanism.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
              <CubeIcon className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Decentralized Decision Making
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                AI ElderCore enables decentralized governance while maintaining
                security through quantum-resistant cryptographic proofs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
              <ShieldCheckIcon className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Cryptographic Verification
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                All governance decisions are cryptographically signed using
                quantum-resistant algorithms, ensuring long-term verifiability.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
              <LockClosedIcon className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Future-Proof Design
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Our architecture is designed to evolve with cryptographic
                standards while maintaining backward compatibility.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Technical Implementation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Cryptographic Algorithms</h3>
              <ul className="space-y-1 text-blue-100">
                <li>• SPHINCS+ (hash-based signatures)</li>
                <li>• XMSS (eXtended Merkle Signature Scheme)</li>
                <li>• Dilithium (lattice-based signatures)</li>
                <li>• Kyber (key encapsulation)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Security Standards</h3>
              <ul className="space-y-1 text-blue-100">
                <li>• NIST Post-Quantum Cryptography Standard</li>
                <li>• IETF standards compliance</li>
                <li>• Regular security audits</li>
                <li>• Community-driven improvements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            Learn More About DRP
          </Link>
        </div>
      </div>
    </div>
  )
}

