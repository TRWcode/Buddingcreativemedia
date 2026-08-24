import type { ImageAsset } from "./types";

/**
 * De portfolio-indeling van de huidige site: eerst een keuze tussen fotografie
 * en videografie, daarbinnen een filter op categorie. Deze module is de bron
 * voor beide; de taxonomie hieronder is overgenomen van buddingcreativemedia.nl
 * zodat het werk niet twee keer anders wordt ingedeeld.
 */
export type PortfolioMedium = "fotografie" | "videografie";

export type PortfolioCategory =
  | "bedrijven"
  | "events"
  | "portretten"
  | "concepten"
  | "fashion"
  | "drone"
  | "publicities";

export interface PortfolioCategoryMeta {
  readonly id: PortfolioCategory;
  readonly label: string;
  /** Wat er in deze categorie hoort; de grens tussen een paar is smal. */
  readonly scope: string;
}

/** De volgorde waarin de filters staan. Gelijk aan de huidige site. */
export const portfolioCategories: readonly PortfolioCategoryMeta[] = [
  {
    id: "bedrijven",
    label: "Bedrijven",
    scope: "Zakelijk werk op locatie: kantoor, horeca, retail, bedrijfsreportage.",
  },
  {
    id: "events",
    label: "Events",
    scope: "Alles wat op een dag gebeurt: podium, zaal, beurs, sport, catering.",
  },
  {
    id: "portretten",
    label: "Portretten",
    scope: "De persoon is het onderwerp, niet de omgeving of het concept.",
  },
  {
    id: "concepten",
    label: "Concepten",
    scope: "Geregisseerd en bedacht beeld: styling, set, licht als middel.",
  },
  {
    id: "fashion",
    label: "Fashion",
    scope: "Mode en styling waarin de kleding het onderwerp is.",
  },
  {
    id: "drone",
    label: "Drone",
    scope: "Alles vanuit de lucht, ook als het onderwerp een groep of gebouw is.",
  },
  {
    id: "publicities",
    label: "Publicities",
    scope: "Campagnebeeld dat als advertentie of publieksactie is ingezet.",
  },
];

export interface PortfolioItem extends ImageAsset {
  readonly id: string;
  readonly medium: PortfolioMedium;
  readonly category: PortfolioCategory;
  /**
   * De opdracht of shoot waar het beeld uit komt. Meerdere beelden delen een
   * shoot; handig om een serie bij elkaar te houden of in één keer te vervangen.
   */
  readonly shoot?: string;
}

/**
 * Elk beeld in `public/media/` dat portfoliowerk is, met één categorie. Logo's,
 * merkbestanden en video-posters die uit een clip zijn getrokken staan er niet
 * bij; dat is geen werk om te tonen.
 *
 * Eén categorie per beeld, bewust. Een foto die in twee filters opduikt laat de
 * bezoeker twijfelen of hij iets dubbel ziet, en bij het vullen van een grid
 * telt hetzelfde beeld dan twee keer mee.
 */
