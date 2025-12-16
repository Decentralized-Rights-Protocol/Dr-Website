'use client'

import { motion } from 'framer-motion'
import { EconomicsHero } from '@/components/economics/EconomicsHero'
import { EconomicsCard } from '@/components/economics/EconomicsCard'
import { EconomicsDiagramSVG } from '@/components/economics/EconomicsDiagramSVG'
import { KeyMetricsPanel } from '@/components/economics/KeyMetricsPanel'
import { MicroMacroNav } from '@/components/economics/MicroMacroNav'
import { Activity, Coins, Users, Shield, TrendingUp, CheckCircle, AlertTriangle, Target } from 'lucide-react'
import { LaTeXEquation } from '@/components/economics/LaTeXEquation'

export default function MicroeconomicsPage() {
  // Mock metrics - replace with real data from API/backend
  const microMetrics = [
    {
      label: 'Activity Rate',
      value: '73.2%',
      change: '+5.3%',
      trend: 'up' as const,
      icon: <Activity className="h-5 w-5" />,
    },
    {
      label: 'Avg Reward per Task',
      value: '12.5 $DeRi',
      change: '+2.1%',
      trend: 'up' as const,
      icon: <Coins className="h-5 w-5" />,
    },
    {
      label: 'Status Growth Rate',
      value: '8.4%',
      change: '+1.2%',
      trend: 'up' as const,
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      label: 'Verification Cost',
      value: '0.03 $DeRi',
      change: '-0.5%',
      trend: 'down' as const,
      icon: <Shield className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      {/* Hero */}
      <EconomicsHero
        title="Microeconomics of DRP"
        subtitle="Individual incentives, agent behavior, and market mechanisms in the Decentralized Rights Protocol"
      />

      {/* Navigation */}
      <MicroMacroNav />

      {/* Key Metrics Panel */}
      <section className="py-12 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <KeyMetricsPanel metrics={microMetrics} title="Microeconomic Indicators" />
        </div>
      </section>

      {/* Section 1: Agents & Roles */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              1. Agents & Roles
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              The DRP economy consists of three primary agent types, each with distinct roles, incentives, and behavioral patterns:
            </p>

            <div className="space-y-6">
              <EconomicsCard
                title="Individuals (Activity Producers)"
                description={
                  <>
                    <p className="mb-4">
                      Individuals are the primary value creators in the DRP economy. They engage in verified activities—work, learning, community service, and sustainable practices—that generate economic value.
                    </p>
                    <p className="mb-4">
                      <strong className="text-neutral-900 dark:text-white">Incentives:</strong> Individuals are motivated by:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li>Direct token rewards ($DeRi) for verified activity</li>
                      <li>Status accrual through Proof of Status (PoS), which unlocks governance rights and premium access</li>
                      <li>Rights-based allocation ensuring basic needs are met regardless of activity level</li>
                      <li>Reputation capital that compounds over time, creating long-term value</li>
                    </ul>
                    <p>
                      <strong className="text-neutral-900 dark:text-white">Behavioral Pattern:</strong> Rational agents optimize their activity mix to maximize utility, balancing effort, reward, and status. Specialization emerges as agents discover comparative advantages in specific activity types (e.g., technical skills, community building, sustainability practices).
                    </p>
                  </>
                }
                icon={<Users className="h-8 w-8 text-blue-500" />}
                delay={0.1}
              />

              <EconomicsCard
                title="Producers (App Developers & Service Providers)"
                description={
                  <>
                    <p className="mb-4">
                      Producers create applications, services, and infrastructure that facilitate activity and generate transaction value. They operate within the DRP ecosystem, earning revenue through transaction fees, premium features, and ecosystem grants.
                    </p>
                    <p className="mb-4">
                      <strong className="text-neutral-900 dark:text-white">Incentives:</strong> Producers are motivated by:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li>Transaction fees from app usage (denominated in $DeRi or $RIGHTS)</li>
                      <li>Ecosystem grants for apps that advance SDG goals or rights fulfillment</li>
                      <li>Network effects: more users → more value → more revenue</li>
                      <li>Governance influence through $RIGHTS token holdings</li>
                    </ul>
                    <p>
                      <strong className="text-neutral-900 dark:text-white">Behavioral Pattern:</strong> Producers compete on quality, user experience, and alignment with DRP values. The rights-based framework creates positive externalities: apps that enhance human dignity and sustainability receive preferential treatment, creating a virtuous cycle.
                    </p>
                  </>
                }
                icon={<Target className="h-8 w-8 text-green-500" />}
                delay={0.2}
              />

              <EconomicsCard
                title="Protocol (AI Elders & Governance)"
                description={
                  <>
                    <p className="mb-4">
                      The Protocol acts as the economic infrastructure, providing verification, governance, and monetary policy. AI Elders verify activity, detect fraud, and maintain system integrity. Governance (via $RIGHTS holders) sets parameters, allocates resources, and responds to shocks.
                    </p>
                    <p className="mb-4">
                      <strong className="text-neutral-900 dark:text-white">Incentives:</strong> The Protocol is designed to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li>Maximize verified human activity and rights fulfillment</li>
                      <li>Maintain price stability through algorithmic monetary policy</li>
                      <li>Prevent fraud and ensure system integrity</li>
                      <li>Promote sustainability and reduce inequality</li>
                    </ul>
                    <p>
                      <strong className="text-neutral-900 dark:text-white">Behavioral Pattern:</strong> The Protocol operates as a transparent, algorithmic system. AI Elders use explainable AI to verify activity, with human oversight ensuring fairness. Governance decisions are made through transparent voting, with $RIGHTS holders incentivized to act in the long-term interest of the ecosystem.
                    </p>
                  </>
                }
                icon={<Shield className="h-8 w-8 text-purple-500" />}
                delay={0.3}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Goods & Tokens */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              2. Goods & Tokens
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              The DRP economy uses a dual-token system plus activity credits, each serving distinct economic functions:
            </p>

            <div className="space-y-6 mb-8">
              <EconomicsCard
                title="$DeRi Token: Medium of Exchange & Utility"
                description={
                  <>
                    <p className="mb-4">
                      <strong className="text-neutral-900 dark:text-white">Functions:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li><strong>Medium of Exchange:</strong> Used for transactions, app fees, and payments within the DRP ecosystem</li>
                      <li><strong>Unit of Account:</strong> Prices and rewards are denominated in $DeRi</li>
                      <li><strong>Store of Value:</strong> Agents can hold $DeRi for future use, though velocity is managed through friction mechanisms</li>
                      <li><strong>Reward Mechanism:</strong> Primary token issued for verified activity</li>
                    </ul>
                    <p>
                      <strong className="text-neutral-900 dark:text-white">Behavior:</strong> $DeRi supply expands algorithmically based on verified activity. Demand is driven by transaction needs, app usage, and speculative holdings. The protocol manages velocity through quiz-based friction, preventing excessive hoarding while maintaining liquidity.
                    </p>
                  </>
                }
                icon={<Coins className="h-8 w-8 text-blue-500" />}
                delay={0.1}
              />

              <EconomicsCard
                title="$RIGHTS Token: Governance & Status"
                description={
                  <>
                    <p className="mb-4">
                      <strong className="text-neutral-900 dark:text-white">Functions:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li><strong>Governance Rights:</strong> Holders vote on protocol parameters, resource allocation, and policy changes</li>
                      <li><strong>Status Capital:</strong> $RIGHTS holdings signal long-term commitment and influence</li>
                      <li><strong>Access Control:</strong> Premium features and exclusive opportunities may require $RIGHTS</li>
                      <li><strong>Reputation Mechanism:</strong> Accrued through verified activity and community contribution</li>
                    </ul>
                    <p>
                      <strong className="text-neutral-900 dark:text-white">Behavior:</strong> $RIGHTS are earned through Proof of Status (PoS), which rewards consistent, high-quality activity. Unlike $DeRi, $RIGHTS are not primarily used for transactions but for governance and status. This creates a two-tier system: utility ($DeRi) and governance ($RIGHTS), aligning incentives with long-term ecosystem health.
                    </p>
                  </>
                }
                icon={<Shield className="h-8 w-8 text-purple-500" />}
                delay={0.2}
              />

              <EconomicsCard
                title="Activity Credits: Non-Transferable Reputation"
                description={
                  <>
                    <p className="mb-4">
                      Activity Credits are non-transferable tokens that represent verified contribution history. They serve as reputation capital, unlocking privileges, reducing verification costs, and signaling trustworthiness.
                    </p>
                    <p className="mb-4">
                      <strong className="text-neutral-900 dark:text-white">Functions:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li><strong>Reputation Capital:</strong> Cannot be bought or sold, only earned through activity</li>
                      <li><strong>Access Gating:</strong> High-value opportunities may require minimum activity credits</li>
                      <li><strong>Cost Reduction:</strong> Agents with high activity credits pay lower verification fees</li>
                      <li><strong>Trust Signal:</strong> Enables reputation-based matching and reduced friction</li>
                    </ul>
                    <p>
                      <strong className="text-neutral-900 dark:text-white">Behavior:</strong> Activity Credits create a commitment mechanism: agents cannot simply purchase status, they must earn it through sustained contribution. This prevents Sybil attacks and ensures that reputation reflects genuine value creation.
                    </p>
                  </>
                }
                icon={<CheckCircle className="h-8 w-8 text-green-500" />}
                delay={0.3}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Supply & Demand */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              3. Supply & Demand in DRP
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              Unlike traditional markets, DRP features <strong className="text-white">algorithmic supply</strong> driven by verified activity, creating a unique supply-demand dynamic.
            </p>

            <EconomicsCard
              title="Algorithmic Supply: Activity-Based Issuance"
              description={
                <>
                  <p className="mb-4">
                    Token supply in DRP is not fixed or arbitrarily set by a central authority. Instead, supply expands algorithmically based on verified human activity:
                  </p>
                  
                  <LaTeXEquation
                    equation="M(t) = \sum_{i=1}^{n} \left( A_i \cdot w_i \cdot v_i \right)"
                    label="Activity-Based Money Supply"
                    variables={[
                      { symbol: 'M(t)', description: 'Token supply at time t' },
                      { symbol: 'A_i', description: 'Quantity of verified activity by agent i' },
                      { symbol: 'w_i', description: 'Activity-specific reward weight (e.g., learning activities may have higher weights)' },
                      { symbol: 'v_i', description: 'AI verification confidence score (0 ≤ v_i ≤ 1), ensuring only legitimate activity generates tokens' },
                      { symbol: 'n', description: 'Total number of active agents' }
                    ]}
                    explanation="This creates a positive feedback loop: more activity → more tokens → more economic activity → more demand for tokens. However, the protocol manages this through velocity controls (quizzes, difficulty tuning) to prevent runaway inflation."
                  />

                </>
              }
              delay={0.1}
            />

            <div className="mt-8">
              <EconomicsDiagramSVG type="supply-demand" delay={0.2} />
            </div>

            <EconomicsCard
              title="Demand Drivers"
              description={
                <>
                  <p className="mb-4">
                    Demand for $DeRi tokens is driven by multiple factors:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Transaction Demand:</strong> Agents need $DeRi to pay for app fees, services, and goods within the ecosystem</li>
                    <li><strong>Speculative Demand:</strong> Agents hold $DeRi expecting future value appreciation</li>
                    <li><strong>Activity Participation:</strong> Agents need $DeRi to participate in certain activities or access premium features</li>
                    <li><strong>Network Effects:</strong> As more agents join, network value increases, driving demand</li>
                  </ul>
                  <p>
                    The protocol balances supply and demand through <strong className="text-neutral-900 dark:text-white">algorithmic monetary policy:</strong> when velocity is too high (indicating excessive token creation relative to economic activity), difficulty increases and quiz friction is applied, reducing effective supply growth.
                  </p>
                </>
              }
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 4: Price Mechanisms & Market Design */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              4. Price Mechanisms & Market Design
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              DRP employs sophisticated mechanism design principles to create efficient, fair markets that align individual incentives with collective welfare.
            </p>

            <EconomicsCard
              title="Algorithmic Markets"
              description={
                <>
                  <p className="mb-4">
                    Unlike traditional markets with continuous price discovery, DRP uses <strong className="text-neutral-900 dark:text-white">algorithmic pricing</strong> based on:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Activity-Based Valuation:</strong> Token rewards are calculated algorithmically based on activity type, quality, and verification score</li>
                    <li><strong>Difficulty Adjustment:</strong> As more agents participate, task difficulty increases, maintaining reward scarcity</li>
                    <li><strong>Time-Weighted Scoring:</strong> Recent activity may be weighted more heavily, preventing gaming through historical accumulation</li>
                  </ul>
                  <p>
                    This creates <strong className="text-neutral-900 dark:text-white">predictable, transparent pricing</strong> that reduces information asymmetry and prevents market manipulation.
                  </p>
                </>
              }
              delay={0.1}
            />

            <EconomicsCard
              title="Reputation Price Discrimination"
              description={
                <>
                  <p className="mb-4">
                    DRP implements a form of <strong className="text-neutral-900 dark:text-white">reputation-based price discrimination</strong> that benefits high-status agents:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Lower Verification Costs:</strong> Agents with high activity credits pay lower fees</li>
                    <li><strong>Premium Access:</strong> High-status agents get early access to new features and opportunities</li>
                    <li><strong>Higher Reward Multipliers:</strong> Consistent, high-quality activity receives bonus rewards</li>
                  </ul>
                  <p>
                    This is not traditional price discrimination (which benefits sellers) but <strong className="text-neutral-900 dark:text-white">merit-based differentiation</strong> that rewards genuine contribution. It creates incentives for long-term engagement and quality over quantity.
                  </p>
                </>
              }
              delay={0.2}
            />

            <EconomicsCard
              title="Gating Quizzes as Velocity Management"
              description={
                <>
                  <p className="mb-4">
                    One of DRP&apos;s most innovative mechanisms is the use of <strong className="text-neutral-900 dark:text-white">gating quizzes</strong> to manage token velocity:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Friction Mechanism:</strong> Before accessing high-value activities or rewards, agents must complete knowledge quizzes</li>
                    <li><strong>Velocity Control:</strong> Quizzes slow down token circulation, preventing excessive velocity that could lead to inflation</li>
                    <li><strong>Quality Filter:</strong> Quizzes ensure agents understand the activity they&apos;re engaging in, reducing fraud and low-quality participation</li>
                    <li><strong>Difficulty Tuning:</strong> Quiz difficulty adjusts based on system velocity: high velocity → harder quizzes → reduced participation → lower velocity</li>
                  </ul>
                  <p>
                    This is inspired by <strong className="text-neutral-900 dark:text-white">mechanism design theory</strong> and <strong className="text-neutral-900 dark:text-white">game-theoretic signaling:</strong> agents who are willing to invest time in quizzes signal commitment and reduce the likelihood of malicious behavior. The mechanism is transparent and algorithmic, preventing arbitrary gatekeeping.
                  </p>
                </>
              }
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 5: Incentives & Anti-Fraud */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              5. Incentives & Anti-Fraud
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              DRP uses a multi-layered approach to align incentives and prevent fraud, combining AI detection, economic penalties, and verification costs.
            </p>

            <EconomicsCard
              title="AI Anomaly Detection"
              description={
                <>
                  <p className="mb-4">
                    AI Elders continuously monitor activity patterns to detect anomalies that may indicate fraud:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Pattern Recognition:</strong> Unusual activity patterns (e.g., identical submissions, bot-like behavior) trigger flags</li>
                    <li><strong>Cross-Validation:</strong> Multiple verification sources (AI + human Elders) reduce false positives</li>
                    <li><strong>Explainable AI:</strong> Detection decisions are transparent and auditable, preventing black-box discrimination</li>
                    <li><strong>Adaptive Learning:</strong> The system learns from new fraud patterns, improving detection over time</li>
                  </ul>
                  <p>
                    This creates a <strong className="text-neutral-900 dark:text-white">trust layer</strong> that maintains system integrity without requiring surveillance of all agents.
                  </p>
                </>
              }
              icon={<Shield className="h-8 w-8 text-blue-500" />}
              delay={0.1}
            />

            <EconomicsCard
              title="Slashing & Economic Penalties"
              description={
                <>
                  <p className="mb-4">
                    Agents caught engaging in fraud face economic penalties:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Token Slashing:</strong> Fraudulent activity results in token confiscation or reduction</li>
                    <li><strong>Status Reduction:</strong> Activity credits and $RIGHTS holdings may be reduced</li>
                    <li><strong>Verification Costs:</strong> Agents with fraud history face higher verification fees</li>
                    <li><strong>Reputation Damage:</strong> Fraud records are transparent, affecting future opportunities</li>
                  </ul>
                  <p>
                    The <strong className="text-neutral-900 dark:text-white">expected cost of fraud</strong> must exceed the expected benefit, creating a strong disincentive. The system is designed to be forgiving for honest mistakes (which are distinguished from intentional fraud through AI analysis) while being harsh on systematic abuse.
                  </p>
                </>
              }
              icon={<AlertTriangle className="h-8 w-8 text-red-500" />}
              delay={0.2}
            />

            <EconomicsCard
              title="Verification Costs as Micro-Level Policy Levers"
              description={
                <>
                  <p className="mb-4">
                    Verification costs serve as <strong className="text-neutral-900 dark:text-white">micro-level policy levers</strong> that can be adjusted to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Manage Activity Levels:</strong> Higher costs reduce low-quality participation; lower costs encourage engagement</li>
                    <li><strong>Incentivize Quality:</strong> High-quality agents (with high activity credits) pay lower fees, creating quality incentives</li>
                    <li><strong>Prevent Spam:</strong> Minimum verification costs prevent Sybil attacks and spam submissions</li>
                    <li><strong>Balance Supply:</strong> Adjusting verification costs affects effective token supply, providing fine-grained monetary control</li>
                  </ul>
                  <p>
                    This is a form of <strong className="text-neutral-900 dark:text-white">algorithmic fiscal policy</strong> at the micro level: the protocol can adjust verification costs in response to economic conditions, similar to how central banks adjust interest rates.
                  </p>
                </>
              }
              icon={<TrendingUp className="h-8 w-8 text-green-500" />}
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 6: Micro Outcomes & Comparative Advantage */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              6. Micro Outcomes & Comparative Advantage
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              The DRP economy produces micro-level equilibria through specialization, skill premiums, and status differentiation, creating efficient resource allocation.
            </p>

            <EconomicsCard
              title="Specialization & Skill Premium"
              description={
                <>
                  <p className="mb-4">
                    Agents naturally specialize in activities where they have <strong className="text-neutral-900 dark:text-white">comparative advantage:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Technical Skills:</strong> Developers, data scientists, and engineers focus on high-value technical activities</li>
                    <li><strong>Community Building:</strong> Social agents specialize in community organization and engagement</li>
                    <li><strong>Sustainability:</strong> Environmentally-conscious agents focus on renewable energy and sustainable practices</li>
                    <li><strong>Education:</strong> Educators and learners engage in learn-to-earn activities</li>
                  </ul>
                  <p>
                    The protocol rewards <strong className="text-neutral-900 dark:text-white">skill premiums:</strong> high-quality, specialized activity receives higher reward multipliers. This creates incentives for skill development and efficient specialization, similar to traditional labor markets but without the extraction of surplus value by capital owners.
                  </p>
                </>
              }
              delay={0.1}
            />

            <EconomicsCard
              title="Status Differentiation & Equilibrium"
              description={
                <>
                  <p className="mb-4">
                    Status accrual creates a <strong className="text-neutral-900 dark:text-white">differentiated equilibrium:</strong> agents with high status receive premium access and lower costs, while new agents face higher barriers but have clear pathways to status improvement.
                  </p>
                  <p className="mb-4">
                    This creates multiple equilibria:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>High-Status Agents:</strong> Low verification costs, premium access, governance influence</li>
                    <li><strong>Mid-Status Agents:</strong> Moderate costs, standard access, growing influence</li>
                    <li><strong>New Agents:</strong> Higher costs, basic access, but clear status improvement pathways</li>
                  </ul>
                  <p>
                    Unlike traditional systems where status is inherited or purchased, DRP status is <strong className="text-neutral-900 dark:text-white">earned through contribution,</strong> creating a meritocratic equilibrium that rewards value creation.
                  </p>
                </>
              }
              delay={0.2}
            />

            {/* Agent Payoffs Table */}
            <div className="mt-8 bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Agent Payoff Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Agent Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Activity Level</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Expected Reward</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Status Accrual</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900 dark:text-white">Verification Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">High-Status Specialist</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">High (specialized)</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">15-25 $DeRi/day</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">+0.5% daily</td>
                      <td className="py-3 px-4 text-green-600 dark:text-green-400 font-medium">0.01 $DeRi</td>
                    </tr>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">Mid-Status Generalist</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">Medium (diverse)</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">8-15 $DeRi/day</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">+0.2% daily</td>
                      <td className="py-3 px-4 text-yellow-600 dark:text-yellow-400 font-medium">0.02 $DeRi</td>
                    </tr>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">New Agent</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">Low (learning)</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">3-8 $DeRi/day</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">+0.1% daily</td>
                      <td className="py-3 px-4 text-red-600 dark:text-red-400 font-medium">0.03 $DeRi</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">Rights-Based Recipient</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">Minimal (basic needs)</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">2-5 $DeRi/day</td>
                      <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300">Stable</td>
                      <td className="py-3 px-4 text-blue-600 dark:text-blue-400 font-medium">0.00 $DeRi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-4 italic">
                * Values are illustrative. Replace with real data from protocol analytics.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Callout: Economic Intuition */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 border border-blue-200 dark:border-blue-900 shadow-lg">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Economic Intuition
              </h3>
              <p className="text-lg text-neutral-700 dark:text-neutral-300">
                The DRP microeconomic model creates a <strong className="text-neutral-900 dark:text-white">self-organizing economy</strong> where individual incentives align with collective welfare. Unlike traditional markets where value extraction creates winners and losers, DRP&apos;s activity-based model ensures that value flows to those who create it. Specialization emerges naturally, status is earned through contribution, and fraud is disincentivized through economic penalties. The result is a <strong className="text-neutral-900 dark:text-white">meritocratic equilibrium</strong> that rewards value creation while ensuring basic rights are met for all participants.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
