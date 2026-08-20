import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { clashDisplay, satoshi } from "./fonts";
import { site } from "@/lib/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Fotografie & Video uit Almere`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "fotografie Almere",
    "videografie Almere",
    "bedrijfsfotografie",
    "aftermovie",
    "eventfotografie",
    "zakelijke portretten",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Fotografie & Video uit Almere`,
    description: site.description,
    // Placeholder: vervang door een 1200×630 share-image zodra die er is.
    images: [{ url: "/media/hero/hero-ballonnen.jpg", width: 2560, height: 1708, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Fotografie & Video uit Almere`,
    description: site.description,
    images: ["/media/hero/hero-ballonnen.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl" className={`${clashDisplay.variable} ${satoshi.variable}`}>
      <body>
        {/* Zonder JS blijven reveal-elementen anders op opacity 0 staan. */}
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <MotionProvider>
          <SmoothScroll />
          <a
            href="#top"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-1010 focus:rounded-pill focus:bg-brand focus:px-5 focus:py-3 focus:font-bold focus:text-white"
          >
            Naar hoofdinhoud
          </a>
          <Header />
          <main>{children}</main>
          <Footer />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
