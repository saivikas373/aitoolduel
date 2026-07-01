// AI MODEL LAUNCH WATCH AGENT
// Uses Claude's web search tool to detect genuine, newly-announced major AI
// model launches (new flagship models / major version bumps) from any
// provider, and publishes a factual news article for each one it hasn't
// covered yet. No-ops quietly when nothing new is found.
//
// Manual run: node agent/check-model-launches.mjs
// Auto: triggered by GitHub Actions every 6 hours (.github/workflows/model-launch-watch.yml)

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { requestIndexing } from "./search-console.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// Load .env.agent
const envFile = path.join(ROOT, ".env.agent");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = "saivikas373/aitoolduel";

if (!ANTHROPIC_API_KEY) { console.error("❌ Missing ANTHROPIC_API_KEY"); process.exit(1); }

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
const today = new Date().toISOString().split("T")[0];
const STATE_FILE = path.join(__dirname, "agent-state.json");

function getState() {
  if (!fs.existsSync(STATE_FILE)) return { runs: [], publishedComparisons: [], publishedNews: [], publishedLaunches: [] };
  const state = JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  if (!state.publishedLaunches) state.publishedLaunches = [];
  return state;
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function setGithubOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

function launchKey(provider, modelName) {
  return `${provider}:${modelName}`.toLowerCase().replace(/[^a-z0-9:]+/g, "-");
}

// ─── Step 1: Search for genuine major launches ───────────────────────────────

async function findNewLaunches(state) {
  console.log("🔍 Searching for major AI model launches...");

  const alreadyCovered = state.publishedLaunches.map(l => `${l.provider} ${l.modelName} (${l.date})`).join("; ") || "none yet";

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 8 }],
    messages: [{
      role: "user",
      content: `Today is ${today}. Use web search to find genuinely new MAJOR AI model launches announced in the last 3 days — new flagship models or major version releases (e.g. a new GPT, Claude, Gemini, Llama, Grok, Mistral, or similar generation) from any AI lab: OpenAI, Anthropic, Google/DeepMind, Meta, xAI, Mistral AI, Amazon, Microsoft, Cohere, Stability AI, Perplexity, ElevenLabs, Midjourney, or comparable major providers.

Only include launches confirmed by an official company announcement, blog post, or credible major tech news source — never rumors, leaks, or speculation. EXCLUDE minor point releases, small feature updates, UI changes, or pricing changes — only genuinely new flagship models or major version bumps count.

Already covered — do NOT re-report these: ${alreadyCovered}

After searching, respond with ONLY a JSON object on the last line of your response (no markdown fences), in exactly this shape:
{"launches":[{"provider":"string","modelName":"string","announcementDate":"YYYY-MM-DD","sourceUrl":"string","summary":"1-2 sentence factual summary of what's new, based on what you found"}]}
If you find no genuine new major launches, respond with {"launches":[]}`,
    }],
  });

  const textBlocks = message.content.filter(b => b.type === "text").map(b => b.text);
  const fullText = textBlocks.join("\n").trim();
  const jsonMatch = fullText.match(/\{[\s\S]*\}\s*$/);
  if (!jsonMatch) {
    console.log("⚠️  Could not find JSON in response, treating as no launches found.");
    return [];
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.log("⚠️  Failed to parse launches JSON, treating as no launches found:", e.message);
    return [];
  }

  const launches = Array.isArray(parsed.launches) ? parsed.launches : [];
  const coveredKeys = new Set(state.publishedLaunches.map(l => launchKey(l.provider, l.modelName)));
  const fresh = launches.filter(l => l.provider && l.modelName && !coveredKeys.has(launchKey(l.provider, l.modelName)));

  console.log(`📋 Found ${launches.length} candidate launch(es), ${fresh.length} not yet covered.`);
  return fresh;
}

// ─── Step 2: Write a factual article for a launch ────────────────────────────

function fixSections(secs) {
  return (secs || []).map(s => {
    const out = {};
    out.h2 = s.h2 || s.heading || s.sectionTitle || s.title || "Overview";
    if (Array.isArray(s.paragraphs)) out.paragraphs = s.paragraphs;
    else {
      const text = s.content || s.body || s.text || "";
      const parts = text.split(/(?<=\. )/);
      const mid = Math.ceil(parts.length / 2);
      out.paragraphs = [parts.slice(0, mid).join(""), parts.slice(mid).join("")].filter(Boolean);
    }
    return out;
  });
}

