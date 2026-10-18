import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Container, SectionLabel } from "@/components/ui";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, getProjects } from "@/lib/projects";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).projects;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang).projects;
  const projects = getProjects(lang);

  return (
    <section className="pt-12 pb-24 sm:pt-20">
      <Container>
        <div className="intro grid gap-8 border-b border-ink pb-12 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-9">
            <SectionLabel>{t.label}</SectionLabel>
            <h1 className="mt-8 max-w-4xl font-serif text-display">{t.title}</h1>
          </div>
          <p className="hidden font-serif text-display tabular-nums text-stone lg:col-span-3 lg:block lg:text-right">
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>
        <div className="mt-10">
          <ProjectGrid
            projects={projects}
            categories={getCategories(lang)}
            lang={lang}
            labels={{ all: t.all, filter: t.filterLabel }}
          />
        </div>
      </Container>
    </section>
  );
}
