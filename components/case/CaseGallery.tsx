import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/ui/ImageReveal";
import type { CaseGalleryItem } from "@/lib/content/cases";

/**
 * Mozaïek van het beeldmateriaal. Elke foto draagt in de content zelf hoeveel
 * ruimte hij krijgt — `full` over de volle breedte, `half` en `tall` naast
 * elkaar — zodat de opbouw per case verschilt zonder dat hier iets aan moet.
 *
 * `full` houdt bewust de eigen verhouding van het beeld. Een vaste uitsnede
 * werkt tegen de foto: bij de groepsfoto van JijbenM zou een 16:9-kader precies
 * de roze M van het dak snijden. Halve kolommen hebben wél een vaste verhouding,
 * anders lijnen de rijen niet meer uit.
 *
 * De rijen lijnen bovenaan uit: een staand beeld naast een liggend geeft dan
 * een bewuste versprong in plaats van twee uitgerekte kaders.
 */
const spanLayout: Record<CaseGalleryItem["span"], string> = {
  full: "stack:col-span-2",
  half: "aspect-4/3",
  tall: "aspect-3/4",
};

const spanSizes: Record<CaseGalleryItem["span"], string> = {
  full: "(max-width: 720px) 100vw, 87.5rem",
  half: "(max-width: 720px) 100vw, 44rem",
  tall: "(max-width: 720px) 100vw, 44rem",
};

export function CaseGallery({ images }: { images: readonly CaseGalleryItem[] }) {
  return (
    <Container as="section" aria-label="Beeld uit deze case" className="pb-[clamp(3.5rem,9vh,6rem)]">
      <div className="grid items-start gap-[clamp(0.875rem,2vw,1.375rem)] stack:grid-cols-2">
        {images.map((image) => (
          <ImageReveal
            key={image.src}
            image={image}
            sizes={spanSizes[image.span]}
            aspect={image.span === "full" ? image.width / image.height : undefined}
            className={spanLayout[image.span]}
          />
        ))}
      </div>
    </Container>
  );
}
