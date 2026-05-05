import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative bg-[#0a0a0a] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00ff9f]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00d9ff]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Info */}
      <div className="z-10 text-center mb-8 space-y-2">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
          ARCHIS<span className="text-[#00ff9f]">.KULKARNI</span>
        </h1>
        <p className="text-gray-500 font-mono text-sm md:text-base">
          [ AI ENGINEER / FULL STACK DEVELOPER ]
        </p>
      </div>

      {/* Terminal UI */}
      <Terminal />

      {/* Footer / Tip */}
      <div className="mt-8 z-10 text-center">
        <p className="text-gray-600 font-mono text-xs">
          Type <span className="text-[#00ff9f]">help</span> to see available commands or use the buttons above.
        </p>
      </div>

      {/* Social Shortcut Overlay - Optional, but adds premium feel */}
      <div className="fixed bottom-6 right-6 flex space-x-4">
        {/* Placeholder for small social icons if needed */}
      </div>
    </main>
  );
}
