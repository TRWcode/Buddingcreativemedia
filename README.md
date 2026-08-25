# Budding Creative Media — marketing site

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis.
Deploy-target: Vercel.

```bash
npm run dev        # dev server
npm run build      # productiebuild
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Structuur

```
app/
  layout.tsx        fonts, metadata, providers, header
  page.tsx          stelt de secties van de homepage samen
  not-found.tsx     404
  cases/[slug]/     detailpagina per case, statisch voorgebouwd
  contact/          contactpagina, server action en de staat van het formulier
  algemene-voorwaarden/, privacyverklaring/
  sitemap.ts        sitemap.xml, uit de routeconstanten
  robots.ts         robots.txt
  globals.css       design tokens (@theme) + base + print + utilities
  fonts.ts          next/font/local
  fonts/            self-hosted variable woff2
components/
  layout/           header, mobiel menu, logo, footer, cursor, smooth scroll
  sections/         één component per sectie van de homepage
  case/             de blokken van een casepagina
  contact/          formulier en directe contactkanalen
  legal/            de opmaak die beide juridische pagina's delen
  ui/               herbruikbare bouwstenen en animatie-primitives
lib/
  motion.ts         alle easings, durations en variants
  content/          alle Nederlandse copy, per sectie
public/media/       beeldmateriaal
design/             het originele Claude Design-prototype (referentie)
_originals/         onbewerkte foto's, buiten git
```

## Routes

| Route | Bron |
| --- | --- |
| `/` | [`app/page.tsx`](app/page.tsx) |
| `/portfolio` | [`app/portfolio/page.tsx`](app/portfolio/page.tsx) — alle beelden met filters |
| `/cases` | [`app/cases/page.tsx`](app/cases/page.tsx) — overzicht van alle cases |
| `/cases/[slug]` | [`app/cases/[slug]/page.tsx`](app/cases/%5Bslug%5D/page.tsx) — `generateStaticParams` bouwt elke case uit `caseStudies` voor |
| `/contact` | [`app/contact/page.tsx`](app/contact/page.tsx) — formulier plus directe kanalen |
| `/algemene-voorwaarden` | [`app/algemene-voorwaarden/page.tsx`](app/algemene-voorwaarden/page.tsx) |
| `/privacyverklaring` | [`app/privacyverklaring/page.tsx`](app/privacyverklaring/page.tsx) |
| 404 | [`app/not-found.tsx`](app/not-found.tsx) |
| `/sitemap.xml` | [`app/sitemap.ts`](app/sitemap.ts) — opgebouwd uit dezelfde constanten als de navigatie |
| `/robots.txt` | [`app/robots.ts`](app/robots.ts) |

De routes staan als constante in [`site.ts`](lib/content/site.ts) (`portfolioHref`,
`contactHref`, `termsHref`, `privacyHref`). Link daarnaar in plaats van het pad
over te typen, anders lopen navigatie, footer en knoppen uit elkaar zodra er een
verandert.

`dynamicParams = false`: een slug die niet in de content staat geeft een 404 in
plaats van een render on-demand.

## Secties

De homepage is opgebouwd in [`app/page.tsx`](app/page.tsx):
Hero → Marquee → Diensten → Klanten → Cases → Werkwijze → Events → CTA, met header
en footer in de layout. Elke sectie heeft een anker-id (`#diensten`, `#cases`,
`#werkwijze`, `#events`, `#contact`) waar de navigatie via Lenis naartoe scrollt.
De knop `Let's Talk` is daarop de uitzondering: die gaat sinds er een
contactpagina is naar `/contact` en niet meer naar het anker `#contact`.

Een casepagina is opgebouwd uit [`components/case/`](components/case/):
hero → gegevensbalk → filmstrip → verhaal → mozaïek → volgende case → CTA.

