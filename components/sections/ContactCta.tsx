import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/lib/content/contact";

/** Afsluitend rood blok — het enige lichte vlak op de pagina. */
export function ContactCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-linear-135 from-brand-deep from-0% via-brand via-55% to-brand-dark to-100% print:hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_100%_0%,rgb(0_0_0/0.35),transparent_60%)]"
      />

      <Container className="relative max-w-[75rem] py-[clamp(5.625rem,15vh,10.625rem)] text-center">
        <Reveal as="p" className="mb-7 text-[0.78rem] font-medium uppercase tracking-eyebrow text-white/75">
          {contact.eyebrow}
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mb-10 font-display text-[clamp(3rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-headline text-white">
            {contact.title}
          </h2>
        </Reveal>

        <Reveal as="p" delay={0.16} className="mx-auto mb-11 max-w-[35rem] text-[1.2rem] leading-[1.6] text-white/90">
          {contact.description}
        </Reveal>

        <Reveal delay={0.24} className="flex justify-center">
          <Magnetic>
            <Button href={contact.cta.href} variant="solid" size="lg">
              {contact.cta.label}
            </Button>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  );
}
