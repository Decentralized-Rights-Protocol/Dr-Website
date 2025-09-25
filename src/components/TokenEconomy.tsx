'use client'

export function TokenEconomy() {
  const tokenCards = [
    {
      icon: 'fas fa-shield-halved',
      name: '$RIGHTS Token',
      symbol: 'Governance & Utility Token',
      features: [
        { icon: 'fas fa-vote-yea', text: 'Governance Rights' },
        { icon: 'fas fa-lock', text: 'Staking Rewards' },
        { icon: 'fas fa-handshake', text: 'Platform Access' }
      ],
      stats: [
        { label: 'Total Supply', value: '1B $RIGHTS' },
        { label: 'Initial Distribution', value: '40% Community' }
      ]
    },
    {
      icon: 'fas fa-globe',
      name: '$DeRi Token',
      symbol: 'Human Rights Impact Token',
      features: [
        { icon: 'fas fa-heart', text: 'Impact Rewards' },
        { icon: 'fas fa-users', text: 'Community Incentives' },
        { icon: 'fas fa-award', text: 'Recognition System' }
      ],
      stats: [
        { label: 'Earned Through', value: 'Human Rights Actions' },
        { label: 'Utility', value: 'Platform Benefits' }
      ]
    }
  ]

  const mechanics = [
    {
      icon: 'fas fa-coins',
      title: 'Staking & Rewards',
      description: 'Stake $RIGHTS tokens to earn rewards and participate in governance decisions.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Deflationary Model',
      description: 'Built-in burn mechanisms reduce token supply over time, increasing scarcity.'
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Governance',
      description: 'Token holders vote on platform upgrades, funding decisions, and policy changes.'
    },
    {
      icon: 'fas fa-hand-holding-heart',
      title: 'Impact Rewards',
      description: 'Earn $DeRi tokens by contributing to human rights initiatives and community building.'
    }
  ]

  return (
    <section id="token-economy" className="py-20 bg-darker-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Token Economy
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Dual-token system powering the decentralized human rights ecosystem
          </p>
        </div>

        {/* Token Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {tokenCards.map((token, index) => (
            <div
              key={index}
              className="bg-card-bg border border-border-color rounded-2xl p-8 text-center hover:border-primary hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${token.icon} text-2xl text-white`}></i>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-text-primary">
                  {token.name}
                </h3>
                
                <p className="text-primary font-medium mb-6">
                  {token.symbol}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {token.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3 p-3 bg-darker-bg border border-border-color rounded-lg">
                      <i className={`${feature.icon} text-primary w-5`}></i>
                      <span className="text-text-secondary">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  {token.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex justify-between items-center p-3 bg-darker-bg border border-border-color rounded-lg">
                      <span className="text-text-secondary font-medium">{stat.label}</span>
                      <span className="text-text-primary font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Token Mechanics */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Token Mechanics
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mechanics.map((mechanic, index) => (
            <div
              key={index}
              className="bg-card-bg border border-border-color rounded-xl p-6 text-center hover:border-primary hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${mechanic.icon} text-xl text-white`}></i>
              </div>
              
              <h4 className="text-lg font-semibold mb-3 text-text-primary">
                {mechanic.title}
              </h4>
              
              <p className="text-text-secondary text-sm leading-relaxed">
                {mechanic.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
