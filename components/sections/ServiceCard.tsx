import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import { MediaZoom } from "@/components/ui/MediaZoom";
import { CameraIcon, PlayIcon, VideoIcon } from "@/components/ui/icons";
import type { Service } from "@/lib/content/services";

const icons = {
  camera: CameraIcon,
  video: VideoIcon,
} as const;

/** Eén dienstenkaart: tekstblok boven, beeld met zoom en accentlijn onder. */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];

  return (
    <article className="group overflow-hidden rounded-card border border-hairline bg-surface">
      <div className="p-[clamp(1.75rem,3.5vw,2.875rem)]">
        <IconBadge>
          <Icon className="size-[1.625rem]" />
        </IconBadge>

        <h3 className="mb-4 mt-[1.625rem] font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold uppercase tracking-title">
          {service.title}
        </h3>
        <p className="max-w-[29rem] text-[1.02rem] leading-[1.6] text-muted">
          {service.description}
        </p>

        <Link
          href={service.link.href}
          className="mt-[1.625rem] inline-flex items-center gap-2 font-bold text-brand transition-colors duration-fast hover:text-bone"
        >
          {service.link.label}
          <span aria-hidden className="leading-none">
            &rarr;
          </span>
        </Link>
      </div>

      <MediaZoom
        image={service.image}
        sizes="(max-width: 720px) 100vw, 50vw"
        withAccentLine
        className="h-[clamp(13.75rem,26vw,20rem)]"
      >
        {service.showPlay ? (
          <span className="absolute left-1/2 top-1/2 flex size-[4.125rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand/90 text-white shadow-glow transition-transform duration-base ease-interact group-hover:scale-112">
            <PlayIcon className="size-[1.375rem]" />
          </span>
        ) : null}
      </MediaZoom>
    </article>
  );
}
