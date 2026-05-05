"use client";

import React, { useState, useEffect, useRef } from 'react';

interface CommandInputProps {
  onCommand: (command: string) => void;
  prompt: string;
}

const CommandInput: React.FC<CommandInputProps> = ({ onCommand, prompt }) => {
  const [input, setInput] = useState('');
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
      const commands = ['cat about.json', 'ls skills/', 'cat stack.md', 'cat projects.log', './connect.sh', 'help', 'clear', 'ask'];
      const matching = commands.find(c => c.startsWith(input));
      if (matching) {
        setInput(matching);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full mt-1">
      <span className="text-[#00d9ff] font-bold mr-2 whitespace-nowrap">{prompt}</span>
      <div className="relative flex-grow flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-[#00ff9f] w-full font-mono caret-transparent"
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
          <span className="bg-[#00ff9f] w-[10px] h-[1.2em] inline-block cursor-blink ml-[1px] align-middle" />
        </div>
      </div>
    </form>
  );
};

export default CommandInput;
