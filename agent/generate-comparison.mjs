// AI Agent: Generates a new comparison page and publishes it to GitHub
// Usage: node agent/generate-comparison.mjs "tool1 vs tool2"

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { requestIndexing } from "./search-console.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = "saivikas373/aitoolduel";

if (!ANTHROPIC_API_KEY) {
  console.error("❌ Missing ANTHROPIC_API_KEY env variable");
  process.exit(1);
}

const topic = process.argv[2];
if (!topic) {
  console.error("❌ Usage: node agent/generate-comparison.mjs \"chatgpt vs gemini\"");
  process.exit(1);
}

const [tool1Name, tool2Name] = topic.split(/\s+vs\s+/i).map((s) => s.trim());
if (!tool1Name || !tool2Name) {
  console.error("❌ Topic must be in format: \"tool1 vs tool2\"");
  process.exit(1);
}

const slug = `${tool1Name.toLowerCase().replace(/\s+/g, "-")}-vs-${tool2Name.toLowerCase().replace(/\s+/g, "-")}`;

console.log(`\n🤖 AI Agent starting...`);
console.log(`📝 Generating: ${tool1Name} vs ${tool2Name}`);
console.log(`🔗 Slug: ${slug}\n`);

// ─── Step 1: Generate comparison data with Claude ───────────────────────────

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const systemPrompt = `You are an expert AI tool reviewer. Generate detailed, honest, SEO-optimized comparison data.
You must respond with ONLY valid JSON matching the exact TypeScript interface below — no markdown, no explanation.

interface ToolData {
  name: string;
  tagline: string;
  pricing: string;
  freeTier: string;
  speed: string;
  bestFor: string;
  rating: number; // 1-5, one decimal
  pros: string[]; // 6-8 items
  cons: string[]; // 4-6 items
  ctaUrl: string;
  ctaLabel: string;
}

interface FAQ {
  question: string;
  answer: string; // 2-3 sentences
}

interface ContentSection {
  h2: string;
  paragraphs: string[]; // 2-3 paragraphs each
}

interface ComparisonData {
  slug: string;
  metaTitle: string; // under 65 chars, include year 2026
  metaDescription: string; // 140-160 chars
  canonicalPath: string;
  h1: string;
  verdict: string; // e.g. "ChatGPT Wins for Most Users"
  verdictWinner: "tool1" | "tool2" | "tie";
  tool1: ToolData;
  tool2: ToolData;
  introSections: ContentSection[]; // 1 section
  deepDiveSections: ContentSection[]; // 3-4 sections
  pickTool1: { heading: string; reasons: string[] }; // 4-5 reasons
  pickTool2: { heading: string; reasons: string[] }; // 4-5 reasons
  recommendationSummary: string; // 2-3 sentences
  faqs: FAQ[]; // 5 FAQs
}`;

const userPrompt = `Generate a ComparisonData JSON object for: "${tool1Name} vs ${tool2Name}"
slug: "${slug}"
canonicalPath: "/compare/${slug}"

Make it accurate, detailed, and helpful for someone deciding between these tools in 2026.`;

console.log("🧠 Calling Claude to generate comparison data...");

const message = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 8000,
  system: systemPrompt,
  messages: [{ role: "user", content: userPrompt }],
});

let jsonText = message.content[0].text.trim();

// Strip markdown code blocks if present
if (jsonText.startsWith("```")) {
  jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
}

let comparisonData;
try {
  comparisonData = JSON.parse(jsonText);
  console.log("✅ Comparison data generated successfully");
} catch (e) {
  console.error("❌ Failed to parse JSON from Claude:", e.message);
  console.error("Raw output:", jsonText.slice(0, 500));
  process.exit(1);
}

// ─── Validate and fix field names before writing ─────────────────────────────

// Fix freeTier if boolean was returned
if (typeof comparisonData.tool1?.freeTier === "boolean")
  comparisonData.tool1.freeTier = comparisonData.tool1.freeTier ? "Yes — free tier available" : "No free tier";
if (typeof comparisonData.tool2?.freeTier === "boolean")
  comparisonData.tool2.freeTier = comparisonData.tool2.freeTier ? "Yes — free tier available" : "No free tier";

