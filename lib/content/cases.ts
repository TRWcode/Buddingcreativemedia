import type { CtaLink, ImageAsset, SectionIntro } from "./types";

export interface CaseSpotlight {
  readonly badge: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly link: CtaLink;
  readonly image: ImageAsset;
  /** Bijschrift onder de polaroid. */
  readonly caption: string;
}

export interface CaseCard {
  readonly id: string;
  readonly title: string;
  readonly client: string;
  readonly disciplines: string;
  readonly year: string;
  readonly href: string;
  readonly image: ImageAsset;
}

export const casesIntro: SectionIntro = {
  eyebrow: "Uitgelicht werk",
  title: "Onze Cases",
  description: "Van idee tot impact. Zo brengen wij projecten tot leven.",
};

export const caseSpotlight: CaseSpotlight = {
  badge: "Case in de spotlight",
  title: "Gemeente Almere",
  caption: "Onderneming van het Jaar",
  description:
    "Een volledige beeldcampagne rond de verkiezing tot Onderneming van het Jaar — van sfeervolle event-coverage tot krachtige portretten. Rustig geregisseerd, met impact als resultaat.",
  tags: ["Fotografie", "Event", "2025"],
  link: { label: "Bekijk case", href: "#cases" },
  image: {
    src: "/media/cases/spotlight-onderneming-van-het-jaar.jpg",
    alt: "Winnaars bekijken de gouden award tijdens de uitreiking",
    width: 1200,
    height: 800,
  },
};

export const caseCards: readonly CaseCard[] = [
  {
    id: "jijbenm",
    title: "Campagne & Promo Reels",
    client: "JijbenM",
    disciplines: "Drone · Fotografie · Video",
    year: "2025",
    href: "#cases",
    image: {
      src: "/media/cases/campagne-promo-reels.jpg",
      alt: "Campagnebeeld op het strand met opblaasbare flamingo's en studiolampen",
      width: 1600,
      height: 1068,
    },
  },
  {
    id: "althio",
    title: "Studio Portretsessie",
    client: "Althio",
    disciplines: "Fotografie · Studio",
    year: "2024",
    href: "#cases",
    image: {
      src: "/media/cases/studio-portretsessie.jpg",
      alt: "Portret van een springende man in een gang met warm goudkleurig licht",
      width: 1600,
      height: 1068,
    },
  },
  {
    id: "golazo",
    title: "Marathon Aftermovie",
    client: "Golazo Events NL",
    disciplines: "Videografie · Event",
    year: "2025",
    href: "#cases",
    image: {
      src: "/media/cases/marathon-aftermovie.jpg",
      alt: "BMX-rider springt voor een juichend publiek tijdens een sportevenement",
      width: 1200,
      height: 800,
    },
  },
];

export const casesCta: CtaLink = { label: "Meer Werk", href: "#cases" };