**Ankerlinks vanaf een andere pagina.** De navigatie linkt naar secties op de
homepage. Op de homepage moet dat een kaal anker blijven (`#cases`), anders kan
`SmoothScroll` hem niet onderscheppen en scrollt Lenis er niet soepel naartoe;
staat de bezoeker op een casepagina, dan moet er `/` voor. Dat verschil zit in
[`components/ui/AnchorLink.tsx`](components/ui/AnchorLink.tsx) — gebruik die voor
elke link naar een homepage-sectie, niet `next/link` rechtstreeks.

Hover-effecten (beeldzoom, accentlijn, case-label, polaroid) draaien op CSS
`group-hover`, niet op JS — die componenten blijven daardoor server components.
Alleen animatie die scrollpositie of pointer nodig heeft is een client component.

## Design tokens

Alle kleuren, spacing, radii, easings en durations staan in het `@theme`-blok
bovenaan [`app/globals.css`](app/globals.css). Dat is de enige bron van waarheid:
Tailwind genereert daar zijn utilities uit (`bg-ink`, `text-muted`, `rounded-card`,
`ease-expo`, `px-gutter`, …). Voeg nooit losse hex-waarden of magic numbers toe in
componenten — breid het tokenblok uit.

De motion-tokens in [`lib/motion.ts`](lib/motion.ts) spiegelen de CSS-waarden, zodat
CSS-transities en Framer Motion hetzelfde ritme aanhouden.

## Beeldmateriaal

Alle beelden staan in `public/media/`. Vervang een bestand op dezelfde padnaam en
de site pikt het direct op. Let op de verwachte verhouding — `next/image` snijdt
bij met `object-cover`, dus een afwijkende ratio verliest randen.

| Pad | Waar | Verhouding | Nu |
| --- | --- | --- | --- |
| `hero/hero-ballonnen.jpg` | Hero, full-bleed | 3:2 liggend, min. 2560px breed | ✅ eigen foto |
| `diensten/fotografie.jpg` | Dienstenkaart Fotografie | 3:2 liggend | ✅ eigen foto |
| `diensten/videografie.jpg` | Dienstenkaart Videografie | 3:2 liggend | ✅ eigen foto |
| `video/showreel-poster.jpg` | Poster onder de play-knop | 3:2 liggend | ✅ eigen foto |
| `video/showreel.mp4` | Showreel achter de play-knop | 16:9, H.264 | ⬜ **nog aanleveren** |
| `video/golazo-aftermovie-voorbeeld.mp4` | Videoblok case Golazo | 16:9, H.264 | 🟡 voorbeeldclip |
| `video/jijbenm-reel-voorbeeld.mp4` | Videoblok case JijbenM promo reels | 16:9, H.264 | 🟡 voorbeeldclip |
| `video/golazo-aftermovie-poster.jpg`, `video/jijbenm-reel-poster.jpg` | Posters onder die twee spelers | 16:9 liggend | 🟡 frame uit de voorbeeldclip |
| `video/jijbenm-breach-festival-poster.jpg` | Poster van de YouTube-video, case Breach Festival | 16:9, 1280×720 | 🟡 YouTube-thumbnail |
| `video/aeres-vakmanschapsroute-poster.jpg` | Poster van de YouTube-video, case Aeres | 16:9, 1280×720 | 🟡 YouTube-thumbnail |
| `cases/spotlight-onderneming-van-het-jaar.jpg` | Polaroid in Cases | vierkant-ish | ✅ eigen foto |
| `cases/studio-portretsessie.jpg` | Casekaart 2 | 4:3 liggend | ✅ eigen foto |
| `cases/marathon-aftermovie.jpg` | Casekaart 3 | 4:3 liggend | ✅ eigen foto |
| `events/mini-shoot-almere.jpg` | Eventkaart | staand tot vierkant | ✅ eigen foto |
| `cases/jijbenm-*.webp` | Casekaart, hero en mozaïek JijbenM | wisselend | ✅ vijf eigen foto's |
| `brand/logo.webp` | Merklogo in header en footer | 560×105, transparant | ✅ officieel logo |
| `logos/*.png` | Klantenrij op de homepage | wit, transparant | ✅ zie hieronder |
| `library/*.jpg` | Losse pool, deels in casemozaïeken | — | reserve |

