"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

const field =
  "w-full border-0 border-b border-ash bg-transparent py-3 text-body-lg outline-none transition-colors placeholder:text-mist focus:border-ink";

export function ContactForm({
  t,
  categories,
}: {
  t: Dictionary["form"];
  categories: { id: string; label: string }[];
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send to an email service or API route (e.g. Resend, Formspree, /api/contact).
    setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-paper p-6 sm:p-12">
        <p className="font-serif text-subheading">{t.thanksTitle}</p>
        <p className="mt-3 text-graphite">{t.thanksText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 bg-paper p-6 sm:p-12">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-caption text-mist">{t.name}</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="text-caption text-mist">{t.phone}</span>
          <input name="phone" type="tel" required autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="text-caption text-mist">{t.email}</span>
        <input name="email" type="email" autoComplete="email" className={field} />
      </label>
      <label className="block">
        <span className="text-caption text-mist">{t.type}</span>
        <select name="type" defaultValue="" className={`${field} select-chevron cursor-pointer appearance-none pr-8`}>
          <option value="" disabled>
            {t.typePlaceholder}
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
          <option value="other">{t.other}</option>
        </select>
      </label>
      <label className="block">
        <span className="text-caption text-mist">{t.message}</span>
        <textarea name="message" rows={4} className={`${field} resize-none`} placeholder={t.messagePlaceholder} />
      </label>
      <button
        type="submit"
        className="group inline-flex w-full items-center justify-between gap-3 border border-ink bg-ink px-6 py-4 text-caption font-medium uppercase tracking-[0.06em] text-canvas transition-colors duration-300 hover:bg-transparent hover:text-ink sm:w-auto sm:justify-start"
      >
        {t.submit}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
