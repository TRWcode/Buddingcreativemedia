import { Cases } from "@/components/sections/Cases";
import { Clients } from "@/components/sections/Clients";
import { ContactCta } from "@/components/sections/ContactCta";
import { Events } from "@/components/sections/Events";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Werkwijze } from "@/components/sections/Werkwijze";

/**
 * De eventsectie kiest het eerstvolgende event op de datum van vandaag. Zonder
 * dit zou dat de builddatum zijn en zou de homepage een cursus blijven aanprijzen
 * die al geweest is. Zelfde interval als `/events`, zodat de twee niet uiteen
 * kunnen lopen.
 */
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Clients />
      <Cases />
      <Werkwijze />
      <Events />
      <ContactCta />
    </>
  );
}
