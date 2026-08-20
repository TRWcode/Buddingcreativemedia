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
  page.tsx          stelt de secties samen
  globals.css       design tokens (@theme) + base + utilities
  fonts.ts          next/font/local
  fonts/            self-hosted variable woff2
components/
  layout/           header, mobiel menu, logo, footer, cursor, smooth scroll
  sections/         één component per sectie van de pagina
  ui/               herbruikbare bouwstenen en animatie-primitives
lib/
  motion.ts         alle easings, durations en variants
  content/          alle Nederlandse copy, per sectie
public/media/       beeldmateriaal
design/             het originele Claude Design-prototype (referentie)
_originals/         onbewerkte foto's, buiten git
```

## Secties

De pagina is opgebouwd in [`app/page.tsx`](app/page.tsx):
Hero → Marquee → Diensten → Cases → Werkwijze → Events → CTA, met header en footer
in de layout. Elke sectie heeft een anker-id (`#diensten`, `#cases`, `#werkwijze`,
`#events`, `#contact`) waar de navigatie via Lenis naartoe scrollt.

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
| `cases/campagne-promo-reels.jpg` | Casekaart 1 | 4:3 liggend | ✅ eigen foto |
| `cases/studio-portretsessie.jpg` | Casekaart 2 | 4:3 liggend | ✅ eigen foto |
| `cases/marathon-aftermovie.jpg` | Casekaart 3 | 4:3 liggend | ✅ eigen foto |
| `events/mini-shoot-almere.jpg` | Eventkaart | staand tot vierkant | ✅ eigen foto |
| `library/*.jpg` | Nog niet geplaatst | — | reserve, klaar voor gebruik |

Nog te leveren: de showreel-mp4 en een 1200×630 og-image (nu valt die terug op de
herofoto, zie `metadata.openGraph` in `app/layout.tsx`).

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
