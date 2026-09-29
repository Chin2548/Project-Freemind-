import type { Metadata } from "next";
// Self-hosted (Fontsource) instead of next/font/google: Turbopack's
// production build in this Next.js version fails to resolve Google Fonts
// at build time (`@vercel/turbopack-next/internal/font/google/font` module
// not found) — self-hosting sidesteps that entirely and removes the
// runtime dependency on fonts.gstatic.com being reachable at deploy time.
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";

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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-obsidian text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
