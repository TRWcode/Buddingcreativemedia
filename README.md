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
  globals.css       design tokens (@theme) + base + utilities
  fonts.ts          next/font/local
  fonts/            self-hosted variable woff2
components/
  layout/           header, mobiel menu, logo, footer, cursor, smooth scroll
  sections/         één component per sectie van de homepage
  case/             de blokken van een casepagina
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
| `/cases` | [`app/cases/page.tsx`](app/cases/page.tsx) — overzicht van alle cases |
| `/cases/[slug]` | [`app/cases/[slug]/page.tsx`](app/cases/%5Bslug%5D/page.tsx) — `generateStaticParams` bouwt elke case uit `caseStudies` voor |
| 404 | [`app/not-found.tsx`](app/not-found.tsx) |

`dynamicParams = false`: een slug die niet in de content staat geeft een 404 in
plaats van een render on-demand.

## Secties

De homepage is opgebouwd in [`app/page.tsx`](app/page.tsx):
Hero → Marquee → Diensten → Klanten → Cases → Werkwijze → Events → CTA, met header
en footer in de layout. Elke sectie heeft een anker-id (`#diensten`, `#cases`,
`#werkwijze`, `#events`, `#contact`) waar de navigatie via Lenis naartoe scrollt.

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
| `cases/spotlight-onderneming-van-het-jaar.jpg` | Polaroid in Cases | vierkant-ish | ✅ eigen foto |
| `cases/studio-portretsessie.jpg` | Casekaart 2 | 4:3 liggend | ✅ eigen foto |
| `cases/marathon-aftermovie.jpg` | Casekaart 3 | 4:3 liggend | ✅ eigen foto |
| `events/mini-shoot-almere.jpg` | Eventkaart | staand tot vierkant | ✅ eigen foto |
| `cases/althio-portret-papieren.jpg` | Mozaïek Althio | 3:2 liggend | ✅ eigen foto |
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

Nog te leveren: de showreel-mp4 en een 1200×630 og-image (nu valt die terug op de
herofoto, zie `metadata.openGraph` in `app/layout.tsx`).

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
> herobeelden, `althio-portret-papieren.jpg` en de complete JijbenM-set horen echt
> bij hun case. Vervang ze door het echte materiaal per klant. Twee dingen om dan
> meteen mee te nemen: `library/kinderboekenmuseum-ballonnen.jpg` is maar 600×900
> en wordt in de mozaïek opgeschaald, en Althio heeft nog te weinig beeld voor een
> filmstrip.

Ook de casetekst is grotendeels een eerste opzet: alleen de JijbenM-copy komt van
de bestaande site. Loop `lead`, `chapters` en `deliverables` van de andere drie na
voordat de site live gaat.

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
