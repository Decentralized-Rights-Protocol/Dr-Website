import Link from 'next/link'
import { FileText, BookOpen, Map, Users, ArrowRight } from 'lucide-react'

const links = [
  {
    name: 'Whitepaper',
    description: 'Read our comprehensive technical whitepaper',
    href: '/whitepaper',
    icon: FileText,
    color: 'bg-primary-600',
  },
  {
    name: 'Documentation',
    description: 'Developer guides and API references',
    href: '/docs',
    icon: BookOpen,
    color: 'bg-secondary-600',
  },
  {
    name: 'Roadmap',
    description: 'Our development timeline and milestones',
    href: '/roadmap',
    icon: Map,
    color: 'bg-accent-600',
  },
  {
    name: 'Community',
    description: 'Join our global community of advocates',
    href: '/community',
    icon: Users,
    color: 'bg-primary-600',
  },
]

export function QuickLinks() {
  return (
    <div className="py-24 sm:py-32 bg-neutral-50 dark:bg-neutral-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Get Started with DRP
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Explore our resources and join the movement to protect human rights through technology.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative rounded-2xl bg-white dark:bg-neutral-900 p-8 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700 hover:ring-primary-600 dark:hover:ring-primary-400 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-x-4">
                <div className={`${link.color} p-2 rounded-lg`}>
                  <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {link.name}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

