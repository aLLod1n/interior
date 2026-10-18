import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getNav, site } from "@/lib/site";
import { Container, GhostButton } from "./ui";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-24 border-t border-ink">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <p className="max-w-sm font-serif text-subheading">{site.tagline[lang]}.</p>
          <div className="mt-8">
            <GhostButton href={localePath(lang, "/#contact")}>{dict.hero.getQuote}</GhostButton>
          </div>
        </div>
        <div className="space-y-2.5 text-caption md:col-span-4">
          <p className="mb-5 font-medium uppercase tracking-[0.08em] text-mist">{dict.footer.visit}</p>
          <p>{site.address[lang]}</p>
          <p className="text-graphite">{site.hours[lang]}</p>
          <p className="pt-3">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-graphite">
              {site.phone}
            </a>
          </p>
          <p>
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
