import type { Metadata } from "next";
import Link from "next/link";
import ToolsDirectory from "@/components/ToolsDirectory";
import AdSenseAd from "@/components/AdSenseAd";

export const metadata: Metadata = {
  title: "AI Tools Directory 2026 – Browse 20+ Top AI Tools",
  description:
    "Browse our directory of 20+ top AI tools for writing, coding, image generation, search, video, and productivity. Compare ratings, pricing, and find the right AI tool for you.",
  openGraph: {
    title: "AI Tools Directory 2026 – Browse 20+ Top AI Tools",
    description:
      "Browse and compare 20+ top AI tools by category. Find the best AI tool for writing, coding, images, search, and productivity.",
    url: "https://aitoolduel.com/tools",
    type: "website",
  },
  alternates: {
    canonical: "https://aitoolduel.com/tools",
  },
};

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-tile1 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 border border-white/15 rounded-pill px-4 py-1.5 text-sm font-semibold mb-5">
            20+ Tools Reviewed
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            AI Tools Directory
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Every major AI tool in one place — rated, categorized, and linked to
            head-to-head comparisons so you can pick with confidence.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AdSenseAd slot="auto" />
        <div className="mb-8 card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="text-4xl">🤖</div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Free Tool</div>
            <h2 className="text-ink font-bold text-lg mb-1">AI Text Detector</h2>
            <p className="text-ink-muted-48 text-sm">Check if text was written by ChatGPT or Claude. Instant, free, no signup.</p>
          </div>
          <Link href="/tools/ai-detector" className="shrink-0 btn-primary text-sm px-5 py-2.5">
            Try Free →
          </Link>
        </div>
        <ToolsDirectory />
        <AdSenseAd slot="auto" />
      </div>
    </>
  );
}
