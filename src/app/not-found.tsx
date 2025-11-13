export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black text-center text-gray-800 dark:text-gray-100 px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Oops — Page Not Found!</h2>
      <p className="text-lg mb-8 max-w-md">
        The page you are looking for doesn&rsquo;t exist or was moved.
      </p>
      <a 
        href="/" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}
