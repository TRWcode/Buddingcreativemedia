import type { ImageAsset } from "./types";

export interface ClientLogo {
  readonly id: string;
  readonly name: string;
  readonly logo: ImageAsset;
  /**
   * Optische hoogte waarop dit logo in de rij staat. Per merk anders: een breed
   * wordmark heeft minder hoogte nodig dan een gestapeld logo om even zwaar te
   * wegen. Geen design-token maar een eigenschap van het bestand zelf.
   */
  readonly height: string;
  /** Alleen gezet waar we naar mogen doorlinken; anders staat het logo stil. */
  readonly href?: string;
}

export const clientsIntro = {
  eyebrow: "Vertrouwd door",
  description: "Organisaties die hun verhaal aan ons beeld toevertrouwen.",
} as const;

/**
 * De logo's staan als witte monochrome PNG's in `public/media/logos/` — in eigen
 * huisstijlkleur zouden ze op de donkere achtergrond onleesbaar zijn of juist
 * alle aandacht opeisen. Eén toon houdt de rij rustig.
 */
export const clientLogos: readonly ClientLogo[] = [
  {
    id: "aeres",
    name: "Aeres",
    height: "2.25rem",
    logo: { src: "/media/logos/aeres.png", alt: "Aeres", width: 750, height: 223 },
  },
  {
    id: "stad-natuur-almere",
    name: "Stad & Natuur Almere",
    height: "3.25rem",
    logo: {
      src: "/media/logos/stad-natuur-almere.png",
      alt: "Stad & Natuur Almere",
      width: 218,
      height: 180,
    },
  },
  {
    id: "stapit",
    name: "Stapit",
    height: "3rem",
    href: "https://stapit.com",
    logo: { src: "/media/logos/stapit.png", alt: "Stapit", width: 422, height: 352 },
  },
];
