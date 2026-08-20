import type { CtaLink, NavLink } from "./types";

export const site = {
  name: "Budding Creative Media",
  /** Twee regels in het logo-lockup. */
  nameLines: ["Budding", "Creative Media"] as const,
  monogram: "B",
  tagline: "Fotografie & Video · Almere",
  description:
    "Fotografie en video die merken, bedrijven en events visueel sterk in beeld brengt. Gevestigd in Almere.",
  location: "Almere · Nederland",
  email: "info@buddingcreativemedia.nl",
  phone: "+31 6 00 00 00 00",
  /** Vervang door het productie-domein zodra dat live staat. */
  url: "https://www.buddingcreativemedia.nl",
} as const;

export const navLinks: readonly NavLink[] = [
  { label: "Portfolio", href: "#cases" },
  { label: "Events", href: "#events" },
  { label: "Diensten", href: "#diensten" },
  { label: "Cases", href: "#cases" },
  { label: "Over Ons", href: "#werkwijze" },
];

export const primaryCta: CtaLink = { label: "Let's Talk", href: "#contact" };