Het merklogo staat in [`site.ts`](lib/content/site.ts) als `siteLogo` en wordt op
één plek gerenderd per plek: [`Logo.tsx`](components/layout/Logo.tsx) voor de
header, de eerste kolom van de footer voor onderin. Het bestand is al bijgesneden
tot de illustratie zelf — de aangeleverde versie had asymmetrische transparante
marges (41px links, 39 rechts, 56 boven, 48 onder), waardoor het logo optisch
scheef in de header hing. Ruimte eromheen regel je met CSS, niet met lege pixels.

Het logo is deels rood en de header schuift ook over het rode CTA-blok. Daarom
staat de balk in scroll-stand op `bg-ink/85` en niet lager: op een lichtere balk
valt het merk tegen die achtergrond weg.

Nog te leveren: de showreel-mp4, de echte case-videos (zie hieronder) en een
1200×630 og-image (nu valt die terug op de herofoto, zie `metadata.openGraph`
in `app/layout.tsx`).

### Video bij een case

Een case krijgt een videoblok zodra er een `video` in [`cases.ts`](lib/content/cases.ts)
staat; [`CaseVideo.tsx`](components/case/CaseVideo.tsx) rendert het tussen het
verhaal en de mozaïek. Het blok heeft vier standen:

| Content | Wat de bezoeker ziet |
| --- | --- |
| geen `video` | niets, geen leeg kader |
| `video` zonder `src` en zonder `youtubeId` | de poster met "Hier komt de video" eroverheen |
| `video` met `src` + `isPlaceholder` | een werkende speler met het label **Voorbeeld** |
| `video` met alleen `src` | de speler, zonder label |
| `video` met `youtubeId` | de poster met een play-knop; YouTube laadt pas na een klik |

### YouTube pas na een klik

Staat de montage op YouTube in plaats van als bestand op onze server, dan zet je
een `youtubeId` in de case en rendert
[`YouTubeFacade.tsx`](components/case/YouTubeFacade.tsx) een poster met een
play-knop. De speler komt er pas in nadat de bezoeker klikt.

Dat is geen snelheidstruc. Een gewone embed legt al bij het openen van de pagina
verbinding met Google en zet cookies, ook bij iemand die de video nooit
afspeelt — en dan klopt artikel 5.1 van de privacyverklaring niet meer en is er
een toestemmingsbanner nodig op élke pagina van de site, voor een videoblok dat
op twee cases staat. Om dezelfde reden staat de poster lokaal in
`public/media/video/` en niet als `i.ytimg.com`-adres: dat laatste zou alsnog
een verzoek naar Google zijn zodra de pagina laadt.

De posters zijn nu uit de YouTube-thumbnail getrokken (1280×720). Vervang ze
door een eigen frame als je een mooier beeld hebt; hetzelfde pad, klaar.

`youtube-nocookie.com` doet minder dan de naam belooft — zodra de speler laadt,
worden er alsnog cookies gezet. Het is de betere van de twee domeinen, geen
vrijbrief om de melding onder de poster weg te halen.

### Een case die nog niet af is

`draft: true` op een case houdt hem van de live site af, maar niet uit beeld
tijdens het werken eraan:

| Waar | Draft zichtbaar? |
| --- | --- |
| `npm run dev` | ja |
| Vercel-preview (branch push) | ja |
| productiesite | nee, het adres geeft een 404 |
| `npm run build` lokaal | nee |

Alles buiten `cases.ts` leest uit `caseStudies`, en die lijst is al gefilterd —
er is dus geen plek waar een draft half kan opduiken: niet in de overzichten,
niet in de "volgende case", niet in `generateStaticParams` en niet in de
sitemap.

