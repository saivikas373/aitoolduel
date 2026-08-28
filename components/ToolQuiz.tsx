"use client";

import { useState } from "react";
import Link from "next/link";
import StarRating from "./StarRating";
import { tools, type ToolCategory } from "@/lib/tools";

const CATEGORY_OPTIONS: { category: ToolCategory; label: string; icon: string }[] = [
  { category: "Writing", label: "Writing & Chat", icon: "✍️" },
  { category: "Coding", label: "Coding", icon: "⌨️" },
  { category: "Image", label: "Images & Art", icon: "🎨" },
  { category: "Video", label: "Video", icon: "🎬" },
  { category: "Audio", label: "Audio & Voice", icon: "🎙️" },
  { category: "Search", label: "Search & Research", icon: "🔍" },
  { category: "Productivity", label: "Productivity", icon: "⚡" },
  { category: "Design", label: "Design", icon: "🖌️" },
];

export default function ToolQuiz() {
  const [category, setCategory] = useState<ToolCategory | null>(null);

  const matches = category
    ? [...tools].filter((t) => t.category === category).sort((a, b) => b.rating - a.rating)
    : [];
  const topPick = matches[0];
  const runnerUps = matches.slice(1, 3);

  return (
    <div className="glass-panel rounded-lg p-6 sm:p-8">
      {!category ? (
        <>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-canvas text-ink-muted-80 border border-hairline rounded-pill px-3 py-1 text-xs font-semibold mb-3">
              ⚔ 30-Second Quiz
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-2">
              Which AI Tool Is Right For You?
            </h2>
            <p className="text-ink-muted-48 max-w-md mx-auto">
              Pick what you need AI for and we&apos;ll match you with our top-rated pick.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.category}
                onClick={() => setCategory(opt.category)}
                className="flex flex-col items-center gap-2 bg-canvas hover:bg-parchment border border-hairline hover:border-primary/40 rounded-lg py-5 px-3 transition-all"
              >
                <span className="text-3xl">{opt.icon}</span>
                <span className="text-sm font-semibold text-ink text-center">{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                Your match for {CATEGORY_OPTIONS.find((o) => o.category === category)?.label}
              </p>
              <h2 className="text-2xl font-bold text-ink">Here&apos;s our top pick</h2>
            </div>
            <button
              onClick={() => setCategory(null)}
              className="text-sm font-semibold text-ink-muted-48 hover:text-primary transition-colors whitespace-nowrap"
            >
              ↻ Try again
            </button>
          </div>

          {topPick && (
            <div className="bg-parchment border border-hairline rounded-lg p-6 mb-4">
              <div className="flex items-start gap-4">
                <div className={`${topPick.color} w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-2xl shrink-0`}>
                  {topPick.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-xl font-bold text-ink">{topPick.name}</h3>
                    <StarRating rating={topPick.rating} />
                  </div>
                  <p className="text-ink-muted-80 text-sm mb-4">{topPick.tagline}</p>
                  <div className="flex flex-wrap gap-3">
                    <a href={topPick.url} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-4 py-2">
                      {topPick.ctaLabel}
                    </a>
                    {topPick.comparisons.slice(0, 1).map((c) => (
                      <Link key={c.href} href={c.href} className="btn-secondary text-sm px-4 py-2">
                        See {c.label} →
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {runnerUps.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {runnerUps.map((t) => (
                <div key={t.slug} className="card p-4 flex items-center gap-3">
                  <div className={`${t.color} w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {t.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink text-sm">{t.name}</span>
                      <StarRating rating={t.rating} />
                    </div>
                    <p className="text-ink-muted-48 text-xs truncate">{t.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-5">
            <Link href="/tools" className="text-primary hover:underline font-semibold text-sm">
              Browse all {category} tools →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
