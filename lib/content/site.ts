import type { CtaLink, ImageAsset, NavLink } from "./types";

export const site = {
  name: "Budding Creative Media",
  tagline: "Fotografie & Video · Almere",
  description:
    "Fotografie en video die merken, bedrijven en events visueel sterk in beeld brengt. Gevestigd in Almere.",
  location: "Almere · Nederland",
  email: "info@buddingcreativemedia.nl",
  phone: "+31 6 00 00 00 00",
  /** Vervang door het productie-domein zodra dat live staat. */
  url: "https://www.buddingcreativemedia.nl",
} as const;

/**
 * Het merklogo, wit-variant met transparante achtergrond — de enige die op de
 * donkere ondergrond werkt. De marges zijn er in het bestand al af, dus de
 * afmetingen hieronder zijn precies de illustratie: ruimte eromheen regel je
 * met CSS, niet met transparante pixels.
 */
export const siteLogo: ImageAsset = {
  src: "/media/brand/logo.webp",
  alt: site.name,
  width: 560,
  height: 105,
};

export const navLinks: readonly NavLink[] = [
  { label: "Portfolio", href: "#cases" },
  { label: "Events", href: "#events" },
  { label: "Diensten", href: "#diensten" },
  { label: "Cases", href: "#cases" },
  { label: "Over Ons", href: "#werkwijze" },
];

export const primaryCta: CtaLink = { label: "Let's Talk", href: "#contact" };
