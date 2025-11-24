// main.ts — Portable runner for the Zypher Resume Tailor Agent

// Auto-load .env across Windows/Mac/Linux
import "https://deno.land/std@0.224.0/dotenv/load.ts";

import { createResumeAgent, runResumeTask } from "./agent.ts";

// Simple file reader
async function read(path: string): Promise<string> {
  return await Deno.readTextFile(path);
}

// ------------------------------
// MAIN EXECUTION
// ------------------------------
const resume = await read("./examples/resume.txt");
const jd = await read("./examples/job_description.txt");

const agent = await createResumeAgent();
await runResumeTask(agent, resume, jd);
