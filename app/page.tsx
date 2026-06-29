import type { Metadata } from "next";
import Link from "next/link";
import AdSenseAd from "@/components/AdSenseAd";
import { getLatestArticles } from "@/lib/news";

export const metadata: Metadata = {
  title: "AI Tool Duel – Honest AI Tool Comparisons",
  description:
    "In-depth, honest comparisons of the most popular AI tools. Find the best AI tool for your needs with side-by-side breakdowns, pros & cons, and expert picks.",
  openGraph: {
    title: "AI Tool Duel – Honest AI Tool Comparisons",
    description:
      "In-depth, honest comparisons of the most popular AI tools. ChatGPT vs Claude, Midjourney vs DALL-E, Perplexity vs Google, and more.",
    url: "https://aitoolduel.com",
    type: "website",
  },
  alternates: {
    canonical: "https://aitoolduel.com",
  },
};

const comparisons = [
  {
    href: "/compare/chatgpt-vs-claude",
    title: "ChatGPT vs Claude",
    description:
      "OpenAI's flagship vs Anthropic's thoughtful alternative. Who wins for writing, coding, and everyday AI tasks?",
    badge: "Most Popular",
    badgeColor: "bg-orange-100 text-orange-800",
    tags: ["Writing", "Coding", "Chat"],
  },
  {
    href: "/compare/gemini-vs-chatgpt",
    title: "Gemini vs ChatGPT",
    description:
      "Google's AI powerhouse vs the chatbot that started it all. Which AI assistant delivers more value in 2025?",
    badge: "Hot",
    badgeColor: "bg-red-100 text-red-800",
    tags: ["Google", "Multimodal", "Search"],
  },
  {
    href: "/compare/midjourney-vs-dalle",
    title: "Midjourney vs DALL-E 3",
    description:
      "The battle for AI image generation supremacy. Artistic quality vs ease of use — which image AI should you use?",
    badge: "Creative",
    badgeColor: "bg-purple-100 text-purple-800",
    tags: ["Images", "Art", "Design"],
  },
  {
    href: "/compare/github-copilot-vs-cursor",
    title: "GitHub Copilot vs Cursor",
    description:
      "Two AI coding assistants, two different philosophies. Which one will make you a faster, better developer?",
    badge: "For Devs",
    badgeColor: "bg-blue-100 text-blue-800",
    tags: ["Coding", "IDE", "AI Dev"],
  },
  {
    href: "/compare/perplexity-vs-google",
    title: "Perplexity AI vs Google",
    description:
      "AI-native search vs the king of search engines. Is Perplexity finally good enough to replace Google?",
    badge: "Search",
    badgeColor: "bg-green-100 text-green-800",
    tags: ["Search", "Research", "Answers"],
  },
  {
    href: "/compare/claude-vs-gemini",
    title: "Claude vs Gemini",
    description:
      "Anthropic's writing powerhouse vs Google's deeply integrated AI. Which is better for serious work in 2026?",
    badge: "New",
    badgeColor: "bg-teal-100 text-teal-800",
    tags: ["Writing", "Workspace", "Work"],
  },
  {
    href: "/compare/chatgpt-vs-google",
    title: "ChatGPT vs Google Search",
    description:
      "AI-synthesized answers vs the world's biggest search index. Can ChatGPT actually replace Google?",
    badge: "New",
    badgeColor: "bg-teal-100 text-teal-800",
    tags: ["Search", "AI", "Research"],
  },
  {
    href: "/compare/cursor-vs-github-copilot",
    title: "Cursor vs GitHub Copilot",
    description:
      "The AI-native editor vs the universal coding assistant. Which tool makes developers most productive in 2026?",
    badge: "New",
    badgeColor: "bg-teal-100 text-teal-800",
    tags: ["Coding", "IDE", "Agent"],
  },
  {
    href: "/compare/claude-code-vs-codex",
    title: "Claude Code vs Codex",
    description:
      "Anthropic's agentic CLI coder vs OpenAI's cloud coding agent. Which AI coding agent handles real engineering tasks better?",
    badge: "Trending",
    badgeColor: "bg-rose-100 text-rose-800",
    tags: ["Coding", "Agents", "CLI"],
  },
  {
    href: "/compare/grok-vs-chatgpt",
    title: "Grok vs ChatGPT",
    description:
      "xAI's real-time X-integrated chatbot vs OpenAI's market leader. Which wins for daily AI tasks in April 2026?",
    badge: "Trending",
    badgeColor: "bg-rose-100 text-rose-800",
    tags: ["Chat", "Real-Time", "X/Twitter"],
  },
  {
    href: "/compare/deepseek-vs-chatgpt",
    title: "DeepSeek vs ChatGPT",
    description:
      "China's open-source cost-killer vs the world's most popular AI. Which delivers more value for money in 2026?",
    badge: "Trending",
    badgeColor: "bg-rose-100 text-rose-800",
    tags: ["Open Source", "Cost", "Reasoning"],
  },
  {
    href: "/compare/claude-opus-47-vs-gpt54",
    title: "Claude Opus 4.7 vs GPT-5.4",
    description:
      "The two most powerful AI frontier models of 2026 head-to-head. Which flagship wins for coding, writing, and reasoning?",
    badge: "Trending",
    badgeColor: "bg-rose-100 text-rose-800",
    tags: ["Frontier", "Coding", "Writing"],
  },
  {
    href: "/compare/llama-vs-chatgpt",
    title: "Llama 4 vs ChatGPT",
    description:
      "Meta's open-source powerhouse vs OpenAI's commercial king. Which AI model is right for your workflow in 2026?",
    badge: "Trending",
    badgeColor: "bg-rose-100 text-rose-800",
    tags: ["Open Source", "Privacy", "Self-Host"],
  },
  {
    href: "/compare/gpt-4o-vs-claude-sonnet-4",
    title: "GPT-4o vs Claude Sonnet 4",
    description:
      "OpenAI's multimodal omni model vs Anthropic's best-value writer. Two $20/month models — which delivers more for your work?",
    badge: "New",
    badgeColor: "bg-teal-100 text-teal-800",
    tags: ["Multimodal", "Writing", "Coding"],
  },
  {
    href: "/compare/chatgpt-vs-meta-ai",
    title: "ChatGPT vs Meta AI",
    description:
      "The AI you pay for vs the AI already on your phone. Is Meta's free Llama 4-powered assistant good enough to replace ChatGPT?",
    badge: "New",
    badgeColor: "bg-teal-100 text-teal-800",
    tags: ["Free", "WhatsApp", "Casual Use"],
  },
  {
    href: "/compare/perplexity-vs-chatgpt",
    title: "Perplexity vs ChatGPT",
    description:
      "AI search with cited sources vs AI chat that creates. Which tool wins for research, work, and daily questions in 2026?",
    badge: "New",
    badgeColor: "bg-teal-100 text-teal-800",
    tags: ["Search", "Research", "Citations"],
  },
];

