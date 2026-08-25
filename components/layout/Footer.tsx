import Image from "next/image";
import Link from "next/link";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from "@/components/ui/icons";
import {
  copyright,
  credit,
  footerColumns,
  footerNav,
  legalLinks,
  socialLinks,
} from "@/lib/content/footer";
import type { SocialPlatform } from "@/lib/content/footer";
import { mailHref, phoneHref, site, siteLogo } from "@/lib/content/site";

const socialIcons: Record<SocialPlatform, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
};

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink print:hidden">
      <Container className="pb-10 pt-[clamp(3.75rem,9vh,6rem)]">
        <div className="grid gap-11 stack:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src={siteLogo.src}
              alt={siteLogo.alt}
              width={siteLogo.width}
              height={siteLogo.height}
              sizes="240px"
              className="mb-6 h-[2.625rem] w-auto"
            />
            <p className="max-w-[19rem] leading-[1.6] text-muted">{site.description}</p>
          </div>

          <nav aria-label="Footernavigatie">
            <p className="mb-5 text-[0.74rem] uppercase tracking-label text-muted">
              {footerColumns.navigation.heading}
            </p>
            {/* Weinig tussenruimte, wel padding op de link zelf: zo is het tikdoel op
                een telefoon ruim 40px hoog zonder dat de kolom uit elkaar valt. */}
            <div className="flex flex-col gap-0.5 font-medium">
              {footerNav.map((link) => (
                <AnchorLink
                  key={link.label}
                  href={link.href}
                  className="w-fit py-2 transition-colors duration-fast hover:text-brand"
                >
                  {link.label}
                </AnchorLink>
              ))}
            </div>
          </nav>

          <div>
            <p className="mb-5 text-[0.74rem] uppercase tracking-label text-muted">
              {footerColumns.contact.heading}
            </p>
            <div className="flex flex-col gap-0.5 text-muted">
              <a href={mailHref} className="w-fit py-2 transition-colors duration-fast hover:text-brand">
                {site.email}
              </a>
              {/* Alleen tonen als er een echt nummer in `site.ts` staat. */}
              {phoneHref && site.phone ? (
                <a href={phoneHref} className="w-fit py-2 transition-colors duration-fast hover:text-brand">
                  {site.phone}
                </a>
              ) : null}
              <span className="py-2">Almere, Nederland</span>
            </div>

            <ul className="mt-5.5 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      // Een social-kanaal is een andere site; de bezoeker die
                      // net je werk aan het bekijken was raakt hem anders kwijt.
                      target="_blank"
                      rel="noreferrer"
                      className="flex size-10 items-center justify-center rounded-[0.625rem] border border-hairline-strong text-bone transition-colors duration-fast hover:border-brand hover:text-brand"
                    >
                      <Icon className="size-[1.125rem]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(2.75rem,6vh,4.25rem)] flex flex-wrap items-center gap-x-6 gap-y-3.5 border-t border-hairline pt-6.5 text-[0.86rem] text-muted">
          <span>{copyright}</span>
          <span>{site.location}</span>

          <nav aria-label="Juridisch" className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 transition-colors duration-fast hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <span className="group/credit inline-flex items-center gap-1.5 stack:ml-auto">
            {credit.prefix}
            <a
              href={credit.href}
              target="_blank"
              rel="noreferrer"
              className="-my-2 inline-flex items-center gap-1 py-2 font-medium text-bone transition-colors duration-fast hover:text-brand"
            >
              {credit.label}
              <span
                aria-hidden
                className="text-brand transition-transform duration-base ease-interact group-hover/credit:-translate-y-px group-hover/credit:translate-x-px"
              >
                &#8599;
              </span>
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
