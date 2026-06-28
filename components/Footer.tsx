import Link from "next/link";

const comparisons = [
  { href: "/compare/chatgpt-vs-claude", label: "ChatGPT vs Claude" },
  { href: "/compare/gemini-vs-chatgpt", label: "Gemini vs ChatGPT" },
  { href: "/compare/midjourney-vs-dalle", label: "Midjourney vs DALL-E 3" },
  {
    href: "/compare/github-copilot-vs-cursor",
    label: "GitHub Copilot vs Cursor",
  },
  { href: "/compare/perplexity-vs-google", label: "Perplexity vs Google" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-orange-500 font-extrabold text-xl">⚔</span>
              <span className="font-extrabold text-white text-lg">
                AI Tool <span className="text-orange-500">Duel</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Honest, in-depth comparisons of the most popular AI tools. We
              help you cut through the hype and find what actually works.
            </p>
            <p className="text-xs mt-4 text-slate-600">
              Some links on this site are affiliate links. We may earn a
              commission at no extra cost to you.
            </p>
          </div>

          {/* Comparisons */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              Comparisons
            </h3>
            <ul className="space-y-2">
              {comparisons.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm hover:text-orange-400 transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-orange-400 transition-colors">
                  AI Tools Directory
                </Link>
              </li>
              <li>
                <Link href="/best-ai-tools" className="hover:text-orange-400 transition-colors">
                  Best AI Tools 2026
                </Link>
              </li>
              <li>
                <Link href="/tools/ai-detector" className="hover:text-orange-400 transition-colors">
                  AI Text Detector
                </Link>
              </li>
              <li>
                <Link href="/tools/prompt-generator" className="hover:text-orange-400 transition-colors">
                  Prompt Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <span className="text-slate-600 text-xs">
                  Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-xs text-slate-600 text-center">
          © {new Date().getFullYear()} AIToolDuel.com · All comparisons are
          based on independent research and testing.
        </div>
      </div>
    </footer>
  );
}
