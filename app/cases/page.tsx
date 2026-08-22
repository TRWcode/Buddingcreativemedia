import type { Metadata } from "next";
import { CaseCard } from "@/components/sections/CaseCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { fadeIn } from "@/lib/motion";
import { caseStudies, casesIntro, toCaseCard } from "@/lib/content/cases";

export const metadata: Metadata = {
  title: "Cases",
  description:
    "Van idee tot impact. Een overzicht van het werk dat we maakten voor merken, bedrijven en organisaties.",
  alternates: { canonical: "/cases" },
};

export default function CasesPage() {
  return (
    <>
      <Container
        as="section"
        id="top"
        className="pb-section-sm pt-[clamp(8rem,20vh,11rem)]"
      >
        <Reveal trigger="mount" variants={fadeIn} className="mb-6">
          <Eyebrow>{casesIntro.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="font-display text-[clamp(2.75rem,11vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-headline">
          <MaskedLines lines={[{ text: "Onze" }, { text: "Cases", accent: true }]} delay={0.15} />
        </h1>

        <Reveal
          as="p"
          trigger="mount"
          variants={fadeIn}
          delay={0.8}
          className="mt-8 max-w-[30rem] text-[1.08rem] leading-[1.6] text-muted"
        >
          {casesIntro.description}
        </Reveal>
      </Container>

      <Container as="section" aria-label="Alle cases" className="pb-section">
        <Stagger className="grid gap-[1.375rem] stack:grid-cols-3">
          {caseStudies.map((study) => (
            <StaggerItem key={study.slug}>
              <CaseCard item={toCaseCard(study)} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <ContactCta />
    </>
  );
}
