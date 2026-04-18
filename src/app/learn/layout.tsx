import React from 'react';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient glow at top */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[500px] 
          bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-indigo-900/20 via-transparent to-transparent" />
      
      {/* Content */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
