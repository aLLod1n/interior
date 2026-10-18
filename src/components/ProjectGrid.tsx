"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Category, Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { Dot } from "./ui";

type CategoryOption = { id: Category; label: string; dot: "bronze" | "slate" };

export function ProjectGrid({
  projects,
  categories,
  lang,
  labels,
}: {
  projects: Project[];
  categories: CategoryOption[];
  lang: Locale;
  labels: { all: string; filter: string };
}) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const options = [{ id: "all" as const, label: labels.all, dot: undefined }, ...categories];
  const labelOf = (id: Category) => categories.find((c) => c.id === id)?.label ?? id;

  return (
    <>
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
        {options.map((c) => {
          const active = filter === c.id;
          const count = c.id === "all" ? projects.length : projects.filter((p) => p.category === c.id).length;
          if (count === 0) return null;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              className={`inline-flex items-center gap-2 border px-4 py-2 text-caption font-medium uppercase tracking-[0.06em] transition-colors ${
                active ? "border-ink bg-ink text-canvas" : "border-ash hover:border-ink"
              }`}
            >
              {c.dot && <Dot tone={c.dot} />}
              {c.label}
              <span className={active ? "text-canvas/60" : "text-mist"}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={projects.indexOf(p)}
            lang={lang}
            categoryLabel={labelOf(p.category)}
          />
        ))}
      </div>
    </>
  );
}
