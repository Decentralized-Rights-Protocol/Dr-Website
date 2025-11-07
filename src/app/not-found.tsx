export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black text-center text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Oops — Page Not Found!</h1>
      <p className="text-lg mb-6">The page you are looking for doesn't exist or was moved.</p>
      <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Go Home
      </a>
    </div>
  )
}