Let bij `showDrafts` op de richting van de test: hij zegt wanneer een draft
*wel* mag, niet wanneer hij niet mag. Valt `VERCEL_ENV` ooit weg, dan blijft
een draft verborgen in plaats van dat hij publiek wordt. Draai dat niet om.

Zo staan de twee nieuwe cases er nu in — Breach Festival voor Jij Bent M en de
Vakmanschapsroute voor Aeres VMBO. Hun video zit erin, en de tekst is
**verzonnen**: die staat er om te kunnen zien hoe de pagina eruitkomt, niet
omdat het klopt. Er is met geen van beide klanten gesproken over wat de vraag
was of wat het heeft opgeleverd. Haal `draft` er pas af als iemand die erbij
was de tekst heeft nagelopen — een verzonnen briefing onder de naam van een
echte klant is geen placeholder meer zodra hij online staat.

Breach Festival is een tweede opdracht voor Jij Bent M en staat los van de
promo-reelscase die er al was. Die eerste houdt zijn eigen voorbeeldclip; daar
is nog geen echte montage voor aangeleverd.

Golazo en JijbenM staan nu op de derde stand. De clips in `public/media/video/`
zijn met ffmpeg gemaakt uit de foto's van diezelfde case: stilstaande beelden
die in en uit elkaar overvloeien, 13s, geen geluid. Bewust geen zoom of pan.
Een still die per frame herschaald wordt trilt zichtbaar, en zodra je ziet dat
het een foto is leest de beweging als een fout in plaats van als montage.
Vervangen doe je zo: zet het echte bestand in `public/media/video/`, wijs `src`
naar dat pad, haal `isPlaceholder` weg en trek een nieuwe poster uit de montage
(`ffmpeg -i film.mp4 -ss 3 -frames:v 1 -q:v 3 poster.jpg`). Verwijder daarna de
voorbeeldclip; die hoort niet in productie thuis.


### Portfolio en categorieen

Alle portfoliobeelden staan met hun categorie in
[`portfolio.ts`](lib/content/portfolio.ts). De taxonomie is overgenomen van de
huidige site: een keuze tussen Fotografie en Videografie, daarbinnen Bedrijven,
Events, Portretten, Concepten, Fashion, Drone en Publicities.

Een beeld krijgt precies een categorie. Een foto die in twee filters opduikt
laat de bezoeker twijfelen of hij iets dubbel ziet, en telt bij het vullen van
het raster twee keer mee. Het veld `shoot` groepeert beelden uit dezelfde
opdracht; dat label verschijnt bij hover over een tegel.

[`PortfolioGrid.tsx`](components/portfolio/PortfolioGrid.tsx) rendert het geheel
op [`/portfolio`](app/portfolio/page.tsx). Filters staan in component-state en
niet in de URL: een filter is hier een blik op dezelfde pagina, dus de
terugknop hoort naar de vorige pagina te gaan en niet naar het vorige filter.
Categorieen zonder werk worden weggelaten, zodat een filter nooit op een leeg
raster uitkomt. Fashion en Videografie staan daarom nu nog niet in beeld.

Het raster is een CSS-masonry (`columns`), zodat elk beeld zijn eigen
verhouding houdt. Een vaste uitsnede zou hier tegen het werk in werken: een
staand portret en een drone-panorama horen niet in hetzelfde kader.

### Klantlogo's

De logo's in [`lib/content/clients.ts`](lib/content/clients.ts) staan als **witte
monochrome PNG met alpha** in `public/media/logos/`. In eigen huisstijlkleur zijn
ze op de donkere achtergrond onleesbaar (Aeres is donkergroen op wit) of eisen ze
alle aandacht op. De rij rendert op 60% dekking en trekt bij hover bij.

Een nieuw logo klaarmaken: neem het aan op witte of transparante ondergrond, maak
er een wit silhouet met alpha van, snijd de marges eraf en zet het in
`public/media/logos/`. Voeg daarna een item toe aan `clientLogos` met de
werkelijke pixelmaten en een `height` — die optische hoogte verschilt per merk,
want een breed wordmark weegt bij gelijke hoogte veel zwaarder dan een gestapeld
logo. Een `href` is optioneel; alleen logo's met een href worden een link.

