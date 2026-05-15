import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Human Loops — Physical AI data, collected and validated in-house",
  description:
    "We collect, teleoperate, annotate, and validate the physical-world data that AI models need to work in the real world. End to end, in our facility, with our team.",
  keywords: [
    "physical ai",
    "egocentric data",
    "teleoperation",
    "robotics data",
    "multimodal annotation",
    "world models",
    "human loops",
  ],
  openGraph: {
    title: "Human Loops — Physical AI data, collected and validated in-house",
    description:
      "Physical AI starts with physical data. Egocentric capture, teleoperation, and multimodal annotation at scale.",
    type: "website",
  },
  metadataBase: new URL("https://thehumanloops.com"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
};

// Inlined before hydration to avoid a theme flash.
const themeBootstrap = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'dark' && t !== 'light') t = 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

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
    description:
      "Physical AI data company. Egocentric capture, teleoperation, multimodal annotation, and validation for robotics and world-model teams. End to end, in-house.",
    sameAs: [
      "https://www.linkedin.com/company/human-loops/",
      "https://x.com/Human_Loops",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={`${dmSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <GoogleAnalytics gaId="G-TWWRRTG489" />
        <Analytics />
      </body>
    </html>
  );
}
