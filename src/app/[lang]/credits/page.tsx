import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, SectionLabel } from "@/components/ui";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import credits from "@/lib/photo-credits.json";

export async function generateMetadata({ params }: PageProps<"/[lang]/credits">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDictionary(lang).footer.credits } : {};
}

export default async function CreditsPage({ params }: PageProps<"/[lang]/credits">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <section className="pt-10 pb-24 sm:pt-16">
      <Container>
        <SectionLabel>{t.footer.credits}</SectionLabel>
        <h1 className="mt-4 max-w-3xl font-serif text-heading">{t.credits.title}</h1>
        <p className="mt-6 max-w-2xl text-graphite">{t.credits.text}</p>
        <ul className="mt-12 border-t border-ash">
          {credits.map((c) => (
            <li key={c.file} className="grid gap-1 border-b border-ash py-4 md:grid-cols-[14rem_1fr_auto] md:gap-6">
              <span className="text-caption text-mist">{c.file.replace("/projects/", "")}</span>
              <a href={c.source} target="_blank" rel="noreferrer" lang="en" className="hover:text-graphite">
                {c.title} — {c.creator}
              </a>
              <a href={c.licenseUrl} target="_blank" rel="noreferrer" className="text-caption text-mist hover:text-ink">
                {c.license}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
