import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getNav, site } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { Container } from "./ui";

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
          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <a
              href={site.phoneHref}
              className="group inline-flex items-center justify-center gap-3 border border-ink bg-ink px-6 py-3.5 text-caption font-medium uppercase tracking-[0.06em] text-canvas transition-colors duration-300 hover:bg-transparent hover:text-ink"
            >
              <PhoneIcon />
              {dict.footer.call}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 border border-ink px-6 py-3.5 text-caption font-medium uppercase tracking-[0.06em] transition-colors duration-300 hover:bg-ink hover:text-canvas"
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
          <p className="pt-1">
            <a href={`mailto:${site.email}`} className="inline-block py-2 hover:text-graphite">
              {site.email}
            </a>
          </p>
        </div>
        <div className="text-caption md:col-span-3">
          <p className="mb-3 font-medium uppercase tracking-[0.08em] text-mist">{dict.footer.explore}</p>
          <ul className="grid grid-cols-2 gap-x-6 md:grid-cols-1">
            {getNav(dict).map((item) => (
              <li key={item.href}>
                <Link href={localePath(lang, item.href)} className="block py-2 hover:text-graphite">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="block py-2 hover:text-graphite">
                Instagram ↗
              </a>
            </li>
          </ul>
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

      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-ash py-4 text-caption text-mist">
        <span>
          © {site.year} {site.fullName}
        </span>
        <span>
          {dict.footer.madeIn} {site.cityIn[lang]} ·{" "}
          <Link href={localePath(lang, "/credits")} className="inline-block py-2 hover:text-ink">
            {dict.footer.credits}
          </Link>
        </span>
      </Container>
    </footer>
  );
}