// Fix sections that used "heading"/"content" instead of "h2"/"paragraphs"
function fixSections(sections) {
  if (!Array.isArray(sections)) return sections;
  return sections.map(s => {
    const fixed = { ...s };
    if (fixed.heading && !fixed.h2) { fixed.h2 = fixed.heading; delete fixed.heading; }
    if (typeof fixed.content === "string" && !fixed.paragraphs) {
      const parts = fixed.content.split(/(?<=\.) /);
      const mid = Math.ceil(parts.length / 2);
      fixed.paragraphs = [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")].filter(Boolean);
      delete fixed.content;
    }
    return fixed;
  });
}
comparisonData.introSections = fixSections(comparisonData.introSections);
comparisonData.deepDiveSections = fixSections(comparisonData.deepDiveSections);
console.log("✅ Field validation passed");

// ─── Step 2: Add to comparisons.ts ──────────────────────────────────────────

const comparisonsPath = path.join(ROOT, "lib", "comparisons.ts");
let comparisonsContent = fs.readFileSync(comparisonsPath, "utf8");

// Check if slug already exists
if (comparisonsContent.includes(`slug: "${slug}"`)) {
  console.log(`⚠️  Comparison "${slug}" already exists. Skipping.`);
  process.exit(0);
}

// Insert new comparison before the closing bracket of the array
const insertPoint = comparisonsContent.lastIndexOf("];");
const newEntry = `\n  ${JSON.stringify(comparisonData, null, 2).replace(/^/gm, "  ").trim()},\n`;
comparisonsContent =
  comparisonsContent.slice(0, insertPoint) +
  newEntry +
  comparisonsContent.slice(insertPoint);

fs.writeFileSync(comparisonsPath, comparisonsContent, "utf8");
console.log("✅ Added to lib/comparisons.ts");

// ─── Step 3: Create the page folder ─────────────────────────────────────────

const pageDir = path.join(ROOT, "app", "compare", slug);
fs.mkdirSync(pageDir, { recursive: true });

const pageContent = `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparisonPage from "@/components/ComparisonPage";
import { getComparison } from "@/lib/comparisons";

const data = getComparison("${slug}")!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: \`https://www.aitoolduel.com\${data.canonicalPath}\`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: data.metaTitle,
    description: data.metaDescription,
  },
  alternates: {
    canonical: \`https://www.aitoolduel.com\${data.canonicalPath}\`,
  },
};

export default function Page() {
  if (!data) notFound();
  return <ComparisonPage data={data} />;
}
`;

fs.writeFileSync(path.join(pageDir, "page.tsx"), pageContent, "utf8");
console.log(`✅ Created app/compare/${slug}/page.tsx`);

// ─── Step 4: Update sitemap.ts ───────────────────────────────────────────────

const sitemapPath = path.join(ROOT, "app", "sitemap.ts");
let sitemapContent = fs.readFileSync(sitemapPath, "utf8");

if (!sitemapContent.includes(slug)) {
  sitemapContent = sitemapContent.replace(
    /(\s*\]\s*;?\s*}?\s*$)/,
    `    { url: \`\${baseUrl}/compare/${slug}\`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },\n$1`
  );
  fs.writeFileSync(sitemapPath, sitemapContent, "utf8");
  console.log("✅ Updated sitemap.ts");
}

// ─── Step 5: Commit and push to GitHub ──────────────────────────────────────

if (GITHUB_TOKEN) {
  try {
    execSync(`git config user.email "agent@aitoolduel.com"`, { cwd: ROOT });
    execSync(`git config user.name "AI Agent"`, { cwd: ROOT });
    execSync(`git add lib/comparisons.ts app/compare/${slug}/page.tsx app/sitemap.ts`, { cwd: ROOT });
    execSync(`git commit -m "feat: add ${tool1Name} vs ${tool2Name} comparison"`, { cwd: ROOT });

    const remote = `https://saivikas373:${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git`;
    execSync(`git push "${remote}" HEAD:main`, { cwd: ROOT });
    console.log("✅ Pushed to GitHub — Vercel will deploy automatically");

    // Submit to Google Search Console
    console.log("📡 Submitting to Google Search Console...");
    await requestIndexing(slug);

    console.log(`\n🎉 Done! Live at: https://www.aitoolduel.com/compare/${slug}`);
  } catch (e) {
    console.error("❌ Git push failed:", e.message);
    console.log("✅ Files created locally — push manually to deploy");
  }
} else {
  console.log("⚠️  No GITHUB_TOKEN set — files created locally only");
  console.log(`✅ Run: git add . && git commit -m "add ${slug}" && git push`);
}
