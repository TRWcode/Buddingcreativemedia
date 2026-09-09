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
import { fadeIn } from "@/lib/motion";
import { overOnsPage, story, storyImages } from "@/lib/content/overons";
import { overOnsHref } from "@/lib/content/site";
import { processSteps, werkwijzeIntro } from "@/lib/content/werkwijze";

export const metadata: Metadata = {
  title: overOnsPage.metaTitle,
  description: overOnsPage.metaDescription,
  alternates: { canonical: overOnsHref },
};

export default function OverOnsPage() {
  const [first, second] = overOnsPage.heading;

  return (
    <>
      <Container as="section" id="top" className="pb-section-sm pt-[clamp(8rem,20vh,11rem)]">
        <Reveal trigger="mount" variants={fadeIn} className="mb-6">
          <Eyebrow>{overOnsPage.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="font-display text-[clamp(2.75rem,10vw,6rem)] font-bold uppercase leading-[0.92] tracking-headline">
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
          className="mt-8 max-w-[36rem] text-[1.08rem] leading-[1.7] text-muted"
        >
          {overOnsPage.intro}
        </Reveal>
      </Container>

      <Container as="section" aria-labelledby="wie" className="pb-section">
        {/* Pas splitsen op de nav-breedte en niet al op de stack-breedte. Tussen
            720 en 900px zou de tekstkolom naast een kop van 20rem op zo'n 300px
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
            {story.paragraphs.map((paragraph) => (
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

        {/* Drie beelden uit het echte werk. Op een telefoon liggend en onder
            elkaar, vanaf de stack-breedte staand naast elkaar: drie staande
            beelden op 375px zouden elk zo'n 100px breed worden. */}
        <Stagger className="mt-[clamp(3rem,7vh,4.5rem)] grid gap-[1.375rem] stack:grid-cols-3">
          {storyImages.map((image) => (
            <StaggerItem key={image.src} className="overflow-hidden rounded-media border border-hairline bg-surface">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 45rem) 100vw, 30vw"
                className="aspect-[3/2] w-full object-cover stack:aspect-[4/5]"
              />
            </StaggerItem>
          ))}
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
