// MASTER TRAFFIC GROWTH AGENT
// Runs every 2-3 days automatically — publishes content, improves SEO, builds traffic
// Setup: node agent/master-agent.mjs --setup-scheduler
// Manual run: node agent/master-agent.mjs

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

// ─── State management ────────────────────────────────────────────────────────

function getState() {
  if (!fs.existsSync(STATE_FILE)) return { runs: [], publishedComparisons: [], publishedNews: [] };
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ─── Topic queues ─────────────────────────────────────────────────────────────

const COMPARISON_QUEUE = [
  "claude vs gpt-4o",
  "notion ai vs chatgpt",
  "copilot vs chatgpt",
  "perplexity vs claude",
  "runway vs pika",
  "jasper vs chatgpt",
  "grammarly vs chatgpt",
  "adobe firefly vs midjourney",
  "stable diffusion vs midjourney",
  "google bard vs chatgpt",
  "bing ai vs chatgpt",
  "character ai vs chatgpt",
  "claude vs copilot",
  "gemini vs copilot",
  "chatgpt vs wolfram alpha",
  "notion ai vs jasper",
  "writesonic vs jasper",
  "copy ai vs jasper",
  "claude vs mistral",
  "gpt-4o mini vs claude haiku",
  "chatgpt vs google docs",
  "claude vs cursor",
  "perplexity vs google",
  "sora vs runway",
  "midjourney vs canva ai",
  "chatgpt vs notion",
  "github copilot vs tabnine",
  "claude vs gemini advanced",
  "openai o3 vs claude opus",
  "elevenlabs vs murf ai",
  "synthesia vs heygen",
  "otter ai vs fireflies ai",
  "chatpdf vs claude",
  "zapier ai vs make ai",
  "claude vs llama 3",
  "gpt-4o vs gemini 1.5 pro",
  "cursor vs windsurf",
  "perplexity vs you.com",
  "adobe express vs canva",
  "chatgpt vs wolfram alpha",
];

// ─── Step 1: Decide what to publish today ────────────────────────────────────

async function decideTodaysAction(state) {
  const runCount = state.runs.length;
  // Alternate: comparison on even runs, news on odd runs
  if (runCount % 2 === 0) {
    const next = COMPARISON_QUEUE.find(t => !state.publishedComparisons.includes(t));
    return { type: "comparison", topic: next || null };
  } else {
    return { type: "news" };
  }
}

// ─── Step 2: Generate & publish comparison ───────────────────────────────────

async function publishComparison(topic) {
  console.log(`\n📝 Publishing comparison: "${topic}"`);

  const [tool1Name, tool2Name] = topic.split(/\s+vs\s+/i).map(s => s.trim());
  const slug = `${tool1Name.toLowerCase().replace(/\s+/g, "-")}-vs-${tool2Name.toLowerCase().replace(/\s+/g, "-")}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    system: `You are an expert AI tool reviewer. Generate detailed, honest, SEO-optimized comparison data.
Respond with ONLY valid JSON — no markdown. Match this exact structure with these fields:
slug, metaTitle (under 65 chars with 2026), metaDescription (140-160 chars), canonicalPath, h1, verdict, verdictWinner ("tool1"|"tool2"|"tie"),
tool1 and tool2 each with: name, tagline, pricing, freeTier, speed, bestFor, rating (1-5), pros (6-8 items), cons (4-6 items), ctaUrl, ctaLabel,
introSections (1 section, 3 paragraphs), deepDiveSections (3-4 sections), pickTool1 (heading + 4-5 reasons), pickTool2 (heading + 4-5 reasons),
recommendationSummary (2-3 sentences), faqs (5 FAQs with question + answer).`,
    messages: [{ role: "user", content: `Generate ComparisonData JSON for: "${tool1Name} vs ${tool2Name}"\nslug: "${slug}"\ncanonicalPath: "/compare/${slug}"` }],
  });

  let jsonText = message.content[0].text.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  const data = JSON.parse(jsonText);

  // Add to comparisons.ts
  const comparisonsPath = path.join(ROOT, "lib", "comparisons.ts");
  let content = fs.readFileSync(comparisonsPath, "utf8");
  if (!content.includes(`slug: "${slug}"`)) {
    const insertPoint = content.lastIndexOf("];");
    content = content.slice(0, insertPoint) + `\n  ${JSON.stringify(data, null, 2).replace(/^/gm, "  ").trim()},\n` + content.slice(insertPoint);
    fs.writeFileSync(comparisonsPath, content);
  }

  // Create page
  const pageDir = path.join(ROOT, "app", "compare", slug);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, "page.tsx"), `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparisonPage from "@/components/ComparisonPage";
import { getComparison } from "@/lib/comparisons";

const data = getComparison("${slug}")!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  openGraph: { title: data.metaTitle, description: data.metaDescription, url: \`https://www.aitoolduel.com\${data.canonicalPath}\`, type: "article" },
  twitter: { card: "summary_large_image", title: data.metaTitle, description: data.metaDescription },
  alternates: { canonical: \`https://www.aitoolduel.com\${data.canonicalPath}\` },
};

export default function Page() {
  if (!data) notFound();
  return <ComparisonPage data={data} />;
}`);

  // Update sitemap
  updateSitemap(`/compare/${slug}`, 0.9);

  console.log(`✅ Comparison ready: /compare/${slug}`);
  return slug;
}

// ─── Step 3: Generate & publish news ─────────────────────────────────────────

async function publishNews() {
  console.log(`\n📰 Publishing news article for ${today}...`);

  // Read existing slugs to avoid duplicates
  const newsPath = path.join(ROOT, "lib", "news.ts");
  let newsContent = fs.readFileSync(newsPath, "utf8");
  const existingSlugs = [...newsContent.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

  // Pick a topic angle based on existing count to ensure variety
  const topicAngles = [
    "the biggest AI model release or major version update this week (e.g. GPT-5, Claude 4, Gemini Ultra)",
    "AI coding tools and developer productivity news (Cursor, Copilot, Codex, Claude Code updates)",
    "AI image and video generation tools (Midjourney, Runway, Sora, DALL-E, Pika updates)",
    "AI business news: pricing changes, funding rounds, acquisitions, enterprise deals",
    "new AI tools launched this week and major feature updates across the AI ecosystem",
    "AI search and research tools (Perplexity, ChatGPT search, Google AI Overviews updates)",
  ];
  const angle = topicAngles[existingSlugs.length % topicAngles.length];

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 6000,
    messages: [{ role: "user", content: `You are an AI industry journalist. Today is ${today}.

Write a news article focused on: ${angle}

CRITICAL: Your slug MUST be specific to this topic (e.g. "cursor-vs-copilot-june-2026" or "midjourney-v7-update-june-2026").
NEVER use generic names like "weekly-roundup" or "news-roundup".
These slugs already exist — DO NOT use them: ${existingSlugs.join(", ")}

Respond with ONLY valid JSON (no markdown):
{
  "slug": "topic-specific-kebab-slug-${today}",
  "title": "compelling specific headline under 70 chars",
  "metaTitle": "SEO title under 65 chars with year 2026",
  "metaDescription": "140-160 chars with keywords",
  "date": "${today}",
  "category": "Industry News",
  "badge": "Hot",
  "summary": "2-3 sentence intro paragraph",
  "sections": [{"h2": "section heading", "paragraphs": ["paragraph 1","paragraph 2","paragraph 3"]}],
  "faqs": [{"question": "string", "answer": "string"}]
}
Requirements: 4-5 sections, 3 paragraphs each, 5 FAQs. Use real model names, specific details, dates.` }],
  });

  let jsonText = message.content[0].text.trim().replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  const article = JSON.parse(jsonText);

  // Ensure slug is unique
  if (newsContent.includes(`"${article.slug}"`) || newsContent.includes(`'${article.slug}'`)) {
    article.slug = `${article.slug}-${existingSlugs.length + 1}`;
  }
  if (newsContent.includes(`"${article.slug}"`) || newsContent.includes(`'${article.slug}'`)) {
    console.log(`⚠️  News slug still duplicate, skipping news this run.`);
    return null;
  }

  // Add to news.ts
  const newEntry = `\n  ${JSON.stringify(article, null, 2).replace(/^/gm, "  ").trim()},\n`;
  if (newsContent.includes("newsArticles: NewsArticle[] = [];")) {
    newsContent = newsContent.replace("newsArticles: NewsArticle[] = [];", `newsArticles: NewsArticle[] = [${newEntry}];`);
  } else {
    newsContent = newsContent.replace(/export const newsArticles: NewsArticle\[] = \[/, `export const newsArticles: NewsArticle[] = [${newEntry}`);
  }
  fs.writeFileSync(newsPath, newsContent);

  updateSitemap(`/news/${article.slug}`, 0.8);
  console.log(`✅ News article ready: /news/${article.slug}`);
  return article.slug;
}

// ─── Step 4: SEO improvements ────────────────────────────────────────────────

async function improveSEO() {
  console.log("\n🔍 Running SEO improvements...");

  // Add JSON-LD schema to homepage if not present
  const layoutPath = path.join(ROOT, "app", "layout.tsx");
  let layout = fs.readFileSync(layoutPath, "utf8");

  if (!layout.includes("WebSite") && !layout.includes("application/ld+json")) {
    const schemaScript = `
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "AI Tool Duel",
          "url": "https://www.aitoolduel.com",
          "description": "Honest AI tool comparisons and reviews",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.aitoolduel.com/compare/{search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}}
      />`;

    layout = layout.replace("</head>", `${schemaScript}\n      </head>`);
    fs.writeFileSync(layoutPath, layout);
    console.log("✅ Added JSON-LD schema markup to layout");
  } else {
    console.log("✅ Schema markup already present");
  }
}

// ─── Helper: update sitemap ───────────────────────────────────────────────────

function updateSitemap(urlPath, priority) {
  const sitemapPath = path.join(ROOT, "app", "sitemap.ts");
  let content = fs.readFileSync(sitemapPath, "utf8");
  const slug = urlPath.split("/").pop();
  if (!content.includes(slug)) {
    content = content.replace(
      /(\s*\]\s*;?\s*}?\s*$)/,
      `    { url: \`\${baseUrl}${urlPath}\`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: ${priority} },\n$1`
    );
    fs.writeFileSync(sitemapPath, content);
  }
}

