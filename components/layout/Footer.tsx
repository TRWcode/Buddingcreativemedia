import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import { copyright, footerColumns, footerNav, socialLinks } from "@/lib/content/footer";
import type { SocialPlatform } from "@/lib/content/footer";
import { site } from "@/lib/content/site";

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
            <div className="mb-5.5 flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-[2.375rem] items-center justify-center rounded-mark bg-brand font-display text-[1.35rem] font-bold text-white"
              >
                {site.monogram}
              </span>
              <span className="whitespace-nowrap font-display text-[0.82rem] font-semibold uppercase leading-[1.05] tracking-[0.14em]">
                {site.nameLines[0]}
                <br />
                <span className="text-muted">{site.nameLines[1]}</span>
              </span>
            </div>
            <p className="max-w-[19rem] leading-[1.6] text-muted">{site.description}</p>
          </div>

          <nav aria-label="Footernavigatie">
            <p className="mb-5 text-[0.74rem] uppercase tracking-label text-muted">
              {footerColumns.navigation.heading}
            </p>
            <div className="flex flex-col gap-3 font-medium">
              {footerNav.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit transition-colors duration-fast hover:text-brand"
                >
                  {link.label}
                </Link>
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

        <div className="mt-[clamp(2.75rem,6vh,4.25rem)] flex flex-wrap items-center justify-between gap-3.5 border-t border-hairline pt-6.5 text-[0.86rem] text-muted">
          <span>{copyright}</span>
          <span>{site.location}</span>
        </div>
      </Container>
    </footer>
  );
}
