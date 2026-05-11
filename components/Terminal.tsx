"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';
import CommandInput from './CommandInput';
import { handleCommand, CommandResponse, COMMANDS } from './CommandHandler';

interface HistoryItem {
  command: string;
  response: CommandResponse;
  id: number;
}

const TypewriterText: React.FC<{ text: string; speed?: number; onComplete?: () => void }> = ({ text, speed = 10, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <div className="whitespace-pre-wrap">{displayedText}</div>;
};

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prompt = "archis@portfolio:~$";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
      executeCommand('help');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return;
    
    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    setIsTyping(true);
    const response = await handleCommand(cmd);
    setHistory(prev => [...prev, { command: cmd, response, id: Date.now() }]);
    setIsTyping(false);
  };

  const renderResponse = (response: CommandResponse, isLast: boolean) => {
    const { output, type } = response;

    if (type === 'json') {
      return (
        <div className="mt-2 ml-4 rounded-lg overflow-hidden border border-[#00ff9f]/10 shadow-2xl">
          <SyntaxHighlighter 
            language="json" 
            style={vscDarkPlus}
            customStyle={{ 
              background: 'rgba(0,0,0,0.3)', 
              padding: '1rem',
              fontSize: '0.85rem',
              margin: 0
            }}
          >
            {JSON.stringify(output, null, 2)}
          </SyntaxHighlighter>
        </div>
      );
    }

    if (type === 'list') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 ml-4">
          {Object.entries(output).map(([category, items]: [string, any]) => (
            <div key={category} className="border border-[#00ff9f]/20 p-3 rounded-lg glass-card hover:border-[#00ff9f]/40 transition-colors">
              <h3 className="text-[#00d9ff] font-bold uppercase text-[10px] tracking-widest mb-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-[#00d9ff] rounded-full mr-2 shadow-[0_0_8px_#00d9ff]" />
                {category}
              </h3>
              <ul className="space-y-1">
                {items.map((item: string) => (
                  <li key={item} className="text-gray-300 text-sm flex items-center">
                    <span className="text-[#00ff9f] mr-2 opacity-50">❯</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    if (Array.isArray(output)) {
      return (
        <div className="mt-1 ml-4 space-y-0.5">
          {output.map((line, i) => (
            <div key={i} className={`${type === 'error' ? 'text-red-400' : 'text-gray-300'} font-mono`}>
              {line}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={`mt-1 ml-4 ${type === 'error' ? 'text-red-400' : type === 'success' ? 'text-[#00d9ff]' : 'text-gray-300'} font-mono`}>
        {isLast ? (
          <TypewriterText text={output} speed={5} />
        ) : (
          <div className="whitespace-pre-wrap">{output}</div>
        )}
      </div>
    );
  };

  const quickCommands = [
    COMMANDS.ABOUT,
    COMMANDS.SKILLS,
    COMMANDS.RESUME,
    COMMANDS.PROJECTS,
    COMMANDS.CONNECT,
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl h-[75vh] bg-[#050505]/90 rounded-2xl border border-[#00ff9f]/20 overflow-hidden shadow-[0_0_50px_rgba(0,255,159,0.1)] relative backdrop-blur-xl group">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#111] border-b border-[#00ff9f]/10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.3)] cursor-pointer hover:brightness-125" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.3)] cursor-pointer hover:brightness-125" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.3)] cursor-pointer hover:brightness-125" />
          </div>
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <div className="flex items-center space-x-2">
            <TerminalIcon size={14} className="text-[#00ff9f] opacity-70" />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter italic">session: archis-dev-env-v2</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-gray-600 hidden sm:block">
          {new Date().toLocaleTimeString()} | 127.0.0.1
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-white/[0.02] border-b border-[#00ff9f]/5">
        <span className="text-[10px] font-mono text-gray-600 uppercase ml-2 mr-1">Shortcuts:</span>
        {quickCommands.map(cmd => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-3 py-1 text-[10px] font-mono rounded-md border border-white/10 bg-white/5 hover:bg-[#00ff9f]/10 hover:border-[#00ff9f]/30 hover:text-[#00ff9f] transition-all duration-300 text-gray-400"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-grow p-6 overflow-y-auto font-mono text-sm space-y-6 custom-scrollbar bg-transparent relative z-10"
      >
        <AnimatePresence>
          {isBooting ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[#00ff9f] space-y-1 text-xs"
            >
              <p className="opacity-50">[  0.000000 ] Initializing portfolio-kernel v4.2.0-generic</p>
              <p>[ <span className="text-cyan-400">OK</span> ] Loading personal_data.ko</p>
              <p>[ <span className="text-cyan-400">OK</span> ] Mounting /dev/skills onto /sys/expertise</p>
              <p>[ <span className="text-cyan-400">OK</span> ] Establishing neural link to GenAI clusters</p>
              <p>[ <span className="text-cyan-400">OK</span> ] Starting CommandHandler.ts daemon...</p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <p className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">System Online</p>
              </div>
            </motion.div>
          ) : (
            <>
              {history.map((item, idx) => (
                <motion.div 
                   key={item.id}
                   initial={{ opacity: 0, y: 5 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3 }}
                   className="group/item"
                >
                  <div className="flex items-center">
                    <span className="text-[#00d9ff] font-bold mr-2 opacity-80 select-none">{prompt}</span>
                    <span className="text-white group-hover/item:text-[#00ff9f] transition-colors">{item.command}</span>
                  </div>
                  {renderResponse(item.response, idx === history.length - 1)}
                </motion.div>
              ))}
              {!isTyping && <CommandInput onCommand={executeCommand} prompt={prompt} />}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Background FX Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>
      
      {/* CRT Flicker Effect (Optional, very subtle) */}
      <div className="absolute inset-0 pointer-events-none bg-[#00ff9f]/[0.01] animate-pulse z-20" />
    </div>
  );
};

export default Terminal;
