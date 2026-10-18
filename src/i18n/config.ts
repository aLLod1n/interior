export const locales = ["ka", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ka";
export const localeCookie = "lang";

export const localeNames: Record<Locale, { short: string; long: string }> = {
  ka: { short: "ქარ", long: "ქართული" },
  en: { short: "EN", long: "English" },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** A value translated into every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

/** Prefixes an internal path with the locale, e.g. ("ka", "/projects") → "/ka/projects". */
export function localePath(lang: Locale, path: string) {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  if (path === "/") return `/${lang}`;
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}