export const portfolioItems: readonly PortfolioItem[] = [
  /* ---- Bedrijven ---------------------------------------------------------- */
  {
    id: "daily-workspace-portret",
    medium: "fotografie",
    category: "bedrijven",
    shoot: "Daily Workspace",
    src: "/media/events/mini-shoot-almere.jpg",
    alt: "Vrouw met een kop koffie achter haar laptop in de flexwerkruimte van Daily Workspace",
    width: 1600,
    height: 1068,
  },

  /* ---- Events ------------------------------------------------------------- */
  {
    id: "onderneming-van-het-jaar-award",
    medium: "fotografie",
    category: "events",
    shoot: "Onderneming van het Jaar",
    src: "/media/cases/spotlight-onderneming-van-het-jaar.jpg",
    alt: "Winnaars bekijken de gouden award tijdens de uitreiking",
    width: 1200,
    height: 800,
  },
  {
    id: "onderneming-van-het-jaar-zaal",
    medium: "fotografie",
    category: "events",
    shoot: "Onderneming van het Jaar",
    src: "/media/library/zaal-publiek.jpg",
    alt: "Volle zaal kijkt naar het podium tijdens de uitreiking",
    width: 1200,
    height: 800,
  },
  {
    id: "eventsummit-podium",
    medium: "fotografie",
    category: "events",
    shoot: "EventSummit",
    src: "/media/library/eventsummit-podium.jpg",
    alt: "Twee presentatoren op het podium met een bord in hun handen",
    width: 1224,
    height: 816,
  },
  {
    id: "spreker-oranje-pak",
    medium: "fotografie",
    category: "events",
    shoot: "EventSummit",
    src: "/media/library/spreker-oranje-pak.jpg",
    alt: "Spreker in oranje pak met opgeheven armen op het podium",
    width: 1200,
    height: 800,
  },
  {
    id: "blauw-podium-spreker",
    medium: "fotografie",
    category: "events",
    shoot: "EventSummit",
    src: "/media/library/blauw-podium-spreker.jpg",
    alt: "Spreker in een blauw verlichte zaal met publiek op de voorgrond",
    width: 1200,
    height: 800,
  },
  {
    id: "presentatie-scherm",
    medium: "fotografie",
    category: "events",
    shoot: "EventSummit",
    src: "/media/library/presentatie-scherm.jpg",
    alt: "Presentatrice naast een groot scherm met beelden van het evenement",
    width: 1200,
    height: 800,
  },
  {
    id: "vr-headset-beurs",
    medium: "fotografie",
    category: "events",
    shoot: "EventSummit",
    src: "/media/library/vr-headset-beurs.jpg",
    alt: "Standhouder legt iets uit aan een bezoeker met een VR-bril op",
    width: 1200,
    height: 800,
  },
  {
    id: "delorean-event",
    medium: "fotografie",
    category: "events",
    shoot: "Beursvloer",
    src: "/media/library/delorean-event.jpg",
    alt: "Bezoeker verkleed als Marty McFly in een DeLorean op de beursvloer",
    width: 1200,
    height: 800,
  },
  {
    id: "elastic-on-hoofdpodium",
    medium: "fotografie",
    category: "events",
    shoot: "ElasticON",
    src: "/media/library/elastic-on-hoofdpodium.jpg",
    alt: "Spreker met open armen op het hoofdpodium van ElasticON voor een blauw scherm",
    width: 2560,
    height: 1706,
  },
  {
    id: "elastic-on-podium-blauw",
    medium: "fotografie",
    category: "events",
    shoot: "ElasticON",
    src: "/media/library/elastic-on-podium-blauw.jpg",
    alt: "Spreker met headset op het ElasticON-podium naast het spreekgestoelte",
    width: 1200,
    height: 800,
  },
  {
    id: "opentelemetry-talk",
    medium: "fotografie",
    category: "events",
    shoot: "ElasticON",
    src: "/media/library/opentelemetry-talk.jpg",
    alt: "Spreker wijst naar een architectuurdiagram op het scherm tijdens zijn talk",
    width: 1200,
    height: 800,
  },
  {
    id: "keynote-volvo",
    medium: "fotografie",
    category: "events",
    shoot: "ElasticON",
    src: "/media/library/keynote-volvo.jpg",
    alt: "Keynote-spreker van Volvo Cars op het podium voor zijn naam op het scherm",
    width: 1200,
    height: 800,
  },
  {
    id: "marathon-bmx",
    medium: "fotografie",
    category: "events",
    shoot: "Golazo Events",
    src: "/media/cases/marathon-aftermovie.jpg",
    alt: "BMX-rider springt voor een juichend publiek tijdens een sportevenement",
    width: 1200,
    height: 800,
  },
  {
    id: "straatvoetbal",
    medium: "fotografie",
    category: "events",
    shoot: "Golazo Events",
    src: "/media/library/straatvoetbal.jpg",
    alt: "Kinderen spelen straatvoetbal op een veldje tijdens het evenement",
    width: 1200,
    height: 800,
  },
  {
    id: "beachvolleybal",
    medium: "fotografie",
    category: "events",
    shoot: "Golazo Events",
    src: "/media/library/beachvolleybal.jpg",
    alt: "Beachvolleybaltoernooi met de skyline van Almere op de achtergrond",
    width: 1200,
    height: 800,
  },
  {
    id: "skatepark-step",
    medium: "fotografie",
    category: "events",
    shoot: "Golazo Events",
    src: "/media/library/skatepark-step.jpg",
    alt: "Steppers en skaters op een schansje in het skatepark",
    width: 1200,
    height: 800,
  },
  {
    id: "urban-sports-water",
    medium: "fotografie",
    category: "events",
    shoot: "Golazo Events",
    src: "/media/library/urban-sports-water.jpg",
    alt: "Deelnemers balanceren over een parcours boven het water",
    width: 1200,
    height: 800,
  },
  {
    id: "springtouw-schoolplein",
    medium: "fotografie",
    category: "events",
    shoot: "Sportdag",
    src: "/media/library/springtouw-schoolplein.jpg",
    alt: "Jongen springt hoog over een oranje springtouw op het plein voor een sporthal",
    width: 1200,
    height: 800,
  },
  {
    id: "workshop-paviljoen",
    medium: "fotografie",
    category: "events",
    shoot: "Workshop",
    src: "/media/library/speeltuin.jpg",
    alt: "Deelnemers doen bewegingsoefeningen in een houten paviljoen tussen het groen",
    width: 1200,
    height: 800,
  },
  {
    id: "foodtruck-strandclub",
    medium: "fotografie",
    category: "events",
    shoot: "Foodtrucks",
    src: "/media/library/foodtruck-strandclub.jpg",
    alt: "Kok in de doorgeefluik van een foodtruck met een krijtbord vol gerechten",
    width: 1200,
    height: 800,
  },
  {
    id: "foodtruck-oranje",
    medium: "fotografie",
    category: "events",
    shoot: "Foodtrucks",
    src: "/media/library/foodtruck-oranje.jpg",
    alt: "Twee koks bakken boven open vuur naast een foodtruck met vlammenprint",
    width: 1600,
    height: 1066,
  },
  {
    id: "foodtruck-bezoekers",
    medium: "fotografie",
    category: "events",
    shoot: "Foodtrucks",
    src: "/media/library/foodtruck-bezoekers.jpg",
    alt: "Twee bezoekers eten voor een vintage bestelbus die als foodtruck is ingericht",
    width: 1600,
    height: 1066,
  },
  {
    id: "foodstand-mocktails",
    medium: "fotografie",
    category: "events",
    shoot: "Foodtrucks",
    src: "/media/library/foodstand-mocktails.jpg",
    alt: "Bezoekers met een mocktail bij een kraam met de tekst Fresh Iced Tea Mocktails",
    width: 1600,
    height: 1066,
  },
  {
    id: "cameraman-scholengroep",
    medium: "fotografie",
    category: "events",
    shoot: "Almeerse Scholen Groep",
    src: "/media/video/showreel-poster.jpg",
    alt: "Cameraman filmt met een gimbal tussen de banners op een onderwijsevenement",
    width: 1600,
    height: 1028,
  },

  /* ---- Portretten --------------------------------------------------------- */
  {
    id: "portret-gouden-gang",
    medium: "fotografie",
    category: "portretten",
    shoot: "Althio",
    src: "/media/cases/studio-portretsessie.jpg",
    alt: "Portret van een springende man in een gang met warm goudkleurig licht",
    width: 1600,
    height: 1068,
  },

  /* ---- Concepten ---------------------------------------------------------- */
  {
    id: "bladmuziek-gouden-jasje",
    medium: "fotografie",
    category: "concepten",
    shoot: "Bladmuziek",
    src: "/media/diensten/fotografie.jpg",
    alt: "Man in gouden jasje leest bladmuziek op een chesterfield terwijl vellen om hem heen vliegen",
    width: 1600,
    height: 1066,
  },
  {
    id: "zomerbries-campagne",
    medium: "fotografie",
    category: "concepten",
    shoot: "Zomerbries",
    src: "/media/library/zomerbries-campagne.jpg",
    alt: "Man in badjas met zonnebril tussen opblaasbanden, parasol en ventilatoren op het zand",
    width: 1600,
    height: 1068,
  },
  {
    id: "jijbenm-paviljoen-bezoeker",
    medium: "fotografie",
    category: "concepten",
    shoot: "Jij Bent M",
    src: "/media/cases/jijbenm-paviljoen-bezoeker.webp",
    alt: "Bezoeker staat op de betonnen trappartij bij het paviljoen",
    width: 1600,
    height: 1067,
  },
  {
    id: "jijbenm-landschap-kunstwerk",
    medium: "fotografie",
    category: "concepten",
    shoot: "Jij Bent M",
    src: "/media/cases/jijbenm-landschap-kunstwerk.webp",
    alt: "Weids groen landschap met een betonnen kunstwerk onder een grote wolkenlucht",
    width: 1600,
    height: 1152,
  },

  /* ---- Publicities -------------------------------------------------------- */
  {
    id: "ballonnen-straat",
    medium: "fotografie",
    category: "publicities",
    shoot: "De regio verdient cultuur",
    src: "/media/hero/hero-ballonnen.jpg",
    alt: "Vrouw in wit pak loopt met een tros witte campagneballonnen door een straat",
    width: 2560,
    height: 1708,
  },
  {
    id: "ballonnen-plein",
    medium: "fotografie",
    category: "publicities",
    shoot: "De regio verdient cultuur",
    src: "/media/library/wit-pak-ballonnen.jpg",
    alt: "Vrouw in wit pak met witte ballonnen lacht op een plein terwijl voorbijgangers passeren",
    width: 1200,
    height: 800,
  },
  {
    id: "ballonnen-kinderboekenmuseum",
    medium: "fotografie",
    category: "publicities",
    shoot: "De regio verdient cultuur",
    src: "/media/library/kinderboekenmuseum-ballonnen.jpg",
    alt: "Tros witte ballonnen voor het Kinderboekenmuseum tussen de woontorens",
    width: 600,
    height: 900,
  },
  {
    id: "campagne-opname",
    medium: "fotografie",
    category: "publicities",
    shoot: "De regio verdient cultuur",
    src: "/media/diensten/videografie.jpg",
    alt: "Presentatrice met microfoon wordt op locatie gefilmd voor de campagne",
    width: 1200,
    height: 800,
  },

  /* ---- Drone -------------------------------------------------------------- */
  {
    id: "jijbenm-park-vanuit-de-lucht",
    medium: "fotografie",
    category: "drone",
    shoot: "Jij Bent M",
    src: "/media/cases/jijbenm-park-vanuit-de-lucht.webp",
    alt: "Dronefoto van het park met het kunstwerk, de ronde brug en de skyline van Almere",
    width: 1600,
    height: 1200,
  },
  {
    id: "jijbenm-ring-van-boven",
    medium: "fotografie",
    category: "drone",
    shoot: "Jij Bent M",
    src: "/media/cases/jijbenm-ring-van-boven.webp",
    alt: "Dronefoto recht van boven op de ronde brug en het paviljoen in het water",
    width: 1600,
    height: 1200,
  },
  {
    id: "jijbenm-paviljoen-groepsfoto",
    medium: "fotografie",
    category: "drone",
    shoot: "Jij Bent M",
    src: "/media/cases/jijbenm-paviljoen-groepsfoto.webp",
    alt: "Groep bezoekers poseert op het ronde platform voor het paviljoen van Jij Bent M",
    width: 1600,
    height: 1067,
  },
];

