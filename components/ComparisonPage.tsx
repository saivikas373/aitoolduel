import Link from "next/link";
import AdSenseAd from "./AdSenseAd";
import StarRating from "./StarRating";
import DuelVote from "./DuelVote";
import GithubStars from "./GithubStars";
import { FadeIn, HoverLift } from "./motion";
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
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-2 shadow-hero p-2"
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
        <span className="text-ink text-2xl sm:text-3xl font-bold">
          {name.charAt(0)}
        </span>
      )}
    </div>
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
    <tr className={striped ? "bg-parchment" : "bg-canvas"}>
      <td className="py-3 px-4 text-sm font-semibold text-ink-muted-48 w-32 sm:w-40">
        {label}
      </td>
      <td className="py-3 px-4 text-sm text-ink">{val1}</td>
      <td className="py-3 px-4 text-sm text-ink">{val2}</td>
    </tr>
  );
}

export default function ComparisonPage({ data }: { data: ComparisonData }) {
  const { tool1, tool2 } = data;

  const verdictColors: Record<string, string> = {
    tool1: "bg-white/10 text-white border-white/20",
    tool2: "bg-white/10 text-white border-white/20",
    tie: "bg-white/10 text-white border-white/20",
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
      <section className="bg-tile1 text-white py-14">
        <FadeIn className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-8 mb-6">
            <div className="text-center">
              <ToolAvatar name={tool1.name} />
              <span className="text-xl sm:text-3xl font-bold">{tool1.name}</span>
              <p className="text-white/50 text-xs mt-1 hidden sm:block">{tool1.tagline}</p>
              <div className="mt-2 flex justify-center"><GithubStars toolName={tool1.name} dark /></div>
            </div>
            <span className="text-primary-on-dark font-bold text-3xl sm:text-5xl shrink-0">VS</span>
            <div className="text-center">
              <ToolAvatar name={tool2.name} />
              <span className="text-xl sm:text-3xl font-bold">{tool2.name}</span>
              <p className="text-white/50 text-xs mt-1 hidden sm:block">{tool2.tagline}</p>
              <div className="mt-2 flex justify-center"><GithubStars toolName={tool2.name} dark /></div>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white/90 mb-4 leading-tight">
            {data.h1}
          </h1>

          <span
            className={`inline-block border text-sm font-semibold px-4 py-1.5 rounded-full ${verdictColors[data.verdictWinner]}`}
          >
            Our Verdict: {data.verdict}
          </span>
        </FadeIn>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── VOTE ── */}
        <div className="mb-10">
          <DuelVote slug={data.slug} tool1Name={tool1.name} tool2Name={tool2.name} />
        </div>

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
          <div className="overflow-x-auto rounded-lg border border-hairline bg-canvas">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-parchment text-ink">
                  <th className="py-3 px-4 text-sm font-semibold w-32 sm:w-40">Feature</th>
                  <th className="py-3 px-4 text-sm font-semibold">{tool1.name}</th>
                  <th className="py-3 px-4 text-sm font-semibold">{tool2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
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
                  val1={<StarRating rating={tool1.rating} size="lg" />}
                  val2={<StarRating rating={tool2.rating} size="lg" />}
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
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ink-muted-48"></span>
                {tool1.name}
              </h3>
              <div className="mb-4">
                <p className="text-xs font-semibold text-success uppercase tracking-wide mb-2">Pros</p>
                <ul className="space-y-1.5">
                  {tool1.pros.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-ink-muted-80">
                      <span className="text-success shrink-0 mt-0.5">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-danger uppercase tracking-wide mb-2">Cons</p>
                <ul className="space-y-1.5">
                  {tool1.cons.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-ink-muted-80">
                      <span className="text-danger shrink-0 mt-0.5">✗</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tool 2 */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ink-muted-48"></span>
                {tool2.name}
              </h3>
              <div className="mb-4">
                <p className="text-xs font-semibold text-success uppercase tracking-wide mb-2">Pros</p>
                <ul className="space-y-1.5">
                  {tool2.pros.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-ink-muted-80">
                      <span className="text-success shrink-0 mt-0.5">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-danger uppercase tracking-wide mb-2">Cons</p>
                <ul className="space-y-1.5">
                  {tool2.cons.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-ink-muted-80">
                      <span className="text-danger shrink-0 mt-0.5">✗</span>
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
            <div className="card p-6">
              <h3 className="font-bold text-ink mb-3">{data.pickTool1.heading}</h3>
              <ul className="space-y-2">
                {data.pickTool1.reasons.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-ink-muted-80">
                    <span className="text-primary shrink-0 mt-0.5">→</span>
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

            <div className="card p-6">
              <h3 className="font-bold text-ink mb-3">{data.pickTool2.heading}</h3>
              <ul className="space-y-2">
                {data.pickTool2.reasons.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-ink-muted-80">
                    <span className="text-primary shrink-0 mt-0.5">→</span>
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

          <div className="bg-parchment border border-hairline rounded-lg p-6">
            <h3 className="font-semibold text-ink-muted-80 mb-2 text-sm uppercase tracking-wide">
              Bottom Line
            </h3>
            <p className="text-ink-muted-80 text-sm leading-relaxed">{data.recommendationSummary}</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-10">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <div key={i} className="card p-6">
                <h3 className="font-semibold text-ink mb-2 text-base">
                  {faq.question}
                </h3>
                <p className="text-ink-muted-80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── AdSense: BOTTOM ── */}
        <AdSenseAd slot="auto" />

        {/* ── BACK LINK ── */}
        <div className="text-center mt-8">
          <Link href="/" className="text-primary hover:underline font-semibold text-sm transition-colors">
            ← See all AI tool comparisons
          </Link>
        </div>
      </div>
    </article>
  );
}
