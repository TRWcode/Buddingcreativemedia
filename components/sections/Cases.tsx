import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CaseCard } from "./CaseCard";
import { CaseSpotlight } from "./CaseSpotlight";
import { caseCards, casesCta, casesIntro } from "@/lib/content/cases";

export function Cases() {
  return (
    <Container as="section" id="cases" className="pb-section pt-[clamp(1.25rem,3vh,2.5rem)]">
      <SectionHeading {...casesIntro} />

      <CaseSpotlight />

      <Stagger className="grid gap-[1.375rem] stack:grid-cols-3">
        {caseCards.map((item) => (
          <StaggerItem key={item.id}>
            <CaseCard item={item} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-[clamp(2.75rem,6vh,4.25rem)] flex justify-center">
        <Magnetic>
          <Button href={casesCta.href} variant="ghost" size="lg">
            {casesCta.label}
          </Button>
        </Magnetic>
      </Reveal>
    </Container>
  );
}
