# 🔥 Zypher Resume Tailor Agent

**Built for the CoreSpeed Technical Assessment**

This project implements an autonomous **Zypher AI Agent** that reads a candidate's resume and a job description, analyzes skill gaps, and generates a tailored professional summary and improved resume bullet points — all in a clean, structured format.

## 🛠️ Tech Stack

- **Zypher Agent Framework** (`@corespeed/zypher`)
- **OpenAI / Groq / Azure / Ollama** (OpenAI-compatible)
- **Deno 2.0+**
- **Event streaming** with buffered final output (no broken words)

This agent demonstrates real agent reasoning and is designed to be fully portable and easy to run on any Windows/macOS/Linux system.

---

## 🚀 Features

### 🧠 Resume Intelligence Agent

- Extracts skills from resume
- Extracts required skills from job description
- Finds matched + missing skills
- Generates a **6–8 line tailored professional summary**
- Rewrites resume bullet points optimized for the job

### ⚙️ Zypher Agent Framework Usage

- Uses Zypher's agent reasoning loop
- Supports OpenAI-style LLM providers
- Streamed event handling (buffered into clean final output)
- **No broken words / no partial tokens**

### 💻 Cross-Platform + Portable

- Automatically detects user's HOME directory
- Creates workspace: `~/zypher-resume-tailor/.zypher`

---

## 📦 Installation & Setup

### 1️⃣ Install Deno

#### Windows (PowerShell)

```powershell
iwr https://deno.land/install.ps1 -useb | iex
```

#### macOS / Linux

```bash
curl -fsSL https://deno.land/install.sh | sh
```

#### Verify Installation

```bash
deno -V
```

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/vishnusx/ZypherTailorResume.git
cd ZypherTailorResume
```

### 3️⃣ Add `.env` File

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1
```

### 4️⃣ `.env.example` (Included in Repo)

The repository includes a `.env.example` file with example configurations:

```env
# Example environment variables

# OpenAI Recommended
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1

# Groq (Alternative — Free + Fast)
# OPENAI_API_KEY=your_groq_key_here
# OPENAI_MODEL=llama3-70b-8192
# OPENAI_BASE_URL=https://api.groq.com/openai/v1

# Local Ollama Alternative
# OPENAI_API_KEY=dummy
# OPENAI_MODEL=llama3
# OPENAI_BASE_URL=http://localhost:11434/v1
```

### 5️⃣ Ensure Input Files Exist

Make sure you have the following files in the `examples/` directory:

- `examples/resume.txt`
- `examples/job_description.txt`

---

## 🏃 Running the Agent

You can run the agent using either of these commands:

```bash
deno run -A main.ts
```

or

```bash
deno task start
```

---

## 🔍 How It Works

### `main.ts`

- Loads `.env` configuration
- Reads resume & job description from `./examples/`
- Calls `runResumeTask()`
- Prints clean formatted output

### `agent.ts`

- Creates Zypher context
- Auto-detects home directory
- Creates a workspace: `~/zypher-resume-tailor/.zypher`
- Initializes `OpenAIModelProvider`
- Buffers streaming output → prints clean final result

---

## 📁 Project Structure

```
zypher-resume-tailor/
│
├── agent.ts                # Core agent logic
├── main.ts                 # Entry point
├── deno.json               # Deno setup
├── .env.example            # Example environment config
├── README.md
│
└── examples/
    ├── resume.txt
    └── job_description.txt
```

---

## 📊 Sample Output

### Extracted Resume Skills

```
JavaScript · TypeScript · React.js · AWS · Docker · Kubernetes
```

### JD Required Skills

```
React + TS · Go/Rust/Deno · Distributed Systems · Cloud Infra · LLM APIs
```

### Skill Match Summary

**✔ Matched:**
```
React.js · TypeScript · AWS · Docker · Kubernetes
```

**❌ Missing:**
```
Go · Rust · Deno · Distributed Systems · OSS Contributions
```

### Tailored Professional Summary

*(Generated summary…)*

### Improved Resume Bullet Points with matched skills

*(Generated bullet points…)*

### Improved Resume Bullet Points with missing skills

*(Generated bullet points…)*

---

## 📝 License

Built for the CoreSpeed Technical Assessment.
