import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getNav, site } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Container } from "./ui";

// On phones only the key link is shown next to the language switch.
const mobile = new Set(["/projects"]);

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ash bg-canvas">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href={localePath(lang, "/")}
          lang="en"
          className="flex items-center gap-2.5 py-3 text-caption font-medium uppercase tracking-[0.14em]"
        >
          <span aria-hidden className="flex items-end gap-[3px]">
            <span className="h-3.5 w-2 rounded-t-full bg-ink" />
            <span className="size-2 rounded-full bg-ink" />
          </span>
          {/* Full name from small tablets up; phones get the short name so the header never overflows. */}
          <span className="sm:hidden">{site.name}</span>
          <span className="hidden sm:inline">{site.fullName}</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <nav aria-label="Main">
            <ul className="flex items-center text-caption uppercase tracking-[0.06em]">
              {getNav(dict).map((item) => (
                <li
                  key={item.href}
                  className={`items-center before:mx-3 before:text-mist before:content-['·'] first:before:hidden lg:before:mx-4 max-sm:before:hidden ${
                    mobile.has(item.href) ? "flex" : "hidden sm:flex"
                  }`}
                >
                  <Link href={localePath(lang, item.href)} className="group/nav inline-flex py-3">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover/nav:bg-[length:100%_1px]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden className="hidden h-4 w-px bg-ash sm:block" />
          <LanguageSwitcher lang={lang} label={dict.nav.language} />
        </div>
      </Container>
    </header>
  );
}
