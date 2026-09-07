import { casesHref, portfolioHref } from "./site";
import type { CtaLink, ImageAsset, SectionIntro } from "./types";

export type ServiceIcon = "camera" | "video";

/**
 * Eén concrete opdracht die je bij ons kunt neerleggen — "Aftermovie",
 * "Zakelijk portret". Dit is de laag die op de oude site in twee carrousels
 * verstopt zat: je moest doorklikken om te zien wat er te koop was, en wat je
 * zag was een rij foto's met een woord eroverheen.
 *
 * Elk item draagt twee schrijflagen, want het staat op twee plekken:
 *
 * - `summary` is de regel op de homepage. Bewust kort — het is de zin die het
 *   verschil uitlegt tussen twee namen die op elkaar lijken (fashion versus
 *   concept, reel versus bedrijfsvideo). Meer dan een regel of zeven woorden en
 *   de lijst daar wordt weer een tekstblok.
 * - `body` en `examples` staan alleen op `/diensten`, waar iemand komt die het
 *   wél wil weten.
 *
 * Twee lagen in één object en niet twee lijsten naast elkaar: een dienst die
 * erbij komt of van naam verandert hoort niet op de ene plek al te kloppen en
 * op de andere nog niet.
 */
export interface ServiceItem {
  readonly name: string;
  readonly summary: string;
  readonly body: string;
  /** Waar deze dienst meestal voor wordt ingezet; los opgesomd op de detailpagina. */
  readonly examples: readonly string[];
  /**
   * Eén beeld uit echt werk in deze dienst, naast de tekst op `/diensten`.
   *
   * Bewust een bestaande foto uit het portfolio of uit een case, met de
   * alt-tekst die daar ook al bij staat. Een dienstenpagina van een fotograaf
   * die zijn diensten met tekst uitlegt en zijn foto's ergens anders bewaart
   * bewijst zijn eigen verhaal niet; en het beeld dat erbij komt hoort dan wel
   * werk te zijn dat we echt gemaakt hebben, geen sfeerplaatje.
   */
  readonly thumb: ImageAsset;
}

