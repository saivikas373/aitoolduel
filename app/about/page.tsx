import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About AI Tool Duel | Our Mission",
  description:
    "AI Tool Duel is an independent AI tool review site. Learn about our mission to help people choose the right AI tools through honest, unbiased comparisons.",
  alternates: {
    canonical: "https://www.aitoolduel.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">

      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-orange-500/15 text-orange-300 border border-orange-400/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
          Independent · Unbiased · Founded 2026
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-4">
          About AI Tool Duel
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          We test, compare, and review AI tools so you can make confident decisions — without wading through hype, paid placements, or vague "it depends" answers.
        </p>
      </div>

      <div className="space-y-10 text-slate-300 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Who We Are</h2>
          <p>
            AI Tool Duel is an independent AI tool review and comparison website founded in
            2026. We are a small, dedicated team of writers, researchers, and technology
            enthusiasts who spend our days testing AI tools across dozens of real-world
            tasks — writing, coding, image generation, research, productivity, and more.
          </p>
          <p className="mt-3">
            We are not affiliated with any AI company. We don't accept payment for
            editorial coverage, and our comparison verdicts are never influenced by
            advertising relationships. When we say one tool beats another, it's because
            our testing showed it — not because someone paid us to say so.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
          <p>
            The AI tools landscape is moving faster than any individual can track. New
            models launch weekly, pricing changes constantly, and the marketing from AI
            companies is — understandably — optimistic to a fault. Cutting through that
            noise to find the tool that actually solves your specific problem is harder
            than it should be.
          </p>
          <p className="mt-3">
            Our mission is simple: <strong>help people choose the right AI tools through
            honest, practical comparisons.</strong> We believe the best way to do that is
            to test tools ourselves, present the data clearly, and give you a direct
            recommendation — while being transparent about the trade-offs. We won't
            tell you "both tools are great, it depends on your use case" and leave you
            where you started. We'll tell you which one wins, and why.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">What We Do</h2>
          <p>
            For each comparison on AI Tool Duel, we put both tools through a structured
            evaluation covering the scenarios that matter most to real users: writing
            quality, coding capability, accuracy, speed, ease of use, context handling,
            and value for money. We document our findings in detailed side-by-side
            breakdowns with comparison tables, pros and cons, and clear pick guides for
            different types of users.
          </p>
          <p className="mt-3">
            Beyond comparisons, we build free tools — like our AI Text Detector and AI
            Prompt Generator — to help you get more out of AI tools once you've chosen
            one. Everything on the site is free to use with no account required.
          </p>
          <p className="mt-3">
            We keep our reviews up to date. AI tools change rapidly — new model versions,
            pricing updates, and feature launches happen constantly. We revisit
            comparisons regularly to make sure the guidance we give reflects how the
            tools actually perform today, not six months ago.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Why Trust Us</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500 font-bold shrink-0 mt-0.5">✓</span>
              <span><strong>No paid placements.</strong> We don't accept money to feature or rank any tool. Our recommendations are earned, not bought.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 font-bold shrink-0 mt-0.5">✓</span>
              <span><strong>Hands-on testing.</strong> Every comparison reflects real usage across dozens of tasks, not just a summary of marketing materials.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 font-bold shrink-0 mt-0.5">✓</span>
              <span><strong>Transparent affiliate relationships.</strong> Some links on the site are affiliate links — we earn a small commission if you sign up through them, at no cost to you. This is disclosed clearly, and it never affects our ratings or verdicts.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 font-bold shrink-0 mt-0.5">✓</span>
              <span><strong>Clear verdicts.</strong> We give you a direct answer. No endless "it depends" hedging — we tell you which tool wins for which user, with reasons.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 font-bold shrink-0 mt-0.5">✓</span>
              <span><strong>Kept current.</strong> We update comparisons when tools change significantly — so you're always reading current information.</span>
            </li>
          </ul>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-bold text-white mb-3">Get in Touch</h2>
          <p>
            Have a question, spotted something incorrect, or want to suggest a
            comparison we haven't covered yet? We'd love to hear from you.
          </p>
          <p className="mt-3">
            Email us at{" "}
            <a
              href="mailto:hello@aitoolduel.com"
              className="text-orange-400 hover:text-orange-300 font-semibold"
            >
              hello@aitoolduel.com
            </a>{" "}
            — we respond to all messages within 48 hours.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/compare/chatgpt-vs-claude"
              className="btn-primary text-sm px-4 py-2"
            >
              Browse Comparisons →
            </Link>
            <Link
              href="/contact"
              className="btn-secondary text-sm px-4 py-2"
            >
              Contact Us
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
