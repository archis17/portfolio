"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommandInput from './CommandInput';
import { handleCommand, CommandResponse, COMMANDS } from './CommandHandler';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';

interface HistoryItem {
  command: string;
  response: CommandResponse;
  id: number;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prompt = "archis@portfolio:~$";

  useEffect(() => {
    // Initial boot animation
    const timer = setTimeout(() => {
      setIsBooting(false);
      // Welcome message
      executeCommand('help');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = async (cmd: string) => {
    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    const response = await handleCommand(cmd);
    setHistory(prev => [...prev, { command: cmd, response, id: Date.now() }]);
  };

  const renderResponse = (response: CommandResponse) => {
    const { output, type } = response;

    if (type === 'json') {
      return (
        <pre className="text-blue-300 mt-1 ml-4 overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(output, null, 2)}
        </pre>
      );
    }

    if (type === 'list') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 ml-4">
          {Object.entries(output).map(([category, items]: [string, any]) => (
            <div key={category} className="border border-[#00ff9f]/20 p-2 rounded glass">
              <h3 className="text-[#00d9ff] font-bold uppercase text-xs mb-1">{category}</h3>
              <ul className="list-none">
                {items.map((item: string) => (
                  <li key={item} className="text-gray-300 text-sm">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    if (Array.isArray(output)) {
      return (
        <div className="mt-1 ml-4">
          {output.map((line, i) => (
            <div key={i} className={type === 'error' ? 'text-red-400' : 'text-gray-300'}>
              {line}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={`mt-1 ml-4 whitespace-pre-wrap ${type === 'error' ? 'text-red-400' : type === 'success' ? 'text-[#00d9ff]' : 'text-gray-300'}`}>
        {output}
      </div>
    );
  };

  const quickCommands = [
    COMMANDS.ABOUT,
    COMMANDS.SKILLS,
    COMMANDS.PROJECTS,
    COMMANDS.CONNECT,
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl h-[80vh] bg-black/80 rounded-xl border border-[#00ff9f]/30 overflow-hidden terminal-glow glass relative">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#00ff9f]/10">
        <div className="flex items-center space-x-2">
          <TerminalIcon size={16} className="text-[#00ff9f]" />
          <span className="text-xs font-mono text-gray-400">archis@portfolio ~ bash</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 p-3 bg-black/40 border-b border-[#00ff9f]/5">
        {quickCommands.map(cmd => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-3 py-1 text-xs font-mono rounded-md border border-[#00ff9f]/20 hover:bg-[#00ff9f]/10 hover:border-[#00ff9f]/50 transition-all text-[#00ff9f]/80"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-grow p-4 overflow-y-auto font-mono text-sm space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed"
      >
        <AnimatePresence>
          {isBooting ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[#00ff9f]"
            >
              <p>[  OK  ] Initializing kernel modules...</p>
              <p>[  OK  ] Loading system configurations...</p>
              <p>[  OK  ] Connecting to portfolio-db...</p>
              <p>[  OK  ] Mounting AI engines...</p>
              <p className="mt-2 text-cyan-400 animate-pulse">Ready.</p>
            </motion.div>
          ) : (
            <>
              {history.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <span className="text-[#00d9ff] font-bold mr-2">{prompt}</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                  {renderResponse(item.response)}
                </motion.div>
              ))}
              <CommandInput onCommand={executeCommand} prompt={prompt} />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </div>
  );
};

export default Terminal;
