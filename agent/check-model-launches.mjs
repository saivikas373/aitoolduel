// AI MODEL LAUNCH WATCH AGENT (free-tier)
// Detects genuinely new major AI model launches by reading real, free
// sources — RSS feeds from major AI labs' own blogs, plus Hacker News —
// then uses a free LLM (via OpenRouter) only to classify which headlines
// are genuine flagship launches and to write a factual article for each
// new one. No paid search tool, no API cost for the detection step at all.
//
// Manual run: node agent/check-model-launches.mjs
// Auto: triggered by GitHub Actions every 6 hours (.github/workflows/model-launch-watch.yml)

import OpenAI from "openai";
import Parser from "rss-parser";
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

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = "saivikas373/aitoolduel";
// "openrouter/free" is OpenRouter's own router slug — it always resolves
// to whatever free-tier models currently exist, so it doesn't go stale
// the way a specific "<model>:free" slug does when that model rotates
// out of the free lineup.
const MODEL = "openrouter/free";

if (!OPENROUTER_API_KEY) { console.error("❌ Missing OPENROUTER_API_KEY"); process.exit(1); }

const llm = new OpenAI({ apiKey: OPENROUTER_API_KEY, baseURL: "https://openrouter.ai/api/v1" });
const today = new Date().toISOString().split("T")[0];
const STATE_FILE = path.join(__dirname, "agent-state.json");

const RSS_SOURCES = [
  { name: "OpenAI", url: "https://openai.com/news/rss.xml" },
  { name: "Anthropic", url: "https://www.anthropic.com/news/rss.xml" },
  { name: "Google AI", url: "https://blog.google/technology/ai/rss/" },
  { name: "Meta AI", url: "https://ai.meta.com/blog/rss/" },
];

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

async function askLLM(prompt) {
  const completion = await llm.chat.completions.create({
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });
  let text = completion.choices[0].message.content.trim();
  text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  return JSON.parse(extractJson(text));
}

// openrouter/free routes to whichever free model is live at that moment,
// and not all of them honor response_format: json_object — some prepend a
// safety tag or a chatty preamble before the actual JSON. Strip anything
// outside the outermost { }  before parsing instead of trusting the model
// to return pure JSON.
function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) return text;
  return text.slice(start, end + 1);
}

// ─── Step 1: Gather raw signals from free sources ────────────────────────────

async function fetchRssSignals() {
  const parser = new Parser({ timeout: 10000 });
  const cutoff = Date.now() - 4 * 24 * 60 * 60 * 1000; // last 4 days
  const signals = [];

  for (const source of RSS_SOURCES) {
    try {
      const feed = await parser.parseURL(source.url);
      for (const item of feed.items.slice(0, 15)) {
        const pubDate = item.pubDate || item.isoDate;
        const ts = pubDate ? new Date(pubDate).getTime() : Date.now();
        if (Number.isNaN(ts) || ts < cutoff) continue;
        signals.push({
          source: source.name,
          title: item.title,
          url: item.link,
          date: new Date(ts).toISOString().split("T")[0],
        });
      }
    } catch (e) {
      console.log(`⚠️  Could not fetch RSS for ${source.name}: ${e.message}`);
    }
  }
  return signals;
}

async function fetchHackerNewsSignals() {
  const KEYWORDS = /gpt|claude|gemini|llama|grok|mistral|copilot|midjourney|dall-?e|deepseek|qwen|command ?r/i;
  const LAUNCH_WORDS = /launch|release|introduc|announc|unveil|debut|drops?\b/i;

  try {
    const topIds = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json").then((r) => r.json());
    const items = await Promise.all(
      topIds.slice(0, 80).map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((r) => r.json())
          .catch(() => null)
      )
    );
    const cutoffSec = Date.now() / 1000 - 4 * 24 * 60 * 60;
    return items
      .filter((it) => it && it.title && it.time > cutoffSec && KEYWORDS.test(it.title) && LAUNCH_WORDS.test(it.title))
      .map((it) => ({
        source: "Hacker News",
        title: it.title,
        url: it.url || `https://news.ycombinator.com/item?id=${it.id}`,
        date: new Date(it.time * 1000).toISOString().split("T")[0],
      }));
  } catch (e) {
    console.log(`⚠️  Could not fetch Hacker News: ${e.message}`);
    return [];
  }
}

