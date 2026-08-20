import { Fragment } from "react";
import { marqueeItems } from "@/lib/content/marquee";

/**
 * Doorlopende strip met vakgebieden. De lijst staat twee keer in de DOM zodat de
 * CSS-animatie naadloos kan doorlopen; de tweede set is verborgen voor
 * schermlezers. Puur CSS — dat scheelt een rAF-loop per frame.
 */
export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-hairline bg-ink py-[1.125rem]">
      <div className="flex w-max animate-marquee gap-14 whitespace-nowrap font-display text-[1.1rem] font-medium uppercase tracking-[0.06em] text-muted motion-reduce:animate-none">
        {[0, 1].map((pass) => (
          <div
            key={pass}
            className="flex gap-14"
            aria-hidden={pass === 1 ? true : undefined}
          >
            {marqueeItems.map((item) => (
              <Fragment key={item}>
                <span>{item}</span>
                <span aria-hidden className="text-brand">
                  &#10022;
                </span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
