import { company } from "./legal";
import type { LegalBlock, LegalDocument } from "./legal";
import { site } from "./site";

/**
 * De identificatie van de verwerkingsverantwoordelijke. Wordt opgebouwd uit
 * `company`, zodat een leeg KvK-nummer of btw-id geen halve zin oplevert maar
 * gewoon wegvalt. Vul die velden in: een privacyverklaring hoort de
 * verantwoordelijke identificeerbaar te maken, en het KvK-nummer is daarvoor
 * het gebruikelijke anker.
 */
const identification: LegalBlock[] = [
  {
    kind: "text",
    text: `${company.legalName} is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze verklaring. Wij zijn een foto- en videografiebedrijf gevestigd in ${company.city}.`,
  },
];

const registration = [
  company.kvk ? `KvK-nummer: ${company.kvk}` : null,
  company.vat ? `Btw-identificatienummer: ${company.vat}` : null,
  company.street ? `Adres: ${company.street}, ${company.postalCode} ${company.city}` : null,
  `E-mail: ${site.email}`,
].filter((line): line is string => line !== null);

/**
 * De privacyverklaring. Anders dan de algemene voorwaarden is dit geen
 * aangeleverde tekst maar een beschrijving van wat deze website en dit bedrijf
 * feitelijk doen. Verandert dat, dan verandert deze tekst mee.
 *
 * Wat hier staat klopt met de code: er is geen database, het contactformulier
 * mailt alleen door, en de lettertypen staan in `app/fonts/` in plaats van bij
 * Google. De YouTube-video's op de casepagina's laden pas na een klik, en de
 * posters daarvan staan lokaal — precies daarom kan artikel 5.1 nog steeds
 * zeggen dat er geen banner nodig is. Zet je een van die dingen om, dan is dit
 * bestand niet meer waar en moet het mee.
 */
