import type { Metadata } from "next";
import AiDetector from "@/components/AiDetector";

export const metadata: Metadata = {
  title: "Free AI Text Detector — ChatGPT & Claude Content Checker",
  description:
    "Free AI content detector. Check if text was written by ChatGPT, Claude or AI. Instant results, no signup needed.",
  openGraph: {
    title: "Free AI Text Detector — ChatGPT & Claude Content Checker",
    description:
      "Free AI content detector. Check if text was written by ChatGPT, Claude or AI. Instant results, no signup needed.",
    url: "https://www.aitoolduel.com/tools/ai-detector",
    type: "article",
  },
  alternates: {
    canonical: "https://www.aitoolduel.com/tools/ai-detector",
  },
};

export default function AiDetectorPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            100% Free · No Signup · Instant Results
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Free AI Text Detector
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Check if text was written by ChatGPT, Claude, or another AI.
            Powered by browser-side analysis — your text never leaves your device.
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <AiDetector />
      </div>
    </>
  );
}
