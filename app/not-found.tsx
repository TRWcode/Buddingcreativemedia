import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Magnetic } from "@/components/ui/Magnetic";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { fadeIn } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-svh flex-col justify-center py-section">
      <Reveal trigger="mount" variants={fadeIn} className="mb-7">
        <Eyebrow>Fout 404</Eyebrow>
      </Reveal>

      <h1 className="font-display text-[clamp(2.75rem,12vw,7rem)] font-bold uppercase leading-[0.9] tracking-headline">
        <MaskedLines lines={[{ text: "Deze pagina" }, { text: "bestaat niet", accent: true }]} />
      </h1>

      <Reveal
        as="p"
        trigger="mount"
        variants={fadeIn}
        delay={0.7}
        className="mt-8 max-w-[28rem] text-[1.08rem] leading-[1.6] text-muted"
      >
        De link klopt niet meer of de pagina is verplaatst. Vanaf de homepage vind je alles terug.
      </Reveal>

      <Reveal trigger="mount" variants={fadeIn} delay={0.85} className="mt-10 flex flex-wrap gap-4">
        <Magnetic>
          <Button href="/">Naar de homepage</Button>
        </Magnetic>
        <Magnetic>
          <Button href="/#cases" variant="ghost" withArrow={false}>
            Bekijk de cases
          </Button>
        </Magnetic>
      </Reveal>
    </Container>
  );
}
