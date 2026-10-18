import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getNav, site } from "@/lib/site";
import { Container } from "./ui";

function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-24 border-t border-ink">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:gap-6">
        {/* Phone first — the quickest way to reach the workshop. */}
        <div className="md:col-span-5">
          <p className="flex items-center gap-2 text-caption font-medium uppercase tracking-[0.08em] text-mist">
            <span aria-hidden className="size-1.5 rounded-full bg-bronze" />
            {dict.footer.callUs}
          </p>
          <a
            href={site.phoneHref}
            className="mt-4 block whitespace-nowrap font-serif text-heading tabular-nums transition-colors hover:text-graphite"
          >
            {site.phone}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="group inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3.5 text-caption font-medium uppercase tracking-[0.06em] text-canvas transition-colors duration-300 hover:bg-transparent hover:text-ink"
            >
              <PhoneIcon />
              {dict.footer.call}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border border-ink px-6 py-3.5 text-caption font-medium uppercase tracking-[0.06em] transition-colors duration-300 hover:bg-ink hover:text-canvas"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="space-y-2.5 text-caption md:col-span-4">
          <p className="mb-5 font-medium uppercase tracking-[0.08em] text-mist">{dict.footer.visit}</p>
          <p>{site.address[lang]}</p>
          <p className="text-graphite">{site.hours[lang]}</p>
          <p className="pt-3">
            <a href={`mailto:${site.email}`} className="hover:text-graphite">
              {site.email}
            </a>
          </p>
        </div>
        <div className="space-y-2.5 text-caption md:col-span-3">
          <p className="mb-5 font-medium uppercase tracking-[0.08em] text-mist">{dict.footer.explore}</p>
          {getNav(dict).map((item) => (
            <p key={item.href}>
              <Link href={localePath(lang, item.href)} className="hover:text-graphite">
                {item.label}
              </Link>
            </p>
          ))}
          <p>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-graphite">
              Instagram ↗
            </a>
          </p>
        </div>
      </Container>

      {/* Monumental wordmark — the brand's loudest typographic moment. */}
      <Container>
        <p
          aria-hidden
          lang="en"
          className="select-none overflow-hidden whitespace-nowrap font-serif text-monument tracking-[-0.03em] text-ink"
        >
          {site.name}
          <span className="text-stone">.</span>
        </p>
      </Container>

      <Container className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-ash py-6 text-caption text-mist">
        <span>
          © {site.year} {site.fullName}
        </span>
        <span>
          {dict.footer.madeIn} {site.cityIn[lang]} ·{" "}
          <Link href={localePath(lang, "/credits")} className="hover:text-ink">
            {dict.footer.credits}
          </Link>
        </span>
      </Container>
    </footer>
  );
}
