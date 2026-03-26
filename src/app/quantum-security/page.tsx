'use client'

import { ShieldCheckIcon, LockClosedIcon, CpuChipIcon, CubeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'

export default function QuantumSecurityPage() {
  return (
    <PremiumPage>
      <PremiumHero
        badge="Quantum Security"
        title="Quantum-Safe Security for Long-Horizon Trust"
        description="Post-quantum cryptography and AI-assisted governance designed to preserve DRP integrity across future computational eras."
      />

      <div className="mx-auto max-w-5xl px-4 pb-20">
        <PremiumSection
          eyebrow="Core"
          title="Quantum-Resistant Signatures"
          description="DRP uses post-quantum mechanisms to secure rights and data against both classical and quantum attacks."
        >
          <div className="flex items-start gap-4 mb-6">
            <ShieldCheckIcon className="w-12 h-12 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Quantum-Resistant Signatures
              </h3>
              <p className="text-slate-300 leading-relaxed">
                As quantum computing advances, traditional cryptographic systems face unprecedented threats.
                DRP employs post-quantum cryptography to ensure your rights and data remain secure,
                even against future quantum computers.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-900/20 rounded-lg border border-blue-300/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                The Quantum Threat
              </h3>
              <p className="text-slate-300">
                Quantum computers can break current encryption algorithms like RSA and ECC,
                potentially compromising all existing cryptographic protections. DRP addresses this
                threat proactively.
              </p>
            </div>
            
            <div className="bg-purple-900/20 rounded-lg border border-purple-300/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                DRP&apos;s Solution
              </h3>
              <p className="text-slate-300">
                We use quantum-resistant signature schemes including hash-based cryptography,
                lattice-based cryptography, and post-quantum secure key exchange protocols
                recommended by NIST.
              </p>
            </div>
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Architecture" title="Hash-Based Cryptography">
          <div className="flex items-start gap-4 mb-6">
            <LockClosedIcon className="w-12 h-12 text-green-500 flex-shrink-0" />
            <div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Hash-Based Cryptography
              </h3>
              <p className="text-slate-300 leading-relaxed">
                DRP leverages proven hash-based cryptographic schemes that remain secure
                against both classical and quantum attacks. These methods rely on the
                one-way properties of cryptographic hash functions.
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="rounded-lg border border-white/10 bg-black/30 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Merkle Tree Structures
              </h3>
              <p className="text-slate-300">
                Our signature schemes use Merkle trees to create efficient, stateless
                hash-based signatures. Each signature is unique and cannot be forged,
                even with unlimited computational power.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                One-Time Signatures (OTS)
              </h3>
              <p className="text-slate-300">
                We use Winternitz One-Time Signatures combined with Merkle trees to
                create efficient, quantum-resistant signature schemes that scale
                to billions of transactions.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Post-Quantum Security Guarantees
              </h3>
              <p className="text-slate-300">
                Our cryptographic choices are based on mathematical problems that are
                believed to be hard even for quantum computers, providing long-term
                security guarantees for human rights data.
              </p>
            </div>
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Governance Security" title="AI ElderCore Governance">
          <div className="flex items-start gap-4 mb-6">
            <CpuChipIcon className="w-12 h-12 text-purple-500 flex-shrink-0" />
            <div>
              <h3 className="text-3xl font-bold text-white mb-3">
                AI ElderCore Governance
              </h3>
              <p className="text-slate-300 leading-relaxed">
                DRP combines quantum-safe cryptography with AI-powered governance
                through the ElderCore system, creating a robust, transparent, and
                future-proof governance mechanism.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="rounded-lg border border-white/10 bg-black/30 p-6">
              <CubeIcon className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Decentralized Decision Making
              </h3>
              <p className="text-slate-300 text-sm">
                AI ElderCore enables decentralized governance while maintaining
                security through quantum-resistant cryptographic proofs.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 p-6">
              <ShieldCheckIcon className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Cryptographic Verification
              </h3>
              <p className="text-slate-300 text-sm">
                All governance decisions are cryptographically signed using
                quantum-resistant algorithms, ensuring long-term verifiability.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 p-6">
              <LockClosedIcon className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Future-Proof Design
              </h3>
              <p className="text-slate-300 text-sm">
                Our architecture is designed to evolve with cryptographic
                standards while maintaining backward compatibility.
              </p>
            </div>
          </div>
        </PremiumSection>

        <section className="rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-indigo-300/10 p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Technical Implementation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/10 bg-black/25 p-4">
              <h3 className="text-xl font-semibold mb-2">Cryptographic Algorithms</h3>
              <ul className="space-y-1 text-slate-200">
                <li>• SPHINCS+ (hash-based signatures)</li>
                <li>• XMSS (eXtended Merkle Signature Scheme)</li>
                <li>• Dilithium (lattice-based signatures)</li>
                <li>• Kyber (key encapsulation)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/25 p-4">
              <h3 className="text-xl font-semibold mb-2">Security Standards</h3>
              <ul className="space-y-1 text-slate-200">
                <li>• NIST Post-Quantum Cryptography Standard</li>
                <li>• IETF standards compliance</li>
                <li>• Regular security audits</li>
                <li>• Community-driven improvements</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="text-center mt-12">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Learn More About DRP
          </Link>
        </div>
      </div>
    </PremiumPage>
  )
}

