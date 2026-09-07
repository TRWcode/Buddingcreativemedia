import { casesHref, portfolioHref } from "./site";
import type { CtaLink, ImageAsset, SectionIntro } from "./types";

export type ServiceIcon = "camera" | "video";

/**
 * Eén concrete opdracht die je bij ons kunt neerleggen — "Aftermovie",
 * "Zakelijk portret". Dit is de laag die op de oude site in twee carrousels
 * verstopt zat: je moest doorklikken om te zien wat er te koop was, en wat je
 * zag was een rij foto's met een woord eroverheen. Als platte lijst staat alles
 * tegelijk in beeld en is het in één blik te scannen.
 *
 * `summary` is bewust kort: het is de zin die het verschil uitlegt tussen twee
 * namen die op elkaar lijken (fashion versus concept, reel versus bedrijfsvideo).
 * Meer dan een regel of zeven woorden en de lijst wordt weer een tekstblok.
 */
export interface ServiceItem {
  readonly name: string;
  readonly summary: string;
}

export interface Service {
  readonly id: string;
  readonly icon: ServiceIcon;
  readonly title: string;
  readonly description: string;
  readonly items: readonly ServiceItem[];
  readonly link: CtaLink;
  readonly image: ImageAsset;
  /** Toont een play-knop over het beeld — voor de videodienst. */
  readonly showPlay?: boolean;
}

export const servicesIntro: SectionIntro = {
  eyebrow: "Wat we doen",
  title: "Diensten",
  description:
    "Twee disciplines, alles onder één dak. Hieronder staat precies wat we maken, zodat je in één blik ziet of we bij je klus passen.",
};

export const services: readonly Service[] = [
  {
    id: "fotografie",
    icon: "camera",
    title: "Fotografie",
    description: "Foto's waar je jaren mee vooruit kunt — op de werkvloer, op het podium en voor de camera.",
    items: [
      { name: "Bedrijfsreportage", summary: "Je mensen, je pand, je werk in beeld" },
      { name: "Events", summary: "Congres, beurs, sport of podium" },
      { name: "Zakelijk portret", summary: "Eén gezicht of het hele team" },
      { name: "Fashion & concept", summary: "Geregisseerd, met styling en licht" },
      { name: "Campagnebeeld", summary: "Voor je advertentie of actie" },
    ],
    // Naar het portfolio: daar staat het fotowerk per categorie, en dat is wat
    // "de aanpak" van een fotograaf laat zien. Het anker naar het cases-blok
    // stuurde beide diensten naar precies hetzelfde plekje op de homepage.
    link: { label: "Bekijk fotowerk", href: portfolioHref },
    image: {
      src: "/media/diensten/fotografie.jpg",
      alt: "Portretshoot in de studio: model in gouden jasje met rondvliegende bladmuziek",
      width: 1600,
      height: 1066,
    },
  },
  {
    id: "videografie",
    icon: "video",
    title: "Videografie",
    description: "Video die blijft hangen: kort, helder en gemaakt voor het kanaal waar hij terechtkomt.",
    items: [
      { name: "Aftermovie", summary: "Je hele dag terug in twee minuten" },
      { name: "Bedrijfsvideo", summary: "Uitleg, promotie of bedrijfsprofiel" },
      { name: "Reels & shorts", summary: "Verticaal en kort, klaar voor social" },
      { name: "Dronebeeld", summary: "Locatie en schaal vanuit de lucht" },
    ],
    // Naar de cases: daar zit de montage bij het verhaal waar hij voor gemaakt is.
    link: { label: "Bekijk videowerk", href: casesHref },
    image: {
      src: "/media/diensten/videografie.jpg",
      alt: "Presentatrice met microfoon wordt op locatie gefilmd",
      width: 1200,
      height: 800,
      // De presentatrice staat hoog in het kader: haar haar begint op zo'n 17%
      // van boven. Een strook van deze verhouding snijdt bij het midden vanaf
      // 22% aan, en dan gaat de bovenkant van haar hoofd eraf. Op 30% loopt de
      // uitsnede vanaf circa 13% en staat ze er heel op, op elke schermbreedte.
      objectPosition: "center 30%",
    },
    showPlay: true,
  },
];
