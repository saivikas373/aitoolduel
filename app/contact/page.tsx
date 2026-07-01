import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | AI Tool Duel",
  description:
    "Get in touch with the AI Tool Duel team. We welcome questions, corrections, partnership inquiries, and tool suggestions.",
  alternates: {
    canonical: "https://www.aitoolduel.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-4xl font-extrabold text-white mb-4">Contact Us</h1>
      <p className="text-lg text-slate-400 leading-relaxed mb-10">
        Have a question, spotted an error, or want to suggest a tool we should review?
        We read every message and respond within 48 hours.
      </p>

      {/* Primary contact card */}
      <div className="glass-panel rounded-2xl p-8 text-white mb-8">
        <div className="text-3xl mb-3">✉️</div>
        <h2 className="text-xl font-bold mb-1">Email Us</h2>
        <p className="text-slate-400 text-sm mb-4">
          The best way to reach us. We reply within 48 hours on business days.
        </p>
        <a
          href="mailto:hello@aitoolduel.com"
          className="btn-primary text-base"
        >
          hello@aitoolduel.com
        </a>
      </div>

      {/* What to contact for */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">What to Reach Out About</h2>

        <div className="card p-5 flex gap-4">
          <span className="text-2xl shrink-0">🤝</span>
          <div>
            <h3 className="font-bold text-white mb-1">Partnerships &amp; Sponsorships</h3>
            <p className="text-sm text-slate-400">
              Interested in advertising on AI Tool Duel or exploring a content
              partnership? Email us with details about your company and what you have in
              mind. Note: editorial coverage and comparison ratings are never for sale —
              only clearly disclosed advertising placements.
            </p>
          </div>
        </div>

        <div className="card p-5 flex gap-4">
          <span className="text-2xl shrink-0">🔧</span>
          <div>
            <h3 className="font-bold text-white mb-1">Corrections &amp; Updates</h3>
            <p className="text-sm text-slate-400">
              AI tools update constantly and we work hard to keep our comparisons
              current. If you've spotted outdated pricing, an incorrect feature
              description, or any factual error, please let us know. We take accuracy
              seriously and will investigate and correct any genuine mistakes promptly.
            </p>
          </div>
        </div>

        <div className="card p-5 flex gap-4">
          <span className="text-2xl shrink-0">💡</span>
          <div>
            <h3 className="font-bold text-white mb-1">Tool Suggestions</h3>
            <p className="text-sm text-slate-400">
              Know an AI tool we haven't covered yet? Want us to compare two specific
              tools head-to-head? We actively expand our comparison library based on
              reader interest. Send us the tools you'd like to see reviewed and we'll
              add them to our queue.
            </p>
          </div>
        </div>

        <div className="card p-5 flex gap-4">
          <span className="text-2xl shrink-0">❓</span>
          <div>
            <h3 className="font-bold text-white mb-1">General Questions</h3>
            <p className="text-sm text-slate-400">
              Not sure which AI tool is right for your specific situation? Have a
              question about one of our comparisons or free tools? Reach out — we're
              happy to help point you in the right direction.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-slate-400 card p-5">
        <p>📬 We aim to reply to all messages within <strong className="text-slate-200">48 hours</strong> on business days.</p>
        <p className="mt-1">For privacy-related requests, please see our <a href="/privacy-policy" className="text-orange-400 hover:underline">Privacy Policy</a>.</p>
      </div>
    </div>
  );
}
