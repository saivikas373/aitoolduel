// AI Agent Runner — loads .env.agent and runs generate-comparison
// Usage: node agent/run.mjs "tool1 vs tool2"
// Scheduler: node agent/run.mjs --schedule

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// Load .env.agent
const envFile = path.join(ROOT, ".env.agent");
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, "utf8").split("\n");
  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

// Topics queue — agent will publish these one by one on schedule
const TOPICS_QUEUE = [
  "claude vs gpt-4o",
  "midjourney vs stable diffusion",
  "notion ai vs chatgpt",
  "copilot vs chatgpt",
  "perplexity vs claude",
  "gemini vs copilot",
  "runway vs pika",
  "jasper vs chatgpt",
  "grammarly vs chatgpt",
  "adobe firefly vs midjourney",
];

const PUBLISHED_FILE = path.join(__dirname, "published.json");

function getPublished() {
  if (!fs.existsSync(PUBLISHED_FILE)) return [];
  return JSON.parse(fs.readFileSync(PUBLISHED_FILE, "utf8"));
}

function markPublished(topic) {
  const published = getPublished();
  published.push({ topic, date: new Date().toISOString() });
  fs.writeFileSync(PUBLISHED_FILE, JSON.stringify(published, null, 2));
}

function getNextTopic() {
  const published = getPublished().map((p) => p.topic.toLowerCase());
  return TOPICS_QUEUE.find((t) => !published.includes(t.toLowerCase()));
}

const args = process.argv.slice(2);

if (args[0] === "--schedule") {
  // Auto mode: pick next unpublished topic
  const topic = getNextTopic();
  if (!topic) {
    console.log("✅ All topics in queue have been published!");
    process.exit(0);
  }
  console.log(`📅 Scheduler: Publishing "${topic}"`);
  try {
    execSync(`node "${path.join(__dirname, "generate-comparison.mjs")}" "${topic}"`, {
      stdio: "inherit",
      env: process.env,
      cwd: ROOT,
    });
    markPublished(topic);
    console.log(`✅ Published: ${topic}`);
  } catch (e) {
    console.error(`❌ Failed: ${e.message}`);
    process.exit(1);
  }
} else if (args[0]) {
  // Manual mode: publish specific topic
  const topic = args.join(" ");
  console.log(`📝 Publishing: "${topic}"`);
  execSync(`node "${path.join(__dirname, "generate-comparison.mjs")}" "${topic}"`, {
    stdio: "inherit",
    env: process.env,
    cwd: ROOT,
  });
  markPublished(topic);
} else {
  console.log(`
🤖 AI Tool Duel — Agent Runner

Usage:
  node agent/run.mjs "tool1 vs tool2"   → Publish a specific comparison
  node agent/run.mjs --schedule          → Auto-publish next topic in queue

Next in queue: ${getNextTopic() || "All done!"}
Published: ${getPublished().length} articles
  `);
}
