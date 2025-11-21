export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Decentralized Rights Protocol
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Empowering human rights through blockchain technology
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://explorer.decentralizedrights.com"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Explore Blockchain
          </a>
          <a 
            href="https://app.decentralizedrights.com"
            className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors"
          >
            Launch App
          </a>
        </div>
      </div>
    </div>
  );
}
