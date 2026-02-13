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
};

export const viewport: Viewport = {
  themeColor: "#050914",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
