import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Dot, GhostButton, Photo, SectionLabel, Tag } from "@/components/ui";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { categoryDot, categoryLabel, getProject, getProjects, projectSlugs } from "@/lib/projects";

// Every project page is prerendered, so there is nothing to stream — skip instant-navigation validation.
export const instant = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const project = getProject(slug, lang);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const project = getProject(slug, lang);
  if (!project) notFound();

  const t = getDictionary(lang).project;
  const projects = getProjects(lang);
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  // Show at least four tiles so the layout reads even before real photos are added.
  const gallery = project.images.length ? project.images : [undefined, undefined, undefined, undefined];

  const details = [
    { label: t.location, value: project.location },
    { label: t.year, value: String(project.year) },
    { label: t.duration, value: project.duration },
    { label: t.materials, value: project.materials.join(", ") },
  ];

  return (
    <article className="pb-12">
      <Container className="pt-10 sm:pt-16">
        <Link
          href={localePath(lang, "/projects")}
          className="text-caption uppercase tracking-[0.06em] text-mist transition-colors hover:text-ink"
        >
          ← {t.back}
        </Link>
        <div className="intro mt-10 grid gap-10 border-b border-ink pb-12 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-8">
            <div className="-ml-2">
              <Tag tone={categoryDot(project.category)} filled>
                {categoryLabel(project.category, lang)}
              </Tag>
            </div>
            <h1 className="mt-6 font-serif text-display">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-graphite">{project.summary}</p>
          </div>
          <dl className="border-t border-ash text-caption lg:col-span-4">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-ash py-3 last:border-b-0">
                <dt className="text-mist">{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <Container className="mt-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-6">
          {gallery.map((src, i) => (
            <div
              key={i}
              className={`reveal relative overflow-hidden bg-linen ${i === 0 ? "col-span-2 aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/5]"} ${
                i === gallery.length - 1 && i % 2 === 1 ? "col-span-2 sm:aspect-[16/9]" : ""
              }`}
            >
              <Photo
                src={src}
                alt={`${project.title} — ${t.photo} ${i + 1}`}
                index={index + i}
                priority={i === 0}
                sizes={i === 0 ? "(min-width: 1440px) 1360px, 100vw" : "50vw"}
              />
            </div>
          ))}
        </div>
      </Container>

      <Container className="grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="reveal lg:col-span-4">
          <SectionLabel index={1}>{t.brief}</SectionLabel>
        </div>
        <div className="reveal lg:col-span-8">
          <p className="font-serif text-heading">{project.brief}</p>
          {project.quote && (
            <figure className="mt-16 border-t border-ink pt-10">
              <span aria-hidden className="block h-12 font-serif text-[96px] leading-none text-stone">
                “
              </span>
              <blockquote className="mt-4 max-w-3xl font-serif text-subheading">{project.quote.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-2 text-caption font-medium uppercase tracking-[0.06em]">
                <Dot /> {project.quote.author}
              </figcaption>
            </figure>
          )}
          <div className="mt-14">
            <GhostButton href={localePath(lang, "/#contact")} variant="solid">
              {t.cta}
            </GhostButton>
          </div>
        </div>
      </Container>

      <Container>
        <Link
          href={localePath(lang, `/projects/${next.slug}`)}
          className="group grid items-end gap-6 border-t border-ink pt-8 sm:grid-cols-12"
        >
          <div className="sm:col-span-7">
            <SectionLabel>{t.next}</SectionLabel>
            <p className="mt-4 font-serif text-heading transition-colors group-hover:text-graphite">
              {next.title} <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </p>
            <p className="mt-2 text-caption text-mist">
              {next.location} · {next.year}
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-linen sm:col-span-5">
            <Photo src={next.images[0]} alt={next.title} sizes="(min-width: 640px) 40vw, 100vw" zoom />
          </div>
        </Link>
      </Container>
    </article>
  );
}
