import Link from 'next/link'

export default function Custom404() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-3xl opacity-20" style={{backgroundImage: 'url(/08_IFOPE_20x30.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '1rem'}} />
          <h1 className="relative text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600">
            Page Not Found
          </h1>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          The block you are looking for doesn’t exist. It may have been moved, deleted, or never existed.
        </p>
        <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-500 transition-colors">
          Return Home
        </Link>
      </div>
    </main>
  )
}


