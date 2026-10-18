import { lang as rootLang } from "next/root-params";
import { Container, GhostButton, SectionLabel } from "@/components/ui";
import { defaultLocale, isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function NotFound() {
  const value = await rootLang();
  const lang = isLocale(value) ? value : defaultLocale;
  const t = getDictionary(lang).notFound;

  return (
    <Container className="py-24">
      <SectionLabel>404</SectionLabel>
      <h1 className="mt-4 font-serif text-display">{t.title}</h1>
      <div className="mt-10">
        <GhostButton href={localePath(lang, "/")}>{t.back}</GhostButton>
      </div>
    </Container>
  );
}
