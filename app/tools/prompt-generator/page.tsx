import type { Metadata } from "next";
import PromptGenerator from "@/components/PromptGenerator";

export const metadata: Metadata = {
  title: "Free AI Prompt Generator — ChatGPT, Claude & Gemini Prompts",
  description:
    "Generate perfect AI prompts instantly. Free prompt generator for ChatGPT, Claude, Gemini and more. No signup needed.",
  openGraph: {
    title: "Free AI Prompt Generator — ChatGPT, Claude & Gemini Prompts",
    description:
      "Generate perfect AI prompts instantly. Free prompt generator for ChatGPT, Claude, Gemini and more. No signup needed.",
    url: "https://www.aitoolduel.com/tools/prompt-generator",
    type: "article",
  },
  alternates: {
    canonical: "https://www.aitoolduel.com/tools/prompt-generator",
  },
};

export default function PromptGeneratorPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            100% Free · No Signup · 50+ Templates
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Free AI Prompt Generator
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Generate expert-level prompts for ChatGPT, Claude, Gemini, and Midjourney.
            Select your tool, pick a use case, describe what you need — done.
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <PromptGenerator />
      </div>
    </>
  );
}
