export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-bounce delay-500"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400/15 rounded-full blur-xl animate-pulse delay-700"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-fade-in-up">
              Protecting Human Rights
              <span className="block bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent animate-gradient-x">
                Through Blockchain
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-300 animate-fade-in-up delay-200">
              The Decentralized Rights Protocol (DRP) is building a quantum-safe, transparent platform to protect, verify, and advance human rights globally using cutting-edge blockchain technology.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up delay-300">
              <a
                href="/whitepaper"
                className="group rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-lg hover:bg-neutral-50 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Read Whitepaper
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </a>
              <a
                href="/docs"
                className="group text-sm font-semibold leading-6 text-white hover:text-neutral-300 transition-colors duration-300"
              >
                View Documentation <span className="group-hover:translate-x-1 transition-transform inline-block" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div className="group flex flex-col animate-fade-in-up hover:scale-105 transition-transform duration-300" style={{animationDelay: '400ms'}}>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white group-hover:text-secondary-300 transition-colors duration-300">
                  <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 group-hover:shadow-lg transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 flex-none text-secondary-400 group-hover:text-secondary-300 group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    </svg>
                  </div>
                  Quantum-Safe Security
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
                  <p className="flex-auto">Advanced cryptography protecting human rights data from future threats</p>
                </dd>
              </div>

              <div className="group flex flex-col animate-fade-in-up hover:scale-105 transition-transform duration-300" style={{animationDelay: '500ms'}}>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white group-hover:text-secondary-300 transition-colors duration-300">
                  <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 group-hover:shadow-lg transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 flex-none text-secondary-400 group-hover:text-secondary-300 group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  Community Governance
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
                  <p className="flex-auto">Decentralized decision-making ensuring protocol serves global needs</p>
                </dd>
              </div>

              <div className="group flex flex-col animate-fade-in-up hover:scale-105 transition-transform duration-300" style={{animationDelay: '600ms'}}>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white group-hover:text-secondary-300 transition-colors duration-300">
                  <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 group-hover:shadow-lg transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 flex-none text-secondary-400 group-hover:text-secondary-300 group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </div>
                  Global Impact
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
                  <p className="flex-auto">Cross-border solutions working across cultures and legal systems</p>
                </dd>
              </div>

              <div className="group flex flex-col animate-fade-in-up hover:scale-105 transition-transform duration-300" style={{animationDelay: '700ms'}}>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white group-hover:text-secondary-300 transition-colors duration-300">
                  <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 group-hover:shadow-lg transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 flex-none text-secondary-400 group-hover:text-secondary-300 group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  Real-time Verification
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
                  <p className="flex-auto">Instant verification and documentation of human rights violations</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Revolutionary Features Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Revolutionary Features
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              DRP combines cutting-edge blockchain technology with AI verification to create a platform that truly serves humanity.
            </p>
          </div>

          {/* Features cards will be here */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature cards from subdomain */}
          </div>

          <div className="mt-16 text-center">
            <a href="/docs" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <span>Explore the Technology</span>
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              To create a decentralized, transparent, and secure platform that protects, verifies, and advances human rights globally through blockchain technology.
            </p>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 flex-none text-primary-600" aria-hidden="true">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Transparency
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-400">
                <p className="flex-auto">Open-source technology and transparent governance processes that anyone can verify and participate in.</p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 flex-none text-primary-600" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
                Security
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-400">
                <p className="flex-auto">Quantum-safe cryptography and robust security measures to protect sensitive human rights data.</p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 flex-none text-primary-600" aria-hidden="true">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                Humanity
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-400">
                <p className="flex-auto">Every decision is guided by our commitment to protecting and advancing human rights globally.</p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 flex-none text-primary-600" aria-hidden="true">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Community
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-400">
                <p className="flex-auto">Decentralized governance ensuring that the protocol serves the needs of human rights defenders worldwide.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Get Started Section */}
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
            <a
              href="/whitepaper"
              className="group relative rounded-2xl bg-white dark:bg-neutral-900 p-8 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700 hover:ring-primary-600 dark:hover:ring-primary-400 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-x-4">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white" aria-hidden="true">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" x2="8" y1="13" y2="13"></line>
                    <line x1="16" x2="8" y1="17" y2="17"></line>
                    <line x1="10" x2="8" y1="9" y2="9"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Whitepaper
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Read our comprehensive technical whitepaper
                  </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </a>

            <a
              href="/docs"
              className="group relative rounded-2xl bg-white dark:bg-neutral-900 p-8 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700 hover:ring-primary-600 dark:hover:ring-primary-400 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-x-4">
                <div className="bg-secondary-600 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white" aria-hidden="true">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Documentation
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Developer guides and API references
                  </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </a>

            <a
              href="/roadmap"
              className="group relative rounded-2xl bg-white dark:bg-neutral-900 p-8 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700 hover:ring-primary-600 dark:hover:ring-primary-400 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-x-4">
                <div className="bg-accent-600 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white" aria-hidden="true">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                    <line x1="9" x2="9" y1="3" y2="18"></line>
                    <line x1="15" x2="15" y1="6" y2="21"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Roadmap
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Our development timeline and milestones
                  </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </a>

            <a
              href="/community"
              className="group relative rounded-2xl bg-white dark:bg-neutral-900 p-8 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700 hover:ring-primary-600 dark:hover:ring-primary-400 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-x-4">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white" aria-hidden="true">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Community
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Join our global community of advocates
                  </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
