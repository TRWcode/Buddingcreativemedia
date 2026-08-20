import localFont from "next/font/local";

/**
 * Self-hosted variable fonts (Fontshare, ITF Free Font License).
 * Eén bestand per familie — geen extra requests, geen layout shift dankzij
 * `display: swap` plus de opgegeven fallback-metrics.
 */
export const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  weight: "200 700",
  style: "normal",
  display: "swap",
  variable: "--font-clash-display",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});

export const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  weight: "300 900",
  style: "normal",
  display: "swap",
  variable: "--font-satoshi",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});
