import type { CtaLink, ImageAsset, SectionIntro } from "./types";
import { contactHref, eventsHref } from "./site";

export type EventDetailIcon = "calendar" | "clock" | "pin";

export interface EventDetail {
  readonly icon: EventDetailIcon;
  readonly value: string;
}

/** De vorm die de kaart op de homepage rendert. */
export interface EventCard {
  readonly ribbon: string;
  readonly title: string;
  readonly description: string;
  readonly details: readonly EventDetail[];
  readonly image: ImageAsset;
}

export interface EventItem {
  readonly id: string;
  readonly title: string;
  /** Korte typering, bijvoorbeeld "Cursus" of "Portretdag". */
  readonly kind: string;
  readonly description: string;
  /** ISO-datum. Bepaalt de volgorde én of het event al geweest is. */
  readonly date: string;
  readonly duration?: string;
  readonly location: string;
  readonly price?: string;
  /** Aantal plekken, alleen zinvol zolang je je nog kunt aanmelden. */
  readonly spots?: string;
  /**
   * Of je je nu kunt aanmelden. Staat los van de datum: een event kan al
   * aangekondigd zijn terwijl de inschrijving nog dicht is. Bij een event dat
   * geweest is doet dit veld niets meer.
   */
  readonly signupOpen?: boolean;
  /** Alleen nodig voor wat groot in beeld komt; het archief toont geen beeld. */
  readonly image?: ImageAsset;
}

export const eventsIntro: SectionIntro = {
  eyebrow: "Nieuwste event",
  title: "Events",
  description:
    "We organiseren inspirerende workshops en portretdagen, op locatie of in onze portretstudio, waarop je jezelf of je team professioneel kunt laten vastleggen.",
};

export const eventsPage = {
  eyebrow: "Agenda",
  heading: ["Events", "& workshops"] as const,
  metaTitle: "Events",
  metaDescription:
    "Workshops, cursussen en portretdagen van Budding Creative Media in Almere. Bekijk wat eraan komt en waar je je nu voor kunt aanmelden.",
  intro:
    "Een paar keer per jaar organiseren we iets waar je zelf bij kunt zijn: een cursus, een workshop of een portretdag. Klein gehouden, zodat er tijd is voor iedereen.",
  openHeading: "Nu open",
  openEmpty:
    "Op dit moment staat er geen inschrijving open. Laat je naam achter en je hoort het als de volgende datum bekend is.",
  upcomingHeading: "Binnenkort",
  pastHeading: "Geweest",
  pastIntro:
    "Wat we eerder deden, voor het beeld. Aanmelden kan hier niet meer, maar het meeste komt terug.",
  signupLabel: "Aanmelden",
  soonLabel: "Inschrijving opent later",
  moreLabel: "Bekijk de agenda",
} as const;

/**
 * De agenda, nieuwste bovenaan. Of iets in "binnenkort" of in "geweest" belandt
 * volgt uit `date` en niet uit een veld dat iemand moet omzetten — een event
 * dat voorbij is verhuist dus vanzelf naar het archief.
 *
 * ⚠️ Deze events zijn VERZONNEN, op de mini-shoot na, die er al stond. Ze staan
 * er om te laten zien hoe de agenda werkt. Zolang dit zo is, kondigt de site
 * cursussen aan die niet bestaan en kan iemand zich ervoor melden. Vervang ze
 * door echte data of haal ze weg voordat dit publiek staat.
 */
