// WEEKLY EMAIL REPORT AGENT
// Sends every Sunday with full analysis of traffic, content, SEO
// Run manually: node agent/weekly-report.mjs
// Auto: triggered by GitHub Actions every Sunday 9am UTC

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";
import nodemailer from "nodemailer";

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

const EMAIL_USER = process.env.EMAIL_USER || "saivikasreddy95@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const SITE = "https://www.aitoolduel.com";

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// ─── Gather all site data ─────────────────────────────────────────────────────

function getSiteData() {
  const state = JSON.parse(
    fs.readFileSync(path.join(__dirname, "agent-state.json"), "utf8")
  );

  // Read comparisons
  const comparisonsFile = fs.readFileSync(path.join(ROOT, "lib/comparisons.ts"), "utf8");
  const compSlugs = [...comparisonsFile.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

  // Read news
  const newsFile = fs.readFileSync(path.join(ROOT, "lib/news.ts"), "utf8");
  const newsSlugs = [...newsFile.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

  // Last 7 days of runs
  const today = new Date();
  const weekAgo = new Date(today - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const recentRuns = state.runs.filter(r => r.date >= weekAgo);

  return {
    totalComparisons: compSlugs.length,
    totalNews: newsSlugs.length,
    totalPages: compSlugs.length + newsSlugs.length + 3, // +3 for home, /news, /compare
    recentRuns,
    allComparisons: compSlugs,
    allNews: newsSlugs,
    state,
  };
}

// ─── Generate AI analysis ─────────────────────────────────────────────────────

async function generateReport(data) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const prompt = `You are an SEO and content strategist writing a weekly performance report for a website owner.

Website: aitoolduel.com — AI tool comparison site
Report date: ${today}

SITE DATA THIS WEEK:
- Total comparison pages: ${data.totalComparisons}
- Total news articles: ${data.totalNews}
- Total indexed pages: ${data.totalPages}
- New content this week: ${data.recentRuns.length} pieces published
- Recent content: ${data.recentRuns.map(r => r.slug).join(", ")}

ALL COMPARISONS LIVE: ${data.allComparisons.join(", ")}
ALL NEWS LIVE: ${data.allNews.join(", ")}

Write a professional weekly report email with these sections:

1. **Weekly Summary** — What was published this week, overall progress
2. **SEO Status** — How many pages are indexed, what keywords we're targeting, estimated time to rank
3. **Traffic Analysis** — Honest assessment: new site takes 4-8 weeks to see organic traffic, explain what's happening right now (crawling phase), what to expect next week and next month
4. **Content Performance** — Which comparisons are likely to get the most traffic and why (based on search volume of these AI tool queries)
5. **What the Agent Did This Week** — Specific improvements made (content, SEO, sitemap, search engine pings)
6. **Next Week Plan** — What topics will be published next, why they were chosen
7. **Honest Verdict** — Is this working? Is it worth it? What's the realistic traffic timeline?

Write in a clear, honest tone. Don't exaggerate. The owner wants real answers, not fluff.
Keep it under 600 words total. Use emojis for section headers.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1200,
    messages: [{ role: "user", content: prompt }],
  });

  return response.content[0].text;
}

// ─── Send email ───────────────────────────────────────────────────────────────

async function sendReport(reportText, data) {
  if (!EMAIL_PASS) {
    console.log("⚠️  EMAIL_PASS not set — printing report instead:\n");
    console.log(reportText);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  // Convert markdown-style to HTML
  const html = `
<!DOCTYPE html>
<html>
<head><style>
  body { font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #333; }
  h1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; }
  h2 { color: #4a5568; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
  .stat { display: inline-block; background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 20px; margin: 8px; text-align: center; }
  .stat-num { font-size: 28px; font-weight: bold; color: #667eea; }
  .stat-label { font-size: 12px; color: #718096; }
  .pages { background: #f0fff4; border-left: 4px solid #48bb78; padding: 12px; margin: 8px 0; border-radius: 4px; }
  pre { background: #f7fafc; padding: 16px; border-radius: 8px; font-size: 13px; white-space: pre-wrap; }
  .footer { background: #f7fafc; padding: 16px; border-radius: 8px; font-size: 12px; color: #718096; margin-top: 24px; }
  a { color: #667eea; }
</style></head>
<body>
<h1>📊 aitoolduel.com Weekly Report — ${today}</h1>

<div style="display:flex;flex-wrap:wrap;margin:16px 0">
  <div class="stat"><div class="stat-num">${data.totalComparisons}</div><div class="stat-label">Comparisons Live</div></div>
  <div class="stat"><div class="stat-num">${data.totalNews}</div><div class="stat-label">News Articles</div></div>
  <div class="stat"><div class="stat-num">${data.totalPages}</div><div class="stat-label">Total Pages</div></div>
  <div class="stat"><div class="stat-num">${data.recentRuns.length}</div><div class="stat-label">Published This Week</div></div>
</div>

<h2>📄 New Content This Week</h2>
${data.recentRuns.map(r => `<div class="pages">
  ${r.action === "comparison" ? "🔵 Comparison" : "📰 News"}:
  <a href="${SITE}/${r.action === "comparison" ? "compare" : "news"}/${r.slug}">${r.slug}</a>
</div>`).join("")}

<h2>📈 Full Report</h2>
<pre>${reportText}</pre>

<h2>🔗 All Live Comparison Pages</h2>
${data.allComparisons.map(s => `<div class="pages"><a href="${SITE}/compare/${s}">${SITE}/compare/${s}</a></div>`).join("")}

<div class="footer">
  🤖 This report was auto-generated by your AI agent.<br>
  The agent runs every Mon/Wed/Fri and sends this report every Sunday.<br>
  Check Google Search Console: <a href="https://search.google.com/search-console">search.google.com/search-console</a><br>
  View all GitHub Actions runs: <a href="https://github.com/saivikas373/aitoolduel/actions">github.com/saivikas373/aitoolduel/actions</a>
</div>
</body>
</html>`;

  await transporter.sendMail({
    from: `"AI Tool Duel Agent" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: `📊 Weekly Report: aitoolduel.com — ${data.totalComparisons} comparisons, ${data.totalNews} news articles live`,
    html,
  });

  console.log(`✅ Weekly report emailed to ${EMAIL_USER}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log("📊 Generating weekly report...");
const data = getSiteData();
console.log(`📄 ${data.totalComparisons} comparisons, ${data.totalNews} news articles, ${data.recentRuns.length} published this week`);

const report = await generateReport(data);
await sendReport(report, data);

console.log("✅ Weekly report done!");
