import type { CtaLink, ImageAsset, SectionIntro } from "./types";

export type EventDetailIcon = "calendar" | "clock" | "pin";

export interface EventDetail {
  readonly icon: EventDetailIcon;
  readonly value: string;
}

export interface EventCard {
  readonly ribbon: string;
  readonly title: string;
  readonly description: string;
  readonly details: readonly EventDetail[];
  readonly image: ImageAsset;
}

export const eventsIntro: SectionIntro = {
  eyebrow: "Nieuwste event",
  title: "Events",
  description:
    "We organiseren inspirerende workshops en portretdagen, op locatie of in onze portretstudio, waarop je jezelf of je team professioneel kunt laten vastleggen.",
};

export const eventsCta: CtaLink = { label: "Meer Events", href: "#contact" };

export const featuredEvent: EventCard = {
  ribbon: "Nieuw",
  title: "Mini-shoot Almere",
  description:
    "In 30 minuten maken we frisse, professionele beelden die je meteen kunt inzetten voor je website en socials. Snel, relaxed en resultaatgericht.",
  details: [
    { icon: "calendar", value: "14 / 10 / 2025" },
    { icon: "clock", value: "30 tot 50 min" },
    { icon: "pin", value: "Almere" },
  ],
  image: {
    src: "/media/events/mini-shoot-almere.jpg",
    alt: "Zakelijk portret op kantoor: vrouw met een kop koffie in een lichte werkruimte",
    width: 1600,
    height: 1068,
  },
};