### Beeld per case

Elke case in [`lib/content/cases.ts`](lib/content/cases.ts) heeft een `hero`, een
`card` (4:3, staat op de homepage) en een `gallery`. Elk mozaïekbeeld draagt zelf
zijn `span`:

| `span` | Kolommen | Uitsnede |
| --- | --- | --- |
| `full` | volle breedte | géén — houdt zijn eigen verhouding |
| `half` | halve breedte | 4:3 |
| `tall` | halve breedte | 3:4, staand |

Een beeld op volle breedte wordt bewust niet bijgesneden: bij de groepsfoto van
JijbenM zou een vast 16:9-kader precies de roze M van het dak afsnijden. Halve
kolommen hébben een vaste verhouding, anders lijnen de rijen niet meer uit — houd
daar dus rekening met wat er aan de zijkanten wegvalt.

Zorg dat elke rij vol loopt — twee `half`/`tall` naast elkaar, of een `full` —
anders blijft er onderaan een halve kolom leeg staan. Zet het herobeeld niet ook
in de `gallery`: het komt via de filmstrip toch al voorbij. Het `card`-beeld juist
wél — wie op de kaart klikt wil die foto op de pagina terugzien.

Reken op vier tot zes foto's per case. Onder de vier verdwijnt de filmstrip
(dan zou dezelfde foto binnen één scherm terugkomen) en blijft de mozaïek over.

JijbenM is het model voor hoe zo'n set eruitziet: vijf foto's, waarvan één als
hero, één als card en vier in de mozaïek.

> **Let op — bij drie cases staan er nog plaatsvervangers in de mozaïek.**
> Gemeente Almere, Althio en Golazo trekken hun beeld uit `library/`; alleen de
> herobeelden en de complete JijbenM-set horen echt bij hun case. Vervang ze
> door het echte materiaal per klant. Twee dingen om dan
> meteen mee te nemen: `library/kinderboekenmuseum-ballonnen.jpg` is maar 600×900
> en wordt in de mozaïek opgeschaald, en Althio houdt na het opruimen van een
> dubbele foto nog maar één mozaïekbeeld over, te weinig voor een filmstrip.

Ook de casetekst is grotendeels een eerste opzet: alleen de JijbenM-copy komt van
de bestaande site. Loop `lead`, `chapters` en `deliverables` van de andere drie na
voordat de site live gaat.

## Contactformulier

`/contact` heeft een formulier dat via een server action een mail verstuurt.
Er komt geen database aan te pas: [`submitContactForm`](app/contact/actions.ts)
zet de aanvraag om in platte tekst en post die naar de REST-API van Resend. Na
het versturen is er op de server niets van over. Dat is precies wat de
privacyverklaring belooft, dus als hier ooit opslag bijkomt, moet
[`privacy.ts`](lib/content/privacy.ts) mee.

**De velden staan op één plek.** [`contactFields`](lib/content/contact.ts) is de
bron voor zowel het formulier als de mail. Een veld toevoegen doe je daar; het
verschijnt dan vanzelf in beide. Vergeet niet ook een grens in `MAX_LENGTH` te
zetten, anders is het veld ongelimiteerd.

Alleen naam, e-mail en bericht zijn verplicht. Soort opdracht, datum en locatie
zijn optioneel, want dat is precies het soort informatie dat je anders per mail
alsnog moet uitvragen — en een verplicht veld dat iemand nog niet weet, kost een
aanvraag. De datum is bewust een tekstveld: "ergens in het najaar" is een echt
antwoord, en een datumkiezer dwingt tot een dag die er nog niet is.

