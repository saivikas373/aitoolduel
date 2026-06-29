import Link from "next/link";

const navLinks = [
  { href: "/news", label: "AI News" },
  { href: "/tools", label: "Tools Directory" },
  { href: "/tools/ai-detector", label: "AI Detector" },
  { href: "/tools/prompt-generator", label: "Prompt Generator" },
  { href: "/best-ai-tools", label: "Best AI Tools" },
  { href: "/about", label: "About" },
  { href: "/compare/chatgpt-vs-claude", label: "ChatGPT vs Claude" },
  { href: "/compare/gemini-vs-chatgpt", label: "Gemini vs ChatGPT" },
  { href: "/compare/claude-vs-gemini", label: "Claude vs Gemini" },
  { href: "/compare/midjourney-vs-dalle", label: "Midjourney vs DALL-E" },
  { href: "/compare/github-copilot-vs-cursor", label: "Copilot vs Cursor" },
  { href: "/compare/cursor-vs-github-copilot", label: "Cursor vs Copilot" },
  { href: "/compare/perplexity-vs-google", label: "Perplexity vs Google" },
  { href: "/compare/chatgpt-vs-google", label: "ChatGPT vs Google" },
  { href: "/compare/canva-ai-vs-adobe-firefly", label: "Canva vs Firefly" },
  { href: "/compare/elevenlabs-vs-adobe-firefly", label: "ElevenLabs vs Firefly" },
  { href: "/compare/claude-code-vs-codex", label: "Claude Code vs Codex" },
  { href: "/compare/grok-vs-chatgpt", label: "Grok vs ChatGPT" },
  { href: "/compare/deepseek-vs-chatgpt", label: "DeepSeek vs ChatGPT" },
  { href: "/compare/claude-opus-47-vs-gpt54", label: "Claude Opus 4.7 vs GPT-5.4" },
  { href: "/compare/llama-vs-chatgpt", label: "Llama 4 vs ChatGPT" },
  { href: "/compare/gpt-4o-vs-claude-sonnet-4", label: "GPT-4o vs Claude Sonnet 4" },
  { href: "/compare/chatgpt-vs-meta-ai", label: "ChatGPT vs Meta AI" },
  { href: "/compare/perplexity-vs-chatgpt", label: "Perplexity vs ChatGPT" },
];

export default function Header() {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-orange-500 font-extrabold text-xl">⚔</span>
            <span className="font-extrabold text-lg tracking-tight">
              AI Tool <span className="text-orange-500">Duel</span>
            </span>
          </Link>

          {/* Desktop nav — scrollable if needed */}
          <nav className="hidden lg:flex items-center gap-0.5 overflow-x-auto flex-1 justify-center">
            {navLinks.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="text-slate-300 hover:text-orange-400 text-xs font-medium px-2.5 py-2 rounded-md transition-colors whitespace-nowrap"
              >
                {c.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: show key links */}
          <div className="flex lg:hidden items-center gap-3">
            <Link href="/tools" className="text-slate-300 hover:text-orange-400 text-sm font-medium transition-colors">
              Tools
            </Link>
            <Link href="/best-ai-tools" className="text-orange-400 hover:text-orange-300 text-sm font-semibold transition-colors">
              Best Tools
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
