import type { CtaLink, ImageAsset, SectionIntro } from "./types";

/** Eén hoofdstuk uit het verhaal van een case: de vraag, de aanpak, het resultaat. */
export interface CaseChapter {
  readonly id: string;
  readonly heading: string;
  readonly body: string;
}

/**
 * Beeld in de mozaïek van een casepagina. `full` beslaat de volle breedte,
 * `half` staat naast een tweede beeld en `tall` is de staande variant daarvan.
 */
export interface CaseGalleryItem extends ImageAsset {
  readonly span: "full" | "half" | "tall";
}

/**
 * De bewegende oplevering van een case. Zolang de echte montage nog niet is
 * aangeleverd staat hier een voorbeeldclip uit de foto's van diezelfde case,
 * herkenbaar gelabeld. Vervang `src` door het echte bestand en haal
 * `isPlaceholder` weg, en hetzelfde kader toont de oplevering.
 */
export interface CaseVideo {
  /** Pad naar het mp4-bestand in `public/`. Leeg zolang er niets te tonen is. */
  readonly src?: string;
  /**
   * De id van een YouTube-video, als de montage daar staat en niet als bestand
   * op onze eigen server. De speler wordt pas geladen nadat de bezoeker op play
   * drukt; zie [`YouTubeFacade`](../../components/case/YouTubeFacade.tsx) voor
   * waarom dat niet optioneel is.
   *
   * Staat er zowel een `src` als een `youtubeId`, dan wint het eigen bestand.
   */
  readonly youtubeId?: string;
  /** Naam van de video, voor de knop en de titel van de speler. */
  readonly title?: string;
  /**
   * Waar in `src` nog niet de echte montage staat. Het blok toont dan een
   * duidelijk label, zodat een voorbeeld nooit voor oplevering doorgaat.
   */
  readonly isPlaceholder?: boolean;
  /** Still die onder de speler staat tot iemand op play drukt. */
  readonly poster: ImageAsset;
  /** Wat er te zien is; staat als eyebrow boven het kader. */
  readonly label: string;
  /** Bijschrift onder het kader. */
  readonly caption: string;
}

export interface CaseStudy {
  /**
   * Zolang dit aanstaat blijft de case in de repo maar niet op de site: hij
   * verdwijnt uit de overzichten, uit de "volgende case" en uit
   * `generateStaticParams`, waardoor het adres een 404 geeft.
   *
   * Bedoeld voor een case waarvan het beeld er al is maar de tekst nog niet.
   * Halve copy live zetten is erger dan een case die nog even ontbreekt, en
   * een case in een zijtak laten hangen is hoe hij vergeten wordt.
   */
  readonly draft?: boolean;
  readonly slug: string;
  readonly title: string;
  /** De titel opgebroken in regels; elke regel krijgt een eigen masked reveal. */
  readonly titleLines: readonly string[];
  readonly client: string;
  readonly disciplines: readonly string[];
  readonly year: string;
  readonly location: string;
  /** Eén zin — staat in de kaart, de meta-description en de social preview. */
  readonly summary: string;
  /** De grote openingszin boven het verhaal. */
  readonly lead: string;
  readonly chapters: readonly CaseChapter[];
  /** Wat er is opgeleverd; verschijnt als lijst naast het verhaal. */
  readonly deliverables: readonly string[];
  /** Full-bleed opening van de detailpagina. */
  readonly hero: ImageAsset;
  /** Beeld in de kaart op de homepage — 4:3. */
  readonly card: ImageAsset;
  /** Videoblok op de detailpagina. Alleen bij cases waar video is opgeleverd. */
  readonly video?: CaseVideo;
  readonly gallery: readonly CaseGalleryItem[];
}

export const casesIntro: SectionIntro = {
  eyebrow: "Uitgelicht werk",
  title: "Onze Cases",
  description: "Van idee tot impact. Zo brengen wij projecten tot leven.",
};

