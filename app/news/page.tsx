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
        <h1 className="text-4xl font-bold text-gray-900 mb-3">AI News & Updates</h1>
        <p className="text-lg text-gray-600">The latest AI tool releases, model updates, and industry news — updated weekly.</p>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles yet. Check back soon!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="block border rounded-xl p-6 hover:shadow-md transition-shadow">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                {article.badge}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.summary}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
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
