import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { ServiceCard } from "./ServiceCard";
import { services, servicesIntro } from "@/lib/content/services";

export function Services() {
  return (
    <Container as="section" id="diensten" className="py-section">
      <SectionHeading {...servicesIntro} />

      <Stagger className="grid gap-[1.375rem] stack:grid-cols-2">
        {services.map((service) => (
          <StaggerItem key={service.id}>
            <ServiceCard service={service} />
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
