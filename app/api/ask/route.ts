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
      answer = "Archis Kulkarni is a Full Stack & AI Developer based in Mumbai. He specializes in building agentic workflows and multi-agent autonomous platforms.";
    } else if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
      answer = "Archis is proficient in JavaScript, TypeScript, Python, and SQL. His framework expertise includes React, Next.js, FastAPI, and LangGraph.";
    } else if (q.includes('build') || q.includes('project')) {
      answer = "He has built innovative projects like MasterSync (a Rust-based serverless ecosystem) and BallerAI (a specialized RAG pipeline for cricket stats).";
    } else if (q.includes('cricket')) {
      answer = "Archis is a huge cricket fan! He even built BallerAI, which uses RAG to query over 100K+ granular cricket data points. 🏏";
    } else if (q.includes('job') || q.includes('hire') || q.includes('work') || q.includes('intern')) {
      answer = "Archis has experience as a Full Stack & AI Intern at Real Value Infospace LLP and a Full Stack Developer Intern at Horizon View. He is open to new opportunities!";
    } else {
      answer = "Archis is a passionate developer focused on GenAI and high-performance RAG pipelines. Feel free to explore his resume or projects!";
    }


    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
