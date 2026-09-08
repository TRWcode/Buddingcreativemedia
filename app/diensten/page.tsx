import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/ContactCta";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { services, servicesPage } from "@/lib/content/services";
import { dienstenHref } from "@/lib/content/site";

export const metadata: Metadata = {
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
  alternates: { canonical: dienstenHref },
};

/**
 * De pagina loopt van breed naar smal: eerst waar dit over gaat (de kop met
 * beeld), dan alle negen namen op één scherm (de index), en pas daarna de
 * uitleg per discipline. Wie precies weet wat hij zoekt is bij de index al
 * klaar en springt; wie het nog niet weet leest gewoon door.
 */
export default function DienstenPage() {
  return (
    <>
      <ServicesHero />
      <ServiceIndex />

      {services.map((service, index) => (
        <ServiceDetail
          key={service.id}
          service={service}
          index={index}
          total={services.length}
        />
      ))}

      <ContactCta />
    </>
  );
}
