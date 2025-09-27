import { Shield, Eye, Heart, Users } from 'lucide-react'

const values = [
  {
    name: 'Transparency',
    description: 'Open-source technology and transparent governance processes that anyone can verify and participate in.',
    icon: Eye,
  },
  {
    name: 'Security',
    description: 'Quantum-safe cryptography and robust security measures to protect sensitive human rights data.',
    icon: Shield,
  },
  {
    name: 'Humanity',
    description: 'Every decision is guided by our commitment to protecting and advancing human rights globally.',
    icon: Heart,
  },
  {
    name: 'Community',
    description: 'Decentralized governance ensuring that the protocol serves the needs of human rights defenders worldwide.',
    icon: Users,
  },
]

export function MissionSection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Our Mission
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            To create a decentralized, transparent, and secure platform that protects, 
            verifies, and advances human rights globally through blockchain technology.
          </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                <value.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                {value.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-400">
                <p className="flex-auto">{value.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
