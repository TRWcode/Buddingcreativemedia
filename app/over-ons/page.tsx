import type { Metadata } from "next";
import Image from "next/image";
import { Clients } from "@/components/sections/Clients";
import { ContactCta } from "@/components/sections/ContactCta";
import { ProcessStep } from "@/components/sections/ProcessStep";
import { Testimonials } from "@/components/sections/Testimonials";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { cn } from "@/lib/cn";
import { fadeIn } from "@/lib/motion";
import { overOnsPage, story, storyHeroImage, storyImages } from "@/lib/content/overons";
import type { StoryImage } from "@/lib/content/overons";
import { overOnsHref } from "@/lib/content/site";
import { processSteps, werkwijzeIntro } from "@/lib/content/werkwijze";

export const metadata: Metadata = {
  title: overOnsPage.metaTitle,
  description: overOnsPage.metaDescription,
  alternates: { canonical: overOnsHref },
};

/**
 * Eén beeld met het label van de opdracht eronder.
 *
 * Het bijschrift staat buiten het kader en niet eroverheen. Over het beeld
 * heen zou het een doek vragen om leesbaar te blijven, en dat kost precies de
 * hoek van de foto die je wilde laten zien.
 */
function WorkImage({
  image,
  aspect,
  sizes,
  className,
}: {
  image: StoryImage;
  aspect: string;
  sizes: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="group overflow-hidden rounded-media border border-hairline bg-surface">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          className={cn(
            "w-full object-cover transition-transform duration-zoom ease-interact",
            "group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            aspect,
          )}
        />
      </div>
      <figcaption className="mt-3 text-[0.72rem] font-medium uppercase tracking-label text-muted">
        {image.caption}
      </figcaption>
    </figure>
  );
}

