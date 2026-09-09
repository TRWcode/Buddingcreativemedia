import type { ImageAsset } from "./types";

/**
 * De inhoud van `/over-ons`. De werkwijze-stappen staan bewust niet hier maar
 * blijven in `werkwijze.ts`: die worden op twee plekken gerenderd — als blok op
 * de homepage en als hoofdstuk op deze pagina — en horen dus één bron te hebben.
 */
export const overOnsPage = {
  eyebrow: "Over ons",
  heading: ["Beeld dat", "blijft hangen"],
  metaTitle: "Over ons",
  metaDescription:
    "Budding Creative Media maakt fotografie en video voor merken, bedrijven en events. Gevestigd in Almere, werkzaam door het hele land.",
  intro:
    "Wie we zijn, hoe we werken, en wat de mensen zeggen die ons al eens inhuurden.",
  /**
   * De kop boven het werkwijze-blok op deze pagina. Dat blok deelt zijn tekst
   * met de homepage, maar niet zijn kop: daar staat "Beeld dat blijft hangen"
   * boven, en dat is hier al de titel van de pagina zelf.
   */
  werkwijzeHeading: ["Van eerste", "vraag tot", "oplevering"],
} as const;

export const story = {
  heading: "Wie we zijn",
  paragraphs: [
    "Budding Creative Media zit in Almere en werkt door het hele land — overal waar iets gebeurt dat vastgelegd moet worden. Fotografie en video, voor merken, bedrijven en organisaties.",
    "Het werk loopt uiteen. Een congres van de opbouw tot de borrel, een teamportret waar iedereen zich prettig bij voelt, een aftermovie waarmee je de volgende editie alvast aankondigt.",
    "Daarnaast organiseren we een paar keer per jaar zelf iets: een workshop, een cursus of een portretdag. Wil je ons eerst aan het werk zien voordat je iets laat maken, dan is dat een goede plek om te beginnen.",
  ],
} as const;

/**
 * Eén beeld uit het werk, met het label van de opdracht waar het uit komt.
 *
 * Dat label staat er om dezelfde reden als op `/diensten`: een foto zonder
 * bijschrift is een sfeerplaatje, en met de naam van de opdracht erbij is het
 * bewijs. De labels komen woordelijk overeen met de `shoot` in `portfolio.ts`,
 * want het zijn dezelfde bestanden en dezelfde opdrachten.
 */
export interface StoryImage extends ImageAsset {
  readonly caption: string;
}

/**
 * Het beeld naast de kop van deze pagina.
 *
 * Bewust dit beeld en geen ander: het is met 2560 pixels het enige bestand op
 * deze pagina dat groot genoeg is voor een kader van deze maat. De rest van de
 * beelden hier is 1200 breed, en die worden in een hoog kader zichtbaar zacht.
 *
 * Er staat geen portret van onszelf. Dat portret is er niet, en een gekochte
 * stockfoto van een fotograaf in actie is op de site van een fotograaf het
 * slechtst denkbare beeld.
 */
export const storyHeroImage: StoryImage = {
  caption: "ElasticON",
  src: "/media/library/elastic-on-hoofdpodium.jpg",
  alt: "Spreker met open armen op het hoofdpodium van ElasticON voor een blauw scherm",
  width: 2560,
  height: 1706,
};

/**
 * Drie beelden uit drie hoeken van het vak, als cluster onder het verhaal.
 *
 * De volgorde is de opmaak: de eerste staat staand in een smalle kolom, de
 * twee daarna liggend en breed. Wissel je ze om, wissel dan ook de kaders in
 * `app/over-ons/page.tsx` — een liggende foto in een staand kader snijdt de
 * helft van het onderwerp weg.
 *
 * Alt-teksten komen overeen met die in `portfolio.ts`, want het zijn dezelfde
 * bestanden.
 */
export const storyImages: readonly StoryImage[] = [
  {
    caption: "De regio verdient cultuur",
    src: "/media/library/wit-pak-ballonnen.jpg",
    alt: "Vrouw in wit pak met witte ballonnen lacht op een plein terwijl voorbijgangers passeren",
    width: 1200,
    height: 800,
  },
  {
    caption: "Onderneming van het Jaar",
    src: "/media/library/zaal-publiek.jpg",
    alt: "Volle zaal kijkt naar het podium tijdens de uitreiking",
    width: 1200,
    height: 800,
  },
  {
    caption: "Foodtrucks",
    src: "/media/library/foodtruck-strandclub.jpg",
    alt: "Kok in de doorgeefluik van een foodtruck met een krijtbord vol gerechten",
    width: 1200,
    height: 800,
  },
];

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly name: string;
  /** Het bedrijf, of waar de opdracht over ging als het een particulier was. */
  readonly role: string;
}

/**
 * Overgenomen van de klantenpagina op buddingcreativemedia.nl, woordelijk.
 * Op de oude site stonden ze in een carrousel met stippen eronder, waardoor je
 * er standaard drie zag en de rest alleen als je doorklikte. Hier staan ze
 * gewoon naast elkaar.
 *
 * Woordelijk is hier geen stijlkeuze maar een voorwaarde: dit zijn uitspraken
 * van bestaande klanten met hun naam eronder. Wie ze mooier schrijft legt die
 * mensen woorden in de mond. Aanpassen mag alleen als de klant dat zelf zegt.
 */
export const testimonials: readonly Testimonial[] = [
  {
    id: "ruud",
    quote:
      "Erg blij met de video's die Erwin voor Aeres MBO heeft gemaakt! Professioneel en erg prettig om met hem samen te werken. Als we weer een video-opname of fotoshoot willen doen dan laat ik dat zeker door Erwin Buddingh doen.",
    name: "Ruud",
    role: "Aeres VMBO Almere",
  },
  {
    id: "margrietha",
    quote:
      "Ik kan Erwin aanraden als fotograaf. Hij maakt regelmatig reportages voor Stad & Natuur. Hij weet goed het moment vast te leggen en houdt goed rekening met de wensen van de klant. Inmiddels zijn we ook een samenwerking op het gebied van bewegend beeld aangegaan.",
    name: "Margrietha",
    role: "Stad & Natuur Almere",
  },
  {
    id: "irma",
    quote:
      "Erwin heeft voor mij een zakelijk portret gemaakt. Erwin luisterde goed naar mijn wensen, heeft oog voor detail, maar vooral ook voor de essentie van de foto. Door zijn vriendelijke en open houding was het makkelijker om me te kunnen ontspannen tijdens de fotoshoot en dat zie je terug in het resultaat. Ik zou Erwin zeker aanraden als fotograaf!",
    name: "Irma",
    role: "Zakelijk portret",
  },
];

export const testimonialsIntro = {
  eyebrow: "Wat klanten zeggen",
  title: "Onze klanten",
} as const;
