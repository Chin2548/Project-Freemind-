import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://freemindbkk.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FREEMIND BKK — Cocktails, Conversations & Nights Worth Remembering",
    template: "%s — FREEMIND BKK",
  },
  description:
    "Freemind BKK is a sophisticated cocktail bar in Bangkok created for curious minds, crafted drinks, intimate nights, and stories worth remembering.",
  openGraph: {
    title: "FREEMIND BKK — Cocktails, Conversations & Nights Worth Remembering",
    description:
      "Freemind BKK is a sophisticated cocktail bar in Bangkok created for curious minds, crafted drinks, intimate nights, and stories worth remembering.",
    url: siteUrl,
    siteName: "FREEMIND BKK",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/photos/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FREEMIND BKK",
    description: "Free your mind.",
    images: ["/images/photos/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-obsidian text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