export default function OverOnsPage() {
  const [first, second] = overOnsPage.heading;
  const [lead, ...rest] = story.paragraphs;
  const [staand, breed, laatste] = storyImages;

  return (
    <>
      <Container as="section" id="top" className="pb-section-sm pt-[clamp(8rem,20vh,11rem)]">
        {/* Beeld naast de kop, en niet eronder. Dit is de pagina waarop iemand
            wil weten wie dit maakt; dan hoort er op het eerste scherm werk te
            staan en niet alleen een belofte. Eén groot staand beeld — de
            dienstenpagina heeft er vier naast elkaar, en twee pagina's met
            dezelfde opening lezen als één pagina. */}
        <div className="grid items-center gap-[clamp(2.5rem,6vw,4.5rem)] nav:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
          <div>
            <Reveal trigger="mount" variants={fadeIn} className="mb-6">
              <Eyebrow>{overOnsPage.eyebrow}</Eyebrow>
            </Reveal>

            {/* "Blijft hangen" is dertien tekens in een letter die niet kan
                afbreken. Naast de beeldkolom houdt de kop op de nav-breedte
                zo'n 450px over, en op een telefoon 331. Vandaar twee schalen:
                onder de nav-breedte loopt hij mee met het scherm, daarboven met
                de kolom. Op de oude maat liep hij op een telefoon van 375px
                zo'n 39 pixels buiten zijn masker en viel "hangen" half weg. */}
            <h1 className="font-display text-[clamp(2rem,8.5vw,3.4rem)] font-bold uppercase leading-[0.92] tracking-headline nav:text-[clamp(2.6rem,5.2vw,4.5rem)]">
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
              {overOnsPage.intro}
            </Reveal>
          </div>

          <Reveal trigger="mount" variants={fadeIn} delay={0.45}>
            <WorkImage
              image={storyHeroImage}
              aspect="aspect-[4/5]"
              sizes="(max-width: 56.25rem) 100vw, 24rem"
            />
          </Reveal>
        </div>
      </Container>

      <Container as="section" aria-labelledby="wie" className="pb-section">
        {/* Pas splitsen op de nav-breedte en niet al op de stack-breedte. Tussen
            720 en 900px zou de tekstkolom naast een kop van 16rem op zo'n 300px
            uitkomen, en dan staan er zes woorden op een regel. */}
        <div className="grid items-start gap-[clamp(2.5rem,6vw,5.625rem)] nav:grid-cols-[minmax(0,16rem)_1fr]">
          <Reveal>
            <h2
              id="wie"
              className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold uppercase leading-[0.95] tracking-headline"
            >
              {story.heading}
            </h2>
          </Reveal>

          <Stagger className="space-y-6">
            {/* De eerste alinea staat een maat groter en in de tekstkleur in
                plaats van het grijs. Drie alinea's van gelijk gewicht zijn een
                blok waar je doorheen kijkt; met een aanloop die er bovenuit
                komt weet je waar je moet beginnen en leest de rest als
                toelichting. */}
            <StaggerItem
              as="p"
              className="max-w-[40rem] text-[clamp(1.15rem,1.6vw,1.35rem)] leading-[1.6] text-bone/90"
            >
              {lead}
            </StaggerItem>

            {rest.map((paragraph) => (
              <StaggerItem
                key={paragraph.slice(0, 24)}
                as="p"
                className="max-w-[42rem] text-[1.08rem] leading-[1.75] text-muted"
              >
                {paragraph}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Drie beelden als cluster in plaats van als rij van gelijke vakjes.
            Een rij van drie even grote kaders leest als een archief; hier staat
            een smal staand beeld naast een breed beeld dat een stuk lager
            begint, en zakt het derde ingesprongen weg naar rechts. Dat is hoe
            je afdrukken op tafel zou leggen.

            De verdeling is 4 en 8 kolommen en niet 5 en 7. Op 5 kolommen komt
            het staande beeld op 513px uit, en daar heeft een bestand van 1200
            breed na een uitsnede op 4:5 nog maar 640 pixels voor — dat wordt
            zichtbaar zacht. Op 4 kolommen is het 405px en houdt elk beeld hier
            minstens anderhalf keer de pixels die het nodig heeft.

            De trap komt daarom van een marge en niet van `self-end`: op deze
            verdeling is het brede beeld het hoogste van de twee, en dan heeft
            onderaan uitlijnen niets meer om tegenaan te zakken.

            `items-start` blijft nodig: zonder rekken de kaders zich tot de
            hoogte van de rij op en staat elk beeld weer bovenaan uitgelijnd. */}
        <Stagger className="mt-[clamp(3rem,7vh,4.5rem)] grid items-start gap-[clamp(1rem,2vw,1.75rem)] nav:grid-cols-12">
          {staand ? (
            <StaggerItem className="nav:col-span-4">
              <WorkImage
                image={staand}
                aspect="aspect-[4/5]"
                sizes="(max-width: 56.25rem) 100vw, 26vw"
              />
            </StaggerItem>
          ) : null}

          {breed ? (
            <StaggerItem className="nav:col-span-8 nav:mt-[clamp(2rem,5vw,4rem)]">
              <WorkImage
                image={breed}
                aspect="aspect-[3/2]"
                sizes="(max-width: 56.25rem) 100vw, 55vw"
              />
            </StaggerItem>
          ) : null}

          {laatste ? (
            <StaggerItem className="nav:col-span-6 nav:col-start-4">
              <WorkImage
                image={laatste}
                aspect="aspect-[3/2]"
                sizes="(max-width: 56.25rem) 100vw, 40vw"
              />
            </StaggerItem>
          ) : null}
        </Stagger>
      </Container>

      <section id="werkwijze" aria-labelledby="werkwijze-titel" className="border-t border-hairline bg-ink">
        <Container className="grid items-start gap-[clamp(2.5rem,6vw,5.625rem)] py-section stack:grid-cols-2">
          {/* Blijft staan terwijl de stappen ernaast langskomen. */}
          <div className="stack:sticky stack:top-30">
            <Reveal className="mb-5">
              <Eyebrow>Hoe we werken</Eyebrow>
            </Reveal>

            <h2
              id="werkwijze-titel"
              className="font-display text-[clamp(2.4rem,5vw,4.6rem)] font-bold uppercase leading-[0.95] tracking-headline"
            >
              <MaskedLines
                trigger="scroll"
                delay={0}
                lines={overOnsPage.werkwijzeHeading.map((text, index) => ({
                  text,
                  accent: index === overOnsPage.werkwijzeHeading.length - 1,
                }))}
              />
            </h2>

            <Reveal
              as="p"
              delay={0.1}
              className="mt-7 max-w-[27.5rem] text-[1.08rem] leading-[1.6] text-muted"
            >
              {werkwijzeIntro.description}
            </Reveal>
          </div>

          <div className="flex flex-col">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                isLast={index === processSteps.length - 1}
              />
            ))}
          </div>
        </Container>
      </section>

      <Testimonials />
      <Clients />
      <ContactCta />
    </>
  );
}
