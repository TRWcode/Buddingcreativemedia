import Image from "next/image";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import { copyright, credit, footerColumns, footerNav, socialLinks } from "@/lib/content/footer";
import type { SocialPlatform } from "@/lib/content/footer";
import { site, siteLogo } from "@/lib/content/site";

const socialIcons: Record<SocialPlatform, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
};

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink">
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
            <div className="flex flex-col gap-3 font-medium">
              {footerNav.map((link) => (
                <AnchorLink
                  key={link.label}
                  href={link.href}
                  className="w-fit transition-colors duration-fast hover:text-brand"
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
            <div className="flex flex-col gap-3 text-muted">
              <a href={`mailto:${site.email}`} className="w-fit transition-colors duration-fast hover:text-brand">
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="w-fit transition-colors duration-fast hover:text-brand"
              >
                {site.phone}
              </a>
              <span>Almere, Nederland</span>
            </div>

            <ul className="mt-5.5 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      aria-label={social.label}
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

        <div className="mt-[clamp(2.75rem,6vh,4.25rem)] flex flex-wrap items-center justify-between gap-x-6 gap-y-3.5 border-t border-hairline pt-6.5 text-[0.86rem] text-muted">
          <span>{copyright}</span>
          <span>{site.location}</span>
          <span className="group/credit inline-flex items-center gap-1.5">
            {credit.prefix}
            <a
              href={credit.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-bone transition-colors duration-fast hover:text-brand"
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
