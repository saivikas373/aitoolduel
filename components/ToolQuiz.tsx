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
    <div className="glass-panel rounded-2xl p-6 sm:p-8">
      {!category ? (
        <>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-orange-500/15 text-orange-300 border border-orange-400/20 rounded-full px-3 py-1 text-xs font-semibold mb-3">
              ⚔ 30-Second Quiz
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Which AI Tool Is Right For You?
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Pick what you need AI for and we&apos;ll match you with our top-rated pick.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.category}
                onClick={() => setCategory(opt.category)}
                className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-400/40 rounded-xl py-5 px-3 transition-all"
              >
                <span className="text-3xl">{opt.icon}</span>
                <span className="text-sm font-semibold text-slate-200 text-center">{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-1">
                Your match for {CATEGORY_OPTIONS.find((o) => o.category === category)?.label}
              </p>
              <h2 className="text-2xl font-extrabold text-white">Here&apos;s our top pick</h2>
            </div>
            <button
              onClick={() => setCategory(null)}
              className="text-sm font-semibold text-slate-400 hover:text-orange-400 transition-colors whitespace-nowrap"
            >
              ↻ Try again
            </button>
          </div>

          {topPick && (
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-400/20 rounded-xl p-6 mb-4">
              <div className="flex items-start gap-4">
                <div className={`${topPick.color} w-14 h-14 rounded-xl flex items-center justify-center text-white font-extrabold text-2xl shrink-0`}>
                  {topPick.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-xl font-bold text-white">{topPick.name}</h3>
                    <StarRating rating={topPick.rating} />
                  </div>
                  <p className="text-slate-300 text-sm mb-4">{topPick.tagline}</p>
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
                      <span className="font-semibold text-white text-sm">{t.name}</span>
                      <StarRating rating={t.rating} />
                    </div>
                    <p className="text-slate-400 text-xs truncate">{t.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-5">
            <Link href="/tools" className="text-orange-400 hover:text-orange-300 font-medium text-sm">
              Browse all {category} tools →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