**Wat het formulier nodig heeft om te werken.** Drie environment variables, zie
[`.env.example`](.env.example): `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (op een in
Resend geverifieerd domein, anders weigeren SPF en DMARC de bezorging) en
optioneel `CONTACT_TO_EMAIL`. Ontbreken ze, dan crasht er niets: de bezoeker
krijgt een melding met het e-mailadres erin en de rest van de site draait door.
Zet ze op Vercel, niet in de repo.

Het `reply_to` van de mail is het adres van de aanvrager, dus je kunt vanuit je
mailbox rechtstreeks antwoorden zonder het adres over te typen.

**Spam.** Er zit een honeypot in: een verborgen veld dat bezoekers niet zien en
bots wel invullen. Een gevulde honeypot krijgt een succesmelding en gaat de
prullenbak in — een bot die een foutmelding krijgt, probeert het opnieuw.
Bewust geen captcha: die legt van elke bezoeker meer vast dan het probleem
rechtvaardigt, en de privacyverklaring zou er een derde partij bij krijgen.
Loopt het toch vol, dan is rate limiting op IP-niveau de volgende stap.

**Zonder JavaScript werkt het ook.** Het formulier draait op `useActionState`, en
een server action valt zonder JS terug op een gewone form-post met dezelfde
server-gerenderde uitkomst. Voor het enige formulier waarlangs een opdracht
binnenkomt is dat het verschil tussen een gemiste en een binnengekomen aanvraag.

## Juridische pagina's

De algemene voorwaarden en de privacyverklaring delen één component,
[`LegalPage.tsx`](components/legal/LegalPage.tsx), en één datavorm uit
[`legal.ts`](lib/content/legal.ts). Zo kunnen ze niet uit elkaar gaan lopen.

De tekst staat als data en niet als JSX. Bij juridische tekst weegt dat zwaarder
dan elders: wie een artikel aanpast moet dat kunnen doen zonder een `<p>` te
kunnen breken, en de diff van een tekstwijziging moet leesbaar blijven. Een
artikel bestaat uit blokken (`clause`, `text`, `list`, `definitions`), en het
artikelnummer staat los van de titel zodat het als eigen label kan renderen.

[`terms.ts`](lib/content/terms.ts) is woordelijk het aangeleverde document.
Alleen de opmaak is van ons. Verander daar geen woord zonder dat de bron
meeverandert — dat is wat de opdrachtgever bij het aangaan van de overeenkomst
aanvaardt.

[`privacy.ts`](lib/content/privacy.ts) is wél door ons geschreven en beschrijft
wat deze site feitelijk doet. Wat er staat klopt met de code: er is geen
database, het formulier mailt alleen door, de lettertypen staan in `app/fonts/`
in plaats van bij Google en de video's staan in `public/media/video/` in plaats
van in een YouTube-embed. Verander je een van die dingen, pas dan dat bestand aan.

Bezoekersstatistieken lopen via Vercel Analytics in
[`app/layout.tsx`](app/layout.tsx): cookieloos en zonder herkenning van
individuele bezoekers. Daarom staat er geen cookiebanner op de site. Ruil dat
niet in voor een meting die wél cookies zet zonder de privacyverklaring en de
banner-situatie opnieuw te bekijken.

Nog in te vullen in [`legal.ts`](lib/content/legal.ts): `kvk` en `vat` in
`company`. Zolang die leeg zijn, laat de pagina die regels weg in plaats van een
lege regel te tonen. Een privacyverklaring hoort de verwerkingsverantwoordelijke
identificeerbaar te maken, dus vul ze in.

**Printen.** Algemene voorwaarden worden bewaard, uitgeprint en als pdf
doorgestuurd — bij een offerte is dat de normale gang van zaken, geen randgeval.
Het `@media print`-blok in [`globals.css`](app/globals.css) draait het blad om:
zwarte tekst op wit, geen schaduwen, en een artikel breekt niet over twee
pagina's. Wat er niet bij hoort draagt `print:hidden` op het component zelf —
header, footer, cursor, de inhoudsopgave en het rode CTA-blok. Zet dat ook op
nieuwe schermelementen die op papier niets te zoeken hebben.

## Smoothness

Twee dingen bepalen hoe vloeiend de site aanvoelt.

**Het scrollmodel.** Lenis draait op een duration-model (`SCROLL` in
[`lib/motion.ts`](lib/motion.ts)), niet op een lerp. Bij een lerp is de beweging
op slag het snelst en kruipt daarna asymptotisch uit: per muiswiel-klik een piek
van ~12px/frame die uitzakt naar 1px. Dat leest als schokkerig. Met
`duration: 0.85` en een ease-out van exponent 2.2 is het profiel 6px → 2px —
een gelijkmatige glijbeweging.

**Één regel achter alles hieronder: kijk naar de beweging per frame, niet naar
de duur.** Een animatie voelt haperend als hij zijn beweging ongelijk verdeelt —
een schok in het eerste frame, of een lange staart waarin hij sub-pixel uitkruipt.
Meet dat met een rAF-loop die de eigenschap per frame uitleest; het profiel hoort
een vloeiende bult te zijn.

**Twee easing-families, niet één.** `--ease-expo` is sterk front-loaded. Bij een
binnenkomst met veel bereik leest dat als vaart, maar bij een hover van een paar
pixels zit 90% van de beweging in de eerste drie frames — dat oogt als een schok.
Gebruik `ease-expo` alleen voor binnenkomsten (staat nog in `lib/motion.ts` voor de
Framer-variants) en `ease-interact` voor alles wat op hover of focus reageert.

Gemeten beweging per frame van de hover-zoom op een casekaart (29px totaal):

```
voor:  15.2  8.2  3.3  1.4  0.6  0.3  0.1  0.03  0     ← schok, na 9 frames klaar
na:     0.2  0.3  0.4  0.6  0.9  1.3  1.7  1.9   1.8 … ← curve over 42 frames
```

**Let op met duration-tokens.** Tailwind v4 heeft géén `--duration-*`
theme-namespace. `duration-base` en consorten genereren dus niets en vallen
stilzwijgend terug op de standaard van 150ms. Daarom staan er expliciete
`@utility`-regels in `globals.css` die de klassenamen aan de tokens koppelen.
Controleer bij een nieuw duration-token of het echt in de output staat:
`grep transition-duration .next/static/**/*.css`.

**Wat je nooit moet animeren.** Vier regels, alle vier gemeten:

- Geen CSS-`filter` op beeld dat ook transformeert. Een filter dwingt bij elke
  stap van een schaal-animatie een nieuwe rasterisatie af. Kleurcorrectie hoort
  in het bestand, niet in CSS.
- `backdrop-filter` niet in een `transition-property` zetten. De browser
  interpoleert de blur dan frame voor frame. Schakel hem in één keer om.
- Geen `box-shadow`-transities. Gebruik een losse laag met een vaste schaduw en
  animeer daarvan de `opacity` — dat is compositor-werk (zie `Button`).
- Geen `width`/`height`-animaties. Vaste maat plus `scale` (zie `Cursor`).

Metingen op volle processorsnelheid (drie runs per test): 60fps, 0 tot 1 frame
boven 33ms — bij scrollen door de hele pagina, bij de hero met ken-burns én bij
snel heen en weer hoveren over de casekaarten. Onder kunstmatige CPU-rem zijn de
absolute cijfers sterk afhankelijk van wat er verder op de machine draait; de
snelheidsprofielen hierboven zijn wél stabiel en zeggen meer over hoe het voelt.

## Toegankelijkheid & motion

`MotionProvider` zet Framer Motion op `reducedMotion="user"`: bezoekers die
beweging hebben afgezet krijgen geen transform-animaties, wel de fades — zo blijft
niets onzichtbaar hangen. Lenis wordt in dat geval helemaal niet geïnitialiseerd.

Bij animatie-componenten geldt één regel: **laat `useReducedMotion()` nooit de
markup bepalen.** De hook geeft op de server een andere waarde dan op de client;
vertak alleen op eindwaarden, nooit op wat er gerenderd wordt.
