import type { LegalDocument } from "./legal";

/**
 * De algemene voorwaarden, woordelijk overgenomen uit het aangeleverde
 * document. Alleen de opmaak is van ons: het artikelnummer staat als los veld
 * naast de titel in plaats van als "Artikel 1 – Definities" in één regel, en
 * de leden hangen aan hun nummer. Er is geen woord aan de tekst veranderd.
 *
 * Eén uitzondering, en die staat er ter plekke bij: artikel 6.4 eindigde in de
 * bron zonder punt. Die is toegevoegd.
 *
 * Pas hier verder niets aan zonder dat de bron meeverandert. Wat hier staat is
 * wat de Opdrachtgever bij het aangaan van de overeenkomst aanvaardt.
 *
 * Wat hier bewust níét is rechtgezet: artikel 6.2 kent een trede "tot 7
 * kalenderdagen" en een trede "binnen 48 uur", waardoor de dagen daartussen
 * onder de laagste trede vallen. Dat is een inhoudelijke keuze over geld en
 * hoort door de opdrachtnemer gemaakt te worden, niet hier.
 */
export const terms: LegalDocument = {
  eyebrow: "Juridisch",
  heading: ["Algemene", "voorwaarden"],
  metaTitle: "Algemene voorwaarden",
  metaDescription:
    "De algemene voorwaarden van Budding Creative Media: offertes, uitvoering, auteursrecht, gebruiksrecht, levering, revisies en aansprakelijkheid.",
  intro:
    "Deze voorwaarden gelden voor alle offertes, opdrachten en leveringen van Budding Creative Media. Ze beschrijven wat je van ons mag verwachten en wat wij van jou nodig hebben om een opdracht goed uit te voeren.",
  updated: "2026-08-25",
  articles: [
    {
      id: "artikel-1",
      number: "1",
      title: "Definities",
      blocks: [
        { kind: "text", text: "In deze voorwaarden wordt verstaan onder:" },
        {
          kind: "definitions",
          items: [
            { term: "Opdrachtnemer", text: "Budding Creative Media, gevestigd in Almere." },
            {
              term: "Opdrachtgever",
              text: "iedere natuurlijke of rechtspersoon die een overeenkomst aangaat met Opdrachtnemer.",
            },
            {
              term: "Overeenkomst / Opdracht",
              text: "de mondelinge of schriftelijke afspraken tussen Opdrachtgever en Opdrachtnemer betreffende werkzaamheden.",
            },
            {
              term: "Werk",
              text: "alle door Opdrachtnemer gemaakte foto's, video's, animaties, edits, ontwerpen en andere visuele creaties.",
            },
            {
              term: "Gebruik",
              text: "iedere vorm van openbaarmaking, verveelvoudiging of verspreiding van het Werk, zowel online als offline.",
            },
          ],
        },
      ],
    },
    {
      id: "artikel-2",
      number: "2",
      title: "Toepasselijkheid",
      blocks: [
        {
          kind: "clause",
          number: "2.1",
          text: "Deze algemene voorwaarden zijn van toepassing op alle offertes, opdrachten, werkzaamheden en leveringen door Opdrachtnemer.",
        },
        {
          kind: "clause",
          number: "2.2",
          text: "Afwijkingen op deze voorwaarden zijn slechts geldig indien deze uitdrukkelijk en schriftelijk door Opdrachtnemer zijn bevestigd.",
        },
        {
          kind: "clause",
          number: "2.3",
          text: "Algemene (inkoop)voorwaarden van Opdrachtgever worden uitdrukkelijk van de hand gewezen.",
        },
      ],
    },
    {
      id: "artikel-3",
      number: "3",
      title: "Offertes, prijzen en extra kosten",
      blocks: [
        {
          kind: "clause",
          number: "3.1",
          text: "Alle door Opdrachtnemer uitgebrachte offertes zijn 14 dagen geldig, tenzij anders vooraf overeengekomen.",
        },
        { kind: "clause", number: "3.2", text: "Tenzij anders vermeld, zijn alle prijzen:" },
        {
          kind: "list",
          items: [
            "exclusief btw",
            "exclusief reis-, locatie- en parkeerkosten",
            "exclusief huur van apparatuur en overige onkosten",
          ],
        },
        {
          kind: "clause",
          number: "3.3",
          text: "Meerwerk dat niet in de oorspronkelijke offerte is opgenomen, wordt aanvullend gefactureerd tegen het op dat moment geldende uurtarief.",
        },
        {
          kind: "clause",
          number: "3.4",
          text: "Bij opdrachten met een waarde boven € 1.000,- kan Opdrachtnemer een aanbetaling van 25% van het offertebedrag verlangen.",
        },
        {
          kind: "clause",
          number: "3.5",
          text: "Eventuele toeslagen voor spoedleveringen of weekend- en avondwerk worden vooraf gecommuniceerd en schriftelijk bevestigd.",
        },
        {
          kind: "clause",
          number: "3.6",
          text: "De in dit artikel genoemde voorwaarden en prijzen gelden, tenzij anders vooraf overeengekomen.",
        },
      ],
    },
    {
      id: "artikel-4",
      number: "4",
      title: "Uitvoering van de opdracht",
      blocks: [
        {
          kind: "clause",
          number: "4.1",
          text: "Opdrachtnemer voert de opdracht uit naar eigen professioneel inzicht en met de zorg die van een redelijk handelend vakgenoot verwacht mag worden.",
        },
        {
          kind: "clause",
          number: "4.2",
          text: "De verplichting van Opdrachtnemer heeft het karakter van een inspanningsverbintenis, geen resultaatsverbintenis.",
        },
        {
          kind: "clause",
          number: "4.3",
          text: "Opdrachtgever draagt er zorg voor dat alle informatie, materialen en toegang tot locaties die noodzakelijk zijn voor een correcte uitvoering van de opdracht, tijdig aan Opdrachtnemer worden verstrekt.",
        },
      ],
    },
    {
      id: "artikel-5",
      number: "5",
      title: "Bewaartermijn",
      blocks: [
        {
          kind: "clause",
          number: "5.1",
          text: "Opdrachtnemer bewaart het definitieve, opgeleverde Werk gedurende maximaal 12 maanden na de leverdatum, tenzij anders vooraf overeengekomen.",
        },
        {
          kind: "clause",
          number: "5.2",
          text: "RAW-bestanden, onbewerkte beelden en projectbestanden worden niet standaard aan Opdrachtgever geleverd en worden niet langer bewaard dan noodzakelijk voor de uitvoering van de opdracht.",
        },
        {
          kind: "clause",
          number: "5.3",
          text: "Na levering van het Werk is Opdrachtgever zelf verantwoordelijk voor het veilig opslaan en archiveren van de ontvangen bestanden.",
        },
      ],
    },
    {
      id: "artikel-6",
      number: "6",
      title: "Annulering en verplaatsing",
      blocks: [
        {
          kind: "clause",
          number: "6.1",
          text: "Annulering van een opdracht door Opdrachtgever dient altijd schriftelijk (per e-mail) te gebeuren.",
        },
        {
          kind: "clause",
          number: "6.2",
          text: "Bij annulering door Opdrachtgever is Opdrachtnemer gerechtigd de volgende kosten in rekening te brengen:",
        },
        {
          kind: "list",
          items: [
            "tot 7 kalenderdagen voor aanvang van de werkzaamheden: 25% van de overeengekomen opdrachtwaarde",
            "binnen 48 uur voor aanvang van de werkzaamheden: 50% van de overeengekomen opdrachtwaarde",
            "op de dag zelf: 100% van de overeengekomen opdrachtwaarde",
          ],
        },
        {
          kind: "clause",
          number: "6.3",
          text: "Een verzoek tot verplaatsing van een opdracht kan door Opdrachtnemer worden beschouwd als een annulering, tenzij anders vooraf overeengekomen.",
        },
        {
          kind: "clause",
          number: "6.4",
          // De punt aan het eind ontbrak in het bronbestand. Zie de kop van dit
          // bestand: dit is de enige plek waar er iets is bijgekomen.
          text: "In geval van overmacht (bijvoorbeeld ziekte, extreme weersomstandigheden of calamiteiten) zullen partijen in overleg treden om een nieuwe datum vast te stellen of een passende oplossing te vinden.",
        },
      ],
    },
    {
      id: "artikel-7",
      number: "7",
      title: "Auteursrecht",
      blocks: [
        {
          kind: "clause",
          number: "7.1",
          text: "Het volledige auteursrecht op het Werk berust bij Opdrachtnemer, conform de Auteurswet.",
        },
        {
          kind: "clause",
          number: "7.2",
          text: "Opdrachtgever verkrijgt door betaling en aanvaarding van de opdracht geen auteursrechten, maar uitsluitend een gebruiksrecht zoals omschreven in artikel 8.",
        },
        {
          kind: "clause",
          number: "7.3",
          text: "Tenzij anders vooraf overeengekomen, behoudt Opdrachtnemer zich het recht voor om het Werk te gebruiken voor eigen promotionele doeleinden, zoals:",
        },
        {
          kind: "list",
          items: ["portfolio", "website", "social media", "presentaties", "drukwerk"],
        },
        {
          kind: "clause",
          number: "7.4",
          text: "Indien Opdrachtgever bezwaar heeft tegen gebruik van specifieke beelden voor promotionele doeleinden, dient dit vooraf schriftelijk te worden overeengekomen.",
        },
      ],
    },
    {
      id: "artikel-8",
      number: "8",
      title: "Gebruiksrecht",
      blocks: [
        {
          kind: "clause",
          number: "8.1",
          text: "Na volledige betaling van de factuur verkrijgt Opdrachtgever een niet-exclusieve, niet-overdraagbare licentie om het Werk te gebruiken voor de doeleinden die schriftelijk zijn overeengekomen (bijvoorbeeld website, social media, drukwerk of interne communicatie).",
        },
        {
          kind: "clause",
          number: "8.2",
          text: "Elk gebruik dat niet uitdrukkelijk is overeengekomen, zoals:",
        },
        {
          kind: "list",
          items: [
            "doorverkoop",
            "sublicentie",
            "gebruik in campagnes van derden",
            "grootschalige advertentiecampagnes",
          ],
        },
        {
          kind: "text",
          text: "is niet toegestaan zonder voorafgaande schriftelijke toestemming van Opdrachtnemer.",
        },
        {
          kind: "clause",
          number: "8.3",
          text: "Het is Opdrachtgever niet toegestaan het Werk in licentie te geven aan derden of door derden te laten exploiteren, tenzij dit uitdrukkelijk en schriftelijk is overeengekomen.",
        },
        {
          kind: "clause",
          number: "8.4",
          text: "Naamsvermelding “Budding Creative Media” bij publicatie van het Werk is gewenst en in sommige gevallen verplicht, tenzij anders vooraf overeengekomen.",
        },
      ],
    },
    {
      id: "artikel-9",
      number: "9",
      title: "Nabewerking, retouching en bewerkingen door Opdrachtgever",
      blocks: [
        {
          kind: "clause",
          number: "9.1",
          text: "Opdrachtnemer levert het Werk in een stijl die kenmerkend is voor Budding Creative Media, inclusief basisnabewerking en grading waar van toepassing.",
        },
        {
          kind: "clause",
          number: "9.2",
          text: "Opdrachtgever is niet gerechtigd zonder toestemming inhoudelijke bewerkingen uit te voeren op het Werk, zoals:",
        },
        {
          kind: "list",
          items: [
            "diepgaande kleurcorrecties",
            "zware filters",
            "AI-bewerkingen",
            "compositieaanpassingen",
            "andere wijzigingen die het karakter van het Werk aantasten",
          ],
        },
        {
          kind: "clause",
          number: "9.3",
          text: "Wel toegestaan is het toevoegen van elementen zoals:",
        },
        { kind: "list", items: ["tekst", "titels", "naamkaders", "logo's"] },
        {
          kind: "text",
          text: "voor eigen gebruik (bijvoorbeeld in presentaties, social media posts of op de website), zolang het originele beeld niet inhoudelijk wordt gewijzigd, tenzij anders vooraf overeengekomen.",
        },
        {
          kind: "clause",
          number: "9.4",
          text: "Aanvullende retouching, bewerkingen of alternatieve edits kunnen door Opdrachtnemer worden uitgevoerd als meerwerk, op basis van het geldende uurtarief.",
        },
      ],
    },
    {
      id: "artikel-10",
      number: "10",
      title: "Levering en levertijden",
      blocks: [
        {
          kind: "clause",
          number: "10.1",
          text: "Levering van het Werk vindt in de regel digitaal plaats, via een beveiligde downloadlink of een andere overeengekomen methode.",
        },
        {
          kind: "clause",
          number: "10.2",
          text: "Tenzij anders vooraf overeengekomen, hanteert Opdrachtnemer de volgende richtlijnen voor levertijden:",
        },
        {
          kind: "list",
          items: [
            "fotografie: 7 tot 14 werkdagen na de opnamedatum",
            "videoproducties: 10 tot 21 werkdagen na de opnamedatum of na aanlevering van alle benodigde materialen",
          ],
        },
        {
          kind: "clause",
          number: "10.3",
          text: "De genoemde levertijden zijn indicatief en kunnen afwijken bij grotere of complexere opdrachten, piekperiodes of onvoorziene omstandigheden. In dergelijke gevallen zal Opdrachtnemer Opdrachtgever tijdig informeren.",
        },
        {
          kind: "clause",
          number: "10.4",
          text: "Na levering van het Werk vervalt de aansprakelijkheid voor verlies of beschadiging van de bestanden.",
        },
      ],
    },
    {
      id: "artikel-11",
      number: "11",
      title: "Revisies (video en foto)",
      blocks: [
        {
          kind: "clause",
          number: "11.1",
          text: "Tenzij anders vooraf overeengekomen, bevat een videoproductie:",
        },
        {
          kind: "list",
          items: [
            "één feedbackronde voor inhoudelijke wijzigingen",
            "één feedbackronde voor detailaanpassingen (zoals timing, titels en kleine correcties)",
          ],
        },
        {
          kind: "clause",
          number: "11.2",
          text: "Aanvullende revisierondes worden als meerwerk berekend tegen het geldende uurtarief.",
        },
        {
          kind: "clause",
          number: "11.3",
          text: "Opdrachtgever dient feedback op een duidelijke en gestructureerde manier aan te leveren, bij voorkeur schriftelijk en gebundeld.",
        },
        {
          kind: "clause",
          number: "11.4",
          text: "Bij fotografie vallen extra retouching, verwijderen van objecten, complexe beeldmanipulatie en andere specialistische bewerkingen buiten de standaardbewerking en worden deze als meerwerk beschouwd.",
        },
      ],
    },
    {
      id: "artikel-12",
      number: "12",
      title: "Muziek, stockmateriaal en licenties",
      blocks: [
        {
          kind: "clause",
          number: "12.1",
          text: "Voor videoproducties maakt Opdrachtnemer gebruik van rechtenvrije of gelicenseerde muziek, tenzij anders vooraf overeengekomen.",
        },
        {
          kind: "clause",
          number: "12.2",
          text: "Indien Opdrachtgever specifieke (commerciële) muziek wenst te gebruiken, is Opdrachtgever verantwoordelijk voor het verkrijgen en betalen van de juiste licenties. Opdrachtnemer kan hierin desgewenst adviseren.",
        },
        {
          kind: "clause",
          number: "12.3",
          text: "Stockmateriaal (zoals stockvideo, stockfoto's of grafische elementen) dat noodzakelijk is voor de productie, kan aanvullend in rekening worden gebracht.",
        },
        {
          kind: "clause",
          number: "12.4",
          text: "Opdrachtnemer is niet aansprakelijk voor claims voortvloeiend uit onjuist gebruik van muziek of stockmateriaal indien Opdrachtgever het Werk breder inzet dan onder de verleende licentie is toegestaan.",
        },
      ],
    },
    {
      id: "artikel-13",
      number: "13",
      title: "Portretrecht en toestemming",
      blocks: [
        {
          kind: "clause",
          number: "13.1",
          text: "Opdrachtgever is verantwoordelijk voor het informeren van medewerkers, bezoekers of deelnemers dat er foto- en/of video-opnames worden gemaakt tijdens een opdracht of evenement.",
        },
        {
          kind: "clause",
          number: "13.2",
          text: "Opdrachtgever vrijwaart Opdrachtnemer voor alle aanspraken van derden met betrekking tot portretrecht, privacy of andere rechten van geportretteerden, tenzij nadrukkelijk anders en schriftelijk vooraf is overeengekomen.",
        },
        {
          kind: "clause",
          number: "13.3",
          text: "Indien er gebruik wordt gemaakt van professionele modellen, ligt de verantwoordelijkheid voor het verkrijgen van modelreleases bij Opdrachtgever, tenzij vooraf schriftelijk is overeengekomen dat Opdrachtnemer dit verzorgt.",
        },
      ],
    },
    {
      id: "artikel-14",
      number: "14",
      title: "Aansprakelijkheid",
      blocks: [
        {
          kind: "clause",
          number: "14.1",
          text: "De aansprakelijkheid van Opdrachtnemer is te allen tijde beperkt tot het bedrag van de factuurwaarde van de betreffende opdracht, of – indien van toepassing – tot het door de aansprakelijkheidsverzekering gedekte bedrag.",
        },
        {
          kind: "clause",
          number: "14.2",
          text: "Opdrachtnemer is niet aansprakelijk voor indirecte schade, gevolgschade, winstderving, gemiste kansen of reputatieschade van Opdrachtgever.",
        },
        {
          kind: "clause",
          number: "14.3",
          text: "Schade als gevolg van onjuiste of onvolledige informatie die door Opdrachtgever is aangeleverd, komt volledig voor rekening en risico van Opdrachtgever.",
        },
      ],
    },
    {
      id: "artikel-15",
      number: "15",
      title: "Overmacht",
      blocks: [
        {
          kind: "clause",
          number: "15.1",
          text: "Van overmacht is onder meer sprake in geval van:",
        },
        {
          kind: "list",
          items: [
            "ziekte",
            "ongevallen",
            "extreme weersomstandigheden",
            "brand",
            "stroomuitval",
            "storingen in apparatuur of software",
            "overheidsmaatregelen",
            "andere omstandigheden die de uitvoering van de opdracht verhinderen en niet aan Opdrachtnemer zijn toe te rekenen",
          ],
        },
        {
          kind: "clause",
          number: "15.2",
          text: "In geval van overmacht zullen partijen in overleg treden om de opdracht op een later tijdstip alsnog uit te voeren of een passende alternatieve oplossing te vinden. Eventuele reeds gemaakte kosten kunnen in rekening worden gebracht.",
        },
      ],
    },
    {
      id: "artikel-16",
      number: "16",
      title: "Klachten",
      blocks: [
        {
          kind: "clause",
          number: "16.1",
          text: "Klachten over het Werk dienen door Opdrachtgever zo spoedig mogelijk, doch uiterlijk binnen 7 kalenderdagen na levering, schriftelijk en gemotiveerd aan Opdrachtnemer kenbaar te worden gemaakt.",
        },
        {
          kind: "clause",
          number: "16.2",
          text: "Indien een klacht gegrond wordt bevonden, zal Opdrachtnemer binnen redelijke termijn een passende oplossing bieden, bijvoorbeeld door herstel, vervanging of (gedeeltelijke) restitutie, naar redelijkheid en in overleg met Opdrachtgever.",
        },
      ],
    },
    {
      id: "artikel-17",
      number: "17",
      title: "Toepasselijk recht en bevoegde rechter",
      blocks: [
        {
          kind: "clause",
          number: "17.1",
          text: "Op deze algemene voorwaarden en alle overeenkomsten tussen Opdrachtgever en Opdrachtnemer is uitsluitend Nederlands recht van toepassing.",
        },
        {
          kind: "clause",
          number: "17.2",
          text: "Geschillen die voortvloeien uit of samenhangen met deze voorwaarden of de overeenkomst worden, voor zover dwingendrechtelijke regels niet anders voorschrijven, voorgelegd aan de bevoegde rechter in het arrondissement waarin Opdrachtnemer is gevestigd.",
        },
      ],
    },
  ],
};
