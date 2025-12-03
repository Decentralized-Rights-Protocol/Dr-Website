import Link from 'next/link'
import { ParticleBackground } from '@/components/particle-background'

export default function NotFound() {
  return (
    <div className="relative min-h-screen style={{ background: "linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)" }} overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-32 pb-24">
        <h1 className="text-8xl font-bold mb-4 text-white animate-fade-in-up">404</h1>
        <h2 className="text-3xl font-bold mb-4 text-white sm:text-4xl animate-fade-in-up delay-200">
          Page Not Found
        </h2>
        <p className="text-lg mb-8 max-w-md text-neutral-300 animate-fade-in-up delay-300">
          The page you are looking for doesn&rsquo;t exist or was moved.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up delay-400"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