export const privacy: LegalDocument = {
  eyebrow: "Juridisch",
  heading: ["Privacy", "verklaring"],
  metaTitle: "Privacyverklaring",
  metaDescription:
    "Hoe Budding Creative Media omgaat met persoonsgegevens: wat we vastleggen via het contactformulier, hoe lang we het bewaren en welke rechten je hebt.",
  intro:
    "Wij verwerken zo min mogelijk persoonsgegevens en verkopen niets door. Deze verklaring beschrijft precies welke gegevens wij vastleggen, waarom dat gebeurt, hoe lang we ze bewaren en wat je daaraan kunt veranderen.",
  updated: "2026-08-26",
  articles: [
    {
      id: "wie-wij-zijn",
      number: "1",
      title: "Wie wij zijn",
      blocks: [
        ...identification,
        { kind: "list", items: registration },
        {
          kind: "text",
          text: "Heb je een vraag over je gegevens, dan is dat e-mailadres het adres waar je moet zijn. Je krijgt binnen een maand antwoord.",
        },
      ],
    },
    {
      id: "wanneer",
      number: "2",
      title: "Wanneer wij persoonsgegevens verwerken",
      blocks: [
        {
          kind: "text",
          text: "Er zijn drie momenten waarop wij gegevens van je verwerken:",
        },
        {
          kind: "list",
          items: [
            "je stuurt ons een bericht via het contactformulier, per e-mail, telefonisch of via social media",
            "je geeft ons een opdracht en wij leggen die vast, voeren hem uit en factureren hem",
            "je bezoekt deze website",
          ],
        },
        {
          kind: "text",
          text: "Daarbuiten verzamelen wij niets. Wij kopen geen adresbestanden aan, wij verrijken je gegevens niet met externe bronnen en wij hebben geen nieuwsbrief waarvoor je ongemerkt wordt aangemeld.",
        },
      ],
    },
    {
      id: "contactformulier",
      number: "3",
      title: "Het contactformulier",
      blocks: [
        {
          kind: "clause",
          number: "3.1",
          text: "Als je het contactformulier invult, verwerken wij de gegevens die je zelf in dat formulier zet:",
        },
        {
          kind: "list",
          items: [
            "je naam",
            "je e-mailadres",
            "je telefoonnummer, als je dat invult",
            "het soort opdracht, de gewenste datum of periode en de locatie, als je die invult",
            "de inhoud van je bericht",
          ],
        },
        {
          kind: "clause",
          number: "3.2",
          text: "Wij gebruiken die gegevens uitsluitend om je aanvraag te beantwoorden en om een eventuele opdracht voor te bereiden. De grondslag daarvoor is de uitvoering van een overeenkomst of de stappen die daaraan voorafgaan op jouw verzoek (artikel 6 lid 1 sub b AVG).",
        },
        {
          kind: "clause",
          number: "3.3",
          text: "Het formulier slaat niets op. Deze website heeft geen database en geen klantenadministratie: wat je invult wordt omgezet in een e-mail naar ons en verdwijnt daarna van de server. De aanvraag bestaat dus alleen nog als bericht in onze mailbox.",
        },
        {
          kind: "clause",
          number: "3.4",
          text: "Wij bewaren een aanvraag die niet tot een opdracht leidt maximaal twaalf maanden, zodat we een gesprek dat later alsnog terugkomt kunnen terugvinden. Daarna verwijderen wij het bericht. Leidt de aanvraag wel tot een opdracht, dan geldt de bewaartermijn uit artikel 6.",
        },
        {
          kind: "clause",
          number: "3.5",
          text: "Het formulier bevat een verborgen veld dat voor bezoekers onzichtbaar is en alleen door geautomatiseerde invulsoftware wordt ingevuld. Is dat veld ingevuld, dan verwerken wij het bericht niet. Wij gebruiken hiervoor bewust geen captcha, omdat een captcha van een derde partij meer over jou zou vastleggen dan het probleem rechtvaardigt.",
        },
      ],
    },
    {
      id: "opdracht",
      number: "4",
      title: "Gegevens bij een opdracht",
      blocks: [
        {
          kind: "clause",
          number: "4.1",
          text: "Geef je ons een opdracht, dan verwerken wij daarnaast de gegevens die nodig zijn om die opdracht uit te voeren en te administreren: bedrijfsnaam, contactpersoon, factuuradres, KvK- en btw-nummer, de afspraken over de opdracht en de gegevens van de betaling.",
        },
        {
          kind: "clause",
          number: "4.2",
          text: "De grondslag is de uitvoering van de overeenkomst en, voor de facturatie, onze wettelijke administratieplicht (artikel 6 lid 1 sub b en sub c AVG).",
        },
        {
          kind: "clause",
          number: "4.3",
          text: "Facturen en de bijbehorende gegevens bewaren wij zeven jaar, omdat de Belastingdienst ons daartoe verplicht. Correspondentie rond een opdracht bewaren wij niet langer dan nodig is voor de nazorg en eventuele garantie op het geleverde werk.",
        },
      ],
    },
    {
      id: "website",
      number: "5",
      title: "Bezoek aan deze website",
      blocks: [
        {
          kind: "clause",
          number: "5.1",
          text: "Deze website plaatst zelf geen cookies, en dus ook geen tracking-, advertentie- of profileringscookies. Daarom zie je hier geen cookiebanner: zolang je gewoon rondkijkt valt er niets te weigeren. De enige uitzondering staat in artikel 5.5 en gaat pas spelen als je zelf een video aanzet.",
        },
        {
          kind: "clause",
          number: "5.2",
          text: "Onze hostingpartij legt in serverlogs technische gegevens vast die bij elk bezoek aan een website ontstaan, zoals het opgevraagde adres, het tijdstip, het type browser en een IP-adres. Die logs zijn er voor de beveiliging en om storingen op te sporen. Wij gebruiken ze niet om bezoekers te volgen en koppelen ze niet aan personen.",
        },
        {
          kind: "clause",
          number: "5.3",
          text: "Voor bezoekersstatistieken gebruiken wij Vercel Analytics. Die meting werkt zonder cookies en zonder herkenning van individuele bezoekers: er wordt geen profiel opgebouwd en er is geen manier om een bezoek naar jou te herleiden. Wij zien er alleen aan af welke pagina's hoe vaak worden bekeken.",
        },
        {
          kind: "clause",
          number: "5.4",
          text: "De lettertypen op deze site staan op onze eigen server en worden niet bij Google opgehaald. Je browser legt tijdens een gewoon bezoek dus geen verbinding met partijen die jou zouden kunnen volgen.",
        },
        {
          kind: "clause",
          number: "5.5",
          text: "Op sommige casepagina's staat een video die bij YouTube gehost wordt. Die speler wordt niet meegeladen met de pagina: je ziet eerst een stilstaand beeld dat van onze eigen server komt, met de melding erbij. Pas als je zelf op afspelen klikt, wordt YouTube geladen en kan Google cookies plaatsen en gegevens over je kijkgedrag verwerken. Klik je niet, dan gebeurt er niets en legt je browser ook geen verbinding met Google.",
        },
        {
          kind: "clause",
          number: "5.6",
          text: "Wij gebruiken daarvoor het domein youtube-nocookie.com, dat minder vastlegt dan de gewone speler. Zodra de video draait geldt het privacybeleid van Google, waar wij geen invloed op hebben.",
        },
        {
          kind: "clause",
          number: "5.7",
          text: "Klik je op een link naar een social-mediakanaal, dan verlaat je deze website en gelden vanaf dat moment de voorwaarden en het privacybeleid van dat platform.",
        },
      ],
    },
    {
      id: "beeldmateriaal",
      number: "6",
      title: "Beeldmateriaal en portretrecht",
      blocks: [
        {
          kind: "clause",
          number: "6.1",
          text: "Een foto of video waarop je herkenbaar in beeld bent, is een persoonsgegeven. Op deze website en op onze social-mediakanalen tonen wij werk uit opdrachten, en daar staan mensen op.",
        },
        {
          kind: "clause",
          number: "6.2",
          text: "Bij een opdracht is de opdrachtgever verantwoordelijk voor het informeren van medewerkers, bezoekers of deelnemers dat er opnames worden gemaakt, en voor het regelen van de benodigde toestemming. Dat staat ook in artikel 13 van onze algemene voorwaarden.",
        },
        {
          kind: "clause",
          number: "6.3",
          text: "Sta je herkenbaar op beeld dat wij publiceren en wil je dat niet, laat het ons dan weten via het e-mailadres bovenaan deze verklaring. Wij halen het beeld dan weg bij de kanalen die wij zelf beheren. Wij vragen niet om een reden.",
        },
        {
          kind: "clause",
          number: "6.4",
          text: "Opgeleverd werk bewaren wij maximaal twaalf maanden na levering, zoals beschreven in artikel 5 van onze algemene voorwaarden. Onbewerkte opnames bewaren wij niet langer dan nodig is om de opdracht af te maken.",
        },
      ],
    },
    {
      id: "verwerkers",
      number: "7",
      title: "Partijen die jouw gegevens verwerken",
      blocks: [
        {
          kind: "text",
          text: "Wij schakelen een klein aantal dienstverleners in die jouw gegevens namens ons verwerken. Met elk van hen is een verwerkersovereenkomst gesloten. Verder verstrekken wij niets aan derden, tenzij de wet ons daartoe verplicht.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Vercel",
              text: "hosting van deze website en de bezoekersstatistieken. Verwerkt de serverlogs uit artikel 5.2.",
            },
            {
              term: "Resend",
              text: "bezorging van de e-mail die uit het contactformulier ontstaat. Verwerkt de inhoud van dat bericht op het moment van verzenden.",
            },
            {
              term: "Onze e-mailprovider",
              text: "de mailbox waarin je bericht aankomt en bewaard blijft.",
            },
          ],
        },
        {
          kind: "text",
          text: "Wij verkopen jouw gegevens niet, verhuren ze niet en gebruiken ze niet voor advertenties.",
        },
      ],
    },
    {
      id: "doorgifte",
      number: "8",
      title: "Doorgifte buiten de Europese Economische Ruimte",
      blocks: [
        {
          kind: "text",
          text: "Vercel en Resend zijn Amerikaanse ondernemingen. Verwerking van jouw gegevens kan daardoor deels buiten de EER plaatsvinden. Die doorgifte is afgedekt met de standaardcontractbepalingen van de Europese Commissie, die deel uitmaken van de verwerkersovereenkomst met beide partijen.",
        },
      ],
    },
    {
      id: "beveiliging",
      number: "9",
      title: "Beveiliging",
      blocks: [
        {
          kind: "text",
          text: "Deze website is uitsluitend via een versleutelde verbinding (https) bereikbaar, zodat wat je in het formulier typt onderweg niet meegelezen kan worden. Onze accounts en mailbox zijn beveiligd met tweefactorauthenticatie. Omdat de website zelf geen gegevens opslaat, is er ook geen database die gelekt kan worden.",
        },
        {
          kind: "text",
          text: "Vermoed je desondanks dat er iets misgaat met jouw gegevens, meld het ons dan direct via het e-mailadres bovenaan deze verklaring.",
        },
      ],
    },
    {
      id: "rechten",
      number: "10",
      title: "Jouw rechten",
      blocks: [
        { kind: "text", text: "Je hebt tegenover ons de volgende rechten:" },
        {
          kind: "list",
          items: [
            "inzage: je mag opvragen welke gegevens wij van je hebben",
            "rectificatie: je mag onjuiste gegevens laten corrigeren",
            "verwijdering: je mag ons vragen je gegevens te wissen, behalve wat wij wettelijk moeten bewaren",
            "beperking: je mag ons vragen de verwerking tijdelijk stil te leggen",
            "bezwaar: je mag bezwaar maken tegen verwerking op grond van een gerechtvaardigd belang",
            "overdraagbaarheid: je mag je gegevens in een gangbaar bestandsformaat ontvangen",
            "intrekken van toestemming: heb je ergens toestemming voor gegeven, dan mag je die op elk moment intrekken",
          ],
        },
        {
          kind: "text",
          text: "Een verzoek stuur je naar het e-mailadres bovenaan deze verklaring. Wij reageren binnen een maand. Om te voorkomen dat wij gegevens aan de verkeerde persoon geven, kunnen wij je vragen je verzoek te sturen vanaf het e-mailadres dat bij ons bekend is.",
        },
      ],
    },
    {
      id: "besluitvorming",
      number: "11",
      title: "Geen geautomatiseerde besluitvorming",
      blocks: [
        {
          kind: "text",
          text: "Wij nemen geen besluiten over jou op basis van geautomatiseerde verwerking, en wij stellen geen profielen samen. Elke reactie op een aanvraag komt van een mens.",
        },
      ],
    },
    {
      id: "klacht",
      number: "12",
      title: "Klacht indienen",
      blocks: [
        {
          kind: "text",
          text: "Kom je er met ons niet uit, dan heb je het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens, de Nederlandse toezichthouder op het gebied van privacybescherming. Dat kan via autoriteitpersoonsgegevens.nl.",
        },
      ],
    },
    {
      id: "wijzigingen",
      number: "13",
      title: "Wijzigingen in deze verklaring",
      blocks: [
        {
          kind: "text",
          text: "Verandert er iets aan onze werkwijze of aan de diensten die wij inschakelen, dan passen wij deze verklaring aan. De datum onderaan geeft aan wanneer dat voor het laatst is gebeurd. Er bestaat geen oudere versie die stilzwijgend blijft gelden.",
        },
      ],
    },
  ],
};