// ─── Step 2: Ask the LLM to classify genuine major launches ──────────────────
//
// Note: this does NOT catch errors from askLLM — a real API failure (bad
// key, quota exhausted, etc.) must propagate up and fail the run loudly.
// Only "the model returned zero genuine launches" is a valid, silent no-op;
// an API call that never succeeded is a different thing and should never be
// reported as "no launches found."

async function classifyLaunches(signals, state) {
  if (signals.length === 0) return [];

  const alreadyCovered = state.publishedLaunches.map((l) => `${l.provider} ${l.modelName} (${l.date})`).join("; ") || "none yet";

  const prompt = `Today is ${today}. Here are real headlines gathered from AI lab blogs and Hacker News in the last few days:

${signals.map((s, i) => `${i + 1}. [${s.source}] "${s.title}" — ${s.url} (${s.date})`).join("\n")}

From these, identify ONLY genuine MAJOR AI model launches — new flagship models or major version releases (e.g. a new GPT, Claude, Gemini, Llama, Grok, Mistral generation) from a major AI lab. Exclude minor point releases, feature updates, pricing news, or anything that isn't clearly a new model launch. If a headline is ambiguous, exclude it rather than guess.

Already covered — do NOT re-report these: ${alreadyCovered}

Respond with ONLY this JSON shape: {"launches":[{"provider":"string","modelName":"string","announcementDate":"YYYY-MM-DD","sourceUrl":"string","summary":"1-2 sentence factual summary based only on the headline given"}]}
If none qualify, respond {"launches":[]}`;

  const parsed = await askLLM(prompt);

  const launches = Array.isArray(parsed.launches) ? parsed.launches : [];
  const coveredKeys = new Set(state.publishedLaunches.map((l) => launchKey(l.provider, l.modelName)));
  const fresh = launches.filter((l) => l.provider && l.modelName && !coveredKeys.has(launchKey(l.provider, l.modelName)));

  console.log(`📋 Found ${launches.length} candidate launch(es), ${fresh.length} not yet covered.`);
  return fresh;
}

// ─── Step 3: Write a factual article for a launch ────────────────────────────

function fixSections(secs) {
  return (secs || []).map((s) => {
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

  const prompt = `You are an AI industry journalist. Today is ${today}. Write a factual news article about this real, confirmed AI model launch:

Provider: ${launch.provider}
Model: ${launch.modelName}
Announced: ${launch.announcementDate}
Source: ${launch.sourceUrl}
Known facts: ${launch.summary}

Base the article strictly on the facts above — do not invent pricing, benchmarks, or features not implied by the summary. It's fine to note plainly-inferable context (e.g. how it compares to the provider's prior model) but do not fabricate specific unverified claims.

Your slug MUST NOT match any of these existing slugs: ${existingSlugs.join(", ")}

Respond with ONLY valid JSON:
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
Requirements: 4-5 sections, 3 paragraphs each, 5 FAQs, all grounded in the facts given above.`;

  const article = await askLLM(prompt);
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

// ─── Step 4: Commit & push ────────────────────────────────────────────────────

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

console.log(`\n🛰️  Model Launch Watch (free RSS/HN + OpenRouter) — ${today}`);
console.log("=".repeat(50));

try {
  const state = getState();

  const [rssSignals, hnSignals] = await Promise.all([fetchRssSignals(), fetchHackerNewsSignals()]);
  const signals = [...rssSignals, ...hnSignals];
  console.log(`📡 Gathered ${signals.length} raw signal(s) from ${RSS_SOURCES.length} RSS feeds + Hacker News.`);

  const launches = await classifyLaunches(signals, state);

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
    const existingSlugs = [...fs.readFileSync(newsPath, "utf8").matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);

    let slug = null;
    try {
      slug = await writeLaunchArticle(launch, existingSlugs);
    } catch (e) {
      console.error(`❌ Failed to write article for ${launch.provider} ${launch.modelName}:`, e.message);
      continue;
    }
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
} catch (e) {
  console.error("❌ Model launch watch failed:", e.message);
  setGithubOutput("published", "false");
  process.exit(1);
}
