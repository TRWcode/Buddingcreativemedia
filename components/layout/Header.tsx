"use client";

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
 */
export function Header() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-1000 flex items-center justify-between px-gutter",
          "border-b transition-[padding,background-color,border-color] duration-base ease-interact",
          scrolled
            ? "border-hairline bg-ink/70 py-3.5 backdrop-blur-[14px]"
            : "border-transparent bg-transparent py-5.5",
        )}
      >
        <Magnetic strength={0.15}>
          <Logo />
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
          <Magnetic className="max-sm:hidden">
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
