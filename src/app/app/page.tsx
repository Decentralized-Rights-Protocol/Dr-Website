export default function AppRedirect() {
  if (typeof window !== 'undefined') {
    window.location.href = 'https://app.decentralizedrights.com';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-4">Redirecting to App...</h1>
      <p className="text-lg mb-6">
        You are being redirected to the DRP Application Dashboard.
      </p>
      <a 
        href="https://app.decentralizedrights.com"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to App →
      </a>
    </div>
  );
}
