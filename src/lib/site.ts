import type { Localized } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

// Company details — replace these placeholders with the real ones.
export const site = {
  name: "Forma",
  year: 2026,
  fullName: "Forma Workshop",
  phone: "+995 579 28 08 26",
  phoneHref: "tel:+995579280826",
  email: "hello@forma.example",
  instagram: "https://instagram.com/",
  whatsapp: "https://wa.me/995579280826",
  tagline: {
    ka: "სამზარეულო, თაროები და ავეჯი თქვენს ზომაზე",
    en: "Kitchens, shelving & furniture made to measure",
  } satisfies Localized,
  description: {
    ka: "ვაპროექტებთ და ვამზადებთ სამზარეულოებს, თაროებს, კარადებსა და ავეჯს. ერთი გუნდი ზომავს, ამზადებს და ამონტაჟებს.",
    en: "A small workshop designing and building custom kitchens, shelving, wardrobes and furniture — measured, made and installed by the same team.",
  } satisfies Localized,
  city: { ka: "თბილისი", en: "Tbilisi" } satisfies Localized,
  cityIn: { ka: "თბილისში", en: "Tbilisi" } satisfies Localized,
  address: { ka: "სახელოსნოს ქ. 12, თბილისი", en: "12 Workshop Street, Tbilisi" } satisfies Localized,
  hours: {
    ka: "ორშ–პარ 10:00–19:00 · შაბ 11:00–16:00",
    en: "Mon–Fri 10:00–19:00 · Sat 11:00–16:00",
  } satisfies Localized,
};

export function getNav(dict: Dictionary) {
  return [
    { href: "/#services", label: dict.nav.services },
    { href: "/projects", label: dict.nav.projects },
    { href: "/#process", label: dict.nav.process },
    { href: "/#contact", label: dict.nav.contact },
  ];
}
