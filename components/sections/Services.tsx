import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { ServiceCard } from "./ServiceCard";
import { services, servicesIntro } from "@/lib/content/services";
import { dienstenHref } from "@/lib/content/site";

/**
 * Het dienstenblok op de homepage is sinds `/diensten` bestaat een voorproefje:
 * de negen namen met één regel erbij, zodat je in één blik ziet of we bij je
 * klus passen. Wat elke dienst inhoudt en waar hij voor wordt ingezet staat op
 * de pagina. Zelfde verhouding als het cases-blok hieronder.
 */
export function Services() {
  return (
    <Container as="section" id="diensten" className="py-section">
      <SectionHeading {...servicesIntro} />

      {/* `items-stretch` plus `h-full` op het item: de kaart met vier diensten
          wordt even hoog als die met vijf, zodat de twee links onderin op
          dezelfde lijn staan in plaats van een trapje te vormen. */}
      <Stagger className="grid items-stretch gap-[1.375rem] stack:grid-cols-2">
        {services.map((service) => (
          <StaggerItem key={service.id} className="h-full">
            <ServiceCard service={service} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-[clamp(2.75rem,6vh,4.25rem)] flex justify-center">
        <Magnetic>
          <Button href={dienstenHref} variant="ghost" size="lg">
            Alle diensten
          </Button>
        </Magnetic>
      </Reveal>
    </Container>
  );
}
