import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaZoom } from "@/components/ui/MediaZoom";
import { Reveal } from "@/components/ui/Reveal";
import { caseHref } from "@/lib/content/cases";
import type { CaseStudy } from "@/lib/content/cases";

/**
 * Doorstap naar de volgende case. Eén groot klikvlak — de hele rij reageert,
 * inclusief de zoom op het beeld, via `group-hover` in CSS.
 */
export function CaseNext({ study }: { study: CaseStudy }) {
  return (
    <section className="border-t border-hairline">
      <Link href={caseHref(study.slug)} className="group block">
        <Container className="grid items-center gap-[clamp(1.75rem,4vw,3.5rem)] py-[clamp(3rem,8vh,5rem)] stack:grid-cols-[1fr_auto]">
          <div>
            <Reveal className="mb-6">
              <Eyebrow>Volgende case</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display text-[clamp(2rem,5.5vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-headline transition-colors duration-base ease-interact group-hover:text-brand">
                {study.title}
              </h2>
              <p className="mt-3.5 text-muted">
                {study.client} &middot; {study.year}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="w-full stack:w-[clamp(16rem,26vw,22rem)]">
            <MediaZoom
              image={study.card}
              sizes="(max-width: 720px) 100vw, 22rem"
              withAccentLine
              className="aspect-4/3 rounded-media border border-hairline"
            />
          </Reveal>
        </Container>
      </Link>
    </section>
  );
}
