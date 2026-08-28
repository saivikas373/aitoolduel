import type { Metadata } from "next";
import Link from "next/link";
import AdSenseAd from "@/components/AdSenseAd";
import Newsletter from "@/components/Newsletter";
import ToolQuiz from "@/components/ToolQuiz";
import { getLatestArticles } from "@/lib/news";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/motion";

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
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Writing", "Coding", "Chat"],
  },
  {
    href: "/compare/gemini-vs-chatgpt",
    title: "Gemini vs ChatGPT",
    description:
      "Google's AI powerhouse vs the chatbot that started it all. Which AI assistant delivers more value in 2025?",
    badge: "Hot",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Google", "Multimodal", "Search"],
  },
  {
    href: "/compare/midjourney-vs-dalle",
    title: "Midjourney vs DALL-E 3",
    description:
      "The battle for AI image generation supremacy. Artistic quality vs ease of use — which image AI should you use?",
    badge: "Creative",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Images", "Art", "Design"],
  },
  {
    href: "/compare/github-copilot-vs-cursor",
    title: "GitHub Copilot vs Cursor",
    description:
      "Two AI coding assistants, two different philosophies. Which one will make you a faster, better developer?",
    badge: "For Devs",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Coding", "IDE", "AI Dev"],
  },
  {
    href: "/compare/perplexity-vs-google",
    title: "Perplexity AI vs Google",
    description:
      "AI-native search vs the king of search engines. Is Perplexity finally good enough to replace Google?",
    badge: "Search",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Search", "Research", "Answers"],
  },
  {
    href: "/compare/claude-vs-gemini",
    title: "Claude vs Gemini",
    description:
      "Anthropic's writing powerhouse vs Google's deeply integrated AI. Which is better for serious work in 2026?",
    badge: "New",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Writing", "Workspace", "Work"],
  },
  {
    href: "/compare/chatgpt-vs-google",
    title: "ChatGPT vs Google Search",
    description:
      "AI-synthesized answers vs the world's biggest search index. Can ChatGPT actually replace Google?",
    badge: "New",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Search", "AI", "Research"],
  },
  {
    href: "/compare/cursor-vs-github-copilot",
    title: "Cursor vs GitHub Copilot",
    description:
      "The AI-native editor vs the universal coding assistant. Which tool makes developers most productive in 2026?",
    badge: "New",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Coding", "IDE", "Agent"],
  },
  {
    href: "/compare/claude-code-vs-codex",
    title: "Claude Code vs Codex",
    description:
      "Anthropic's agentic CLI coder vs OpenAI's cloud coding agent. Which AI coding agent handles real engineering tasks better?",
    badge: "Trending",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Coding", "Agents", "CLI"],
  },
  {
    href: "/compare/grok-vs-chatgpt",
    title: "Grok vs ChatGPT",
    description:
      "xAI's real-time X-integrated chatbot vs OpenAI's market leader. Which wins for daily AI tasks in April 2026?",
    badge: "Trending",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Chat", "Real-Time", "X/Twitter"],
  },
  {
    href: "/compare/deepseek-vs-chatgpt",
    title: "DeepSeek vs ChatGPT",
    description:
      "China's open-source cost-killer vs the world's most popular AI. Which delivers more value for money in 2026?",
    badge: "Trending",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Open Source", "Cost", "Reasoning"],
  },
  {
    href: "/compare/claude-opus-47-vs-gpt54",
    title: "Claude Opus 4.7 vs GPT-5.4",
    description:
      "The two most powerful AI frontier models of 2026 head-to-head. Which flagship wins for coding, writing, and reasoning?",
    badge: "Trending",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Frontier", "Coding", "Writing"],
  },
  {
    href: "/compare/llama-vs-chatgpt",
    title: "Llama 4 vs ChatGPT",
    description:
      "Meta's open-source powerhouse vs OpenAI's commercial king. Which AI model is right for your workflow in 2026?",
    badge: "Trending",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Open Source", "Privacy", "Self-Host"],
  },
  {
    href: "/compare/gpt-4o-vs-claude-sonnet-4",
    title: "GPT-4o vs Claude Sonnet 4",
    description:
      "OpenAI's multimodal omni model vs Anthropic's best-value writer. Two $20/month models — which delivers more for your work?",
    badge: "New",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Multimodal", "Writing", "Coding"],
  },
  {
    href: "/compare/chatgpt-vs-meta-ai",
    title: "ChatGPT vs Meta AI",
    description:
      "The AI you pay for vs the AI already on your phone. Is Meta's free Llama 4-powered assistant good enough to replace ChatGPT?",
    badge: "New",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
    tags: ["Free", "WhatsApp", "Casual Use"],
  },
  {
    href: "/compare/perplexity-vs-chatgpt",
    title: "Perplexity vs ChatGPT",
    description:
      "AI search with cited sources vs AI chat that creates. Which tool wins for research, work, and daily questions in 2026?",
    badge: "New",
    badgeColor: "bg-parchment text-ink-muted-80 border border-hairline",
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
      <section className="bg-tile1 text-white py-20 px-4">
        <FadeIn className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 border border-white/15 rounded-pill px-4 py-1.5 text-sm font-semibold mb-6">
            <span>⚔</span> 16 Comparisons · 25+ Tools Reviewed
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 tracking-tight">
            AI Tool <span className="text-primary-on-dark">Duel</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 font-semibold mb-3">
            Find the Best AI Tool for You
          </p>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Honest, in-depth comparisons of the most popular AI tools. We cut
            through the hype so you can pick the right tool with confidence.
          </p>
          <a
            href="#comparisons"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-focus text-white font-bold px-8 py-4 rounded-pill text-lg transition-colors"
          >
            Browse Comparisons ↓
          </a>
        </FadeIn>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── TOOL QUIZ ── */}
        <section id="quiz" className="py-10 scroll-mt-20">
          <ToolQuiz />
        </section>

        {/* ── AdSense: TOP ── */}
        <AdSenseAd slot="auto" />

        {/* ── HUB PAGES ── */}
        <section className="py-10">
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StaggerItem>
              <HoverLift>
                <Link
                  href="/tools"
                  className="group flex items-center gap-4 card p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="text-3xl shrink-0">🗂️</div>
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Browse All</div>
                    <h2 className="text-base font-bold mb-1 text-ink">AI Tools Directory</h2>
                    <p className="text-ink-muted-48 text-xs">20+ tools rated and filterable.</p>
                    <span className="mt-2 inline-block text-primary text-xs font-semibold transition-colors">
                      Explore →
                    </span>
                  </div>
                </Link>
              </HoverLift>
            </StaggerItem>
            <StaggerItem>
              <HoverLift>
                <Link
                  href="/best-ai-tools"
                  className="group flex items-center gap-4 bg-primary text-white rounded-lg p-5 transition-colors hover:bg-primary-focus"
                >
                  <div className="text-3xl shrink-0">🏆</div>
                  <div>
                    <div className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-1">Top Picks</div>
                    <h2 className="text-base font-bold mb-1">Best AI Tools 2026</h2>
                    <p className="text-white/70 text-xs">Our top picks by category.</p>
                    <span className="mt-2 inline-block text-white text-xs font-semibold transition-colors">
                      See picks →
                    </span>
                  </div>
                </Link>
              </HoverLift>
            </StaggerItem>
            <StaggerItem>
              <HoverLift>
                <Link
                  href="/tools/ai-detector"
                  className="group flex items-center gap-4 card p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="text-3xl shrink-0">🔍</div>
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Free Tool</div>
                    <h2 className="text-base font-bold mb-1 text-ink">AI Text Detector</h2>
                    <p className="text-ink-muted-48 text-xs">Check if text was written by AI.</p>
                    <span className="mt-2 inline-block text-primary text-xs font-semibold transition-colors">
                      Try free →
                    </span>
                  </div>
                </Link>
              </HoverLift>
            </StaggerItem>
            <StaggerItem>
              <HoverLift>
                <Link
                  href="/tools/prompt-generator"
                  className="group flex items-center gap-4 card p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="text-3xl shrink-0">✨</div>
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Free Tool</div>
                    <h2 className="text-base font-bold mb-1 text-ink">Prompt Generator</h2>
                    <p className="text-ink-muted-48 text-xs">50+ templates for any AI tool.</p>
                    <span className="mt-2 inline-block text-primary text-xs font-semibold transition-colors">
                      Generate →
                    </span>
                  </div>
                </Link>
              </HoverLift>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* ── COMPARISONS GRID ── */}
        <section id="comparisons" className="py-12">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink mb-3">
              All Comparisons
            </h2>
            <p className="text-ink-muted-48 text-lg">
              Pick a matchup to get the full breakdown
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.04}>
            {comparisons.map((c) => (
              <StaggerItem key={c.href}>
                <HoverLift>
                  <Link
                    href={c.href}
                    className="group card p-6 hover:border-primary/30 transition-colors duration-200 block"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-pill ${c.badgeColor}`}
                      >
                        {c.badge}
                      </span>
                      <span className="text-ink-muted-48 group-hover:text-primary transition-colors text-xl">
                        →
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-primary transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-ink-muted-80 text-sm leading-relaxed mb-4">
                      {c.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {c.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-ink-muted-80 bg-parchment px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-hairline">
                      <span className="text-primary font-semibold text-sm transition-colors">
                        Compare Now →
                      </span>
                    </div>
                  </Link>
                </HoverLift>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="py-12">
          <Newsletter />
        </section>

        {/* ── WHY USE THIS SITE ── */}
        <section className="py-12 border-t border-hairline bg-parchment -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink mb-3">
              Why Use AI Tool Duel?
            </h2>
            <p className="text-ink-muted-48 text-lg max-w-2xl mx-auto">
              There&apos;s a lot of noise in the AI space. We&apos;re here to give you
              signal.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPoints.map((point) => (
              <StaggerItem key={point.title}>
                <div className="card p-6 text-center h-full">
                  <div className="text-4xl mb-3">{point.icon}</div>
                  <h3 className="font-bold text-ink mb-2">{point.title}</h3>
                  <p className="text-ink-muted-48 text-sm leading-relaxed">
                    {point.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── FEATURED PICKS ── */}
        <section className="py-12 border-t border-hairline">
          <FadeIn>
            <h2 className="text-2xl font-bold text-ink mb-6 text-center">
              Our Top Picks Right Now
            </h2>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-3 gap-6">
            <StaggerItem>
              <HoverLift className="h-full">
                <div className="card p-6 h-full">
                  <div className="text-sm font-semibold text-primary mb-2">Best for Writing</div>
                  <div className="text-2xl font-bold text-ink mb-1">Claude</div>
                  <p className="text-sm text-ink-muted-48">Beats ChatGPT for long-form writing, nuanced prose, and large document analysis.</p>
                  <Link href="/compare/chatgpt-vs-claude" className="mt-3 inline-block text-primary font-semibold text-sm hover:underline">
                    See full comparison →
                  </Link>
                </div>
              </HoverLift>
            </StaggerItem>
            <StaggerItem>
              <HoverLift className="h-full">
                <div className="card p-6 h-full">
                  <div className="text-sm font-semibold text-primary mb-2">Best for AI Images</div>
                  <div className="text-2xl font-bold text-ink mb-1">Midjourney</div>
                  <p className="text-sm text-ink-muted-48">Consistently produces the most visually stunning AI artwork of any image generator.</p>
                  <Link href="/compare/midjourney-vs-dalle" className="mt-3 inline-block text-primary font-semibold text-sm hover:underline">
                    See full comparison →
                  </Link>
                </div>
              </HoverLift>
            </StaggerItem>
            <StaggerItem>
              <HoverLift className="h-full">
                <div className="card p-6 h-full">
                  <div className="text-sm font-semibold text-primary mb-2">Best for Coding</div>
                  <div className="text-2xl font-bold text-ink mb-1">Cursor</div>
                  <p className="text-sm text-ink-muted-48">Agent mode can plan and execute multi-file changes — a step above Copilot for power users.</p>
                  <Link href="/compare/github-copilot-vs-cursor" className="mt-3 inline-block text-primary font-semibold text-sm hover:underline">
                    See full comparison →
                  </Link>
                </div>
              </HoverLift>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* ── LATEST NEWS ── */}
        {latestNews.length > 0 && (
          <section className="py-12 border-t border-hairline">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-ink">Latest AI News</h2>
              <Link href="/news" className="text-primary hover:underline font-semibold text-sm">
                All news →
              </Link>
            </div>
            <StaggerContainer className="grid sm:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <StaggerItem key={article.slug}>
                  <HoverLift>
                    <Link href={`/news/${article.slug}`} className="group card block p-5 hover:border-primary/30 transition-colors">
                      <span className="inline-block bg-parchment text-ink-muted-80 border border-hairline text-xs font-semibold px-2 py-0.5 rounded-pill mb-2">{article.badge}</span>
                      <h3 className="font-bold text-ink mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                      <p className="text-ink-muted-48 text-sm line-clamp-2">{article.summary}</p>
                      <p className="text-xs text-ink-muted-48 mt-3">{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </Link>
                  </HoverLift>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}

        {/* ── AdSense: BOTTOM ── */}
        <AdSenseAd slot="auto" />
      </div>
    </>
  );
}
