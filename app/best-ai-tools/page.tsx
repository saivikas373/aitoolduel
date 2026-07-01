import type { Metadata } from "next";
import Link from "next/link";
import AdSenseAd from "@/components/AdSenseAd";

export const metadata: Metadata = {
  title: "Best AI Tools 2026 – Top Picks for Writing, Coding, Images & More",
  description:
    "The best AI tools in 2026 by category. Our top picks for writing, coding, image generation, and productivity — with honest pros, cons, and affiliate links.",
  openGraph: {
    title: "Best AI Tools 2026 – Top Picks for Writing, Coding, Images & More",
    description:
      "Find the best AI tools for writing, coding, image generation, and productivity in 2026. Honest recommendations with comparisons.",
    url: "https://aitoolduel.com/best-ai-tools",
    type: "article",
  },
  alternates: {
    canonical: "https://aitoolduel.com/best-ai-tools",
  },
};

interface ToolPick {
  rank: number;
  name: string;
  badge: string;
  why: string;
  url: string;
  ctaLabel: string;
  comparison?: { href: string; label: string };
  color: string;
}

interface CategorySection {
  id: string;
  heading: string;
  icon: string;
  intro: string;
  tools: ToolPick[];
}

const sections: CategorySection[] = [
  {
    id: "writing",
    heading: "Best AI Tools for Writing",
    icon: "✍️",
    intro:
      "AI writing tools have matured dramatically. The best ones don't just autocomplete — they match your voice, follow complex briefs, and produce publish-ready drafts. Here are the top three for 2026.",
    tools: [
      {
        rank: 1,
        name: "Claude",
        badge: "Best Overall",
        why: "Claude produces the most natural, nuanced long-form writing of any AI in 2026. It follows detailed style instructions, preserves your voice when editing, and handles everything from technical documentation to creative fiction with equal skill. The 200k context window means it can work with full drafts without losing earlier context.",
        url: "https://claude.ai",
        ctaLabel: "Try Claude Free",
        comparison: { href: "/compare/chatgpt-vs-claude", label: "Claude vs ChatGPT" },
        color: "bg-orange-500",
      },
      {
        rank: 2,
        name: "ChatGPT",
        badge: "Best for Versatility",
        why: "ChatGPT's GPT-4o model handles writing across formats with impressive consistency. Its plugin ecosystem, web browsing, and DALL-E integration make it the most versatile writing tool. Best for users who want writing plus research, images, and code in one interface.",
        url: "https://chat.openai.com",
        ctaLabel: "Try ChatGPT Free",
        comparison: { href: "/compare/chatgpt-vs-claude", label: "ChatGPT vs Claude" },
        color: "bg-emerald-500",
      },
      {
        rank: 3,
        name: "Jasper",
        badge: "Best for Marketing Teams",
        why: "Jasper is purpose-built for marketing content at scale. It includes brand voice settings, pre-built marketing templates, a team collaboration workspace, and deep integrations with SEO tools. More expensive than general AI tools, but the marketing-specific features justify the cost for content teams.",
        url: "https://jasper.ai",
        ctaLabel: "Try Jasper",
        color: "bg-violet-500",
      },
    ],
  },
  {
    id: "coding",
    heading: "Best AI Tools for Coding",
    icon: "⌨️",
    intro:
      "AI coding assistants are now a core part of professional development workflows. The best tools go far beyond autocomplete — they understand your entire codebase and can autonomously write, refactor, and debug complex code.",
    tools: [
      {
        rank: 1,
        name: "Cursor",
        badge: "Best for AI-Native Dev",
        why: "Cursor's Agent mode can autonomously plan and execute multi-file code changes — describe a feature, and Cursor writes it across every relevant file and presents you a diff to review. For developers doing serious feature work, this is a step-change in productivity. Built on VS Code, so all your extensions transfer instantly.",
        url: "https://cursor.sh",
        ctaLabel: "Try Cursor Free",
        comparison: { href: "/compare/cursor-vs-github-copilot", label: "Cursor vs Copilot" },
        color: "bg-slate-700",
      },
      {
        rank: 2,
        name: "GitHub Copilot",
        badge: "Best for Teams & Enterprise",
        why: "GitHub Copilot works in every major IDE — VS Code, JetBrains, Neovim, and more — making it the only AI coding tool that works across mixed-editor teams. At $10/month it's half the price of Cursor, and its GitHub integration (PR summaries, code review) adds unique value for teams using GitHub workflows.",
        url: "https://github.com/features/copilot",
        ctaLabel: "Try GitHub Copilot",
        comparison: { href: "/compare/github-copilot-vs-cursor", label: "Copilot vs Cursor" },
        color: "bg-gray-800",
      },
      {
        rank: 3,
        name: "Claude",
        badge: "Best for Complex Refactoring",
        why: "Claude's 200k context window makes it uniquely suited for large-scale refactoring and architecture questions. Paste an entire codebase, ask it to identify design problems or improve a specific pattern, and Claude maintains coherence across the full context. Best used alongside a dedicated coding IDE tool rather than as a replacement.",
        url: "https://claude.ai",
        ctaLabel: "Try Claude Free",
        comparison: { href: "/compare/chatgpt-vs-claude", label: "Claude vs ChatGPT" },
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: "image",
    heading: "Best AI Tools for Image Generation",
    icon: "🎨",
    intro:
      "AI image generation has reached a level of quality that rivals professional photography and illustration. The best tools differ not in whether they produce good images, but in what kind of images they produce best.",
    tools: [
      {
        rank: 1,
        name: "Midjourney",
        badge: "Best Image Quality",
        why: "Midjourney V6 produces the most visually striking AI images available in 2026. Its aesthetic intelligence — the way it composes, lights, and styles images — is unmatched by any competitor. Essential for concept art, hero images, book covers, and premium marketing visuals. The community and prompt library are invaluable creative resources.",
        url: "https://midjourney.com",
        ctaLabel: "Try Midjourney",
        comparison: { href: "/compare/midjourney-vs-dalle", label: "Midjourney vs DALL-E" },
        color: "bg-purple-600",
      },
      {
        rank: 2,
        name: "Adobe Firefly",
        badge: "Best for Commercial Use",
        why: "Adobe Firefly is trained exclusively on licensed and public domain content, making it the safest choice for commercial work. Deeply integrated into Photoshop, Illustrator, and Express, it's the practical choice for designers already in the Adobe ecosystem. Generative Fill and Generative Expand in Photoshop are genuinely transformative features.",
        url: "https://firefly.adobe.com",
        ctaLabel: "Try Adobe Firefly",
        color: "bg-red-600",
      },
      {
        rank: 3,
        name: "DALL-E 3",
        badge: "Best for Convenience",
        why: "DALL-E 3 is included in ChatGPT Plus at no extra cost, uses natural language prompting through a conversational interface, and excels at rendering readable text inside images. For casual users and marketers who need quick, clean visuals without learning Midjourney's parameter system, DALL-E 3's ease of use is a decisive advantage.",
        url: "https://openai.com/dall-e-3",
        ctaLabel: "Try DALL-E 3",
        comparison: { href: "/compare/midjourney-vs-dalle", label: "DALL-E vs Midjourney" },
        color: "bg-emerald-600",
      },
    ],
  },
  {
    id: "productivity",
    heading: "Best AI Tools for Productivity",
    icon: "⚡",
    intro:
      "The most impactful AI productivity tools aren't standalone chatbots — they're tools that integrate directly into your existing workflows, reducing friction and automating the administrative overhead that consumes focus time.",
    tools: [
      {
        rank: 1,
        name: "Perplexity AI",
        badge: "Best for Research",
        why: "Perplexity replaces the multi-tab research workflow with a single tool that delivers synthesized, cited answers in seconds. For knowledge workers who spend significant time researching topics, Perplexity Pro's access to multiple AI models and deeper research capabilities represent a genuine productivity multiplier. The cited sources let you verify claims without starting over.",
        url: "https://perplexity.ai",
        ctaLabel: "Try Perplexity Free",
        comparison: { href: "/compare/perplexity-vs-google", label: "Perplexity vs Google" },
        color: "bg-teal-500",
      },
      {
        rank: 2,
        name: "Notion AI",
        badge: "Best for Notes & Docs",
        why: "Notion AI lives inside your existing Notion workspace, which means zero context-switching to use it. Summarize meeting notes, draft action items, translate documents, improve writing quality, and auto-fill databases — all without leaving the tool you're already using. For teams already on Notion, the AI upgrade is a no-brainer at $10/month per seat.",
        url: "https://notion.so/product/ai",
        ctaLabel: "Try Notion AI",
        color: "bg-slate-800",
      },
      {
        rank: 3,
        name: "Otter.ai",
        badge: "Best for Meetings",
        why: "Otter.ai automatically transcribes meetings, generates summaries, extracts action items, and syncs with your calendar to join calls automatically. For professionals in back-to-back meetings, the ability to focus on the conversation rather than taking notes — and get an accurate summary immediately after — eliminates hours of manual work each week.",
        url: "https://otter.ai",
        ctaLabel: "Try Otter.ai Free",
        color: "bg-blue-400",
      },
    ],
  },
];

function ToolCard({ tool, rank }: { tool: ToolPick; rank: number }) {
  return (
    <div className="card p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="shrink-0 flex flex-col items-center gap-1">
          <div
            className={`${tool.color} w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-xl`}
          >
            {tool.name[0]}
          </div>
          <span className="text-xs font-bold text-slate-500">#{rank}</span>
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-white">{tool.name}</h3>
            <span className="text-xs font-semibold bg-orange-500/15 text-orange-300 border border-orange-400/20 px-2.5 py-0.5 rounded-full">
              {tool.badge}
            </span>
          </div>
        </div>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed mb-5">{tool.why}</p>
      <div className="flex flex-wrap gap-3">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm px-4 py-2"
        >
          {tool.ctaLabel}
        </a>
        {tool.comparison && (
          <Link
            href={tool.comparison.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-300 hover:text-orange-200 border border-orange-400/20 hover:border-orange-400/40 px-4 py-2 rounded-lg transition-colors"
          >
            {tool.comparison.label} →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function BestAiToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            Updated April 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Best AI Tools 2026
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Our top picks for writing, coding, image generation, and productivity.
            Every recommendation is based on real testing — not sponsored rankings.
          </p>
          {/* Jump links */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm font-semibold bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors"
              >
                {s.icon} {s.heading.replace("Best AI Tools for ", "")}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AdSenseAd slot="auto" />

        {sections.map((section, si) => (
          <section key={section.id} id={section.id} className="mb-16 scroll-mt-20">
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-white mb-3">
                {section.icon} {section.heading}
              </h2>
              <p className="text-slate-400 leading-relaxed">{section.intro}</p>
            </div>

            <div className="space-y-5">
              {section.tools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} rank={tool.rank} />
              ))}
            </div>

            {si === 1 && <AdSenseAd slot="auto" />}
          </section>
        ))}

        {/* Browse all tools CTA */}
        <div className="glass-panel rounded-2xl p-8 text-center text-white mt-8">
          <h2 className="text-2xl font-extrabold mb-3">
            Looking for more AI tools?
          </h2>
          <p className="text-slate-400 mb-6">
            Browse our full directory of 20+ AI tools, filterable by category.
          </p>
          <Link
            href="/tools"
            className="btn-primary"
          >
            Browse AI Tools Directory →
          </Link>
        </div>

        <AdSenseAd slot="auto" />
      </div>
    </>
  );
}
