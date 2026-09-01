import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Magnetic } from "@/components/ui/Magnetic";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { ParallaxMedia } from "@/components/ui/ParallaxMedia";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { fadeIn } from "@/lib/motion";
import { hero } from "@/lib/content/hero";

/**
 * Volledig beeldvullende opening. De kop komt regel voor regel binnen; de rest
 * volgt met oplopende vertraging zodat het oog van kop naar CTA wordt geleid.
 */
export function Hero() {
  const [primary, secondary] = hero.ctas;

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      <ParallaxMedia image={hero.image} priority sizes="100vw" />

      {/* Drie doeken over het beeld: verticaal verloop voor leesbaarheid en de
          overgang naar de paginakleur, vignet links onder de tekstkolom, en een
          rode gloed vanuit de onderrand. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-[image:var(--hero-overlay)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-[image:var(--hero-veil)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-[image:var(--hero-glow)]"
      />

      <Container className="hero-legible relative z-3 pb-[clamp(2.5rem,7vh,5.5rem)]">
        <Reveal trigger="mount" variants={fadeIn} delay={1.15} className="mb-7">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </Reveal>

        {/* Een maat kleiner dan eerst. De kop besloeg zoveel van het scherm dat
            er van de foto eronder weinig overbleef; dit blijft groot genoeg om
            als eerste te lezen, maar laat de straat en de ballonnen meedoen. */}
        <h1 className="font-display text-[clamp(2.4rem,12.5vw,5.75rem)] font-bold uppercase leading-[0.92] tracking-headline stack:text-[clamp(3rem,9vw,8.25rem)]">
          <MaskedLines lines={hero.headline} trigger="mount" delay={0.2} />
        </h1>

        <div className="mt-9 flex flex-wrap items-end justify-between gap-9">
          <Reveal
            as="p"
            trigger="mount"
            variants={fadeIn}
            delay={0.95}
            className="max-w-[27.5rem] text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.5]"
          >
            {hero.intro}
          </Reveal>

          <Reveal
            trigger="mount"
            variants={fadeIn}
            delay={1.1}
            className="flex flex-wrap gap-4"
          >
            <Magnetic>
              <Button href={primary.href}>{primary.label}</Button>
            </Magnetic>
            <Magnetic>
              <Button href={secondary.href} variant="ghost" withArrow={false}>
                {secondary.label}
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </Container>

      <Reveal
        trigger="mount"
        variants={fadeIn}
        delay={1.4}
        className="absolute bottom-6 left-1/2 z-3 hidden -translate-x-1/2 stack:block"
      >
        <ScrollCue label={hero.scrollLabel} />
      </Reveal>
    </section>
  );
}
