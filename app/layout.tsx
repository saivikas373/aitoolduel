import type { Metadata } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI Tool Duel – Honest AI Tool Comparisons 2026",
    template: "%s | AI Tool Duel",
  },
  description:
    "Honest, in-depth comparisons of the most popular AI tools in 2026. ChatGPT vs Claude, Gemini vs GPT-4o, Midjourney vs DALL-E — find the best AI tool for your needs.",
  metadataBase: new URL("https://www.aitoolduel.com"),
  keywords: ["AI tool comparison", "ChatGPT vs Claude", "best AI tools 2026", "AI tool reviews", "Gemini vs ChatGPT", "Midjourney vs DALL-E", "AI tool duel"],
  openGraph: {
    siteName: "AI Tool Duel",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Tool Duel – Honest AI Tool Comparisons" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aitoolduel",
    creator: "@aitoolduel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: "https://www.aitoolduel.com",
  },
  other: {
    "google-adsense-account": "ca-pub-1074134347887369",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Tool Duel",
    "url": "https://www.aitoolduel.com",
    "description": "Honest AI tool comparisons and reviews",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.aitoolduel.com/compare/{search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Tool Duel",
      "url": "https://www.aitoolduel.com"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1074134347887369"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
