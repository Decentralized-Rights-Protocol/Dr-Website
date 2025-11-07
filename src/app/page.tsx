export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-center text-gray-800 dark:text-gray-100 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Welcome to the Decentralized Rights Protocol
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8">
        Empowering human rights, sustainability, and AI transparency through blockchain technology.
      </p>
      <div className="flex gap-4">
        <a 
          href="/learn" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Learn More
        </a>
        <a 
          href="/docs" 
          className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition"
        >
          Documentation
        </a>
      </div>
    </main>
  );
}
