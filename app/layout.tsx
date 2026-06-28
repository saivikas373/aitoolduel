import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI Tool Duel – Honest AI Tool Comparisons",
    template: "%s | AI Tool Duel",
  },
  description:
    "In-depth, honest comparisons of the most popular AI tools. Find the best AI tool for your needs with side-by-side breakdowns, pros & cons, and expert picks.",
  metadataBase: new URL("https://www.aitoolduel.com"),
  openGraph: {
    siteName: "AI Tool Duel",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@aitoolduel",
  },
  robots: {
    index: true,
    follow: true,
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
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
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
