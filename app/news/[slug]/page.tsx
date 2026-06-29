import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsArticlePage from "@/components/NewsArticlePage";
import { getArticle, newsArticles } from "@/lib/news";

export async function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = getArticle(params.slug);
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://www.aitoolduel.com/news/${data.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title: data.metaTitle, description: data.metaDescription },
    alternates: { canonical: `https://www.aitoolduel.com/news/${data.slug}` },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const data = getArticle(params.slug);
  if (!data) notFound();
  return <NewsArticlePage data={data} />;
}
