export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-6xl font-bold text-white mb-4">
          Decentralized Rights Protocol
        </h1>
        <p className="text-2xl text-white/90 mb-12">
          Empowering Human Rights through Blockchain Technology
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://explorer.decentralizedrights.com"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-shadow hover:shadow-2xl transform hover:scale-105"
          >
            Explore Blockchain
          </a>
          <a
            href="https://app.decentralizedrights.com"
            className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-shadow hover:shadow-2xl transform hover:scale-105"
          >
            Open App Portal
          </a>
        </div>
        <div className="mt-16 text-white/70 space-y-4">
          <p className="text-lg">🌎 Proof of Activity &amp; Status Verification</p>
          <p className="text-lg">🔗 AI-Powered Human Rights Tracking</p>
          <p className="text-lg">🏡 Transparent, Decentralized &amp; Secure</p>
        </div>
      </div>
    </main>
  )
}