async function writeLaunchArticle(launch, existingSlugs) {
  console.log(`\n📝 Writing article: ${launch.provider} ${launch.modelName}`);

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 6000,
    messages: [{
      role: "user",
      content: `You are an AI industry journalist. Today is ${today}. Write a factual news article about this real, confirmed AI model launch:

Provider: ${launch.provider}
Model: ${launch.modelName}
Announced: ${launch.announcementDate}
Source: ${launch.sourceUrl}
Known facts: ${launch.summary}

Base the article strictly on the facts above — do not invent pricing, benchmarks, or features not implied by the summary. It's fine to note plainly-inferable context (e.g. how it compares to the provider's prior model) but do not fabricate specific unverified claims.

Your slug MUST NOT match any of these existing slugs: ${existingSlugs.join(", ")}

Respond with ONLY valid JSON (no markdown):
{
  "slug": "kebab-case-slug-specific-to-this-model-${today}",
  "title": "compelling specific headline under 70 chars",
  "metaTitle": "SEO title under 65 chars with year 2026",
  "metaDescription": "140-160 chars with keywords",
  "date": "${launch.announcementDate}",
  "category": "Model Release",
  "badge": "Breaking",
  "summary": "2-3 sentence intro paragraph",
  "sections": [{"h2": "section heading", "paragraphs": ["paragraph 1","paragraph 2","paragraph 3"]}],
  "faqs": [{"question": "string", "answer": "string"}]
}
Requirements: 4-5 sections, 3 paragraphs each, 5 FAQs, all grounded in the facts given above.`,
    }],
  });

  let jsonText = message.content.find(b => b.type === "text").text.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  const article = JSON.parse(jsonText);
  article.sections = fixSections(article.sections);

  // Ensure slug uniqueness
  if (existingSlugs.includes(article.slug)) article.slug = `${article.slug}-${Date.now().toString().slice(-4)}`;
  if (existingSlugs.includes(article.slug)) {
    console.log("⚠️  Slug still duplicate, skipping this launch.");
    return null;
  }

  // Add to news.ts
  const newsPath = path.join(ROOT, "lib", "news.ts");
  let newsContent = fs.readFileSync(newsPath, "utf8");
  const newEntry = `\n  ${JSON.stringify(article, null, 2).replace(/^/gm, "  ").trim()},\n`;
  if (newsContent.includes("newsArticles: NewsArticle[] = [];")) {
    newsContent = newsContent.replace("newsArticles: NewsArticle[] = [];", `newsArticles: NewsArticle[] = [${newEntry}];`);
  } else {
    newsContent = newsContent.replace(/export const newsArticles: NewsArticle\[] = \[/, `export const newsArticles: NewsArticle[] = [${newEntry}`);
  }
  fs.writeFileSync(newsPath, newsContent);

  updateSitemap(article.slug);
  console.log(`✅ Article ready: /news/${article.slug}`);
  return article.slug;
}

function updateSitemap(slug) {
  const sitemapPath = path.join(ROOT, "app", "sitemap.ts");
  let content = fs.readFileSync(sitemapPath, "utf8");
  if (!content.includes(slug)) {
    content = content.replace(
      /(\s*\]\s*;?\s*}?\s*$)/,
      `    { url: \`\${baseUrl}/news/${slug}\`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },\n$1`
    );
    fs.writeFileSync(sitemapPath, content);
  }
}

// ─── Step 3: Commit & push ────────────────────────────────────────────────────

function pushToGitHub(message) {
  if (!GITHUB_TOKEN) { console.log("⚠️  No GITHUB_TOKEN — skipping push"); return false; }
  try {
    execSync(`git config user.email "agent@aitoolduel.com"`, { cwd: ROOT });
    execSync(`git config user.name "AI Agent"`, { cwd: ROOT });
    execSync(`git add -A`, { cwd: ROOT });
    execSync(`git commit -m "${message}"`, { cwd: ROOT });
    const remote = `https://saivikas373:${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git`;
    execSync(`git push "${remote}" HEAD:main 2>&1`, { cwd: ROOT });
    console.log("✅ Pushed to GitHub — Vercel deploying...");
    return true;
  } catch (e) {
    if (e.message.includes("nothing to commit")) return true;
    console.error("❌ Push failed:", e.message);
    return false;
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

console.log(`\n🛰️  Model Launch Watch — ${today}`);
console.log("=".repeat(50));

const state = getState();
const launches = await findNewLaunches(state);

if (launches.length === 0) {
  console.log("✅ No new major launches found this run. Nothing to publish.");
  state.runs.push({ date: today, action: "launch-check", found: 0 });
  saveState(state);
  setGithubOutput("published", "false");
  process.exit(0);
}

const publishedSlugs = [];

for (const launch of launches) {
  const newsPath = path.join(ROOT, "lib", "news.ts");
  const existingSlugs = [...fs.readFileSync(newsPath, "utf8").matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

  const slug = await writeLaunchArticle(launch, existingSlugs);
  if (!slug) continue;

  state.publishedLaunches.push({ provider: launch.provider, modelName: launch.modelName, date: launch.announcementDate, slug });
  state.publishedNews.push(slug);
  publishedSlugs.push(slug);

  const pushed = pushToGitHub(`feat: add news article - ${launch.provider} ${launch.modelName} launch`);
  if (pushed) await requestIndexing(`/news/${slug}`);
}

state.runs.push({ date: today, action: "launch-check", found: launches.length, published: publishedSlugs });
saveState(state);
pushToGitHub(`chore: update agent state after launch watch - ${today}`);

setGithubOutput("published", publishedSlugs.length > 0 ? "true" : "false");
setGithubOutput("slug", publishedSlugs[0] || "");

console.log(`\n✅ Launch watch complete! Published ${publishedSlugs.length} article(s).`);
