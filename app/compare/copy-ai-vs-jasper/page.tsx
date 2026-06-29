import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparisonPage from "@/components/ComparisonPage";
import { getComparison } from "@/lib/comparisons";

const data = getComparison("copy-ai-vs-jasper")!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  openGraph: { title: data.metaTitle, description: data.metaDescription, url: `https://www.aitoolduel.com${data.canonicalPath}`, type: "article" },
  twitter: { card: "summary_large_image", title: data.metaTitle, description: data.metaDescription },
  alternates: { canonical: `https://www.aitoolduel.com${data.canonicalPath}` },
};

export default function Page() {
  if (!data) notFound();
  return <ComparisonPage data={data} />;
}