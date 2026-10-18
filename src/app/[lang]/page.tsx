import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { ProjectCard } from "@/components/ProjectCard";
import { Container, Dot, GhostButton, Photo, SectionLabel } from "@/components/ui";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { categoryLabel, getCategories, getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

// Staggered editorial layout for the six featured projects (large screens).
const featuredLayout = [
  { span: "lg:col-span-7", aspect: "lg:aspect-[4/3]" },
  { span: "lg:col-span-5 lg:pt-28", aspect: "lg:aspect-[4/5]" },
  { span: "lg:col-span-5", aspect: "lg:aspect-[4/5]" },
  { span: "lg:col-span-7 lg:pt-28", aspect: "lg:aspect-[4/3]" },
  { span: "lg:col-span-6", aspect: "lg:aspect-[5/4]" },
  { span: "lg:col-span-6 lg:pt-28", aspect: "lg:aspect-[5/4]" },
];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const projects = getProjects(lang);
  const featured = projects.slice(0, 6);
  const testimonials = projects.filter((p) => p.quote);
  const workshopPhoto = projects.find((p) => p.slug === "library-wall")?.images[0];
  const to = (path: string) => localePath(lang, path);

  return (
    <>
      {/* Hero */}
      <section>
        <Container className="grid gap-10 pt-12 pb-14 sm:pt-20 sm:pb-20 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="intro min-w-0 lg:col-span-8">
            <SectionLabel>
              <span className="inline-flex items-center gap-2">
                <Dot /> {t.hero.label} · {site.city[lang]}
              </span>
            </SectionLabel>
            <h1 className="mt-8 font-serif text-display">
              {t.hero.titleStart}
              <em className="text-bronze">{t.hero.titleEmphasis}</em>
              {t.hero.titleEnd}
            </h1>
          </div>
          <div className="intro min-w-0 lg:col-span-4 lg:pl-6">
            <p className="max-w-md text-body-lg text-graphite">{site.description[lang]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GhostButton href={to("/projects")} variant="solid">
                {t.hero.viewWork}
              </GhostButton>
              <GhostButton href="#contact">{t.hero.getQuote}</GhostButton>
            </div>
          </div>
        </Container>

        {/* Photo strip — swipeable on phones, five columns on desktop */}
        <div className="no-scrollbar flex snap-x snap-mandatory gap-px overflow-x-auto border-y border-ink bg-ink md:grid md:grid-cols-5 md:overflow-visible">
          {projects.slice(0, 5).map((p, i) => (
            <Link
              key={p.slug}
              href={to(`/projects/${p.slug}`)}
              className="group w-[72vw] shrink-0 snap-start bg-canvas sm:w-[44vw] md:w-auto"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Photo
                  src={p.images[0]}
                  alt={p.title}
                  index={i}
                  sizes="(min-width: 768px) 20vw, 72vw"
                  priority={i < 3}
                  zoom
                />
              </div>
              <div className="flex items-center gap-3 border-t border-ink px-4 py-3 text-caption">
                <span className="tabular-nums text-mist">{String(i + 1).padStart(2, "0")}</span>
                <span className="truncate transition-colors group-hover:text-graphite">{p.title}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Key numbers */}
        <Container>
          <dl className="grid grid-cols-3 border-b border-ash">
            {t.why.stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col-reverse gap-1 py-6 sm:py-8 ${i > 0 ? "border-l border-ash pl-4 sm:pl-8" : ""}`}>
                <dt className="text-caption text-graphite">{s.label}</dt>
                <dd className="font-serif text-heading">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="reveal self-start lg:sticky lg:top-28 lg:col-span-5">
            <SectionLabel index={1}>{t.services.label}</SectionLabel>
            <h2 className="mt-6 max-w-lg font-serif text-heading">{t.services.title}</h2>
            <div className="mt-10">
              <GhostButton href={to("/projects")} variant="link">
                {t.work.all}
              </GhostButton>
            </div>
          </div>
          <ul className="border-t border-ink lg:col-span-7">
            {t.services.items.map((s, i) => (
              <li key={s.name} className="reveal group border-b border-ash">
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-7 transition-transform duration-500 group-hover:translate-x-2 sm:grid-cols-[4rem_1fr_auto]">
                  <span className="pt-1 text-caption tabular-nums text-mist">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-serif text-subheading">{s.name}</p>
                    <p className="mt-2 max-w-md text-graphite">{s.text}</p>
                  </div>
                  <span aria-hidden className="hidden pt-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">
                    <Dot />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Selected work */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel index={2}>{t.work.label}</SectionLabel>
              <h2 className="mt-6 font-serif text-heading">{t.work.title}</h2>
            </div>
            <GhostButton href={to("/projects")}>{t.work.all}</GhostButton>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-20">
            {featured.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                lang={lang}
                categoryLabel={categoryLabel(p.category, lang)}
                aspect={`aspect-[4/5] ${featuredLayout[i].aspect}`}
                sizes="(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 100vw"
                className={`reveal ${featuredLayout[i].span}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section id="process" className="py-24 sm:py-32">
        <Container>
          <div className="reveal grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel index={3}>{t.process.label}</SectionLabel>
            </div>
            <h2 className="font-serif text-heading lg:col-span-7">{t.process.title}</h2>
          </div>
          <ol className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((s, i) => (
              <li key={s.title} className="reveal relative border-t border-ink pt-8">
                <span aria-hidden className="absolute -top-[4.5px] left-0 size-2 rounded-full bg-bronze" />
                <p className="font-serif text-heading tabular-nums text-stone">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-8 text-body-lg font-medium">{s.title}</p>
                <p className="mt-2 text-graphite">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Why us */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-6">
          <div className="reveal relative aspect-[4/5] overflow-hidden bg-linen lg:col-span-5">
            <Photo src={workshopPhoto} alt={t.why.title} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="reveal lg:col-span-6 lg:col-start-7">
            <SectionLabel index={4}>{t.why.label}</SectionLabel>
            <h2 className="mt-6 font-serif text-heading">{t.why.title}</h2>
            <p className="mt-6 max-w-lg text-body-lg text-graphite">{t.why.text}</p>
            <ul className="mt-12 border-t border-ink">
              {t.why.points.map((point) => (
                <li key={point} className="flex items-center gap-3 border-b border-ash py-4">
                  <Dot tone="slate" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="reveal">
            <SectionLabel index={5}>{t.clients.label}</SectionLabel>
          </div>
          <div className="mt-12 grid gap-px border-y border-ink bg-ash md:grid-cols-2">
            {testimonials.map((p) => (
              <figure key={p.slug} className="reveal flex flex-col justify-between gap-12 bg-canvas py-10 md:px-10 md:first:pl-0">
                <div>
                  <span aria-hidden className="block h-12 font-serif text-[96px] leading-none text-stone">
                    “
                  </span>
                  <blockquote className="mt-4 font-serif text-subheading">{p.quote!.text}</blockquote>
                </div>
                <figcaption className="flex flex-wrap items-center justify-between gap-3 text-caption">
                  <span className="flex items-center gap-2 font-medium uppercase tracking-[0.06em]">
                    <Dot /> {p.quote!.author}
                  </span>
                  <Link href={to(`/projects/${p.slug}`)} className="text-mist transition-colors hover:text-ink">
                    {p.title} →
                  </Link>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="reveal lg:col-span-5">
            <SectionLabel index={6}>{t.contact.label}</SectionLabel>
            <h2 className="mt-6 font-serif text-display">{t.contact.title}</h2>
            <p className="mt-6 max-w-md text-body-lg text-graphite">{t.contact.text}</p>
            <dl className="mt-12 border-t border-ink text-caption">
              {[
                { label: t.contact.phone, value: <a href={site.phoneHref}>{site.phone}</a> },
                { label: t.contact.email, value: <a href={`mailto:${site.email}`}>{site.email}</a> },
                { label: t.contact.showroom, value: site.address[lang] },
                { label: "", value: <span className="text-graphite">{site.hours[lang]}</span> },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-ash py-4">
                  <dt className="text-mist">{row.label}</dt>
                  <dd className="text-body">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <GhostButton href={site.whatsapp}>{t.contact.whatsapp}</GhostButton>
            </div>
          </div>
          <div className="reveal lg:col-span-6 lg:col-start-7">
            <ContactForm t={t.form} categories={getCategories(lang)} />
          </div>
        </Container>
      </section>
    </>
  );
}
