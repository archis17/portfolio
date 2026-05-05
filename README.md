# 🚀 Interactive Terminal Portfolio

A premium, production-ready terminal-style portfolio built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- **Real Terminal Experience**: Interactive CLI with command history and auto-focus.
- **Smart Command Handling**: Supports `cat`, `ls`, `./connect.sh`, and a special AI `ask` command.
- **Modern UI**: Dark mode hacker aesthetic with glassmorphism, scanline effects, and neon glows.
- **Responsive**: Works seamlessly on mobile and desktop.
- **Quick Actions**: One-click command buttons for recruiters.
- **AI Simulation**: Integrated mock AI assistant to answer questions about the developer.
- **Framer Motion**: Smooth animations for booting and command output.

## 🧱 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🛠️ Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
/app
  ├── layout.tsx       # Root layout & Metadata
  └── page.tsx         # Home page with Terminal
/components
  ├── Terminal.tsx     # Main Terminal logic & UI
  ├── CommandInput.tsx # Interactive prompt & typing
  └── CommandHandler.ts# Logic for all CLI commands
/public                # Static assets
```

## 🚀 Deployment

This project is optimized for **Vercel**. 

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Deploy with zero configuration.

## ⌨️ Commands to Try

- `cat about.json` - Learn about Archis
- `ls skills/` - See technical expertise
- `cat projects.log` - Check out recent work
- `ask who is archis?` - Interact with the AI assistant
- `help` - Show all available commands
- `clear` - Reset the terminal
