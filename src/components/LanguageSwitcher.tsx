"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookie, localeNames, locales, type Locale } from "@/i18n/config";

// Remembered so that "/" sends returning visitors to the language they picked.
function remember(target: Locale) {
  document.cookie = `${localeCookie}=${target}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname();

  function hrefFor(target: Locale) {
    const rest = pathname.replace(/^\/[^/]+/, "");
    return `/${target}${rest}`;
  }

  return (
    <div role="group" aria-label={label} className="-mr-2 flex items-center text-caption uppercase tracking-[0.06em]">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden className="text-mist">/</span>}
          {l === lang ? (
            <span aria-current="true" title={localeNames[l].long} className="px-2 py-3 font-medium">
              {localeNames[l].short}
            </span>
          ) : (
            <Link
              href={hrefFor(l)}
              hrefLang={l}
              lang={l}
              title={localeNames[l].long}
              onClick={() => remember(l)}
              className="px-2 py-3 text-mist hover:text-ink"
            >
              {localeNames[l].short}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
