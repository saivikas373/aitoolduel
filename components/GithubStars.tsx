"use client";

import { useEffect, useState } from "react";

// Free, keyless GitHub REST API — only shows a badge for tools we can
// confidently map to their real open-source repo. Fetch failures (wrong
// repo path, 404, rate limit) just render nothing rather than guessing.
const REPO_MAP: Record<string, string> = {
  "stable diffusion": "Stability-AI/stablediffusion",
  "llama": "meta-llama/llama-models",
  "mistral": "mistralai/mistral-inference",
  "deepseek": "deepseek-ai/DeepSeek-V3",
};

function findRepo(name: string): string | null {
  const key = Object.keys(REPO_MAP).find((k) => name.toLowerCase().includes(k));
  return key ? REPO_MAP[key] : null;
}

export default function GithubStars({ toolName }: { toolName: string }) {
  const repo = findRepo(toolName);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (!repo) return;
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && typeof data?.stargazers_count === "number") setStars(data.stargazers_count);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [repo]);

  if (!repo || stars === null) return null;

  const formatted = stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : String(stars);

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full px-2.5 py-1 transition-colors"
    >
      <span className="text-yellow-400">★</span> {formatted} on GitHub
    </a>
  );
}
