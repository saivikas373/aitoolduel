"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tools, allCategories, categoryColors, type ToolCategory } from "@/lib/tools";

const FREE_TOOLS = [
  {
    slug: "ai-detector",
    name: "AI Text Detector",
    tagline: "Check if text was written by ChatGPT, Claude, or AI. Instant, free, no signup.",
    href: "/tools/ai-detector",
    icon: "🔍",
    color: "bg-slate-700",
    badge: "Free Tool",
  },
  {
    slug: "prompt-generator",
    name: "AI Prompt Generator",
    tagline: "Generate expert prompts for ChatGPT, Claude, Gemini & Midjourney. 50+ templates.",
    href: "/tools/prompt-generator",
    icon: "✨",
    color: "bg-purple-600",
    badge: "Free Tool",
  },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="text-orange-400 text-sm">★</span>
      ))}
      {hasHalf && <span className="text-orange-300 text-sm">★</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="text-slate-600 text-sm">★</span>
      ))}
      <span className="ml-1 text-xs font-semibold text-slate-300">{rating}</span>
    </span>
  );
}

export default function ToolsDirectory() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "All">("All");

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchesSearch =
        query === "" ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.tagline.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div>
      {/* Search + Filter */}
      <div className="mb-8 space-y-4">
        <input
          type="search"
          placeholder="Search AI tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="glass-input w-full px-4 py-3 text-sm"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeCategory === "All"
                ? "bg-orange-500 text-white"
                : "bg-white/8 text-slate-300 hover:bg-white/15"
            }`}
          >
            All ({tools.length})
          </button>
          {allCategories.map((cat) => {
            const count = tools.filter((t) => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-white/8 text-slate-300 hover:bg-white/15"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Free Tools */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">Free Tools</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {FREE_TOOLS.map((t) => (
            <Link
              key={t.slug}
              href={t.href}
              className="flex items-center gap-4 card p-4 hover:border-orange-400/30 transition-all group"
            >
              <div className={`${t.color} w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0`}>
                {t.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{t.name}</span>
                  <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">{t.badge}</span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5 leading-snug">{t.tagline}</p>
              </div>
              <span className="text-orange-400 ml-auto shrink-0 group-hover:text-orange-300">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-400 mb-6">
        Showing <span className="font-semibold text-slate-200">{filtered.length}</span> tools
        {activeCategory !== "All" && ` in ${activeCategory}`}
        {query && ` matching "${query}"`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          No tools found. Try a different search or category.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((tool) => (
            <div
              key={tool.slug}
              className="card hover:border-orange-400/30 transition-all duration-200 flex flex-col"
            >
              {/* Card header */}
              <div className="p-5 flex-1">
                <div className="flex items-start gap-3 mb-3">
                  {/* Logo placeholder */}
                  <div
                    className={`${tool.color} w-10 h-10 rounded-lg flex items-center justify-center text-white font-extrabold text-lg shrink-0`}
                  >
                    {tool.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-base leading-tight">
                      {tool.name}
                    </h3>
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${categoryColors[tool.category]}`}
                    >
                      {tool.category}
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                  {tool.tagline}
                </p>

                <StarRating rating={tool.rating} />
              </div>

              {/* Card footer */}
              <div className="px-5 pb-5 space-y-2">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-sm py-2"
                >
                  {tool.ctaLabel}
                </a>

                {tool.comparisons.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tool.comparisons.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="text-xs text-orange-300 hover:text-orange-200 hover:underline transition-colors"
                      >
                        See {c.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
