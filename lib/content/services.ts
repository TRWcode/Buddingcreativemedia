import { casesHref, portfolioHref } from "./site";
import type { CtaLink, ImageAsset, SectionIntro } from "./types";

export type ServiceIcon = "camera" | "video";

export interface Service {
  readonly id: string;
  readonly icon: ServiceIcon;
  readonly title: string;
  readonly description: string;
  readonly link: CtaLink;
  readonly image: ImageAsset;
  /** Toont een play-knop over het beeld — voor de videodienst. */
  readonly showPlay?: boolean;
}

export const servicesIntro: SectionIntro = {
  eyebrow: "Wat we doen",
  title: "Diensten",
  description:
    "Van krachtige fotografie tot doelgerichte video's: wij helpen merken, bedrijven en organisaties hun verhaal visueel sterk over te brengen.",
};

export const services: readonly Service[] = [
  {
    id: "fotografie",
    icon: "camera",
    title: "Fotografie",
    description:
      "Zakelijke portretten, event-coverage en bedrijfsfotografie die jouw verhaal versterkt. Oog voor detail, heldere communicatie en beelden die professioneel én bruikbaar zijn.",
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
    description:
      "Aftermovies, bedrijfsvideo's en social content die je boodschap krachtig overbrengen. We denken mee, draaien efficiënt op locatie en leveren video's die passen bij je doel en doelgroep.",
    // Naar de cases: daar zit de montage bij het verhaal waar hij voor gemaakt is.
    link: { label: "Bekijk videowerk", href: casesHref },
    image: {
      src: "/media/diensten/videografie.jpg",
      alt: "Presentatrice met microfoon wordt op locatie gefilmd",
      width: 1200,
      height: 800,
    },
    showPlay: true,
  },
];
