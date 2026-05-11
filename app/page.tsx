import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative bg-[#050505] overflow-hidden selection:bg-[#00ff9f]/30">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00ff9f]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00d9ff]/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
      </div>

      {/* Header Info */}
      <div className="z-10 text-center mb-12 space-y-4">
        <div className="inline-block px-3 py-1 rounded-full border border-[#00ff9f]/20 bg-[#00ff9f]/5 mb-2">
          <span className="text-[#00ff9f] text-[10px] font-mono tracking-widest uppercase animate-pulse">System Status: Operational</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          ARCHIS<span className="text-[#00ff9f] drop-shadow-[0_0_10px_rgba(0,255,159,0.3)]">.KULKARNI</span>
        </h1>
        <div className="flex items-center justify-center space-x-3 text-gray-500 font-mono text-xs md:text-sm tracking-[0.2em]">
          <span>AI ENGINEER</span>
          <span className="text-[#00ff9f]/30">/</span>
          <span>FULL STACK DEVELOPER</span>
        </div>
      </div>

      {/* Terminal UI */}
      <div className="z-10 w-full flex justify-center">
        <Terminal />
      </div>

      {/* Footer / Tip */}
      <div className="mt-12 z-10 text-center">
        <p className="text-gray-600 font-mono text-[10px] tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
          Terminal Interface v2.0 // Powered by <span className="text-[#00ff9f]">Next.js</span> & <span className="text-[#00d9ff]">Framer Motion</span>
        </p>
      </div>

      {/* Social Shortcut Overlay */}
      <div className="fixed bottom-8 left-8 flex flex-col space-y-6 hidden lg:flex">
        <div className="w-[1px] h-20 bg-gradient-to-t from-[#00ff9f] to-transparent opacity-20 ml-2" />
        <p className="text-[#00ff9f]/40 font-mono text-[10px] rotate-90 origin-left ml-2 whitespace-nowrap tracking-[0.5em] uppercase">Connect_Now</p>
      </div>
    </main>
  );
}