/** Alles binnen één medium, in de volgorde waarin het hierboven staat. */
export function portfolioByMedium(medium: PortfolioMedium): readonly PortfolioItem[] {
  return portfolioItems.filter((item) => item.medium === medium);
}

/** `undefined` staat voor het filter "All". */
export function portfolioByCategory(
  medium: PortfolioMedium,
  category?: PortfolioCategory,
): readonly PortfolioItem[] {
  return portfolioByMedium(medium).filter((item) => !category || item.category === category);
}

/**
 * Aantal beelden per categorie binnen een medium. Een categorie die op nul staat
 * heeft nog geen werk en hoort niet als leeg filter in beeld te komen.
 */
export function portfolioCounts(medium: PortfolioMedium): Record<PortfolioCategory, number> {
  const counts = Object.fromEntries(
    portfolioCategories.map((category) => [category.id, 0]),
  ) as Record<PortfolioCategory, number>;

  for (const item of portfolioByMedium(medium)) counts[item.category] += 1;
  return counts;
}

/** De categorieën die binnen dit medium daadwerkelijk werk hebben. */
export function portfolioActiveCategories(medium: PortfolioMedium): readonly PortfolioCategoryMeta[] {
  const counts = portfolioCounts(medium);
  return portfolioCategories.filter((category) => counts[category.id] > 0);
}