export interface Service {
  readonly id: string;
  readonly icon: ServiceIcon;
  readonly title: string;
  readonly description: string;
  /** De langere aanloop op `/diensten`; op de homepage staat alleen `description`. */
  readonly lead: string;
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

/** De kop van `/diensten`. Zelfde vorm als `eventsPage`, zodat paginakoppen op één plek staan. */
export const servicesPage = {
  eyebrow: "Wat we doen",
  heading: ["Onze", "Diensten"],
  metaTitle: "Diensten",
  metaDescription:
    "Fotografie en videografie voor merken, bedrijven en events: bedrijfsreportage, eventfotografie, zakelijk portret, aftermovie, bedrijfsvideo, reels en dronebeeld.",
  intro:
    "Twee disciplines, en daarbinnen het werk waar we het vaakst voor gevraagd worden. Per dienst staat wat het inhoudt en waar hij meestal voor wordt ingezet, zodat je zelf kunt zien wat bij je vraag past.",
} as const;

export const services: readonly Service[] = [
  {
    id: "fotografie",
    icon: "camera",
    title: "Fotografie",
    description:
      "Foto's waar je jaren mee vooruit kunt — op de werkvloer, op het podium en voor de camera.",
    lead: "Foto's waar je jaren mee vooruit kunt. We werken snel op locatie, houden rekening met iedereen die ondertussen doorwerkt, en leveren een selectie die je meteen op je site, in je vacatures en op social kunt zetten.",
    items: [
      {
        name: "Bedrijfsreportage",
        summary: "Je mensen, je pand, je werk in beeld",
        body: "Een dagdeel of een hele dag meelopen en vastleggen hoe het er bij jullie werkelijk aan toegaat: de mensen, de ruimte en het werk zelf. Je houdt er een beeldbank aan over in plaats van drie losse foto's.",
        examples: ["Kantoor en werkvloer", "Team aan het werk", "Horeca, retail en productie"],
        thumb: {
          src: "/media/events/mini-shoot-almere.jpg",
          alt: "Vrouw met een kop koffie achter haar laptop in de flexwerkruimte van Daily Workspace",
          width: 1600,
          height: 1068,
        },
      },
      {
        name: "Events",
        summary: "Congres, beurs, sport of podium",
        body: "Van de opbouw tot de laatste handdruk. We lopen mee met het programma en weten wanneer we vooraan moeten staan en wanneer juist niet, zodat de dag terug te zien is zoals hij was.",
        examples: ["Congres en beurs", "Podium en keynote", "Sport en publieksdagen"],
        thumb: {
          src: "/media/library/eventsummit-podium.jpg",
          alt: "Twee presentatoren op het podium met een bord in hun handen",
          width: 1224,
          height: 816,
        },
      },
      {
        name: "Zakelijk portret",
        summary: "Eén gezicht of het hele team",
        body: "Een portret waarop je jezelf herkent en dat naast dat van je collega's kan staan. In dezelfde opzet voor iedereen, zodat een teampagina één geheel blijft in plaats van een verzameling losse foto's.",
        examples: ["LinkedIn en website", "Teamserie in één stijl", "Op locatie of in de studio"],
        thumb: {
          src: "/media/cases/studio-portretsessie.jpg",
          alt: "Portret van een springende man in een gang met warm goudkleurig licht",
          width: 1600,
          height: 1068,
        },
      },
      {
        name: "Fashion & concept",
        summary: "Geregisseerd, met styling en licht",
        body: "Beeld dat we eerst bedenken en dan bouwen. Styling, set en licht zijn hier het middel en niet de omstandigheid — voor een lookbook, een campagne of een merkverhaal dat om iets eigens vraagt.",
        examples: ["Lookbook en collectie", "Geregisseerde set", "Merkverhaal"],
        thumb: {
          src: "/media/library/zomerbries-campagne.jpg",
          alt: "Man in badjas met zonnebril tussen opblaasbanden, parasol en ventilatoren op het zand",
          width: 1600,
          height: 1068,
        },
      },
      {
        name: "Campagnebeeld",
        summary: "Voor je advertentie of actie",
        body: "Eén beeld dat de hele boodschap moet dragen. We denken vooraf mee over waar het komt te hangen en houden daar de uitsnede op aan, want een abri vraagt iets anders dan een tijdlijn.",
        examples: ["Abri en print", "Advertentie en social", "Publieksactie"],
        thumb: {
          src: "/media/library/wit-pak-ballonnen.jpg",
          alt: "Vrouw in wit pak met witte ballonnen lacht op een plein terwijl voorbijgangers passeren",
          width: 1200,
          height: 800,
        },
      },
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
    description:
      "Video die blijft hangen: kort, helder en gemaakt voor het kanaal waar hij terechtkomt.",
    lead: "Video die blijft hangen. We denken mee over de opzet voordat er iets draait, filmen efficiënt op locatie en monteren naar het kanaal waar het terechtkomt — een aftermovie kijkt nu eenmaal anders dan een reel.",
    items: [
      {
        name: "Aftermovie",
        summary: "Je hele dag terug in twee minuten",
        body: "De sfeer van je dag terug in een minuut of twee. We draaien mee tijdens het programma en monteren op muziek, tot iets wat bezoekers uit zichzelf doorsturen en waarmee je de editie erna alvast aankondigt.",
        examples: ["Festival en evenement", "Congres en beurs", "Sportdag"],
        thumb: {
          src: "/media/video/golazo-aftermovie-poster.jpg",
          alt: "BMX-rider springt voor een juichend publiek tijdens een sportevenement",
          width: 1152,
          height: 648,
        },
      },
      {
        name: "Bedrijfsvideo",
        summary: "Uitleg, promotie of bedrijfsprofiel",
        body: "Uitleggen wat je doet, laten zien wie je bent of een dienst promoten. We denken mee over de opzet, draaien efficiënt op locatie en leveren in de lengtes die je nodig hebt.",
        examples: ["Bedrijfsprofiel", "Uitlegvideo", "Werken bij"],
        thumb: {
          src: "/media/video/aeres-vakmanschapsroute-poster.jpg",
          alt: "Leerling van Aeres VMBO aan het werk in het praktijklokaal",
          width: 1280,
          height: 720,
        },
      },
      {
        name: "Reels & shorts",
        summary: "Verticaal en kort, klaar voor social",
        body: "Verticaal, kort en gemaakt om in een tijdlijn te blijven hangen. Vaak draaien we ze mee tijdens een grotere opdracht, zodat je naast de lange video meteen materiaal hebt voor de weken erna.",
        examples: ["Instagram en TikTok", "YouTube Shorts", "Naast een grotere opdracht"],
        thumb: {
          src: "/media/video/showreel-poster.jpg",
          alt: "Cameraman filmt met een gimbal tussen de banners op een onderwijsevenement",
          width: 1600,
          height: 1028,
        },
      },
      {
        name: "Dronebeeld",
        summary: "Locatie en schaal vanuit de lucht",
        body: "Laten zien hoe groot het terrein is, hoe vol het plein stond of waar het gebouw precies ligt. Meestal een laag binnen een grotere video, soms is het luchtbeeld het hele verhaal.",
        examples: ["Terrein en gebouw", "Overzicht van een event", "Landschap en locatie"],
        thumb: {
          src: "/media/cases/jijbenm-ring-van-boven.webp",
          alt: "Dronefoto recht van boven op de ronde brug en het paviljoen in het water",
          width: 1600,
          height: 1200,
        },
      },
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