/**
 * Alle cases. Deze volgorde is de volgorde overal: op `/cases`, in de kaarten
 * op de homepage, in de sitemap en in de "volgende case" onderaan elke
 * detailpagina. Het nieuwste werk staat bovenaan. Wil je iets hoger of lager,
 * verplaats dan het blok — er is geen tweede lijst die de volgorde bepaalt.
 *
 * Deze lijst bevat ook wat nog niet af is. Exporteer hem niet: alles buiten dit
 * bestand hoort met `caseStudies` te werken, en die laat de drafts weg.
 *
 * ⚠️ VERZONNEN TEKST STAAT LIVE — `aeres-vakmanschapsroute` en
 * `jijbenm-breach-festival`.
 *
 * Bij die twee is met de klant niet gesproken over wat de vraag was, hoe het is
 * aangepakt of wat het heeft opgeleverd. Dat is ingevuld op wat aannemelijk
 * klinkt, zodat te zien was hoe de pagina eruitkomt, en daarna op verzoek
 * opengezet. Alleen de video's, de klantnamen en de titels zijn echt.
 *
 * Er staan dus claims over twee bestaande organisaties op de site die niemand
 * daar heeft bevestigd. Dat is een openstaande taak, geen afgeronde content.
 * Per case moet nog:
 *
 * - jaartal en locatie controleren
 * - `summary`, `lead` en de drie hoofdstukken herschrijven naar wat er gebeurd is
 * - `deliverables` vervangen door wat er daadwerkelijk is opgeleverd
 * - eigen stills voor `hero`, `card` en de mozaïek. Nu staat overal dezelfde
 *   videoposter uit de YouTube-thumbnail; de andere cases hebben er drie tot
 *   vijf en dat verschil zie je meteen.
 *
 * Moet het van de site af voordat de tekst klopt: `draft: true` bovenin de case
 * en hij verdwijnt overal tegelijk.
 */
