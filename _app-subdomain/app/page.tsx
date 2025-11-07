export default function DRPApp() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-3">Welcome to the DRP App</h1>
      <p>Log in to manage your profile, contributions, and status.</p>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Sign In
      </button>
    </main>
  )
}

