export type CommandResponse = {
  output: string | string[] | any;
  type: 'text' | 'json' | 'error' | 'list' | 'success';
};

export const COMMANDS = {
  ABOUT: 'cat about.json',
  SKILLS: 'ls skills/',
  STACK: 'cat stack.md',
  PROJECTS: 'cat projects.log',
  CONNECT: './connect.sh',
  HELP: 'help',
  CLEAR: 'clear',
  ASK: 'ask',
};

const ABOUT_DATA = {
  name: "Archis Kulkarni",
  role: "AI Engineer & Full Stack Developer",
  location: "India",
  experience: "1-3 years",
  focus: ["GenAI", "Agentic AI", "RAG Systems"],
  currently_learning: ["Advanced AI Agents", "System Design"],
  open_to_work: true,
  fun_fact: "Will talk about cricket unprompted 🏏"
};

const SKILLS_DATA = {
  frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "FastAPI", "Python"],
  ai: ["LangChain", "RAG", "Vector DBs", "LLM APIs (OpenAI, Anthropic, Groq)"],
  database: ["MongoDB", "PostgreSQL", "Firebase", "Redis"],
  tools: ["Docker", "Git", "Cloudinary", "Postman"]
};

const PROJECTS_DATA = [
  { name: "AI RAG Chatbot", desc: "A sophisticated RAG-based chatbot with advanced retrieval techniques." },
  { name: "MasterSync", desc: "Real-time data synchronization engine for distributed systems." },
  { name: "Baller AI", desc: "AI-powered sports analytics platform for performance tracking." },
  { name: "ERP System", desc: "Enterprise Resource Planning system with a modular microservices architecture." }
];

const STACK_CONTENT = `
# Tech Stack

- **Languages**: TypeScript, JavaScript, Python, SQL
- **Frameworks**: Next.js, FastAPI, Express.js
- **AI/ML**: LangChain, OpenAI, Pinecone, Milvus, HuggingFace
- **Database**: PostgreSQL, MongoDB, Redis
- **Cloud/DevOps**: AWS, Docker, Vercel, CI/CD
`;

const CONNECT_DATA = {
  LinkedIn: "https://www.linkedin.com/in/archis-kulkarni-ab98a6290/",
  Email: "archiskulkarni41762@gmail.com",
  Portfolio: "https://archis.dev"
};

export const handleCommand = async (command: string): Promise<CommandResponse> => {
  const parts = command.trim().split(' ');
  const baseCommand = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command.trim().toLowerCase()) {
    case COMMANDS.ABOUT:
      return { output: ABOUT_DATA, type: 'json' };
    
    case COMMANDS.SKILLS:
      return { output: SKILLS_DATA, type: 'list' };

    case COMMANDS.STACK:
      return { output: STACK_CONTENT, type: 'text' };

    case COMMANDS.PROJECTS:
      return { output: PROJECTS_DATA.map(p => `${p.name}: ${p.desc}`), type: 'text' };

    case COMMANDS.CONNECT:
      return { output: Object.entries(CONNECT_DATA).map(([k, v]) => `${k}: ${v}`), type: 'success' };

    case COMMANDS.HELP:
      return { 
        output: [
          'cat about.json    - Display personal information',
          'ls skills/       - List categorized technical skills',
          'cat stack.md     - Show technical stack',
          'cat projects.log  - View recent projects',
          './connect.sh      - Get contact links',
          'ask <question>    - Ask the AI assistant a question',
          'help              - Show this help menu',
          'clear             - Clear the terminal screen'
        ], 
        type: 'text' 
      };

    case COMMANDS.CLEAR:
      return { output: '', type: 'text' };

    default:
      if (baseCommand === 'ask') {
        return handleAsk(args.join(' '));
      }
      return { output: `Command not found: ${command}. Type 'help' for available commands.`, type: 'error' };
  }
};

const handleAsk = async (question: string): Promise<CommandResponse> => {
  if (!question) return { output: "Please provide a question. Usage: ask <your question>", type: 'error' };

  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    
    const data = await response.json();
    return { output: data.answer || "I'm not sure about that, but Archis is always learning!", type: 'text' };
  } catch (error) {
    return { output: "Connection to AI engine failed. Running in offline mode...", type: 'error' };
  }
};
