"use client";

import React, { useState, useEffect, useRef } from 'react';

interface CommandInputProps {
  onCommand: (command: string) => void;
  prompt: string;
}

const CommandInput: React.FC<CommandInputProps> = ({ onCommand, prompt }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    focusInput();
    window.addEventListener('click', focusInput);
    return () => window.removeEventListener('click', focusInput);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['cat about.json', 'ls skills/', 'cat resume.pdf', 'cat stack.md', 'cat projects.log', './connect.sh', 'help', 'clear', 'ask'];
      const matching = commands.find(c => c.startsWith(input));
      if (matching) {
        setInput(matching);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full mt-1 relative z-10">
      <span className="text-[#00d9ff] font-bold mr-2 whitespace-nowrap drop-shadow-[0_0_8px_rgba(0,217,255,0.4)]">{prompt}</span>
      <div className="relative flex-grow flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-[#00ff9f] w-full font-mono caret-transparent selection:bg-[#00ff9f]/30"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <div 
          className="absolute pointer-events-none text-[#00ff9f]"
          style={{ 
            left: `${input.length}ch`,
            visibility: inputRef.current === document.activeElement ? 'visible' : 'hidden'
          }}
        >
          <span className="bg-[#00ff9f] w-[8px] h-[1.2em] inline-block cursor-blink ml-[1px] align-middle shadow-[0_0_8px_#00ff9f]" />
        </div>
      </div>
    </form>
  );
};

export default CommandInput;

