import type { CtaLink, ImageAsset } from "./types";

interface HeroContent {
  readonly eyebrow: string;
  /** Elke regel krijgt een eigen masked reveal; `accent` kleurt de regel rood. */
  readonly headline: readonly { readonly text: string; readonly accent?: boolean }[];
  readonly intro: string;
  readonly ctas: readonly [CtaLink, CtaLink];
  readonly scrollLabel: string;
  readonly image: ImageAsset;
}

export const hero: HeroContent = {
  eyebrow: "Fotografie & Video · Almere",
  headline: [{ text: "Creatief" }, { text: "Betrokken" }, { text: "Impactvol", accent: true }],
  intro: "Krachtige fotografie en video voor bedrijven, events en organisaties.",
  ctas: [
    { label: "Portfolio", href: "#cases" },
    { label: "Cases", href: "#cases" },
  ],
  scrollLabel: "Scroll",
  image: {
    src: "/media/hero/hero-ballonnen.jpg",
    alt: "Vrouw in wit pak loopt met een tros witte ballonnen door een straat in Almere",
    width: 2560,
    height: 1708,
  },
};