// ─── Step 5: Commit & push ────────────────────────────────────────────────────

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
    if (e.message.includes("nothing to commit")) {
      console.log("✅ Nothing new to commit");
      return true;
    }
    console.error("❌ Push failed:", e.message);
    return false;
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

if (process.argv[2] === "--setup-scheduler") {
  // Write Windows Task Scheduler script
  const ps1 = `# Auto-run master agent every 2 days
$taskName = "AIToolDuel-MasterAgent"
$nodePath = (Get-Command node).Source
$action = New-ScheduledTaskAction -Execute $nodePath -Argument '"${path.join(ROOT, "agent", "master-agent.mjs").replace(/\\/g, "\\\\")}"' -WorkingDirectory '${ROOT.replace(/\\/g, "\\\\")}'
$trigger1 = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday,Wednesday,Friday -At 8am
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 2)
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger1 -Settings $settings -RunLevel Highest -Force
Write-Host "✅ Master agent scheduled: Mon/Wed/Fri at 8am"`;

  fs.writeFileSync(path.join(__dirname, "setup-master-scheduler.ps1"), ps1);
  console.log("✅ Created setup-master-scheduler.ps1");
  console.log("Run: powershell -ExecutionPolicy Bypass -File agent\\setup-master-scheduler.ps1");
  process.exit(0);
}

