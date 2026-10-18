import type { Locale } from "./config";
import en from "./dictionaries/en";
import ka from "./dictionaries/ka";

export type { Dictionary } from "./dictionaries/en";

const dictionaries = { en, ka };

export function getDictionary(lang: Locale) {
  return dictionaries[lang];
}
