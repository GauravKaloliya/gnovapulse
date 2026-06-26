import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gnovapulse-ai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "GnovaPulse AI — Intelligent Data Automation Platform",
  description:
    "GnovaPulse AI automates your data workflows with intelligent extraction, real-time analytics, and enterprise-grade security. Transform raw data into actionable insights.",
  keywords: ["AI", "data automation", "analytics", "data pipeline", "machine learning", "business intelligence"],
  openGraph: {
    title: "GnovaPulse AI — Intelligent Data Automation",
    description: "Transform your data into actionable insights with AI-powered automation.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "GnovaPulse AI — Intelligent Data Automation",
    description: "Transform your data into actionable insights with AI-powered automation.",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "GnovaPulse AI",
              applicationCategory: "BusinessApplication",
              description:
                "GnovaPulse AI automates your data workflows with intelligent extraction, real-time analytics, and enterprise-grade security.",
              url: SITE_URL,
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "29",
                highPrice: "199",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
