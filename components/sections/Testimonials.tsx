import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { testimonials, testimonialsIntro } from "@/lib/content/overons";
import type { Testimonial } from "@/lib/content/overons";

/**
 * De klantreacties: de eerste groot uitgelicht, de rest als kaart ernaast.
 *
 * Op de oude site zat dit in een carrousel met stippen eronder. Een carrousel
 * kost hier alleen maar: hij verbergt de helft, hij vraagt een tik voordat je
 * verder kunt lezen, en aanbevelingen zijn nu net het soort tekst dat mensen
 * scannen in plaats van doorbladeren.
 *
 * Drie gelijke kaarten was het antwoord daarop, en dat werkte — maar het gaf
 * de sterkste inhoud van deze pagina ook het gewicht van een voetnoot. Wat
 * iemand over je zegt is op een over-ons-pagina overtuigender dan wat je zelf
 * schrijft, en dat mag je zien. De eerste staat nu op de paginakleur in de
 * display-letter, zonder kader eromheen; de andere twee blijven kaarten.
 *
 * Welke er groot staat is de eerste in de lijst en niet een aparte vlag in de
 * content: één plek om de volgorde te bepalen is genoeg, en een tweede veld
 * dat "uitgelicht" heet gaat op termijn tegenspreken wat de volgorde zegt.
 */
export function Testimonials() {
  const [uitgelicht, ...rest] = testimonials;

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

        {uitgelicht ? (
          <Reveal
            as="div"
            className="mb-[clamp(1.75rem,4vh,2.75rem)] border-y border-hairline py-[clamp(2.25rem,5vh,3.5rem)]"
          >
            <figure className="grid gap-[clamp(1.5rem,4vw,3.5rem)] nav:grid-cols-[minmax(0,1fr)_minmax(0,14rem)] nav:items-end">
              {/* De aanhalingstekens staan in de tekst zelf en niet als los
                  teken ervoor: bij een citaat van deze maat is het leesteken
                  onderdeel van de zin, en een losse krul van 3rem ernaast wordt
                  een tweede kop. */}
              <blockquote className="font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-medium leading-[1.4] tracking-title text-bone">
                <span aria-hidden className="text-brand">
                  &ldquo;
                </span>
                {uitgelicht.quote}
                <span aria-hidden className="text-brand">
                  &rdquo;
                </span>
              </blockquote>

              <figcaption className="nav:text-right">
                <span className="block font-display text-[1.1rem] font-semibold tracking-title text-brand">
                  {uitgelicht.name}
                </span>
                <span className="mt-1 block text-[0.9rem] text-muted">{uitgelicht.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ) : null}

        {/* Twee kaarten naast elkaar vanaf de stack-breedte. De citaten
            verschillen sterk in lengte; de kaarten worden even hoog en het
            onderschrift staat onderaan vastgezet, zodat de namen op één lijn
            staan en het verschil als witruimte leest in plaats van als rommel. */}
        <Stagger as="ul" className="grid items-stretch gap-[1.375rem] stack:grid-cols-2">
          {rest.map((item) => (
            <StaggerItem key={item.id} as="li" className="h-full">
              <QuoteCard item={item} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function QuoteCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-card border border-hairline bg-surface p-[clamp(1.75rem,3vw,2.5rem)]">
      {/* Puur decoratief, en daarom aria-hidden: de blockquote zegt voor een
          schermlezer al dat dit een citaat is. */}
      <span aria-hidden className="font-display text-[3.5rem] font-bold leading-[0.6] text-brand">
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
  );
}
