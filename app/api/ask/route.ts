import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    
    if (!question) {
      return NextResponse.json({ error: "No question provided" }, { status: 400 });
    }

    const q = question.toLowerCase();
    let answer = "";

    // Simple intelligent mock logic
    if (q.includes('who') || q.includes('archis')) {
      answer = "Archis Kulkarni is a highly skilled AI Engineer and Full Stack Developer with 1-3 years of experience. He focuses on GenAI, Agentic AI, and RAG systems.";
    } else if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
      answer = "Archis specializes in Next.js, TypeScript, FastAPI, and LangChain. He's also proficient with Vector Databases like Pinecone and Milvus.";
    } else if (q.includes('build') || q.includes('project')) {
      answer = "He has built impressive projects like an AI RAG Chatbot, MasterSync (data engine), and Baller AI (sports analytics). Check them out using 'cat projects.log'!";
    } else if (q.includes('cricket')) {
      answer = "Oh, don't get him started on cricket! 🏏 He's a huge fan and could talk about it all day.";
    } else if (q.includes('job') || q.includes('hire') || q.includes('work')) {
      answer = "Archis is currently open to new opportunities! He brings a unique blend of AI expertise and full-stack development skills.";
    } else {
      answer = "That's a great question! Based on my data, Archis is a passionate developer who loves solving complex problems with AI and modern web tech.";
    }

    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
