# Freemind BKK

A cinematic, editorial website for Freemind BKK — a cocktail bar in Bangkok.
Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion, with a
Supabase-backed admin CMS for the menu, events, media, and site settings.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without Supabase
configured, the public site runs on realistic sample content and `/admin`
shows setup instructions instead of the dashboard.

## Connecting Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only — never exposed to the browser)
3. Run `supabase/schema.sql` in the Supabase SQL editor. It creates the
   `menu_items`, `events`, and `site_settings` tables, RLS policies, and a
   public `media` storage bucket.
4. In Supabase → Authentication → Users, add the one admin account that
   should be able to sign in at `/admin`. There is no public sign-up flow.
5. Restart `npm run dev`.

## Structure

- `src/app/(site)` — the public, art-directed pages (home, menu, events,
  story, find us).
- `src/app/admin` — the auth-gated CMS (`/admin/login`, then
  overview/menu/events/media/settings).
- `src/lib/data` — the data-access layer. Each getter reads from Supabase
  when configured and transparently falls back to the sample data in
  `src/lib/data/sample-*.ts` otherwise.
- `src/components` — shared UI, grouped by `home/`, `menu/`, `events/`,
  `story/`, and `admin/`.
- `public/images` — generated placeholder "atmosphere" imagery in the
  brand palette. Swap these for real photography via the admin Media
  uploader, then paste the resulting URL into the relevant menu item or
  event.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # eslint
npx tsc --noEmit # type-check
```
