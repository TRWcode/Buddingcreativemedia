import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/ContactCta";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { fadeIn } from "@/lib/motion";
import { services, servicesPage } from "@/lib/content/services";
import { dienstenHref } from "@/lib/content/site";

export const metadata: Metadata = {
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
  alternates: { canonical: dienstenHref },
};

export default function DienstenPage() {
  const [first, second] = servicesPage.heading;

  return (
    <>
      <Container as="section" id="top" className="pb-section-sm pt-[clamp(8rem,20vh,11rem)]">
        <Reveal trigger="mount" variants={fadeIn} className="mb-6">
          <Eyebrow>{servicesPage.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="font-display text-[clamp(2.75rem,11vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-headline">
          <MaskedLines
            lines={[{ text: first ?? "" }, { text: second ?? "", accent: true }]}
            delay={0.15}
          />
        </h1>

        <Reveal
          as="p"
          trigger="mount"
          variants={fadeIn}
          delay={0.8}
          className="mt-8 max-w-[36rem] text-[1.08rem] leading-[1.7] text-muted"
        >
          {servicesPage.intro}
        </Reveal>

        {/* Springlijst naar de twee disciplines. De pagina is lang en iemand die
            hier komt weet meestal al of hij foto of video zoekt. Kale ankers:
            `SmoothScroll` vangt elke `href="#..."` op de pagina af en scrolt er
            met de juiste ruimte onder de balk naartoe. */}
        <Reveal
          trigger="mount"
          variants={fadeIn}
          delay={1}
          className="mt-10 flex flex-wrap gap-3"
        >
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="rounded-pill border border-hairline-strong px-6 py-3 text-[0.95rem] font-medium text-bone transition-colors duration-fast ease-interact hover:border-brand hover:text-brand"
            >
              {service.title}
            </a>
          ))}
        </Reveal>
      </Container>

      {services.map((service, index) => (
        <ServiceDetail key={service.id} service={service} withDivider={index > 0} />
      ))}

      <ContactCta />
    </>
  );
}