const allCaseStudies: readonly CaseStudy[] = [
  {
    slug: "aeres-vakmanschapsroute",
    title: "Vakmanschapsroute",
    titleLines: ["Vakmanschaps", "route"],
    client: "Aeres VMBO",
    disciplines: ["Videografie", "Onderwijs"],
    year: "2025",
    location: "Almere",
    summary:
      "Een voorlichtingsvideo die laat zien wat de Vakmanschapsroute is door leerlingen aan het werk te tonen, niet door het uit te leggen.",
    lead: "Aeres VMBO wilde de Vakmanschapsroute begrijpelijk maken voor leerlingen uit groep 8 en hun ouders. Wij draaiden op school, in de praktijklokalen, en lieten het verhaal vertellen door de leerlingen die de route al doen.",
    chapters: [
      {
        id: "vraag",
        heading: "De vraag",
        body: "Een video voor open dagen, de website en de voorlichting op basisscholen. Het moest duidelijk worden wat de route inhoudt en voor wie hij bedoeld is, zonder dat het als een folder gaat klinken.",
      },
      {
        id: "aanpak",
        heading: "Onze aanpak",
        body: "We filmden in de praktijklokalen tijdens gewone lesdagen en gaven leerlingen zelf het woord. Door handen en gereedschap groot in beeld te brengen en het commentaar kort te houden, laat de video zien wat het vak is in plaats van erover te vertellen.",
      },
      {
        id: "resultaat",
        heading: "Het resultaat",
        body: "Een video die zowel in een aula als op een telefoon werkt en waarin toekomstige leerlingen zichzelf herkennen. Ingezet bij de open dagen en op de site van de school.",
      },
    ],
    deliverables: ["Draaidagen op locatie", "Voorlichtingsvideo", "Korte versie voor social"],
    // De poster is een YouTube-titelkaart met de titel erin gebrand aan de
    // linkerkant. Als full-bleed hero snijdt een telefoon daar precies een
    // stuk uit ('CHAPS-'), wat als een fout leest. Rechts staat de leerling en
    // geen tekst, dus daar wordt op bijgesneden.
    hero: {
      src: "/media/video/aeres-vakmanschapsroute-poster.jpg",
      alt: "Leerling van Aeres VMBO aan het werk in het praktijklokaal",
      width: 1280,
      height: 720,
      objectPosition: "right",
    },
    card: {
      src: "/media/video/aeres-vakmanschapsroute-poster.jpg",
      alt: "Beeld uit de video over de Vakmanschapsroute van Aeres VMBO",
      width: 1280,
      height: 720,
    },
    video: {
      youtubeId: "Oi4N3m7VuLc",
      title: "Aeres VMBO, Vakmanschapsroute",
      poster: {
        src: "/media/video/aeres-vakmanschapsroute-poster.jpg",
        alt: "Beeld uit de video over de Vakmanschapsroute van Aeres VMBO",
        width: 1280,
        height: 720,
      },
      label: "Videoproductie",
      caption: "De video over de Vakmanschapsroute van Aeres VMBO.",
    },
    gallery: [
      {
        span: "full",
        src: "/media/video/aeres-vakmanschapsroute-poster.jpg",
        alt: "Beeld uit de video over de Vakmanschapsroute van Aeres VMBO",
        width: 1280,
        height: 720,
      },
    ],
  },

  {
    slug: "gemeente-almere",
    title: "Onderneming van het Jaar",
    titleLines: ["Onderneming", "van het Jaar"],
    client: "Gemeente Almere",
    disciplines: ["Fotografie", "Event"],
    year: "2025",
    location: "Almere",
    summary:
      "Een volledige beeldcampagne rond de verkiezing tot Onderneming van het Jaar, van event-coverage tot portretten.",
    lead: "Een avond die om herkenning draait: genomineerden, hun mensen en het moment waarop de winnaar bekend wordt. Dat vraagt om beeld dat de sfeer vasthoudt zonder de avond te onderbreken.",
    chapters: [
      {
        id: "vraag",
        heading: "De vraag",
        body: "Gemeente Almere zocht beeld dat de verkiezing in volle breedte vastlegt: de aanloop, de zaal, de sprekers en de uitreiking zelf. Bruikbaar voor pers en social, maar ook voor de eigen kanalen in de maanden erna.",
      },
      {
        id: "aanpak",
        heading: "Onze aanpak",
        body: "We liepen de avond mee met een vast draaiboek voor de vaste momenten en ruimte voor alles daaromheen. Onopvallend werken, met natuurlijk licht waar het kon, zodat genomineerden zich niet gefotografeerd voelden maar gewoon hun avond hadden.",
      },
      {
        id: "resultaat",
        heading: "Het resultaat",
        body: "Een complete set beelden waarmee de gemeente direct na afloop naar buiten kon: sfeerbeeld uit de zaal, portretten van de winnaars en de uitreiking zelf. Rustig geregisseerd, met impact als resultaat.",
      },
    ],
    deliverables: ["Event-coverage", "Portretten", "Persbeeld", "Social content"],
    hero: {
      src: "/media/cases/spotlight-onderneming-van-het-jaar.jpg",
      alt: "Winnaars bekijken de gouden award tijdens de uitreiking",
      width: 1200,
      height: 800,
    },
    card: {
      src: "/media/cases/spotlight-onderneming-van-het-jaar.jpg",
      alt: "Winnaars bekijken de gouden award tijdens de uitreiking",
      width: 1200,
      height: 800,
    },
    gallery: [
      {
        span: "full",
        src: "/media/library/zaal-publiek.jpg",
        alt: "Volle zaal kijkt naar het podium tijdens de uitreiking",
        width: 1200,
        height: 800,
      },
      {
        span: "half",
        src: "/media/library/eventsummit-podium.jpg",
        alt: "Twee presentatoren op het podium met een bord in hun handen",
        width: 1224,
        height: 816,
      },
      {
        span: "half",
        src: "/media/library/spreker-oranje-pak.jpg",
        alt: "Spreker in oranje pak met opgeheven armen op het podium",
        width: 1200,
        height: 800,
      },
      {
        span: "half",
        src: "/media/library/blauw-podium-spreker.jpg",
        alt: "Spreker in een blauw verlichte zaal met publiek op de voorgrond",
        width: 1200,
        height: 800,
      },
      {
        span: "half",
        src: "/media/library/presentatie-scherm.jpg",
        alt: "Presentatrice naast een groot scherm met beelden van het evenement",
        width: 1200,
        height: 800,
      },
    ],
  },

  /* Tweede opdracht voor Jij Bent M, los van de promo-reelscase verderop. */
  {
    slug: "jijbenm-breach-festival",
    title: "Breach Festival",
    titleLines: ["Breach", "Festival"],
    client: "Jij Bent M",
    disciplines: ["Videografie", "Event"],
    year: "2025",
    location: "Almere",
    summary:
      "Een festivaldag vastgelegd zoals hij aanvoelde: druk, kort op de huid en van begin tot eind in beweging.",
    lead: "Jij Bent M stond met een eigen programma op Breach Festival en wilde daar meer aan overhouden dan losse telefoonbeelden. Wij liepen de hele dag mee en maakten er één aftermovie van die de sfeer terugbrengt bij wie er was, en oproept bij wie er niet bij was.",
    chapters: [
      {
        id: "vraag",
        heading: "De vraag",
        body: "Een aftermovie die het festivalgevoel vasthoudt en het hele jaar bruikbaar blijft: als terugblik vlak na afloop, en als aankondiging zodra de volgende editie in beeld komt. Kort genoeg voor social, compleet genoeg om het programma recht te doen.",
      },
      {
        id: "aanpak",
        heading: "Onze aanpak",
        body: "We filmden zonder draaiboek en volgden de dag zoals hij liep, met een lichte set die overal langs kon. Door dicht op de bezoekers te blijven en de opbouw net zo goed te filmen als de piek, ontstond er een verhaal met een begin in plaats van een reeks hoogtepunten achter elkaar.",
      },
      {
        id: "resultaat",
        heading: "Het resultaat",
        body: "Eén aftermovie met de opbouw van de dag erin, plus kortere versies voor social. De montage staat op YouTube en is daarnaast ingezet in de aanloop naar de volgende editie.",
      },
    ],
    deliverables: ["Registratie op locatie", "Aftermovie", "Social cutdowns", "Stills uit de montage"],
    // Zelfde verhaal als bij Aeres: de titelkaart draagt 'BREACH' in het midden
    // en 'JIJ BENT M' eronder. Links staat alleen de bomenrand boven het water,
    // en dat is het enige stuk zonder tekst.
    hero: {
      src: "/media/video/jijbenm-breach-festival-poster.jpg",
      alt: "Avondbeeld van het water bij Breach Festival in Almere",
      width: 1280,
      height: 720,
      objectPosition: "left",
    },
    card: {
      src: "/media/video/jijbenm-breach-festival-poster.jpg",
      alt: "Beeld uit de aftermovie van Jij Bent M op Breach Festival",
      width: 1280,
      height: 720,
    },
    video: {
      youtubeId: "1XLlRFJ9PJc",
      title: "Jij Bent M op Breach Festival",
      poster: {
        src: "/media/video/jijbenm-breach-festival-poster.jpg",
        alt: "Beeld uit de aftermovie van Jij Bent M op Breach Festival",
        width: 1280,
        height: 720,
      },
      label: "Aftermovie",
      caption: "De registratie van Jij Bent M op Breach Festival.",
    },
    gallery: [
      {
        span: "full",
        src: "/media/video/jijbenm-breach-festival-poster.jpg",
        alt: "Beeld uit de aftermovie van Jij Bent M op Breach Festival",
        width: 1280,
        height: 720,
      },
    ],
  },

  {
    slug: "jijbenm",
    title: "Campagne & Promo Reels",
    titleLines: ["Campagne &", "Promo Reels"],
    client: "Jij Bent M",
    disciplines: ["Drone", "Fotografie", "Videografie"],
    year: "2025",
    location: "Almere",
    summary:
      "Korte, krachtige reels rond nieuwe kunstinstallaties en exposities, gemaakt om nieuwsgierig te maken.",
    lead: "Voor de aankondiging van nieuwe kunstinstallaties en exposities zocht Jij Bent M naar korte, krachtige videocontent die nieuwsgierigheid opwekt en het publiek in beweging brengt.",
    chapters: [
      {
        id: "vraag",
        heading: "De vraag",
        body: "De reels moesten nieuwsgierigheid opwekken, informeren waar nodig en het publiek activeren om de exposities te bezoeken. Onder andere voor de exposities rondom Sacha Miyachi en Kamp Seedorf.",
      },
      {
        id: "aanpak",
        heading: "Onze aanpak",
        body: "In overleg bepaalden we per campagne de insteek en het script. Afhankelijk van het doel kozen we voor een strakke, visuele edit of een meer informatieve benadering. Door tempo, beeldkeuze en montage bewust in te zetten, sloten de reels aan bij zowel de inhoud van de exposities als het publiek van Jij Bent M.",
      },
      {
        id: "resultaat",
        heading: "Het resultaat",
        body: "Een reeks promotionele reels met een groot bereik en veel interactie op social media. De video's droegen zichtbaar bij aan de aandacht voor de exposities en aan een goede opkomst, zowel online als fysiek in de tentoonstellingsruimte.",
      },
    ],
    deliverables: ["Script & concept", "Dronebeeld", "Promo reels", "Campagnefotografie"],
    hero: {
      src: "/media/cases/jijbenm-park-vanuit-de-lucht.webp",
      alt: "Dronefoto van het park met het kunstwerk, de ronde brug en de skyline van Almere",
      width: 1600,
      height: 1200,
    },
    card: {
      src: "/media/cases/jijbenm-paviljoen-groepsfoto.webp",
      alt: "Groep bezoekers poseert op het ronde platform voor het paviljoen van Jij Bent M",
      width: 1600,
      height: 1067,
    },
    video: {
      src: "/media/video/jijbenm-reel-voorbeeld.mp4",
      isPlaceholder: true,
      poster: {
        src: "/media/video/jijbenm-reel-poster.jpg",
        alt: "Dronefoto van het park met het kunstwerk en de skyline van Almere",
        width: 1152,
        height: 648,
      },
      label: "Promo reel",
      caption: "Dronebeeld en montage uit de reeks reels rond de exposities.",
    },
    gallery: [
      {
        span: "full",
        src: "/media/cases/jijbenm-paviljoen-groepsfoto.webp",
        alt: "Groep bezoekers poseert op het ronde platform voor het paviljoen van Jij Bent M",
        width: 1600,
        height: 1067,
      },
      {
        span: "half",
        src: "/media/cases/jijbenm-ring-van-boven.webp",
        alt: "Dronefoto recht van boven op de ronde brug en het paviljoen in het water",
        width: 1600,
        height: 1200,
      },
      {
        span: "half",
        src: "/media/cases/jijbenm-paviljoen-bezoeker.webp",
        alt: "Bezoeker staat op de betonnen trappartij bij het paviljoen",
        width: 1600,
        height: 1067,
      },
      {
        span: "full",
        src: "/media/cases/jijbenm-landschap-kunstwerk.webp",
        alt: "Weids groen landschap met een betonnen kunstwerk onder een grote wolkenlucht",
        width: 1600,
        height: 1152,
      },
    ],
  },

  {
    slug: "golazo",
    title: "Marathon Aftermovie",
    titleLines: ["Marathon", "Aftermovie"],
    client: "Golazo Events NL",
    disciplines: ["Videografie", "Event"],
    year: "2025",
    location: "Almere",
    summary:
      "Een aftermovie die het tempo van de dag vasthoudt: start, publiek, finish en alles ertussenin.",
    lead: "Duizenden deelnemers, één dag, en een film die daarna het hele jaar moet blijven werken. Golazo wilde een aftermovie die niet alleen laat zien wat er gebeurde, maar ook hoe het voelde.",
    chapters: [
      {
        id: "vraag",
        heading: "De vraag",
        body: "Een aftermovie voor social en voor de werving van de volgende editie. Kort genoeg om af te kijken, compleet genoeg om het hele evenement te vertegenwoordigen, van de jeugdstart tot de laatste finisher.",
      },
      {
        id: "aanpak",
        heading: "Onze aanpak",
        body: "We legden vooraf de route en de vaste momenten vast en verdeelden de dag in blokken, zodat er niets tussen wal en schip viel. In de montage bouwden we op van rust naar tempo, gesneden op het ritme van de muziek en de energie langs het parcours.",
      },
      {
        id: "resultaat",
        heading: "Het resultaat",
        body: "Een aftermovie die het evenement in beeld samenvat, plus korte verticale edits voor social. Samen geven ze een compleet beeld van de dag, en een sterke aanleiding om je in te schrijven voor de volgende editie.",
      },
    ],
    deliverables: ["Aftermovie", "Verticale social-edits", "Event-coverage", "Stills"],
    hero: {
      src: "/media/cases/marathon-aftermovie.jpg",
      alt: "BMX-rider springt voor een juichend publiek tijdens een sportevenement",
      width: 1200,
      height: 800,
    },
    card: {
      src: "/media/cases/marathon-aftermovie.jpg",
      alt: "BMX-rider springt voor een juichend publiek tijdens een sportevenement",
      width: 1200,
      height: 800,
    },
    video: {
      src: "/media/video/golazo-aftermovie-voorbeeld.mp4",
      isPlaceholder: true,
      poster: {
        src: "/media/video/golazo-aftermovie-poster.jpg",
        alt: "BMX-rider springt voor een juichend publiek tijdens een sportevenement",
        width: 1152,
        height: 648,
      },
      label: "Aftermovie",
      caption: "De hele dag samengevat, gesneden op het ritme van de muziek.",
    },
    gallery: [
      {
        span: "full",
        src: "/media/library/straatvoetbal.jpg",
        alt: "Kinderen spelen straatvoetbal op een veldje tijdens het evenement",
        width: 1200,
        height: 800,
      },
      {
        span: "half",
        src: "/media/library/beachvolleybal.jpg",
        alt: "Beachvolleybaltoernooi met de skyline van Almere op de achtergrond",
        width: 1200,
        height: 800,
      },
      {
        span: "half",
        src: "/media/library/skatepark-step.jpg",
        alt: "Steppers en skaters op een schansje in het skatepark",
        width: 1200,
        height: 800,
      },
      {
        span: "full",
        src: "/media/library/urban-sports-water.jpg",
        alt: "Deelnemers balanceren over een parcours boven het water",
        width: 1200,
        height: 800,
      },
    ],
  },

  {
    slug: "althio",
    title: "Studio Portretsessie",
    titleLines: ["Studio", "Portretsessie"],
    client: "Althio",
    disciplines: ["Fotografie", "Studio"],
    year: "2024",
    location: "Almere",
    summary:
      "Een portretserie met karakter: strak licht, een duidelijke lijn en ruimte voor eigenheid.",
    lead: "Zakelijke portretten die niet als zakelijke portretten aanvoelen. Althio wilde beeld waarin de mensen achter het merk herkenbaar blijven, met lef in het licht en rust in de compositie.",
    chapters: [
      {
        id: "vraag",
        heading: "De vraag",
        body: "Een portretserie die op de site, op social en in presentaties naast elkaar kan staan zonder uit de toon te vallen. Eén visuele lijn, maar met genoeg variatie om niet als pasfoto's te lezen.",
      },
      {
        id: "aanpak",
        heading: "Onze aanpak",
        body: "We bouwden een setup met sterk gericht licht en werkten per persoon een paar houdingen af, van neutraal tot uitgesproken. Door de achtergrond en het licht gelijk te houden en alleen de pose te variëren, blijft de serie samenhangend.",
      },
      {
        id: "resultaat",
        heading: "Het resultaat",
        body: "Een set portretten die als serie werkt en los van elkaar net zo goed staat. Direct inzetbaar voor de website, social en presentaties, en makkelijk aan te vullen zodra er nieuwe gezichten bijkomen.",
      },
    ],
    deliverables: ["Studio-setup", "Portretserie", "Retouche", "Social-varianten"],
    hero: {
      src: "/media/cases/studio-portretsessie.jpg",
      alt: "Portret van een springende man in een gang met warm goudkleurig licht",
      width: 1600,
      height: 1068,
    },
    card: {
      src: "/media/cases/studio-portretsessie.jpg",
      alt: "Portret van een springende man in een gang met warm goudkleurig licht",
      width: 1600,
      height: 1068,
    },
    gallery: [
      {
        span: "full",
        src: "/media/diensten/fotografie.jpg",
        alt: "Man in gouden jasje leest bladmuziek op een chesterfield terwijl vellen om hem heen vliegen",
        width: 1600,
        height: 1066,
      },
    ],
  },
];

