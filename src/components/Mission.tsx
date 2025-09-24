'use client'

export default function Mission() {
  const missionCards = [
    {
      icon: 'fas fa-globe-americas',
      title: 'Global Impact',
      description: 'Creating decentralized solutions that work across borders, cultures, and political systems to protect human rights.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Transparency',
      description: 'Blockchain technology ensures immutable records and transparent processes that can\'t be manipulated or censored.'
    },
    {
      icon: 'fas fa-users',
      title: 'Community Driven',
      description: 'Empowering communities to take control of their rights through decentralized governance and collective action.'
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Justice',
      description: 'Providing tools and platforms that ensure fair access to justice and legal representation for all.'
    }
  ]

  return (
    <section id="mission" className="py-20 bg-darker-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Humanitarian Mission
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Using technology to protect and advance human rights worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missionCards.map((card, index) => (
            <div
              key={index}
              className="bg-card-bg border border-border-color rounded-2xl p-8 text-center hover:border-primary hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${card.icon} text-2xl text-white`}></i>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-text-primary">
                  {card.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
