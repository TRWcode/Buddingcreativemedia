import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessStep } from "./ProcessStep";
import { processSteps, werkwijzeIntro } from "@/lib/content/werkwijze";

export function Werkwijze() {
  const [firstLine, secondLine, accentLine] = werkwijzeIntro.titleLines;

  return (
    <section id="werkwijze" className="border-t border-hairline bg-ink">
      <Container className="grid items-start gap-[clamp(2.5rem,6vw,5.625rem)] py-section stack:grid-cols-2">
        {/* Blijft staan terwijl de stappen ernaast langskomen. */}
        <div className="stack:sticky stack:top-30">
          <Reveal className="mb-5">
            <Eyebrow>{werkwijzeIntro.eyebrow}</Eyebrow>
          </Reveal>

          <h2 className="font-display text-[clamp(2.4rem,5vw,4.6rem)] font-bold uppercase leading-[0.95] tracking-headline">
            <MaskedLines
              trigger="scroll"
              delay={0}
              lines={[
                { text: firstLine ?? "" },
                { text: secondLine ?? "" },
                { text: accentLine ?? "", accent: true },
              ]}
            />
          </h2>

          <Reveal as="p" delay={0.1} className="mt-7 max-w-[27.5rem] text-[1.08rem] leading-[1.6] text-muted">
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
  );
}
