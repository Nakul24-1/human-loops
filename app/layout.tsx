import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Human Loops — Human-in-the-Loop Operations for AI at Scale",
  description:
    "We QA AI outputs, filter datasets, and train models — so your accuracy improves without slowing your team down.",
  keywords: ["human in the loop", "ai qa", "rlhf", "ai verification", "human loops", "ai operations"],
  openGraph: {
    title: "Human Loops — Human-in-the-Loop Operations for AI at Scale",
    description: "We QA AI outputs, filter datasets, and train models.",
    type: "website",
  },
  metadataBase: new URL("https://thehumanloops.com"),
};

export const viewport: Viewport = {
  themeColor: "#050914",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Human Loops",
    url: "https://thehumanloops.com",
    logo: "https://thehumanloops.com/human-loop-logo.svg",
    description: "Human-in-the-Loop QA for AI at Scale. We verify, correct, and deliver accurate data for legal, healthcare, and finance AI agents.",
    sameAs: [
      "https://www.linkedin.com/company/human-loops/",
      "https://twitter.com/humanloops"
    ]
  };

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
