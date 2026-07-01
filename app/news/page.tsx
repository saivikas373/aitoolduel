import type { Metadata } from "next";
import Link from "next/link";
import { getLatestArticles } from "@/lib/news";

export const metadata: Metadata = {
  title: "AI News 2026 – Latest AI Tool Updates & Releases | AI Tool Duel",
  description: "Stay up to date with the latest AI tool news, model releases, and industry updates. Fresh AI news published weekly.",
  alternates: { canonical: "https://www.aitoolduel.com/news" },
};

export default function NewsPage() {
  const articles = getLatestArticles(20);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">AI News & Updates</h1>
        <p className="text-lg text-slate-400">The latest AI tool releases, model updates, and industry news — updated weekly.</p>
      </div>

      {articles.length === 0 ? (
        <p className="text-slate-400">No articles yet. Check back soon!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="card block p-6 hover:border-orange-400/30 transition-all">
              <span className="inline-block bg-blue-500/15 text-blue-300 border border-blue-400/20 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                {article.badge}
              </span>
              <h2 className="text-xl font-bold text-white mb-2">{article.title}</h2>
              <p className="text-slate-400 text-sm mb-4 line-clamp-3">{article.summary}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{article.category}</span>
                <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