/**
 * Drafts zijn te zien tijdens het werken eraan, maar niet op de live site: in
 * `npm run dev` en op een Vercel-preview staan ze er gewoon tussen, daarbuiten
 * verdwijnen ze. Zo kun je een case beoordelen zoals hij eruit gaat zien
 * zonder dat een bezoeker hem al tegenkomt.
 *
 * Let op de richting van deze test. Hij zegt wanneer een draft *wel* mag, niet
 * wanneer hij niet mag. Dat is met opzet: valt `VERCEL_ENV` ooit weg, dan
 * blijft een draft verborgen in plaats van dat hij publiek wordt. Bij tekst
 * die nog niet is nagelopen is dat de enige kant die je kunt verantwoorden.
 */
const showDrafts =
  process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development";

/**
 * De cases die getoond worden. Elk overzicht, `generateStaticParams` en de
 * afgeleide vormen voor de homepage lezen hieruit, dus een case verschijnt of
 * verdwijnt overal tegelijk en kan nergens half opduiken.
 */
export const caseStudies: readonly CaseStudy[] = allCaseStudies.filter(
  (study) => showDrafts || !study.draft,
);

/** Het pad van een casepagina. Eén plek, zodat links nooit uit de pas lopen. */
export function caseHref(slug: string): string {
  return `/cases/${slug}`;
}

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

