import Link from "next/link";
import AdSenseAd from "./AdSenseAd";
import type { ComparisonData } from "@/lib/comparisons";

/* ── Brand favicon domains (Google favicon service) ─────────────────── */
const FAVICON_DOMAINS: Record<string, string> = {
  chatgpt:          "chat.openai.com",
  claude:           "claude.ai",
  gemini:           "gemini.google.com",
  midjourney:       "midjourney.com",
  dalle:            "openai.com",
  githubcopilot:    "github.com",
  microsoftcopilot: "copilot.microsoft.com",
  cursor:           "cursor.sh",
  perplexity:       "perplexity.ai",
  google:           "google.com",
  grok:             "grok.com",
  deepseek:         "deepseek.com",
  llama:            "meta.ai",
  canva:            "canva.com",
  firefly:          "firefly.adobe.com",
  elevenlabs:       "elevenlabs.io",
  codex:            "openai.com",
  metaai:           "meta.ai",
};

/** Map a tool's display name to a favicon domain key */
function getFaviconDomain(toolName: string): string {
  const n = toolName.toLowerCase();
  if (n.includes("claude"))                         return FAVICON_DOMAINS.claude;
  if (n.includes("gemini"))                         return FAVICON_DOMAINS.gemini;
  if (n.includes("midjourney"))                     return FAVICON_DOMAINS.midjourney;
  if (n.includes("dall"))                           return FAVICON_DOMAINS.dalle;
  if (n.includes("github copilot"))                 return FAVICON_DOMAINS.githubcopilot;
  if (n.includes("microsoft copilot"))              return FAVICON_DOMAINS.microsoftcopilot;
  if (n.includes("cursor"))                         return FAVICON_DOMAINS.cursor;
  if (n.includes("perplexity"))                     return FAVICON_DOMAINS.perplexity;
  if (n.includes("google"))                         return FAVICON_DOMAINS.google;
  if (n.includes("grok"))                           return FAVICON_DOMAINS.grok;
  if (n.includes("deepseek"))                       return FAVICON_DOMAINS.deepseek;
  if (n.includes("meta ai"))                        return FAVICON_DOMAINS.metaai;
  if (n.includes("llama") || n.includes("meta"))   return FAVICON_DOMAINS.llama;
  if (n.includes("canva"))                          return FAVICON_DOMAINS.canva;
  if (n.includes("firefly") || n.includes("adobe")) return FAVICON_DOMAINS.firefly;
  if (n.includes("elevenlabs"))                     return FAVICON_DOMAINS.elevenlabs;
  if (n.includes("codex"))                          return FAVICON_DOMAINS.codex;
  // ChatGPT / GPT-x / OpenAI last so "github copilot" doesn't match "gpt"
  if (n.includes("chatgpt") || n.includes("gpt") || n.includes("openai")) return FAVICON_DOMAINS.chatgpt;
  return "";
}

function ToolAvatar({ name }: { name: string }) {
  const domain = getFaviconDomain(name);
  return (
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-2 shadow-lg p-2"
      aria-label={`${name} logo`}
    >
      {domain ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt={`${name} logo`}
          width={40}
          height={40}
          style={{ borderRadius: "4px", objectFit: "contain" }}
        />
      ) : (
        <span className="text-slate-800 text-2xl sm:text-3xl font-extrabold">
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f-${i}`} className="text-orange-400 text-lg">★</span>
      ))}
      {hasHalf && <span className="text-orange-300 text-lg">★</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e-${i}`} className="text-slate-300 text-lg">★</span>
      ))}
      <span className="ml-1 text-sm font-semibold text-slate-700">{rating}/5</span>
    </span>
  );
}

function TableRow({
  label,
  val1,
  val2,
  striped,
}: {
  label: string;
  val1: React.ReactNode;
  val2: React.ReactNode;
  striped: boolean;
}) {
  return (
    <tr className={striped ? "bg-slate-50" : "bg-white"}>
      <td className="py-3 px-4 text-sm font-semibold text-slate-600 w-32 sm:w-40">
        {label}
      </td>
      <td className="py-3 px-4 text-sm text-slate-800">{val1}</td>
      <td className="py-3 px-4 text-sm text-slate-800">{val2}</td>
    </tr>
  );
}

