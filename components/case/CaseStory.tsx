import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy } from "@/lib/content/cases";

/**
 * Het verhaal: eerst de lead als losse alinea op display-formaat, daarna de
 * hoofdstukken naast elkaar — de vraag, de aanpak, het resultaat. Genummerd,
 * met een hairline boven elk hoofdstuk als kolomscheiding.
 */
export function CaseStory({ study }: { study: CaseStudy }) {
  return (
    <Container as="section" className="py-[clamp(3.5rem,9vh,6rem)]">
      <Reveal
        as="p"
        className="max-w-[48rem] font-display text-[clamp(1.35rem,3vw,2.15rem)] font-medium leading-[1.3] tracking-title text-bone"
      >
        {study.lead}
      </Reveal>

      <Stagger className="mt-[clamp(3rem,7vh,4.5rem)] grid gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-10 stack:grid-cols-3">
        {study.chapters.map((chapter, index) => (
          <StaggerItem key={chapter.id} className="border-t border-hairline pt-7">
            <span className="mb-4 block font-display text-[0.8rem] font-bold tracking-label text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="mb-4 font-display text-[clamp(1.35rem,2.4vw,1.8rem)] font-semibold uppercase tracking-[-0.01em]">
              {chapter.heading}
            </h2>
            <p className="text-[1.02rem] leading-[1.65] text-muted">{chapter.body}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-[clamp(3rem,7vh,4.5rem)] flex flex-wrap items-center gap-x-9 gap-y-5">
        <Reveal>
          <Eyebrow>Wat we leverden</Eyebrow>
        </Reveal>
        <Stagger as="ul" stagger={0.05} className="flex flex-wrap gap-2.5">
          {study.deliverables.map((item) => (
            <StaggerItem key={item} as="li">
              <Tag>{item}</Tag>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Container>
  );
}
