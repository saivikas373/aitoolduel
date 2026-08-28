"use client";
import Link from "next/link";
import type { NewsArticle } from "@/lib/news";

export default function NewsArticlePage({ data }: { data: NewsArticle }) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-muted-48 mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/news" className="hover:text-primary">News</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-muted-80">{data.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block bg-parchment text-ink-muted-80 border border-hairline text-xs font-semibold px-3 py-1 rounded-pill mb-4">
          {data.badge}
        </span>
        <h1 className="text-3xl font-bold text-ink mb-4">{data.title}</h1>
        <div className="flex items-center gap-4 text-sm text-ink-muted-48">
          <span>📅 {new Date(data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span>🏷️ {data.category}</span>
        </div>
        <p className="mt-4 text-lg text-ink-muted-48 leading-relaxed">{data.summary}</p>
      </div>

      {/* Content */}
      <article className="prose max-w-none">
        {data.sections.map((section, i) => (
          <div key={i} className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">{section.h2}</h2>
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-ink-muted-80 leading-relaxed mb-4">{p}</p>
            ))}
          </div>
        ))}
      </article>

      {/* FAQs */}
      {data.faqs.length > 0 && (
        <div className="mt-12 border-t border-hairline pt-8">
          <h2 className="text-2xl font-bold text-ink mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {data.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-ink mb-2">{faq.question}</h3>
                <p className="text-ink-muted-48">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-hairline">
        <Link href="/news" className="text-primary hover:underline font-semibold">
          ← Back to AI News
        </Link>
      </div>
    </main>
  );
}