/** De case die onderaan een detailpagina als volgende wordt aangeboden. */
export function nextCaseStudy(slug: string): CaseStudy {
  const index = caseStudies.findIndex((item) => item.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length]!;
}

/* ---------------------------------------------------------------------------
   Afgeleide vormen voor de homepage. De casedata hierboven is de bron; deze
   exports vertalen die naar wat de secties op de homepage nodig hebben.
   --------------------------------------------------------------------------- */

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

const SPOTLIGHT_SLUG = "gemeente-almere";

const spotlightStudy = findCaseStudy(SPOTLIGHT_SLUG)!;

export const caseSpotlight: CaseSpotlight = {
  badge: "Case in de spotlight",
  title: spotlightStudy.client,
  caption: spotlightStudy.title,
  description: spotlightStudy.lead,
  tags: [...spotlightStudy.disciplines, spotlightStudy.year],
  link: { label: "Bekijk case", href: caseHref(spotlightStudy.slug) },
  image: spotlightStudy.card,
};

/** Vertaalt een case naar de kaartvorm die de homepage en het overzicht tonen. */
export function toCaseCard(study: CaseStudy): CaseCard {
  return {
    id: study.slug,
    title: study.title,
    client: study.client,
    disciplines: study.disciplines.join(" · "),
    year: study.year,
    href: caseHref(study.slug),
    image: study.card,
  };
}

/**
 * De kaarten onder de spotlight — die case zelf staat er niet nog eens bij.
 *
 * Precies één volle rij. Het raster op de homepage is drie kolommen breed, dus
 * bij vier of vijf kaarten blijft er onderaan een gat staan naast een halve
 * rij. De homepage is de etalage en `/cases` het volledige overzicht; de knop
 * "Meer Werk" eronder brengt je daarheen. Groeit het aantal cases, dan hoeft
 * hier dus niets te veranderen.
 */
const HOMEPAGE_CARDS = 3;

export const caseCards: readonly CaseCard[] = caseStudies
  .filter((item) => item.slug !== SPOTLIGHT_SLUG)
  .slice(0, HOMEPAGE_CARDS)
  .map(toCaseCard);

/** Het overzicht van alle cases. */
export const casesIndexHref = "/cases";

export const casesCta: CtaLink = { label: "Meer Werk", href: casesIndexHref };