// Normal run
console.log(`\n🚀 Master Traffic Agent — ${today}`);
console.log("=".repeat(50));

const state = getState();
const action = await decideTodaysAction(state);
let publishedSlug = null;
let commitMsg = "";

if (action.type === "comparison" && action.topic) {
  publishedSlug = await publishComparison(action.topic);
  state.publishedComparisons.push(action.topic);
  commitMsg = `feat: add comparison - ${action.topic}`;
} else if (action.type === "news") {
  publishedSlug = await publishNews();
  if (!publishedSlug) {
    // News was duplicate — fall back to publishing a comparison instead
    console.log("⚠️  News skipped, publishing a comparison instead...");
    const fallbackTopic = COMPARISON_QUEUE.find(t => !state.publishedComparisons.includes(t));
    if (fallbackTopic) {
      publishedSlug = await publishComparison(fallbackTopic);
      state.publishedComparisons.push(fallbackTopic);
      commitMsg = `feat: add comparison - ${fallbackTopic}`;
    }
  } else {
    state.publishedNews.push(publishedSlug);
    commitMsg = `feat: add weekly AI news - ${today}`;
  }
} else {
  console.log("✅ All comparisons published! Switching to news-only mode.");
  publishedSlug = await publishNews();
  commitMsg = `feat: add weekly AI news - ${today}`;
}

await improveSEO();

const pushed = pushToGitHub(commitMsg);

if (pushed && publishedSlug) {
  console.log("\n📡 Pinging search engines...");
  await requestIndexing(publishedSlug);
}

state.runs.push({ date: today, action: action.type, slug: publishedSlug });
saveState(state);

console.log(`\n✅ Master agent complete!`);
console.log(`📊 Total runs: ${state.runs.length}`);
console.log(`📝 Comparisons published: ${state.publishedComparisons.length}`);
console.log(`📰 News articles published: ${state.publishedNews.length}`);
