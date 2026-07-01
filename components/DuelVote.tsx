"use client";

import { useEffect, useState } from "react";

type Choice = "tool1" | "tool2";

export default function DuelVote({
  slug,
  tool1Name,
  tool2Name,
}: {
  slug: string;
  tool1Name: string;
  tool2Name: string;
}) {
  const storageKey = `duel-vote:${slug}`;
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [voted, setVoted] = useState<Choice | null>(null);
  const [counts, setCounts] = useState({ tool1: 0, tool2: 0 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "tool1" || stored === "tool2") setVoted(stored);

    fetch(`/api/vote?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        setConfigured(Boolean(data.configured));
        setCounts({ tool1: data.tool1 ?? 0, tool2: data.tool2 ?? 0 });
      })
      .catch(() => setConfigured(false))
      .finally(() => setLoading(false));
  }, [slug, storageKey]);

  const castVote = async (choice: Choice) => {
    if (submitting || voted) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, choice }),
      });
      const data = await res.json();
      if (data.configured) {
        setCounts({ tool1: data.tool1 ?? 0, tool2: data.tool2 ?? 0 });
        window.localStorage.setItem(storageKey, choice);
        setVoted(choice);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const total = counts.tool1 + counts.tool2;
  const pct1 = total > 0 ? Math.round((counts.tool1 / total) * 100) : 50;
  const pct2 = 100 - pct1;

  if (loading) return null;

  if (!configured) {
    return (
      <div className="glass-panel rounded-2xl p-5 text-center text-sm text-slate-400">
        ⚔ Community voting is coming soon for this matchup.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6">
      <p className="text-center text-xs font-semibold text-orange-400 uppercase tracking-wide mb-4">
        ⚔ Cast Your Vote — {total.toLocaleString()} vote{total === 1 ? "" : "s"} so far
      </p>

      {!voted ? (
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => castVote("tool1")}
            disabled={submitting}
            className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/25 rounded-xl py-4 px-4 text-center transition-colors disabled:opacity-60"
          >
            <span className="block text-white font-bold text-lg">{tool1Name}</span>
            <span className="text-blue-300 text-xs font-medium">Vote →</span>
          </button>
          <button
            onClick={() => castVote("tool2")}
            disabled={submitting}
            className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/25 rounded-xl py-4 px-4 text-center transition-colors disabled:opacity-60"
          >
            <span className="block text-white font-bold text-lg">{tool2Name}</span>
            <span className="text-purple-300 text-xs font-medium">Vote →</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className={`font-semibold ${voted === "tool1" ? "text-blue-300" : "text-slate-300"}`}>
                {tool1Name} {voted === "tool1" && "✓"}
              </span>
              <span className="text-slate-400">{pct1}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full transition-all duration-500" style={{ width: `${pct1}%` }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className={`font-semibold ${voted === "tool2" ? "text-purple-300" : "text-slate-300"}`}>
                {tool2Name} {voted === "tool2" && "✓"}
              </span>
              <span className="text-slate-400">{pct2}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-purple-400 rounded-full transition-all duration-500" style={{ width: `${pct2}%` }} />
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 pt-1">Thanks for voting! Results update live.</p>
        </div>
      )}
    </div>
  );
}
