import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { contactPage } from "@/lib/content/contact";
import { contactHref } from "@/lib/content/site";
import { fadeIn } from "@/lib/motion";

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  alternates: { canonical: contactHref },
};

export default function ContactPage() {
  return (
    // Geen afsluitend CTA-blok onderaan deze pagina. Dat blok stuurt bezoekers
    // hierheen; wie hier al is, hoort geen knop te zien die hem naar dezelfde
    // pagina terugbrengt.
    <Container id="top" className="pb-section pt-[clamp(8rem,20vh,11rem)]">
      <header className="mb-section-sm max-w-[42rem]">
        <Reveal trigger="mount" variants={fadeIn} className="mb-6">
          <Eyebrow>{contactPage.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="font-display text-[clamp(2.75rem,11vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-headline">
          <MaskedLines
            lines={[{ text: contactPage.heading[0] }, { text: contactPage.heading[1], accent: true }]}
            delay={0.15}
          />
        </h1>

        <Reveal
          as="p"
          trigger="mount"
          variants={fadeIn}
          delay={0.8}
          className="mt-8 text-[1.08rem] leading-[1.7] text-muted"
        >
          {contactPage.intro}
        </Reveal>
      </header>

      <div className="grid gap-x-16 gap-y-section-sm nav:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <section aria-labelledby="formulier">
          <h2
            id="formulier"
            className="mb-3 font-display text-[1.75rem] font-bold uppercase leading-[1.1] tracking-title"
          >
            {contactPage.formHeading}
          </h2>
          <p className="mb-8 leading-[1.7] text-muted">{contactPage.formIntro}</p>
          <ContactForm />
        </section>

        <aside className="space-y-section-sm">
          <section aria-labelledby="direct">
            <h2
              id="direct"
              className="mb-3 font-display text-[1.75rem] font-bold uppercase leading-[1.1] tracking-title"
            >
              {contactPage.directHeading}
            </h2>
            <p className="mb-6 leading-[1.7] text-muted">{contactPage.directIntro}</p>
            <ContactDetails />
          </section>

          <section aria-labelledby="vervolg">
            <h2
              id="vervolg"
              className="mb-6 font-display text-[1.75rem] font-bold uppercase leading-[1.1] tracking-title"
            >
              {contactPage.responseHeading}
            </h2>
            <ol className="space-y-4">
              {contactPage.responseSteps.map((step, index) => (
                <li key={step} className="flex gap-4 leading-[1.6] text-muted">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-mark border border-brand/30 bg-brand/12 text-[0.82rem] font-bold text-brand">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </Container>
  );
}
