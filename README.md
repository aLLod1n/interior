# Portfolio site — kitchens, shelving & furniture

Next.js (App Router) + Tailwind v4, styled with the editorial "warm white gallery" design system
(Instrument Serif headlines, Instrument Sans UI, 0px radii, hairline borders, no shadows).

## Run

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Where to edit

| What | File |
|------|------|
| Company name, phone, email, address, socials | `src/lib/site.ts` |
| Projects (titles, text, materials, photos — `ka` and `en`) | `src/lib/projects.ts` |
| All other page text (services, process, stats, form…) | `src/i18n/dictionaries/ka.ts`, `en.ts` |
| Page layouts | `src/app/[lang]/` |
| Colors, fonts, type scale | `src/app/globals.css` |

## Languages

Georgian (`/ka`) is the default and English is at `/en`. Visiting `/` redirects to Georgian, or to the
language the visitor last picked in the header switch (saved in a `lang` cookie). To add a language,
add it to `src/i18n/config.ts`, create a dictionary file next to `en.ts`, and add the new key to every
`{ ka, en }` text in `site.ts` and `projects.ts` (TypeScript will point out any you miss).

## Adding photos

1. Put images in `public/projects/<slug>/`, e.g. `public/projects/oak-galley-kitchen/1.jpg`.
2. List them in that project's `images` array in `src/lib/projects.ts`:
   ```ts
   images: ["/projects/oak-galley-kitchen/1.jpg", "/projects/oak-galley-kitchen/2.jpg"],
   ```
   The first image is the cover. Until images are added, flat tonal placeholders are shown.

## Contact form

`src/components/ContactForm.tsx` currently only shows a thank-you message. Connect it to an
email service (Resend, Formspree) or an API route before going live.

## Pages

- `/` — hero, services, selected work, process, why us, testimonials, contact
- `/projects` — full portfolio with category filter
- `/projects/[slug]` — project detail: gallery, brief, details, client quote, next project