export const events: readonly EventItem[] = [
  {
    id: "mobiele-fotografie-basis-najaar",
    title: "Mobiele fotografie: alles uit je telefoon",
    kind: "Cursus",
    description:
      "Je telefoon kan meer dan je denkt. In één avond leer je licht lezen, bewust kaderen en nabewerken, zodat je voor je eigen socials geen fotograaf meer nodig hebt voor het dagelijkse werk.",
    date: "2026-09-24",
    duration: "19:00 tot 22:00",
    location: "Almere",
    price: "€ 75,- p.p.",
    spots: "10 plekken",
    signupOpen: true,
    image: {
      src: "/media/library/zaal-publiek.jpg",
      alt: "Deelnemers in een zaal tijdens een presentatie",
      width: 1200,
      height: 800,
    },
  },
  {
    id: "mini-shoot-almere-najaar",
    title: "Mini-shoot Almere",
    kind: "Portretdag",
    description:
      "In 30 minuten maken we frisse, professionele beelden die je meteen kunt inzetten voor je website en socials. Snel, relaxed en resultaatgericht.",
    date: "2026-10-14",
    duration: "30 tot 50 min per persoon",
    location: "Almere",
    price: "€ 145,-",
    spots: "8 tijdsloten",
    signupOpen: true,
    image: {
      src: "/media/events/mini-shoot-almere.jpg",
      alt: "Zakelijk portret op kantoor: vrouw met een kop koffie in een lichte werkruimte",
      width: 1600,
      height: 1068,
    },
  },
  {
    id: "mobiele-fotografie-verdieping",
    title: "Mobiele fotografie: verdieping",
    kind: "Cursus",
    description:
      "Voor wie de basis al doet. We gaan dieper op compositie, kleur en het opbouwen van een serie die als geheel werkt.",
    date: "2026-11-19",
    duration: "19:00 tot 22:00",
    location: "Almere",
    price: "€ 95,- p.p.",
    image: {
      src: "/media/library/presentatie-scherm.jpg",
      alt: "Presentatie op een scherm tijdens een bijeenkomst",
      width: 1200,
      height: 800,
    },
  },

  /* Geweest. Deze verhuizen vanzelf naar het archief zodra de datum voorbij is. */
  {
    id: "mobiele-fotografie-basis-juni",
    title: "Mobiele fotografie: alles uit je telefoon",
    kind: "Cursus",
    description: "De basiscursus, volgeboekt.",
    date: "2026-06-11",
    location: "Almere",
  },
  {
    id: "portretdag-op-locatie",
    title: "Portretdag op locatie",
    kind: "Portretdag",
    description: "Teamportretten op kantoor, in één dag.",
    date: "2026-04-23",
    location: "Almere",
  },
  {
    id: "workshop-licht-op-locatie",
    title: "Workshop licht op locatie",
    kind: "Workshop",
    description: "Werken met wat er is, en met één lamp erbij.",
    date: "2026-03-06",
    location: "Almere",
  },
  {
    id: "mini-shoot-almere-najaar-2025",
    title: "Mini-shoot Almere",
    kind: "Portretdag",
    description: "De eerste editie van de mini-shoot.",
    date: "2025-11-21",
    location: "Almere",
  },
];

/**
 * Splitst de agenda op de dag van vandaag.
 *
 * Wordt bij het renderen aangeroepen en niet één keer bij het laden van de
 * module, want dan zou de peildatum die van de build zijn en zou de agenda
 * blijven staan waar hij stond. De pagina zet daarom ook een `revalidate`.
 */
export function splitEvents(now: Date = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const at = (event: EventItem) => new Date(event.date).getTime();

  const upcoming = events
    .filter((event) => at(event) >= today)
    .sort((a, b) => at(a) - at(b));

  const past = events.filter((event) => at(event) < today).sort((a, b) => at(b) - at(a));

  return {
    /** Waar je je nu voor kunt aanmelden. Krijgt de meeste ruimte. */
    open: upcoming.filter((event) => event.signupOpen),
    /** Wel aangekondigd, nog niet open. */
    announced: upcoming.filter((event) => !event.signupOpen),
    upcoming,
    past,
  };
}

const dutchDate = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dutchDateShort = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatEventDate(iso: string): string {
  return dutchDate.format(new Date(iso));
}

export function formatEventDateShort(iso: string): string {
  return dutchDateShort.format(new Date(iso));
}

/** Vertaalt een event naar de kaartvorm die de homepage al rendert. */
export function toEventCard(event: EventItem, fallbackImage: ImageAsset): EventCard {
  const details: EventDetail[] = [
    { icon: "calendar", value: formatEventDate(event.date) },
    ...(event.duration ? [{ icon: "clock" as const, value: event.duration }] : []),
    { icon: "pin", value: event.location },
  ];

  return {
    ribbon: event.signupOpen ? "Open" : "Binnenkort",
    title: event.title,
    description: event.description,
    details,
    image: event.image ?? fallbackImage,
  };
}

/** Valt in als een event zelf geen beeld draagt. */
export const eventFallbackImage: ImageAsset = {
  src: "/media/events/mini-shoot-almere.jpg",
  alt: "Zakelijk portret op kantoor: vrouw met een kop koffie in een lichte werkruimte",
  width: 1600,
  height: 1068,
};


export { eventsHref };

export const eventsCta: CtaLink = { label: eventsPage.moreLabel, href: eventsHref };

/** De knop onder een open inschrijving. Er is geen boekingssysteem. */
export const eventSignupHref = contactHref;
