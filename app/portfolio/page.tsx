import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { ContactCta } from "@/components/sections/ContactCta";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { fadeIn } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Een dwarsdoorsnede van ons werk: bedrijfsreportages, events, portretten, concepten, dronebeeld en campagnes.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <Container as="section" id="top" className="pb-section-sm pt-[clamp(8rem,20vh,11rem)]">
        <Reveal trigger="mount" variants={fadeIn} className="mb-6">
          <Eyebrow>Ons werk</Eyebrow>
        </Reveal>

        <h1 className="font-display text-[clamp(2.75rem,11vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-headline">
          <MaskedLines lines={[{ text: "Port" }, { text: "folio", accent: true }]} delay={0.15} />
        </h1>

        <Reveal
          as="p"
          trigger="mount"
          variants={fadeIn}
          delay={0.8}
          className="mt-8 max-w-[32rem] text-[1.08rem] leading-[1.6] text-muted"
        >
          Een dwarsdoorsnede van ons werk, van bedrijfsreportages en portretten tot creatieve
          concepten en sfeervolle eventregistraties.
        </Reveal>
      </Container>

      <Container as="section" aria-label="Portfolio" className="pb-section">
        <PortfolioGrid />
      </Container>

      <ContactCta />
    </>
  );
}
