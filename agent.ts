// agent.ts — Zypher Resume Tailor Agent (OpenAI/Groq Compatible)

import {
  OpenAIModelProvider,
  createZypherContext,
  ZypherAgent
} from "@corespeed/zypher";

import { eachValueFrom } from "rxjs-for-await";

// ------------------------------
// ENV HELPER
// ------------------------------
export function getEnvRequired(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// ------------------------------
// PROMPT GENERATOR
// ------------------------------
export function buildPrompt(resume: string, jd: string): string {
  return `
You are an advanced Resume Tailoring AI Agent.

Your tasks:
1. Extract key skills from the resume  
2. Extract required skills from the job description  
3. Identify matched vs missing skills  
4. Generate a tailored 6–8 line professional summary  
5. Rewrite resume bullet points based on job description  

Return output in this EXACT format:

### Extracted Resume Skills
...

### JD Required Skills
...

### Skill Match Summary
- Matched:
- Missing:

### Tailored Professional Summary
...

### Improved Resume Bullet Points
...

Resume:
${resume}

Job Description:
${jd}
`;
}

// ------------------------------
// AGENT CREATION
// ------------------------------
export async function createResumeAgent(): Promise<ZypherAgent> {
  // Determine home folder safely
  const homeDir =
    Deno.env.get("USERPROFILE") ||
    Deno.env.get("HOME") ||
    ".";

  // Workspace folder
  const workspace = `${homeDir}/zypher-resume-tailor`;
  await Deno.mkdir(workspace, { recursive: true });

  // Zypher internal dir
  const zypherDir = `${workspace}/.zypher`;
  await Deno.mkdir(zypherDir, { recursive: true });

  // Create context (avoids home directory errors)
  const context = await createZypherContext(workspace, { zypherDir });

  // OpenAI / Groq / Azure / Ollama compatible provider
  const provider = new OpenAIModelProvider({
    apiKey: getEnvRequired("OPENAI_API_KEY"),
    baseUrl: Deno.env.get("OPENAI_BASE_URL") ?? "https://api.openai.com/v1",
  });

  return new ZypherAgent(context, provider);
}

// ------------------------------
// RUN TASK
// ------------------------------
export async function runResumeTask(
  agent: ZypherAgent,
  resume: string,
  jd: string
) {
  const prompt = buildPrompt(resume, jd);
  const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-4o-mini";

  console.log("Running Resume Tailor Agent...\n");

  const event$ = agent.runTask(prompt, model);
  let finalOutput = "";

for await (const event of eachValueFrom(event$)) {
  if (event.type === "text") {
    finalOutput += event.content;   // accumulate chunks
  }
  if (event.type === "error") {
    console.error("[ERROR]", event.error);
  }
}

// CLEAN PRINT — no broken words or newlines
console.log("\n===================== FINAL OUTPUT =====================\n");
console.log(finalOutput);
console.log("\n========================================================\n");

}