export default function ComparisonPage({ data }: { data: ComparisonData }) {
  const { tool1, tool2 } = data;

  const verdictColors: Record<string, string> = {
    tool1: "bg-blue-100 text-blue-800 border-blue-200",
    tool2: "bg-purple-100 text-purple-800 border-purple-200",
    tie: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.metaTitle,
    description: data.metaDescription,
    author: {
      "@type": "Organization",
      name: "AI Tool Duel",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Tool Duel",
      url: "https://www.aitoolduel.com",
    },
    datePublished: "2026-04-02",
    dateModified: "2026-04-08",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.slice(0, 3).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── AdSense: TOP ── */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <AdSenseAd slot="auto" />
      </div>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-8 mb-6">
            <div className="text-center">
              <ToolAvatar name={tool1.name} />
              <span className="text-xl sm:text-3xl font-extrabold">{tool1.name}</span>
              <p className="text-slate-400 text-xs mt-1 hidden sm:block">{tool1.tagline}</p>
            </div>
            <span className="text-orange-500 font-black text-3xl sm:text-5xl shrink-0">VS</span>
            <div className="text-center">
              <ToolAvatar name={tool2.name} />
              <span className="text-xl sm:text-3xl font-extrabold">{tool2.name}</span>
              <p className="text-slate-400 text-xs mt-1 hidden sm:block">{tool2.tagline}</p>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-200 mb-4 leading-tight">
            {data.h1}
          </h1>

          <span
            className={`inline-block border text-sm font-semibold px-4 py-1.5 rounded-full ${verdictColors[data.verdictWinner]}`}
          >
            Our Verdict: {data.verdict}
          </span>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── INTRO ── */}
        {data.introSections.map((section) => (
          <section key={section.h2} className="mb-8 prose-content">
            <h2>{section.h2}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}

        {/* ── COMPARISON TABLE ── */}
        <section className="mb-10">
          <h2 className="section-heading">Quick Comparison: {tool1.name} vs {tool2.name}</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-3 px-4 text-sm font-semibold w-32 sm:w-40">Feature</th>
                  <th className="py-3 px-4 text-sm font-semibold">{tool1.name}</th>
                  <th className="py-3 px-4 text-sm font-semibold">{tool2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <TableRow
                  label="Pricing"
                  val1={tool1.pricing}
                  val2={tool2.pricing}
                  striped={false}
                />
                <TableRow
                  label="Free Tier"
                  val1={tool1.freeTier}
                  val2={tool2.freeTier}
                  striped={true}
                />
                <TableRow
                  label="Speed"
                  val1={tool1.speed}
                  val2={tool2.speed}
                  striped={false}
                />
                <TableRow
                  label="Best For"
                  val1={tool1.bestFor}
                  val2={tool2.bestFor}
                  striped={true}
                />
                <TableRow
                  label="Rating"
                  val1={<StarRating rating={tool1.rating} />}
                  val2={<StarRating rating={tool2.rating} />}
                  striped={false}
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* ── PROS & CONS ── */}
        <section className="mb-10">
          <h2 className="section-heading">Pros & Cons</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Tool 1 */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {tool1.name}
              </h3>
              <div className="mb-4">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Pros</p>
                <ul className="space-y-1.5">
                  {tool1.pros.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Cons</p>
                <ul className="space-y-1.5">
                  {tool1.cons.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tool 2 */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                {tool2.name}
              </h3>
              <div className="mb-4">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Pros</p>
                <ul className="space-y-1.5">
                  {tool2.pros.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Cons</p>
                <ul className="space-y-1.5">
                  {tool2.cons.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── AdSense: MID ── */}
        <AdSenseAd slot="auto" />

        {/* ── DEEP DIVE SECTIONS ── */}
        <div className="prose-content mb-10">
          {data.deepDiveSections.map((section) => (
            <section key={section.h2}>
              <h2>{section.h2}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        {/* ── WHICH SHOULD YOU PICK ── */}
        <section className="mb-10">
          <h2 className="section-heading">Which Should You Pick?</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-3">{data.pickTool1.heading}</h3>
              <ul className="space-y-2">
                {data.pickTool1.reasons.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-blue-800">
                    <span className="text-blue-500 shrink-0 mt-0.5">→</span>
                    {r}
                  </li>
                ))}
              </ul>
              <Link
                href={tool1.ctaUrl}
                className="mt-5 block w-full text-center btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tool1.ctaLabel}
              </Link>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="font-bold text-purple-900 mb-3">{data.pickTool2.heading}</h3>
              <ul className="space-y-2">
                {data.pickTool2.reasons.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-purple-800">
                    <span className="text-purple-500 shrink-0 mt-0.5">→</span>
                    {r}
                  </li>
                ))}
              </ul>
              <Link
                href={tool2.ctaUrl}
                className="mt-5 block w-full text-center btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tool2.ctaLabel}
              </Link>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="font-semibold text-orange-900 mb-2 text-sm uppercase tracking-wide">
              Bottom Line
            </h3>
            <p className="text-slate-800 text-sm leading-relaxed">{data.recommendationSummary}</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-10">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <div key={i} className="card p-6">
                <h3 className="font-semibold text-slate-900 mb-2 text-base">
                  {faq.question}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── AdSense: BOTTOM ── */}
        <AdSenseAd slot="auto" />

        {/* ── BACK LINK ── */}
        <div className="text-center mt-8">
          <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors">
            ← See all AI tool comparisons
          </Link>
        </div>
      </div>
    </article>
  );
}
