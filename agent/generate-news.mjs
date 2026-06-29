// AI Agent: Researches recent AI news and publishes a news article
// Usage: node agent/generate-news.mjs

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

console.log("\n🤖 AI News Agent starting...");
console.log("🔍 Researching latest AI news...\n");

// ─── Step 1: Research recent news with Claude ────────────────────────────────

const today = new Date().toISOString().split("T")[0];

// Generate a unique slug suffix based on existing news count
const newsPath2 = path.join(ROOT, "lib", "news.ts");
const existingNews = fs.readFileSync(newsPath2, "utf8");
const existingCount = (existingNews.match(/slug:/g) || []).length;
const slugSuffix = existingCount > 0 ? `-${existingCount}` : "";

const researchPrompt = `You are an AI industry journalist. Today is ${today}.

Write a comprehensive news article about the most important and trending AI tool news from the past 7 days.

Focus on: new model releases, major product updates, pricing changes, acquisitions, or industry-shifting announcements related to AI tools like ChatGPT, Claude, Gemini, Copilot, Cursor, Midjourney, Perplexity, etc.

Respond with ONLY valid JSON matching this interface — no markdown, no explanation:

{
  "slug": "string (kebab-case, MUST be unique and specific to this article's topic, e.g. 'claude-4-launch-june-2026' or 'gpt5-pricing-update-june-2026' — NOT a generic roundup name)",
  "title": "string (compelling headline under 70 chars)",
  "metaTitle": "string (SEO title under 65 chars, include year)",
  "metaDescription": "string (140-160 chars, include keywords)",
  "date": "${today}",
  "category": "string (e.g. 'Model Release', 'Industry News', 'Product Update')",
  "badge": "string (short label e.g. 'Breaking', 'Weekly Roundup', 'Hot')",
  "summary": "string (2-3 sentence intro paragraph)",
  "sections": [
    { "h2": "string", "paragraphs": ["string", "string", "string"] }
  ],
  "faqs": [
    { "question": "string", "answer": "string" }
  ]
}

Requirements:
- 4-5 sections covering different news stories
- Each section has 2-3 paragraphs
- 4-5 FAQs
- Write as an authoritative tech journalist
- Include specific details: model names, pricing, dates, company names
- Make it genuinely useful for someone following AI tools`;

const message = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 6000,
  messages: [{ role: "user", content: researchPrompt }],
});

let jsonText = message.content[0].text.trim();
if (jsonText.startsWith("```")) {
  jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
}

let articleData;
try {
  articleData = JSON.parse(jsonText);
  console.log(`✅ Article generated: "${articleData.title}"`);
} catch (e) {
  console.error("❌ Failed to parse JSON:", e.message);
  process.exit(1);
}

// ─── Step 2: Add to news.ts ──────────────────────────────────────────────────

const newsPath = path.join(ROOT, "lib", "news.ts");
let newsContent = fs.readFileSync(newsPath, "utf8");

// Ensure slug is unique by appending count if needed
if (newsContent.includes(`slug: "${articleData.slug}"`)) {
  articleData.slug = `${articleData.slug}-${existingCount}`;
}
if (newsContent.includes(`slug: "${articleData.slug}"`)) {
  console.log(`⚠️  Article "${articleData.slug}" already exists, skipping.`);
  process.exit(0);
}

const newEntry = `\n  ${JSON.stringify(articleData, null, 2).replace(/^/gm, "  ").trim()},\n`;
newsContent = newsContent.replace(
  "export const newsArticles: NewsArticle[] = [];",
  `export const newsArticles: NewsArticle[] = [${newEntry}];`
);

fs.writeFileSync(newsPath, newsContent, "utf8");
console.log("✅ Added to lib/news.ts");

// ─── Step 3: Update sitemap ──────────────────────────────────────────────────

const sitemapPath = path.join(ROOT, "app", "sitemap.ts");
let sitemapContent = fs.readFileSync(sitemapPath, "utf8");

if (!sitemapContent.includes(articleData.slug)) {
  sitemapContent = sitemapContent.replace(
    /(\s*\]\s*;?\s*}?\s*$)/,
    `    { url: \`\${baseUrl}/news/${articleData.slug}\`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },\n$1`
  );

  // Also add /news listing page if not already there
  if (!sitemapContent.includes(`/news\``)) {
    sitemapContent = sitemapContent.replace(
      /(\s*\]\s*;?\s*}?\s*$)/,
      `    { url: \`\${baseUrl}/news\`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },\n$1`
    );
  }

  fs.writeFileSync(sitemapPath, sitemapContent, "utf8");
  console.log("✅ Updated sitemap.ts");
}

// ─── Step 4: Push to GitHub ──────────────────────────────────────────────────

if (GITHUB_TOKEN) {
  try {
    execSync(`git config user.email "agent@aitoolduel.com"`, { cwd: ROOT });
    execSync(`git config user.name "AI Agent"`, { cwd: ROOT });
    execSync(`git add lib/news.ts app/news app/sitemap.ts components/NewsArticlePage.tsx`, { cwd: ROOT });
    execSync(`git commit -m "feat: add news article - ${articleData.title}"`, { cwd: ROOT });

    const remote = `https://saivikas373:${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git`;
    execSync(`git push "${remote}" HEAD:main`, { cwd: ROOT });
    console.log("✅ Pushed to GitHub — Vercel will deploy automatically");

    console.log("📡 Pinging Google & Bing...");
    await requestIndexing(`../news/${articleData.slug}`);

    console.log(`\n🎉 Done! Live at: https://www.aitoolduel.com/news/${articleData.slug}`);
  } catch (e) {
    console.error("❌ Git push failed:", e.message);
  }
}
