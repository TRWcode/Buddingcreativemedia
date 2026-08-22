import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import type { CaseStudy } from "@/lib/content/cases";

/**
 * De feiten van de case in één balk: klant, disciplines, jaar en locatie. Staat
 * direct onder de hero omdat dat de eerste vraag is die een bezoeker stelt —
 * en het houdt het verhaal eronder vrij van opsommingen.
 */
export function CaseMeta({ study }: { study: CaseStudy }) {
  const facts = [
    { label: "Klant", value: study.client },
    { label: "Diensten", value: study.disciplines.join(", ") },
    { label: "Jaar", value: study.year },
    { label: "Locatie", value: study.location },
  ];

  return (
    <Container as="section" aria-label="Projectgegevens">
      <Stagger
        as="ul"
        stagger={0.06}
        className="grid gap-y-7 py-[clamp(2rem,5vh,3rem)] stack:grid-cols-4"
      >
        {facts.map((fact) => (
          <StaggerItem
            key={fact.label}
            as="li"
            className="stack:border-l stack:border-hairline stack:pl-[clamp(1rem,2.5vw,2.25rem)] stack:first:border-l-0 stack:first:pl-0"
          >
            <p className="mb-2.5 text-[0.72rem] uppercase tracking-label text-muted">
              {fact.label}
            </p>
            <p className="font-display text-[1.05rem] font-medium tracking-title">{fact.value}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
