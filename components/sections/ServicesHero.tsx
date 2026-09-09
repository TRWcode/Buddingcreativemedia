import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Magnetic } from "@/components/ui/Magnetic";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { fadeIn } from "@/lib/motion";
import { servicesPage, servicesShowcase, type ShowcaseImage } from "@/lib/content/services";

/**
 * Eén beeld in de mozaïek. Het label onderin zegt uit welk werk het komt —
 * daarmee is de kop van deze pagina meteen ook het bewijs eronder.
 */
function ShowcaseTile({
  image,
  aspect,
  delay,
  priority,
}: {
  image: ShowcaseImage;
  aspect: string;
  delay: number;
  priority: boolean;
}) {
  return (
    <Reveal
      trigger="mount"
      variants={fadeIn}
      delay={delay}
      className={cn(
        "group relative overflow-hidden rounded-media border border-hairline bg-surface",
        aspect,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 56.25rem) 45vw, (max-width: 80rem) 11rem, 14rem"
        className="object-cover transition-transform duration-zoom ease-interact group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      {/* Het verloop staat er voor het label, niet voor de sfeer: zonder gaat
          witte tekst van 11px verloren op een lichte hoek van de foto. */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/90 to-transparent p-3 pt-8">
        <span className="text-[0.68rem] font-medium uppercase tracking-label text-bone/90">
          {image.caption}
        </span>
      </span>
    </Reveal>
  );
}

/**
 * De opening van `/diensten`: links het verhaal, rechts vier beelden uit echt
 * werk.
 *
 * Die beelden zijn geen versiering. Dit was een pagina van een fotograaf en een
 * videograaf waarvan het eerste scherm uit niets dan tekst bestond — je moest
 * op je woord geloven waar deze pagina over gaat, terwijl er negen foto's
 * verderop stonden te wachten. Twee kolommen, de rechter een stukje lager, zodat
 * het als een contactvel leest en niet als een raster.
 *
 * De mozaïek staat op een telefoon onder de tekst en niet erboven: de kop moet
 * als eerste te lezen zijn, en vier beelden boven de vouw duwen hem het scherm
 * uit.
 */
export function ServicesHero() {
  const [first, second] = servicesPage.heading;
  const [primary, secondary] = servicesPage.ctas;
  const [tileOne, tileTwo, tileThree, tileFour] = servicesShowcase;

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Rode gloed achter de mozaïek — dezelfde kleur die de hero op de
          homepage vanaf de onderrand gebruikt, hier vanuit de rechterbovenhoek. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_82%_16%,rgb(227_6_19/0.16),transparent_62%)]"
      />

      <Container className="relative pb-section-sm pt-[clamp(8rem,20vh,11rem)]">
        {/* De mozaïek krijgt er op een echt breed scherm ruimte bij. Op de
            nav-breedte houdt de kop maar zo'n 420px over, en "DIENSTEN" in de
            display-letter kan niet afbreken: bij een bredere beeldkolom loopt
            het woord het masker uit en wordt het afgekapt. */}
        <div className="grid items-center gap-[clamp(2.75rem,6vw,4.5rem)] nav:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
          <div>
            <Reveal trigger="mount" variants={fadeIn} className="mb-6">
              <Eyebrow>{servicesPage.eyebrow}</Eyebrow>
            </Reveal>

            <h1 className="font-display text-[clamp(2.75rem,7vw,5.25rem)] font-bold uppercase leading-[0.92] tracking-headline">
              <MaskedLines
                lines={[{ text: first ?? "" }, { text: second ?? "", accent: true }]}
                delay={0.15}
              />
            </h1>

            <Reveal
              as="p"
              trigger="mount"
              variants={fadeIn}
              delay={0.8}
              className="mt-8 max-w-[34rem] text-[1.08rem] leading-[1.7] text-muted"
            >
              {servicesPage.intro}
            </Reveal>

            <Reveal
              trigger="mount"
              variants={fadeIn}
              delay={0.95}
              className="mt-9 flex flex-wrap gap-4"
            >
              {primary ? (
                <Magnetic>
                  <Button href={primary.href}>{primary.label}</Button>
                </Magnetic>
              ) : null}
              {secondary ? (
                <Magnetic>
                  <Button href={secondary.href} variant="ghost" withArrow={false}>
                    {secondary.label}
                  </Button>
                </Magnetic>
              ) : null}
            </Reveal>
          </div>

          {/* Twee kolommen met dezelfde totale verhouding, zodat ze onderaan
              weer gelijk uitkomen ondanks de versprongen start. De verspringing
              zelf staat uit onder de nav-breedte: daar staat de mozaïek onder de
              tekst en zou een halve tegel gat aan de bovenkant alleen maar
              scheef lijken. */}
          <div
            aria-label="Werk uit onze diensten"
            role="group"
            className="grid grid-cols-2 gap-[clamp(0.625rem,1.4vw,1rem)]"
          >
            <div className="flex flex-col gap-[clamp(0.625rem,1.4vw,1rem)]">
              {tileOne ? (
                <ShowcaseTile image={tileOne} aspect="aspect-[4/5]" delay={0.35} priority />
              ) : null}
              {tileTwo ? (
                <ShowcaseTile image={tileTwo} aspect="aspect-[4/3]" delay={0.5} priority={false} />
              ) : null}
            </div>

            <div className="flex flex-col gap-[clamp(0.625rem,1.4vw,1rem)] nav:translate-y-[clamp(1.5rem,4vw,3rem)]">
              {tileThree ? (
                <ShowcaseTile image={tileThree} aspect="aspect-[4/3]" delay={0.43} priority />
              ) : null}
              {tileFour ? (
                <ShowcaseTile image={tileFour} aspect="aspect-[4/5]" delay={0.58} priority={false} />
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
