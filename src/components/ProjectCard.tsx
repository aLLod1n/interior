import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { categoryDot, type Project } from "@/lib/projects";
import { Dot, Photo } from "./ui";

/** Gallery-style card: photo on top, a placard caption below on the canvas. */
export function ProjectCard({
  project,
  index,
  lang,
  categoryLabel,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className = "",
}: {
  project: Project;
  index: number;
  lang: Locale;
  categoryLabel: string;
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <Link href={localePath(lang, `/projects/${project.slug}`)} className={`group block ${className}`}>
      <div className={`relative overflow-hidden bg-linen ${aspect}`}>
        <Photo src={project.images[0]} alt={project.title} index={index} label={categoryLabel} sizes={sizes} zoom />
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink pt-3 text-caption">
        <span className="tabular-nums text-mist">{String(index + 1).padStart(2, "0")}</span>
        <span className="flex items-center gap-2 font-medium uppercase tracking-[0.04em]">
          <Dot tone={categoryDot(project.category)} />
          {categoryLabel}
        </span>
      </div>
      <div className="mt-3 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-serif text-subheading transition-colors group-hover:text-graphite">{project.title}</h3>
          <p className="mt-2 text-caption text-mist">
            {project.location} · {project.year}
          </p>
        </div>
        <span
          aria-hidden
          className="mt-1 text-body-lg opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        >
          →
        </span>
      </div>
    </Link>
  );
}
