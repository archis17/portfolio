export type CommandResponse = {
  output: string | string[] | any;
  type: 'text' | 'json' | 'error' | 'list' | 'success';
};

export const COMMANDS = {
  ABOUT: 'cat about.json',
  SKILLS: 'ls skills/',
  RESUME: 'cat resume.pdf',
  STACK: 'cat stack.md',
  PROJECTS: 'cat projects.log',
  CONNECT: './connect.sh',
  HELP: 'help',
  CLEAR: 'clear',
  ASK: 'ask',
};

const ABOUT_DATA = {
  name: "Archis Kulkarni",
  role: "Full Stack & AI Developer",
  location: "Mumbai, Maharashtra",
  experience: "AI & Full Stack Internships",
  specialization: "Building agentic workflows and multi-agent autonomous platforms.",
  focus: ["GenAI", "LangGraph", "Full Stack Development", "RAG Systems"],
  currently_learning: ["Advanced AI Agents", "Rust", "System Design"],
  open_to_work: true,
  fun_fact: "Cricket enthusiast who builds RAG pipelines for stats! 🏏"
};

const SKILLS_DATA = {
  "languages": ["JavaScript", "TypeScript", "Python", "SQL"],
  "frameworks": ["React", "Next.js", "Node.js", "Express.js", "FastAPI", "LangGraph"],
  "ai_llms": ["LangChain", "LangGraph", "RAG", "Vector Embeddings", "Prompt Engineering", "Pinecone"],
  "backend_db": ["MongoDB", "PostgreSQL (pgvector)", "Prisma", "Neo4j AuraDB", "Firebase", "SQLite", "Redis"],
  "tools_libs": ["Git", "GitHub", "Docker", "VS Code", "Tailwind CSS", "Framer Motion", "GSAP"]
};

const RESUME_DATA = {
  "education": [
    { "degree": "Bachelor of Engineering", "field": "Computer Science", "institution": "Thakur College Of Engineering And Technology", "year": "2022-2026" }
  ],
  "experience": [
    { 
      "company": "Real Value Infospace LLP", 
      "role": "Full Stack & AI Intern", 
      "period": "09/2025 - Present",
      "highlights": [
        "Designed and deployed end-to-end agentic workflows using LangGraph StateGraph and LangChain.",
        "Contributed to BrandFlow, a multi-agent autonomous marketing platform for trend scouting and campaign generation."
      ]
    },
    { 
      "company": "Horizon View", 
      "role": "Full Stack Developer Intern", 
      "period": "01/2025 - 04/2025",
      "highlights": [
        "Architected a multi-tenant ERP platform on Next.js and Firebase with hierarchical RBAC and tenant isolation.",
        "Developed scalable backend workflows including atomic batch operations and bulk CSV ingestion pipelines."
      ]
    }
  ]
};

const PROJECTS_DATA = [
  { 
    name: "MasterSync", 
    desc: "Serverless continuity ecosystem using Rust and Tokio for secure, cloud-free data exchange and clipboard sync.",
    stack: ["Rust (Tauri)", "Tokio", "Kotlin", "Next.js", "SQLite"]
  },
  { 
    name: "BallerAI", 
    desc: "Specialized RAG pipeline enabling natural language queries over 100K+ granular cricket data points.",
    stack: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "Three.js", "RAG"]
  }
];

const STACK_CONTENT = `
# Tech Stack

- **Languages**: TypeScript, JavaScript, Python, SQL
- **Frameworks**: Next.js, FastAPI, Express.js, LangGraph
- **AI/ML**: LangChain, LangGraph, OpenAI, Pinecone, Neo4j
- **Database**: PostgreSQL (pgvector), MongoDB, Redis, Firebase
- **Cloud/DevOps**: AWS, Docker, Vercel, Git
`;

const CONNECT_DATA = {
  LinkedIn: "https://linkedin.com/in/Archis1708",
  GitHub: "https://github.com/archis17",
  Email: "archiskulkarni41762@gmail.com",
  Phone: "86889884275",
  Location: "Mumbai, Maharashtra"
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

    case COMMANDS.RESUME:
      return { output: RESUME_DATA, type: 'json' };

    case COMMANDS.STACK:
      return { output: STACK_CONTENT, type: 'text' };

    case COMMANDS.PROJECTS:
      return { output: PROJECTS_DATA.map(p => `${p.name}: ${p.desc} [${p.stack.join(', ')}]`), type: 'text' };

    case COMMANDS.CONNECT:
      return { output: CONNECT_DATA, type: 'json' };

    case COMMANDS.HELP:
      return { 
        output: [
          'cat about.json    - Display personal information',
          'ls skills/       - List categorized technical skills',
          'cat resume.pdf   - View professional experience and education',
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
