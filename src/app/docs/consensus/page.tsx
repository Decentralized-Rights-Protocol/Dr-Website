import { Metadata } from 'next'
import Link from 'next/link'
import { Brain, Shield, Activity, Users, ArrowLeft, Code, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Consensus & AI - DRP Documentation',
  description: 'Understand Proof of Status, Proof of Activities, and AI verification in the Decentralized Rights Protocol.',
}

export default function ConsensusPage() {
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
            Consensus & AI Verification
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            DRP uses a revolutionary consensus mechanism combining Proof of Status (PoS) and Proof of Activities (PoA) with AI verification to ensure trust and authenticity.
          </p>
        </div>

        {/* Proof of Status */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Proof of Status (PoS)</h2>
            </div>
            <p className="text-primary-100 text-lg">
              Proof of Status verifies the identity and standing of participants in the DRP network. It ensures that only verified, legitimate users can participate in consensus and governance.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 mb-6">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">How It Works</h3>
            <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-3">
                <span className="text-primary-600 dark:text-primary-400 font-bold">1.</span>
                <span>Users register their identity through a decentralized identity system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 dark:text-primary-400 font-bold">2.</span>
                <span>Status is verified through multiple attestations from trusted sources</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 dark:text-primary-400 font-bold">3.</span>
                <span>Status level determines voting power and participation rights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 dark:text-primary-400 font-bold">4.</span>
                <span>Status can be upgraded through demonstrated commitment and activity</span>
              </li>
            </ul>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Status Levels</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg">
                <div className="font-bold text-primary-600 dark:text-primary-400 mb-2">Basic</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Basic participation rights</div>
              </div>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg">
                <div className="font-bold text-secondary-600 dark:text-secondary-400 mb-2">Verified</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Enhanced voting and rewards</div>
              </div>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg">
                <div className="font-bold text-purple-600 dark:text-purple-400 mb-2">Elder</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Maximum governance power</div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof of Activities */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Activity className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Proof of Activities (PoA)</h2>
            </div>
            <p className="text-purple-100 text-lg">
              Proof of Activities rewards participants for meaningful contributions to the network, including node operation, governance participation, and community engagement.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 mb-6">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Activity Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <Zap className="h-6 w-6 text-yellow-500 mb-2" />
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Node Operation</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Running and maintaining network nodes</p>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <Users className="h-6 w-6 text-blue-500 mb-2" />
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Governance</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Participating in voting and proposals</p>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <Code className="h-6 w-6 text-green-500 mb-2" />
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Development</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Contributing code and improvements</p>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <Brain className="h-6 w-6 text-purple-500 mb-2" />
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Community</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Engaging and educating others</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Verification */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Brain className="h-8 w-8" />
              <h2 className="text-3xl font-bold">AI Elders & Verification</h2>
            </div>
            <p className="text-blue-100 text-lg">
              Advanced AI systems verify activities, detect fraud, and ensure the integrity of the consensus mechanism.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">AI Verification Process</h3>
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">1. Activity Analysis</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  AI systems analyze patterns in user activities to detect genuine contributions versus automated or fraudulent behavior.
                </p>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">2. Fraud Detection</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Machine learning models identify suspicious patterns, sybil attacks, and attempts to game the system.
                </p>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">3. Reputation Scoring</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  AI assigns reputation scores based on consistency, quality, and impact of contributions over time.
                </p>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">4. Consensus Participation</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Verified users with high reputation scores participate in consensus decisions with weighted voting power.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Technical Implementation</h2>
          <div className="bg-neutral-900 rounded-xl p-6 font-mono text-sm text-green-400">
            <div className="space-y-2">
              <div className="text-neutral-400"># Consensus Algorithm</div>
              <div>def verify_consensus(block, statuses, activities):</div>
              <div className="pl-4">  # Verify Proof of Status</div>
              <div className="pl-4">  status_verified = verify_status(block.user)</div>
              <div className="pl-4">  # Verify Proof of Activities</div>
              <div className="pl-4">  activity_verified = verify_activities(block.user)</div>
              <div className="pl-4">  # AI Verification</div>
              <div className="pl-4">  ai_score = ai_elder.verify(block)</div>
              <div className="pl-4">  # Combined consensus</div>
              <div className="pl-4">  return status_verified and activity_verified and ai_score &gt; threshold</div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Next Steps</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Ready to implement consensus in your DRP application? Check out our examples and API documentation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/examples"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              View Examples
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

