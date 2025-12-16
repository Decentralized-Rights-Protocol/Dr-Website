'use client'

import { motion } from 'framer-motion'
import { EconomicsHero } from '@/components/economics/EconomicsHero'
import { EconomicsCard } from '@/components/economics/EconomicsCard'
import { EconomicsDiagramSVG } from '@/components/economics/EconomicsDiagramSVG'
import { KeyMetricsPanel } from '@/components/economics/KeyMetricsPanel'
import { MicroMacroNav } from '@/components/economics/MicroMacroNav'
import { DollarSign, TrendingUp, TrendingDown, Users, Activity, Globe, Shield, AlertTriangle, Target } from 'lucide-react'
import { LaTeXEquation } from '@/components/economics/LaTeXEquation'

export default function MacroeconomicsPage() {
  // Mock metrics - replace with real data from API/backend
  const macroMetrics = [
    {
      label: 'Money Supply (M)',
      value: '2.4B $DeRi',
      change: '+12.3%',
      trend: 'up' as const,
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      label: 'Inflation Rate',
      value: '3.2%',
      change: '-0.8%',
      trend: 'down' as const,
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      label: 'Avg Activity per Capita',
      value: '4.7 tasks/day',
      change: '+0.5',
      trend: 'up' as const,
      icon: <Activity className="h-5 w-5" />,
    },
    {
      label: 'Velocity',
      value: '6.8',
      change: '-0.3',
      trend: 'down' as const,
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: 'Recovery Rate (AI)',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up' as const,
      icon: <Shield className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      {/* Hero */}
      <EconomicsHero
        title="Macroeconomics of DRP"
        subtitle="System-wide dynamics, monetary policy, and long-term stability in the Decentralized Rights Protocol"
      />

      {/* Navigation */}
      <MicroMacroNav />

      {/* Key Metrics Panel */}
      <section className="py-12 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <KeyMetricsPanel metrics={macroMetrics} title="Macroeconomic Indicators" />
        </div>
      </section>

      {/* Section 1: Money Supply Model */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                1. Money Supply Model
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                The DRP money supply expands endogenously through verified activity, creating a unique monetary model that differs fundamentally from traditional fiat or fixed-supply cryptocurrencies.
              </p>
            </div>

            <EconomicsCard
              title="Activity-Based Money Creation"
              description={
                <>
                  <p className="mb-4">
                    The DRP money supply <strong className="text-neutral-900 dark:text-white">M(t)</strong> at time <em>t</em> is determined by:
                  </p>
                  
                  <LaTeXEquation
                  equation="M(t) = M(t-1) + \sum_{i=1}^{n} \left( A_i \cdot w_i \cdot v_i \cdot d(t) \right)"
                  label="Money Supply Evolution"
                  variables={[
                    { symbol: 'M(t)', description: 'Money supply at time t' },
                    { symbol: 'M(t-1)', description: 'Previous period money supply' },
                    { symbol: 'A_i', description: 'Verified activity by agent i in period t' },
                    { symbol: 'w_i', description: 'Activity-specific reward weight (e.g., learning = 1.2, sustainability = 1.5)' },
                    { symbol: 'v_i', description: 'AI verification confidence score (0 ≤ v_i ≤ 1), ensuring only legitimate activity generates tokens' },
                    { symbol: 'd(t)', description: 'Difficulty adjustment parameter that adjusts based on velocity and inflation targets' },
                    { symbol: 'n', description: 'Total number of active agents' }
                  ]}
                  explanation="This creates a supply curve that shifts with activity: as more agents engage in verified activity, money supply expands. However, the protocol manages this through difficulty adjustments and velocity controls to prevent excessive inflation. Unlike traditional central banking where money creation is exogenous (decided by central banks), DRP money creation is endogenous—driven by real economic activity. This aligns money supply with economic output, creating a more stable monetary system."
                />

                </>
              }
              delay={0.1}
            />

            <EconomicsCard
              title="Money Supply Components"
              description={
                <>
                  <p className="mb-4">
                    The DRP money supply can be decomposed into:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>M0 (Base Money):</strong> Tokens held in wallets, not in circulation</li>
                    <li><strong>M1 (Narrow Money):</strong> Tokens actively used for transactions</li>
                    <li><strong>M2 (Broad Money):</strong> M1 + tokens locked in staking, governance, or time-locked contracts</li>
                  </ul>
                  <p>
                    The protocol monitors <strong className="text-neutral-900 dark:text-white">velocity (V)</strong>—the rate at which tokens circulate—to determine if money supply growth is excessive. High velocity with stable prices indicates healthy economic activity; high velocity with rising prices indicates inflationary pressure.
                  </p>
                </>
              }
              delay={0.2}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Inflation & Stabilization Tools */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                2. Inflation & Stabilization Tools
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                DRP employs a sophisticated stabilization mechanism that uses quiz friction, difficulty tuning, and reward modulation to maintain price stability while preserving economic growth.
              </p>
            </div>

            <EconomicsCard
              title="The Quantity Theory of Money in DRP"
              description={
                <>
                  <p className="mb-4">
                    The classic equation of exchange applies to DRP:
                  </p>
                  
                  <LaTeXEquation
                    equation="M \cdot V = P \cdot Y"
                    label="Equation of Exchange"
                    variables={[
                      { symbol: 'M', description: 'Money supply (total $DeRi tokens in circulation)' },
                      { symbol: 'V', description: 'Velocity of money (rate of token circulation, transactions per token per period)' },
                      { symbol: 'P', description: 'Price level (general price of goods/services denominated in $DeRi)' },
                      { symbol: 'Y', description: 'Real output (aggregate verified activity + transaction value)' }
                    ]}
                    explanation="To maintain price stability (stable P), the protocol must balance M, V, and Y. If M × V grows faster than Y, inflation occurs. DRP's stabilization tools target V (velocity) through quiz friction and M (supply growth rate) through difficulty adjustments to keep P stable."
                  />

                </>
              }
              delay={0.1}
            />

            <div className="mt-12 mb-8">
              <EconomicsDiagramSVG type="control-loop" delay={0.2} />
            </div>

            <EconomicsCard
              title="Quiz Friction as Velocity Control"
              description={
                <>
                  <p className="mb-4">
                    <strong className="text-neutral-900 dark:text-white">Quiz friction</strong> is DRP&apos;s primary velocity management tool:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Mechanism:</strong> Before accessing high-value activities or rewards, agents must complete knowledge quizzes</li>
                    <li><strong>Effect on Velocity:</strong> Quizzes slow down token circulation by requiring time investment, reducing V</li>
                    <li><strong>Adaptive Difficulty:</strong> When velocity is too high (indicating excessive token creation), quiz difficulty increases, further reducing participation and velocity</li>
                    <li><strong>Quality Filter:</strong> Quizzes ensure agents understand activities, reducing low-quality participation that could inflate M without corresponding Y growth</li>
                  </ul>
                  <p>
                    This is a form of <strong className="text-neutral-900 dark:text-white">non-monetary policy:</strong> instead of adjusting interest rates (which don&apos;t exist in DRP), the protocol adjusts friction to manage velocity. It&apos;s inspired by <strong className="text-neutral-900 dark:text-white">mechanism design theory</strong> and creates a self-regulating system.
                  </p>
                </>
              }
              delay={0.3}
            />

            <EconomicsCard
              title="Difficulty Tuning & Reward Modulation"
              description={
                <>
                  <p className="mb-4">
                    The protocol adjusts two key parameters to manage money supply growth:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Difficulty Adjustment:</strong> As more agents participate, task difficulty increases, reducing the rate of successful activity completion and thus slowing M growth</li>
                    <li><strong>Reward Modulation:</strong> Reward weights can be adjusted algorithmically. During high-inflation periods, weights may decrease, reducing token issuance per unit of activity</li>
                  </ul>
                  <p>
                    These adjustments are <strong className="text-neutral-900 dark:text-white">algorithmic and transparent:</strong> the protocol publishes difficulty and reward parameters, allowing agents to anticipate changes. This creates predictable monetary policy that agents can plan around, similar to how central banks publish interest rate targets.
                  </p>
                </>
              }
              delay={0.4}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 3: Output, Productivity & Employment */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                3. Output, Productivity & Employment
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                DRP defines economic output differently from traditional GDP, focusing on verified human activity, transaction value, and sustainability contributions.
              </p>
            </div>

            <EconomicsCard
              title="DRP Output Measure (Y_DRP)"
              description={
                <>
                  <p className="mb-4">
                    DRP output is measured as:
                  </p>
                  
                  <LaTeXEquation
                    equation="Y_{DRP} = \sum_{i=1}^{n} (A_i^{verified} \cdot q_i) + \sum_{j=1}^{m} T_j + \sum_{k=1}^{p} (S_k \cdot w_k^{SDG})"
                    label="DRP Output Calculation"
                    variables={[
                      { symbol: 'Y_{DRP}', description: 'Total DRP economic output' },
                      { symbol: 'A_i^{verified}', description: 'Verified activity by agent i, validated by AI Elders' },
                      { symbol: 'q_i', description: 'Quality score for activity i (0 ≤ q_i ≤ 1)' },
                      { symbol: 'T_j', description: 'Transaction value j within DRP apps and services' },
                      { symbol: 'S_k', description: 'Sustainability contribution k (renewable energy usage, education, etc.)' },
                      { symbol: 'w_k^{SDG}', description: 'SDG weight for contribution k, reflecting UN Sustainable Development Goal importance' },
                      { symbol: 'n, m, p', description: 'Number of activities, transactions, and sustainability contributions respectively' }
                    ]}
                    explanation="This creates a broader measure of economic value than traditional GDP: it includes non-market activities (learning, community service) and sustainability contributions that traditional economics externalize. Output growth in DRP reflects genuine human development and environmental sustainability, not just market transactions."
                  />

                </>
              }
              delay={0.1}
            />

            <EconomicsCard
              title="Full-Employment Mechanism"
              description={
                <>
                  <p className="mb-4">
                    DRP achieves <strong className="text-neutral-900 dark:text-white">full employment</strong> through its activity-based model:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Universal Participation:</strong> All agents can engage in verified activity, regardless of traditional employment status</li>
                    <li><strong>Diverse Activity Types:</strong> The economy supports multiple activity types (work, learning, community service, sustainability), ensuring agents can find activities matching their capabilities</li>
                    <li><strong>Rights-Based Floor:</strong> Even agents unable to contribute receive basic support, ensuring no one is excluded</li>
                    <li><strong>Low Barriers to Entry:</strong> Unlike traditional labor markets with high entry barriers, DRP activities are accessible to all</li>
                  </ul>
                  <p>
                    This creates a <strong className="text-neutral-900 dark:text-white">post-scarcity employment model:</strong> the economy can absorb unlimited participation because output (verified activity) expands with participation. There&apos;s no fixed number of &quot;jobs&quot;—the economy creates opportunities as agents engage.
                  </p>
                </>
              }
              delay={0.2}
            />

            <EconomicsCard
              title="Productivity & Structural Transformation"
              description={
                <>
                  <p className="mb-4">
                    DRP productivity improves through:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Skill Development:</strong> Learn-to-earn model incentivizes education, improving human capital and productivity</li>
                    <li><strong>Specialization:</strong> Agents naturally specialize in activities where they have comparative advantage, increasing efficiency</li>
                    <li><strong>Technology Adoption:</strong> Apps and services improve productivity by automating routine tasks and enabling new capabilities</li>
                    <li><strong>Network Effects:</strong> As more agents join, network value increases, creating positive externalities that boost productivity</li>
                  </ul>
                  <p>
                    The economy undergoes <strong className="text-neutral-900 dark:text-white">structural transformation:</strong> as agents develop skills and technology improves, the composition of output shifts toward higher-value activities. This is similar to traditional economic development (agriculture → industry → services) but accelerated and more inclusive, as the learn-to-earn model ensures all agents can participate in the transformation.
                  </p>
                </>
              }
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 4: Fiscal & Monetary Policy */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                4. Fiscal & Monetary Policy in DRP
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                DRP implements algorithmic fiscal and monetary policy through AI-driven resource allocation and protocol parameter adjustments, creating a transparent, rules-based economic system.
              </p>
            </div>

            <EconomicsCard
              title="AI-Driven Fiscal Policy"
              description={
                <>
                  <p className="mb-4">
                    <strong className="text-neutral-900 dark:text-white">Fiscal policy</strong> in DRP refers to resource allocation and spending decisions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Reward Allocation:</strong> AI determines reward weights for different activity types, effectively allocating resources to incentivize desired behaviors (e.g., higher weights for sustainability activities)</li>
                    <li><strong>Ecosystem Grants:</strong> Governance allocates grants to apps and services that advance SDG goals or rights fulfillment</li>
                    <li><strong>Stimulus Programs:</strong> During economic downturns, the protocol can increase reward weights or reduce verification costs to stimulate activity</li>
                    <li><strong>Rights-Based Spending:</strong> A portion of protocol resources is automatically allocated to rights-based distribution, ensuring basic needs are met</li>
                  </ul>
                  <p>
                    This is <strong className="text-neutral-900 dark:text-white">algorithmic fiscal policy:</strong> decisions are made by transparent algorithms and governance, not by discretionary central authorities. AI assists in optimization, but humans (through governance) set priorities and constraints.
                  </p>
                </>
              }
              delay={0.1}
            />

            <EconomicsCard
              title="Algorithmic Monetary Policy"
              description={
                <>
                  <p className="mb-4">
                    <strong className="text-neutral-900 dark:text-white">Monetary policy</strong> in DRP manages money supply and velocity:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Difficulty Adjustment:</strong> Protocol automatically adjusts task difficulty based on velocity and inflation metrics</li>
                    <li><strong>Quiz Friction:</strong> Quiz difficulty and frequency adjust to manage velocity</li>
                    <li><strong>Reward Modulation:</strong> Reward weights adjust to control money supply growth</li>
                    <li><strong>Verification Cost Adjustment:</strong> Costs adjust to fine-tune activity levels and effective money supply</li>
                  </ul>
                  <p>
                    Policy transmission works through <strong className="text-neutral-900 dark:text-white">expectations and incentives:</strong> when agents observe difficulty increases or quiz friction, they adjust behavior, reducing activity and velocity. This creates a self-regulating system where policy changes automatically propagate through agent behavior.
                  </p>
                </>
              }
              delay={0.2}
            />

            <EconomicsCard
              title="Policy Constraints & Transparency"
              description={
                <>
                  <p className="mb-4">
                    DRP policy operates under constraints:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Rights Constraints:</strong> Policy cannot violate basic rights—rights-based distribution must be maintained regardless of economic conditions</li>
                    <li><strong>Transparency Requirements:</strong> All policy parameters are public and auditable</li>
                    <li><strong>Governance Oversight:</strong> Major policy changes require $RIGHTS holder approval</li>
                    <li><strong>AI Explainability:</strong> AI-driven decisions must be explainable and auditable</li>
                  </ul>
                  <p>
                    These constraints ensure that policy serves human welfare and rights, not just economic efficiency. The system is designed to be <strong className="text-neutral-900 dark:text-white">transparent and democratic,</strong> with governance providing human oversight of algorithmic policy.
                  </p>
                </>
              }
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 5: Inequality Dynamics & Redistribution */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                5. Inequality Dynamics & Redistribution
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                DRP addresses inequality through status accrual mechanisms, rights-based allocation, and activity credits that create pathways for upward mobility while ensuring basic needs are met.
              </p>
            </div>

            <EconomicsCard
              title="Status Accrual & Upward Mobility"
              description={
                <>
                  <p className="mb-4">
                    Unlike traditional systems where wealth inequality compounds (rich get richer), DRP&apos;s status accrual creates <strong className="text-neutral-900 dark:text-white">pathways for upward mobility:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Earned Status:</strong> Status is earned through activity, not inherited or purchased</li>
                    <li><strong>Diminishing Returns:</strong> High-status agents face higher difficulty, preventing excessive status concentration</li>
                    <li><strong>Clear Pathways:</strong> New agents have transparent pathways to status improvement through consistent activity</li>
                    <li><strong>Activity Credits:</strong> Non-transferable reputation ensures status reflects genuine contribution</li>
                  </ul>
                  <p>
                    This creates a <strong className="text-neutral-900 dark:text-white">meritocratic system</strong> where inequality reflects differences in contribution, not differences in initial endowments or extraction of surplus value.
                  </p>
                </>
              }
              delay={0.1}
            />

            <EconomicsCard
              title="Rights-Based Allocation & Redistribution"
              description={
                <>
                  <p className="mb-4">
                    DRP implements automatic redistribution through rights-based allocation:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Basic Needs Guarantee:</strong> All agents receive basic support regardless of activity level, ensuring no one falls below a minimum threshold</li>
                    <li><strong>Progressive Reward Structure:</strong> High-quality, specialized activity receives higher rewards, but the gap is moderated by rights-based floors</li>
                    <li><strong>SDG-Aligned Redistribution:</strong> Resources are allocated to advance SDG goals, benefiting marginalized communities</li>
                    <li><strong>Community Service Rewards:</strong> Activities that benefit communities receive higher rewards, creating positive externalities</li>
                  </ul>
                  <p>
                    This is not traditional redistribution (taking from rich, giving to poor) but <strong className="text-neutral-900 dark:text-white">rights-based allocation:</strong> resources are allocated based on human rights and contribution, not market power. The system ensures that even those who cannot contribute economically (due to age, disability, or circumstances) receive support as a matter of right.
                  </p>
                </>
              }
              delay={0.2}
            />

            <EconomicsCard
              title="Gini Coefficient & Inequality Measurement"
              description={
                <>
                  <p className="mb-4">
                    DRP tracks inequality using the <strong className="text-neutral-900 dark:text-white">Gini coefficient</strong> (0 = perfect equality, 1 = perfect inequality):
                  </p>
                  <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg mb-4">
                    <p className="mb-4">
                      <strong>Current DRP Gini (Token Holdings):</strong> ~0.35 (moderate inequality)
                    </p>
                    <p className="mb-4">
                      <strong>Traditional Economy Gini:</strong> ~0.70+ (high inequality)
                    </p>
                    <p>
                      <strong>Target DRP Gini:</strong> &lt;0.40 (maintained through rights-based allocation and status accrual mechanisms)
                    </p>
                  </div>
                  <p className="mb-4">
                    The model shows that DRP&apos;s combination of:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Rights-based floors (prevents extreme poverty)</li>
                    <li>Earned status (prevents inherited inequality)</li>
                    <li>Activity credits (prevents status purchase)</li>
                  </ul>
                  <p>
                    Creates a more equal distribution than traditional markets while still rewarding contribution. The system is designed to <strong className="text-neutral-900 dark:text-white">reduce inequality over time</strong> as more agents participate and status pathways become established.
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-4 italic">
                    * Gini values are illustrative. Replace with real data from protocol analytics.
                  </p>
                </>
              }
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 6: International & Systemic Effects */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                6. International & Systemic Effects
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                DRP operates as a post-national economic system with cross-border adoption, cross-chain interactions, and asset recovery mechanisms that create global economic integration.
              </p>
            </div>

            <EconomicsCard
              title="Cross-Border Adoption & Post-National Currency"
              description={
                <>
                  <p className="mb-4">
                    DRP tokens function as a <strong className="text-neutral-900 dark:text-white">post-national currency:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Borderless Transactions:</strong> Agents can transact across borders without currency conversion or traditional banking</li>
                    <li><strong>Universal Participation:</strong> Anyone with internet access can participate, regardless of nationality or location</li>
                    <li><strong>Rights-Based Framework:</strong> The system recognizes universal human rights, transcending national boundaries</li>
                    <li><strong>SDG Alignment:</strong> Global SDG goals create shared objectives that unite agents across borders</li>
                  </ul>
                  <p>
                    This creates a <strong className="text-neutral-900 dark:text-white">global economic commons</strong> where value flows based on contribution and rights, not nationality or geopolitical power. The system enables remittances, cross-border trade, and global collaboration without traditional financial intermediaries.
                  </p>
                </>
              }
              delay={0.1}
            />

            <EconomicsCard
              title="Cross-Chain Interactions & Interoperability"
              description={
                <>
                  <p className="mb-4">
                    DRP operates across multiple blockchains, creating interoperability:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Multi-Chain Support:</strong> DRP tokens can exist on Ethereum, Polygon, and other chains</li>
                    <li><strong>Cross-Chain Bridges:</strong> Agents can move tokens between chains, increasing liquidity and reducing single-chain risk</li>
                    <li><strong>Interoperable Apps:</strong> DRP apps can interact with other blockchain ecosystems, creating network effects</li>
                    <li><strong>Asset Portability:</strong> Agents can move assets between chains without losing status or reputation</li>
                  </ul>
                  <p>
                    This creates a <strong className="text-neutral-900 dark:text-white">resilient, multi-chain economy</strong> that isn&apos;t dependent on a single blockchain. If one chain experiences issues, agents can migrate to others, maintaining economic continuity.
                  </p>
                </>
              }
              delay={0.2}
            />

            <EconomicsCard
              title="Asset Recovery & Liquidity Effects"
              description={
                <>
                  <p className="mb-4">
                    DRP&apos;s asset recovery mechanisms (for lost wallets, keys, etc.) affect liquidity:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Recovery Mechanisms:</strong> AI Elders can help recover lost assets through identity verification and social recovery</li>
                    <li><strong>Liquidity Impact:</strong> Recovered assets re-enter circulation, increasing liquidity</li>
                    <li><strong>Trust Effects:</strong> Recovery mechanisms increase trust, encouraging more agents to participate and hold tokens</li>
                    <li><strong>Reduced Dead Capital:</strong> Unlike traditional systems where lost keys mean permanent loss, DRP can recover assets, reducing dead capital</li>
                  </ul>
                  <p>
                    This creates a <strong className="text-neutral-900 dark:text-white">more efficient economy</strong> where capital doesn&apos;t get permanently lost. However, the protocol must balance recovery mechanisms with security—too-easy recovery could enable fraud, while too-difficult recovery reduces trust.
                  </p>
                </>
              }
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 7: Long-Term Stability & Shocks */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                7. Long-Term Stability & Shocks
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                DRP is designed to withstand economic shocks through adaptive mechanisms, diversified participation, and algorithmic stabilization tools.
              </p>
            </div>

            <EconomicsCard
              title="Supply Shocks: Mass Offline Events"
              description={
                <>
                  <p className="mb-4">
                    <strong className="text-neutral-900 dark:text-white">Supply shocks</strong> occur when many agents go offline (e.g., internet outages, natural disasters):
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Impact:</strong> Activity drops → money supply growth slows → potential deflationary pressure</li>
                    <li><strong>Protocol Response:</strong> Difficulty automatically decreases, making remaining activity more rewarding. This incentivizes remaining agents to increase activity, partially offsetting the shock</li>
                    <li><strong>Rights-Based Continuity:</strong> Rights-based allocation continues, ensuring basic needs are met even during shocks</li>
                    <li><strong>Recovery:</strong> As agents return, activity normalizes and difficulty readjusts</li>
                  </ul>
                  <p>
                    The system is <strong className="text-neutral-900 dark:text-white">resilient to supply shocks</strong> because it can adjust difficulty and maintain rights-based distribution even when activity drops. Unlike traditional economies that may collapse during crises, DRP can maintain basic functionality.
                  </p>
                </>
              }
              icon={<AlertTriangle className="h-8 w-8 text-orange-500" />}
              delay={0.1}
            />

            <EconomicsCard
              title="Demand Shocks: Token Dumps & Speculative Attacks"
              description={
                <>
                  <p className="mb-4">
                    <strong className="text-neutral-900 dark:text-white">Demand shocks</strong> occur when agents dump tokens (e.g., speculative attacks, panic selling):
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Impact:</strong> Token price drops → velocity increases → potential inflationary pressure</li>
                    <li><strong>Protocol Response:</strong> Quiz friction increases, difficulty increases, reducing effective money supply growth. This slows velocity and stabilizes prices</li>
                    <li><strong>Long-Term Holders:</strong> Agents with high activity credits and $RIGHTS holdings are less likely to dump, as they have long-term incentives</li>
                    <li><strong>Recovery:</strong> As panic subsides, velocity normalizes and friction adjusts</li>
                  </ul>
                  <p>
                    The system is <strong className="text-neutral-900 dark:text-white">resistant to demand shocks</strong> because velocity controls can quickly respond. Additionally, the rights-based framework creates a floor: even during panics, basic distribution continues, maintaining trust.
                  </p>
                </>
              }
              icon={<TrendingDown className="h-8 w-8 text-red-500" />}
              delay={0.2}
            />

            <EconomicsCard
              title="Resilience Factors"
              description={
                <>
                  <p className="mb-4">
                    DRP&apos;s long-term stability is supported by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Diversified Participation:</strong> Global, cross-border participation reduces single-point-of-failure risk</li>
                    <li><strong>Multi-Chain Architecture:</strong> Not dependent on a single blockchain, reducing technical risk</li>
                    <li><strong>Algorithmic Policy:</strong> Transparent, rules-based policy reduces uncertainty and prevents arbitrary interventions</li>
                    <li><strong>Rights-Based Foundation:</strong> Even during crises, basic rights are maintained, preserving trust</li>
                    <li><strong>AI Verification:</strong> Continuous fraud detection maintains system integrity</li>
                    <li><strong>Governance Oversight:</strong> Human governance provides oversight of algorithmic systems, preventing runaway automation</li>
                  </ul>
                  <p>
                    These factors create a <strong className="text-neutral-900 dark:text-white">robust, adaptive system</strong> that can withstand shocks while maintaining core functionality. The system is designed for long-term sustainability, not short-term optimization.
                  </p>
                </>
              }
              icon={<Shield className="h-8 w-8 text-blue-500" />}
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      {/* Callout: Macroeconomic Intuition */}
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
                Macroeconomic Intuition
              </h3>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-4">
                The DRP macroeconomic model creates a <strong className="text-neutral-900 dark:text-white">self-stabilizing, rights-based economy</strong> that differs fundamentally from traditional systems. Money supply expands with real activity, not arbitrary central bank decisions. Inflation is controlled through velocity management (quiz friction) rather than interest rates. Output includes non-market activities and sustainability contributions, creating a broader measure of economic value.
              </p>
              <p className="text-lg text-neutral-700 dark:text-neutral-300">
                The system is designed for <strong className="text-neutral-900 dark:text-white">long-term stability and resilience:</strong> it can withstand supply and demand shocks through adaptive mechanisms, maintains rights-based distribution even during crises, and operates as a post-national currency that enables global economic integration. The result is a macroeconomic system that serves human welfare and environmental sustainability, not just economic growth metrics.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
