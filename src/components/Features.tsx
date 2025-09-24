'use client'

export default function Features() {
  const features = [
    {
      icon: 'fas fa-atom',
      title: 'Quantum Safe',
      description: 'Post-quantum cryptography ensures your data remains secure even against future quantum computers.'
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Human Rights Focus',
      description: 'Built specifically to protect and advance human rights through decentralized technology.'
    },
    {
      icon: 'fas fa-globe-americas',
      title: 'SDGs Alignment',
      description: 'Aligned with UN Sustainable Development Goals to create positive global impact.'
    },
    {
      icon: 'fas fa-shield-virus',
      title: 'Decentralized Security',
      description: 'No single point of failure. Your rights are protected by a distributed network.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile First',
      description: 'Accessible on any device, anywhere in the world, even with limited connectivity.'
    },
    {
      icon: 'fas fa-users-cog',
      title: 'Community Driven',
      description: 'Governed by the community, for the community. Your voice matters in every decision.'
    }
  ]

  return (
    <section id="features" className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Key Features
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Cutting-edge technology for human rights protection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card-bg border border-border-color rounded-2xl p-8 text-center hover:border-accent hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${feature.icon} text-2xl text-white`}></i>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-text-primary">
                  {feature.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
