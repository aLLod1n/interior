import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

/** Small museum-placard label: optional index, a short hairline, then the name. */
export function SectionLabel({ children, index }: { children: ReactNode; index?: number }) {
  return (
    <p className="flex items-center gap-3 text-caption font-medium uppercase tracking-[0.08em] text-ink">
      {index !== undefined && <span className="tabular-nums text-mist">{String(index).padStart(2, "0")}</span>}
      {index !== undefined && <span aria-hidden className="h-px w-8 bg-ink" />}
      <span>{children}</span>
    </p>
  );
}

export function Dot({ tone = "bronze" }: { tone?: "bronze" | "slate" }) {
  return (
    <span
      aria-hidden
      className={`inline-block size-1.5 shrink-0 rounded-full ${tone === "bronze" ? "bg-bronze" : "bg-slate"}`}
    />
  );
}

export function Tag({ children, tone = "bronze", filled = false }: { children: ReactNode; tone?: "bronze" | "slate"; filled?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-2 py-1 text-caption font-medium uppercase tracking-[0.04em] ${filled ? "bg-linen" : ""}`}
    >
      <Dot tone={tone} />
      {children}
    </span>
  );
}

export function GhostButton({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: ReactNode;
  /** ghost: hairline outline · solid: ink fill · link: underlined text */
  variant?: "ghost" | "solid" | "link";
}) {
  const external = /^https?:/.test(href);
  const arrow = (
    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
      {external ? "↗" : "→"}
    </span>
  );
  const styles = {
    ghost:
      "border border-ink px-6 py-3.5 text-ink hover:bg-ink hover:text-canvas",
    solid:
      "border border-ink bg-ink px-6 py-3.5 text-canvas hover:bg-transparent hover:text-ink",
    link:
      "border-b border-ink pb-1 text-ink hover:border-graphite hover:text-graphite",
  }[variant];

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 text-caption font-medium uppercase tracking-[0.06em] transition-colors duration-300 ${styles}`}
    >
      {children}
      {arrow}
    </Link>
  );
}

const tones = ["bg-linen", "bg-stone", "bg-ash", "bg-[#dcd8d1]", "bg-[#cfcac1]"];

/** Shows a photo if `src` is given, otherwise a flat tonal placeholder. Zooms slightly inside a hovered `.group`. */
export function Photo({
  src,
  alt,
  index = 0,
  label,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  zoom = false,
}: {
  src?: string;
  alt: string;
  index?: number;
  label?: string;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
}) {
  const motion = zoom ? "transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" : "";
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${motion}`} />;
  }
  return (
    <div role="img" aria-label={alt} className={`absolute inset-0 ${tones[index % tones.length]}`}>
      {label && (
        <span className="absolute bottom-3 left-3 text-caption uppercase tracking-[0.06em] text-graphite/70">
          {label}
        </span>
      )}
    </div>
  );
}
