import Image from "next/image";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { siteLogo } from "@/lib/content/site";

/**
 * Het merklogo in de header. Iets kleiner onder de nav-breakpoint, zodat het
 * naast de burgerknop past zonder de gutter op te eten.
 *
 * `priority`: het logo staat boven de vouw op elke pagina en is klein genoeg
 * om de herofoto niet van bandbreedte te beroven.
 */
export function Logo() {
  return (
    <AnchorLink href="#top" className="block shrink-0">
      <Image
        src={siteLogo.src}
        alt={siteLogo.alt}
        width={siteLogo.width}
        height={siteLogo.height}
        priority
        sizes="220px"
        className="h-8 w-auto nav:h-[2.375rem]"
      />
    </AnchorLink>
  );
}
