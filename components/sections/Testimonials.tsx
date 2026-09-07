import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { testimonials, testimonialsIntro } from "@/lib/content/overons";

/**
 * De klantreacties, alle drie tegelijk in beeld.
 *
 * Op de oude site zat dit in een carrousel met stippen eronder. Een carrousel
 * kost hier alleen maar: hij verbergt de helft, hij vraagt een tik voordat je
 * verder kunt lezen, en aanbevelingen zijn nu net het soort tekst dat mensen
 * scannen in plaats van doorbladeren.
 *
 * De citaten verschillen sterk in lengte. De kaarten worden even hoog en het
 * onderschrift staat onderaan vastgezet, zodat de drie namen op één lijn staan
 * en het verschil als witruimte leest in plaats van als rommel.
 */
export function Testimonials() {
  return (
    <section aria-labelledby="klanten" className="border-t border-hairline bg-ink">
      <Container className="py-section">
        <Reveal className="mb-5">
          <Eyebrow>{testimonialsIntro.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal>
          <h2
            id="klanten"
            className="mb-section-sm font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold uppercase leading-[0.92] tracking-headline"
          >
            {testimonialsIntro.title}
          </h2>
        </Reveal>

        {/* Twee kolommen op de stack-breedte, pas drie op de nav-breedte. Bij
            drie kolommen op 720px houdt een kaart nog 163px tekst over, en dan
            valt een citaat van deze lengte uiteen in twintig woordbrokjes onder
            elkaar. */}
        <Stagger as="ul" className="grid items-stretch gap-[1.375rem] stack:grid-cols-2 nav:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item.id} as="li" className="h-full">
              <figure className="flex h-full flex-col rounded-card border border-hairline bg-surface p-[clamp(1.75rem,3vw,2.5rem)]">
                {/* Puur decoratief, en daarom aria-hidden: de blockquote zegt
                    voor een schermlezer al dat dit een citaat is. */}
                <span
                  aria-hidden
                  className="font-display text-[3.5rem] font-bold leading-[0.6] text-brand"
                >
                  &ldquo;
                </span>

                <blockquote className="mt-6 flex-1 text-[1rem] leading-[1.7] text-bone/85">
                  {item.quote}
                </blockquote>

                <figcaption className="mt-8 border-t border-hairline pt-5">
                  <span className="block font-display font-semibold tracking-title text-brand">
                    {item.name}
                  </span>
                  <span className="block text-[0.9rem] text-muted">{item.role}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
