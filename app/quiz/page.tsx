import type { Metadata } from "next";
import ToolQuiz from "@/components/ToolQuiz";

export const metadata: Metadata = {
  title: "Which AI Tool Is Right For You? Free Quiz",
  description:
    "Not sure which AI tool to use? Take our free 30-second quiz and get matched with the top-rated AI tool for writing, coding, images, video, and more.",
  openGraph: {
    title: "Which AI Tool Is Right For You? Free Quiz",
    description:
      "Take our free 30-second quiz and get matched with the top-rated AI tool for your needs.",
    url: "https://www.aitoolduel.com/quiz",
    type: "website",
  },
  alternates: {
    canonical: "https://www.aitoolduel.com/quiz",
  },
};

export default function QuizPage() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <ToolQuiz />
      </div>
    </section>
  );
}
