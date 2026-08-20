import { Cases } from "@/components/sections/Cases";
import { ContactCta } from "@/components/sections/ContactCta";
import { Events } from "@/components/sections/Events";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Werkwijze } from "@/components/sections/Werkwijze";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Cases />
      <Werkwijze />
      <Events />
      <ContactCta />
    </>
  );
}
