import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { ServiceCard } from "./ServiceCard";
import { services, servicesIntro } from "@/lib/content/services";

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
    </Container>
  );
}
