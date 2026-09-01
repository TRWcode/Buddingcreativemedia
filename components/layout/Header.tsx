"use client";

import { usePathname } from "next/navigation";
import { useCallback, useId, useState } from "react";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Logo } from "./Logo";
import { MenuToggle } from "./MenuToggle";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/cn";
import { navLinks, primaryCta } from "@/lib/content/site";
import { useScrolled } from "@/lib/useScrolled";

/**
 * Vaste header die bij het scrollen compacter wordt en een blurlaag krijgt.
 * De overgang loopt via CSS-transities, niet via JS, zodat er niets per frame
 * herberekend hoeft te worden.
 *
 * De balk is bewust vrij dekkend (85%): hij schuift ook over het rode CTA-blok,
 * en het logo is deels rood — op een lichtere balk valt dat tegen die achtergrond
 * weg.
 */
export function Header() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /**
   * Bij een routewissel gaat het menu dicht.
   *
   * De balk staat boven de overlay, dus logo en CTA blijven aantikbaar terwijl
   * het menu open is. Zonder dit kwam je op de nieuwe pagina aan met het menu
   * nog dicht over het scherm en de scroll op slot — je zat vast.
   *
   * Tijdens de render bijstellen en niet in een effect: het menu is dan al
   * gesloten in dezelfde render waarin de nieuwe pagina verschijnt, in plaats
   * van een frame later zichtbaar dicht te klappen.
   */
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-1000 flex items-center justify-between px-gutter print:hidden",
          "border-b transition-[padding,background-color,border-color] duration-base ease-interact",
          scrolled ? "py-3.5" : "py-5.5",
          // Met het menu open loopt de balk over de overlay heen: dan geen rand
          // en geen eigen vlak, zodat hij in het zwart van het menu opgaat. De
          // padding blijft wel staan — anders verspringt de burgerknop onder je
          // vinger op het moment dat je hem indrukt.
          scrolled && !menuOpen
            ? "border-hairline bg-ink/85 backdrop-blur-[14px]"
            : "border-transparent bg-transparent",
        )}
      >
        <Magnetic strength={0.15}>
          {/* Ook het logo sluit het menu: het wijst naar `#top`, dus op de
              homepage verandert het pad niet en slaat de vergelijking hierboven
              niet aan. */}
          <Logo onClick={closeMenu} />
        </Magnetic>

        <nav
          aria-label="Hoofdnavigatie"
          className="hidden items-center gap-9 text-[0.92rem] font-medium nav:flex"
        >
          {navLinks.map((link) => (
            <AnchorLink
              key={link.label}
              href={link.href}
              className="transition-colors duration-fast hover:text-brand"
            >
              {link.label}
            </AnchorLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Het open menu heeft onderin dezelfde knop staan. Twee keer "Let's
              Talk" tegelijk in beeld leest als een fout, dus deze fade weg. */}
          <Magnetic
            className={cn(
              "transition-opacity duration-base ease-interact max-sm:hidden",
              menuOpen && "pointer-events-none opacity-0",
            )}
          >
            <Button href={primaryCta.href} size="sm">
              {primaryCta.label}
            </Button>
          </Magnetic>
          <MenuToggle
            open={menuOpen}
            onToggle={() => setMenuOpen((value) => !value)}
            controls={menuId}
          />
        </div>
      </header>

      <MobileMenu id={menuId} open={menuOpen} onClose={closeMenu} />
    </>
  );
}