const whyPoints = [
  {
    icon: "⚡",
    title: "Actually Tested",
    body: "Every comparison is based on real hands-on testing across dozens of tasks, not just marketing copy.",
  },
  {
    icon: "📊",
    title: "Side-by-Side Data",
    body: "We give you clean comparison tables with the exact data you need: pricing, free tiers, speed, and ratings.",
  },
  {
    icon: "🎯",
    title: "Clear Recommendations",
    body: "We tell you exactly which tool wins and for whom — no wishy-washy both-are-good-it-depends answers.",
  },
  {
    icon: "🔄",
    title: "Kept Up To Date",
    body: "AI tools change fast. We update our comparisons regularly to reflect the latest models and pricing.",
  },
];

export default function HomePage() {
  const latestNews = getLatestArticles(3);
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span>⚔</span> 16 Comparisons · 25+ Tools Reviewed
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            AI Tool <span className="text-orange-500">Duel</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 font-medium mb-3">
            Find the Best AI Tool for You
          </p>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Honest, in-depth comparisons of the most popular AI tools. We cut
            through the hype so you can pick the right tool with confidence.
          </p>
          <a
            href="#comparisons"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Browse Comparisons ↓
          </a>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── AdSense: TOP ── */}
        <AdSenseAd slot="auto" />

        {/* ── HUB PAGES ── */}
        <section className="py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link
              href="/tools"
              className="group flex items-center gap-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 hover:from-slate-800 hover:to-slate-700 transition-all"
            >
              <div className="text-3xl shrink-0">🗂️</div>
              <div>
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-1">Browse All</div>
                <h2 className="text-base font-extrabold mb-1">AI Tools Directory</h2>
                <p className="text-slate-400 text-xs">20+ tools rated and filterable.</p>
                <span className="mt-2 inline-block text-orange-400 text-xs font-semibold group-hover:text-orange-300 transition-colors">
                  Explore →
                </span>
              </div>
            </Link>
            <Link
              href="/best-ai-tools"
              className="group flex items-center gap-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-5 hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              <div className="text-3xl shrink-0">🏆</div>
              <div>
                <div className="text-xs font-semibold text-orange-100 uppercase tracking-wide mb-1">Top Picks</div>
                <h2 className="text-base font-extrabold mb-1">Best AI Tools 2026</h2>
                <p className="text-orange-100 text-xs">Our top picks by category.</p>
                <span className="mt-2 inline-block text-white text-xs font-semibold group-hover:text-orange-100 transition-colors">
                  See picks →
                </span>
              </div>
            </Link>
            <Link
              href="/tools/ai-detector"
              className="group flex items-center gap-4 bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-2xl p-5 hover:from-slate-700 hover:to-slate-600 transition-all"
            >
              <div className="text-3xl shrink-0">🔍</div>
              <div>
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-1">Free Tool</div>
                <h2 className="text-base font-extrabold mb-1">AI Text Detector</h2>
                <p className="text-slate-400 text-xs">Check if text was written by AI.</p>
                <span className="mt-2 inline-block text-orange-400 text-xs font-semibold group-hover:text-orange-300 transition-colors">
                  Try free →
                </span>
              </div>
            </Link>
            <Link
              href="/tools/prompt-generator"
              className="group flex items-center gap-4 bg-gradient-to-br from-purple-900 to-purple-800 text-white rounded-2xl p-5 hover:from-purple-800 hover:to-purple-700 transition-all"
            >
              <div className="text-3xl shrink-0">✨</div>
              <div>
                <div className="text-xs font-semibold text-purple-300 uppercase tracking-wide mb-1">Free Tool</div>
                <h2 className="text-base font-extrabold mb-1">Prompt Generator</h2>
                <p className="text-purple-200 text-xs">50+ templates for any AI tool.</p>
                <span className="mt-2 inline-block text-purple-300 text-xs font-semibold group-hover:text-purple-200 transition-colors">
                  Generate →
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* ── COMPARISONS GRID ── */}
        <section id="comparisons" className="py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              All Comparisons
            </h2>
            <p className="text-slate-500 text-lg">
              Pick a matchup to get the full breakdown
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisons.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group card p-6 hover:shadow-md hover:border-orange-200 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badgeColor}`}
                  >
                    {c.badge}
                  </span>
                  <span className="text-slate-300 group-hover:text-orange-500 transition-colors text-xl">
                    →
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {c.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {c.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-orange-500 font-semibold text-sm group-hover:text-orange-600 transition-colors">
                    Compare Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── WHY USE THIS SITE ── */}
        <section className="py-12 border-t border-slate-200">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Why Use AI Tool Duel?
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              There&apos;s a lot of noise in the AI space. We&apos;re here to give you
              signal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPoints.map((point) => (
              <div
                key={point.title}
                className="bg-white rounded-xl border border-slate-200 p-6 text-center"
              >
                <div className="text-4xl mb-3">{point.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{point.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED PICKS ── */}
        <section className="py-12 border-t border-slate-200">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">
            Our Top Picks Right Now
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
              <div className="text-sm font-semibold text-blue-600 mb-2">Best for Writing</div>
              <div className="text-2xl font-extrabold text-slate-900 mb-1">Claude</div>
              <p className="text-sm text-slate-600">Beats ChatGPT for long-form writing, nuanced prose, and large document analysis.</p>
              <Link href="/compare/chatgpt-vs-claude" className="mt-3 inline-block text-blue-600 font-semibold text-sm hover:underline">
                See full comparison →
              </Link>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
              <div className="text-sm font-semibold text-purple-600 mb-2">Best for AI Images</div>
              <div className="text-2xl font-extrabold text-slate-900 mb-1">Midjourney</div>
              <p className="text-sm text-slate-600">Consistently produces the most visually stunning AI artwork of any image generator.</p>
              <Link href="/compare/midjourney-vs-dalle" className="mt-3 inline-block text-purple-600 font-semibold text-sm hover:underline">
                See full comparison →
              </Link>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
              <div className="text-sm font-semibold text-green-600 mb-2">Best for Coding</div>
              <div className="text-2xl font-extrabold text-slate-900 mb-1">Cursor</div>
              <p className="text-sm text-slate-600">Agent mode can plan and execute multi-file changes — a step above Copilot for power users.</p>
              <Link href="/compare/github-copilot-vs-cursor" className="mt-3 inline-block text-green-600 font-semibold text-sm hover:underline">
                See full comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* ── LATEST NEWS ── */}
        {latestNews.length > 0 && (
          <section className="py-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900">Latest AI News</h2>
              <Link href="/news" className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
                All news →
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <Link key={article.slug} href={`/news/${article.slug}`} className="group block border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-orange-200 transition-all">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full mb-2">{article.badge}</span>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{article.summary}</p>
                  <p className="text-xs text-slate-400 mt-3">{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── AdSense: BOTTOM ── */}
        <AdSenseAd slot="auto" />
      </div>
    </>
  );
}
