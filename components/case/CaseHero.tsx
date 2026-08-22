import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { ParallaxMedia } from "@/components/ui/ParallaxMedia";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { fadeIn } from "@/lib/motion";
import { casesIndexHref } from "@/lib/content/cases";
import type { CaseStudy } from "@/lib/content/cases";

/**
 * Opening van een casepagina: het sleutelbeeld full-bleed met daaroverheen de
 * titel, regel voor regel. Dezelfde opbouw als de hero op de homepage — zelfde
 * doeken, zelfde parallax — maar lager, zodat het verhaal eerder in beeld komt.
 */
export function CaseHero({ study }: { study: CaseStudy }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[clamp(30rem,78svh,50rem)] flex-col justify-end overflow-hidden"
    >
      <ParallaxMedia image={study.hero} priority sizes="100vw" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-[image:var(--case-overlay)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-[image:var(--hero-veil)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-[image:var(--hero-glow)]"
      />

      <Container className="relative z-3 pb-[clamp(2.5rem,7vh,4.5rem)] pt-[clamp(8rem,20vh,11rem)]">
        <Reveal trigger="mount" variants={fadeIn} className="mb-7">
          <Link
            href={casesIndexHref}
            className="group/back inline-flex items-center gap-2 text-[0.86rem] font-medium text-muted transition-colors duration-fast hover:text-bone"
          >
            <span
              aria-hidden
              className="text-brand transition-transform duration-base ease-interact group-hover/back:-translate-x-1"
            >
              &larr;
            </span>
            Alle cases
          </Link>
        </Reveal>

        <Reveal trigger="mount" variants={fadeIn} delay={0.1} className="mb-6">
          <Eyebrow>{study.client}</Eyebrow>
        </Reveal>

        <h1 className="font-display text-[clamp(2.4rem,11vw,5rem)] font-bold uppercase leading-[0.92] tracking-headline stack:text-[clamp(3rem,8vw,7rem)]">
          <MaskedLines
            lines={study.titleLines.map((text) => ({ text }))}
            trigger="mount"
            delay={0.2}
          />
        </h1>

        <Reveal
          trigger="mount"
          variants={fadeIn}
          delay={0.9}
          className="mt-8 flex flex-wrap items-center gap-2.5"
        >
          {study.disciplines.map((discipline) => (
            <Tag key={discipline}>{discipline}</Tag>
          ))}
          <Tag>{study.year}</Tag>
        </Reveal>
      </Container>
    </section>
  );
}
