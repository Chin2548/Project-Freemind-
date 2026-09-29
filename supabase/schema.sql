-- FREEMIND BKK — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh project.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────
-- menu_categories — the tabs shown on the Menu page, managed from
-- Admin → Menu → Categories. `id` is a slug generated from the label at
-- creation and is what menu_items.category stores; it never changes even
-- if the label is renamed later.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.menu_categories (
  id text primary key,
  label text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.menu_categories (id, label, sort_order) values
  ('signatures', 'Signatures', 0),
  ('classics', 'Classics', 1),
  ('spirits', 'Spirits', 2),
  ('wine', 'Wine', 3),
  ('beer', 'Beer', 4),
  ('non-alcoholic', 'Non-Alcoholic', 5)
on conflict (id) do nothing;

alter table public.menu_categories enable row level security;

drop policy if exists "public can read menu categories" on public.menu_categories;
create policy "public can read menu categories" on public.menu_categories
  for select to anon using (true);

drop policy if exists "authenticated can read menu categories" on public.menu_categories;
create policy "authenticated can read menu categories" on public.menu_categories
  for select to authenticated using (true);

drop policy if exists "authenticated can write menu categories" on public.menu_categories;
create policy "authenticated can write menu categories" on public.menu_categories
  for all to authenticated using (true) with check (true);

drop trigger if exists set_updated_at on public.menu_categories;
create trigger set_updated_at before update on public.menu_categories
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
-- menu_items
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null references public.menu_categories (id) on update cascade on delete restrict,
  price numeric(10, 2) not null default 0,
  currency text not null default '$',
  image_url text not null default '',
  ingredients text[] not null default '{}',
  description text not null default '',
  story text not null default '',
  flavor_profile text[] not null default '{}',
  recommended_occasion text not null default '',
  featured boolean not null default false,
  available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists menu_items_category_idx on public.menu_items (category);
create index if not exists menu_items_featured_idx on public.menu_items (featured);

-- ─────────────────────────────────────────────────────────────────────────
-- events
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  start_time time not null,
  end_time time not null,
  category text not null check (
    category in ('live-music', 'dj-night', 'guest-bartender', 'tasting', 'special-night', 'collaboration')
  ),
  description text not null default '',
  image_url text not null default '',
  location text not null default '',
  booking_url text not null default '',
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_date_idx on public.events (date);
create index if not exists events_published_idx on public.events (published);

-- ─────────────────────────────────────────────────────────────────────────
-- site_settings (single row)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.site_settings (
  id text primary key default 'default',
  bar_name text not null default 'FREEMIND BKK',
  tagline text not null default 'Free your mind.',
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  instagram_url text not null default '',
  facebook_url text not null default '',
  tiktok_url text not null default '',
  google_maps_url text not null default '',
  reservation_url text not null default '',
  opening_hours jsonb not null default '[]'::jsonb,
  find_us_image_url text not null default '/images/photos/bar-glasses-candle.jpg',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id)
values ('default')
on conflict (id) do nothing;

-- ─────────────────────────────────────────────────────────────────────────
-- updated_at triggers
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.menu_items;
create trigger set_updated_at before update on public.menu_items
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.events;
create trigger set_updated_at before update on public.events
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.site_settings;
create trigger set_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- Public (anon) can read published/available rows.
-- Any authenticated user can read/write everything — this app has a single
-- admin account, so Supabase Auth membership itself is the authorization
-- boundary. If you add more auth users later, tighten these policies
-- (e.g. check a role claim) before doing so.
-- ─────────────────────────────────────────────────────────────────────────
alter table public.menu_items enable row level security;
alter table public.events enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "public can read available menu items" on public.menu_items;
create policy "public can read available menu items" on public.menu_items
  for select to anon using (available = true);

drop policy if exists "authenticated can read all menu items" on public.menu_items;
create policy "authenticated can read all menu items" on public.menu_items
  for select to authenticated using (true);

drop policy if exists "authenticated can write menu items" on public.menu_items;
create policy "authenticated can write menu items" on public.menu_items
  for all to authenticated using (true) with check (true);

drop policy if exists "public can read published events" on public.events;
create policy "public can read published events" on public.events
  for select to anon using (published = true);

drop policy if exists "authenticated can read all events" on public.events;
create policy "authenticated can read all events" on public.events
  for select to authenticated using (true);

drop policy if exists "authenticated can write events" on public.events;
create policy "authenticated can write events" on public.events
  for all to authenticated using (true) with check (true);

drop policy if exists "public can read site settings" on public.site_settings;
create policy "public can read site settings" on public.site_settings
  for select to anon using (true);

drop policy if exists "authenticated can read site settings" on public.site_settings;
create policy "authenticated can read site settings" on public.site_settings
  for select to authenticated using (true);

drop policy if exists "authenticated can write site settings" on public.site_settings;
create policy "authenticated can write site settings" on public.site_settings
  for update to authenticated using (true) with check (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Storage: a public "media" bucket for menu/event photography
-- ─────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public can read media" on storage.objects;
create policy "public can read media" on storage.objects
  for select to anon using (bucket_id = 'media');

drop policy if exists "authenticated can manage media" on storage.objects;
create policy "authenticated can manage media" on storage.objects
  for all to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');

-- ─────────────────────────────────────────────────────────────────────────
-- homepage_content (single row) — every editable headline, body line, and
-- background image on the homepage, section by section.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.homepage_content (
  id text primary key default 'default',
  hero_label text not null default 'Bangkok, After Dark',
  hero_headline text not null default 'Freemind BKK',
  hero_tagline text not null default 'Free your mind.',
  hero_subtext text not null default 'A place for curious minds, slow evenings, and stories worth remembering.',
  hero_image_url text not null default '/images/photos/bar-luxury-empty.jpg',
  space_label text not null default '01 / The Space',
  space_headline text not null default 'The city gets quieter here.',
  space_body text not null default 'Behind the noise of Bangkok, there is a place designed to slow things down.',
  space_image_url text not null default '/images/photos/bar-glasses-candle.jpg',
  philosophy_headline text not null default E'Leave\nthe ordinary\nbehind.',
  philosophy_subtext text not null default 'Freemind is a place to pause, explore, and experience the night differently.',
  craft_label text not null default '02 / The Craft',
  craft_headline text not null default 'Every detail has a purpose.',
  craft_body text not null default E'A single ice cube, cut and cooled with intention. A peel, expressed at the right distance. Nothing arrives at your table by accident.',
  craft_image_url text not null default '/images/photos/bartender-station.jpg',
  ingredient_journey jsonb not null default '[
    {"label":"Gin","note":"The botanical base.","image":"/images/photos/bartender-station.jpg"},
    {"label":"Jasmine","note":"A quiet floral note.","image":"/images/photos/bar-glasses-candle.jpg"},
    {"label":"Bitter Orange","note":"Brightness, held back.","image":"/images/photos/cocktail-orange-peel.jpg"},
    {"label":"Vermouth","note":"Depth, unhurried.","image":"/images/photos/cocktail-old-fashioned-light.jpg"},
    {"label":"Midnight Bloom","note":"The result — floral, dry, and quietly complex.","image":"/images/photos/cocktails-trio-dark.jpg"}
  ]'::jsonb,
  menu_section_label text not null default '03 / The Menu',
  menu_section_headline text not null default 'Drinks for curious minds.',
  events_section_label text not null default '04 / What''s Happening',
  events_section_headline text not null default 'After dark, on schedule.',
  night_headline text not null default E'Come for the drinks.\nStay for the moment.',
  night_image_url text not null default '/images/photos/cocktails-trio-dark.jpg',
  findus_label text not null default '05 / Find Us',
  findus_headline text not null default 'Find your way to Freemind.',
  reserve_headline text not null default 'Your table awaits.',
  reserve_image_url text not null default '/images/photos/cocktail-orange-peel.jpg',
  updated_at timestamptz not null default now()
);

insert into public.homepage_content (id) values ('default') on conflict (id) do nothing;

alter table public.homepage_content enable row level security;

drop policy if exists "public can read homepage content" on public.homepage_content;
create policy "public can read homepage content" on public.homepage_content
  for select to anon using (true);

drop policy if exists "authenticated can read homepage content" on public.homepage_content;
create policy "authenticated can read homepage content" on public.homepage_content
  for select to authenticated using (true);

drop policy if exists "authenticated can write homepage content" on public.homepage_content;
create policy "authenticated can write homepage content" on public.homepage_content
  for update to authenticated using (true) with check (true);

drop trigger if exists set_updated_at on public.homepage_content;
create trigger set_updated_at before update on public.homepage_content
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
-- story_content (single row) — the opening statement and every
-- text-and-image section on the Story page.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.story_content (
  id text primary key default 'default',
  eyebrow text not null default 'The Freemind Story',
  headline_line1 text not null default 'Some places are built to be seen.',
  headline_line2 text not null default 'Others are built to be felt.',
  sections jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.story_content (id) values ('default') on conflict (id) do nothing;

update public.story_content
set sections = $jj$[
  {"label":"01 / Philosophy","title":"A room built for curiosity, not spectacle.","body":"Freemind began with a simple question — what happens when a bar stops trying to impress you, and starts trying to hold your attention instead? Everything here follows from that.","image":"/images/photos/bar-luxury-empty.jpg","reverse":false},
  {"label":"02 / Craft","title":"Precision, without performance.","body":"Every cocktail is built with the same quiet discipline — measured, tasted, adjusted, and never rushed. The craft is in what you don't see: the technique behind the ease.","image":"/images/photos/bartender-station.jpg","reverse":true},
  {"label":"03 / Ingredients","title":"Familiar, seen from a different angle.","body":"We favor ingredients with a point of view — jasmine instead of simple syrup, smoked salt instead of a garnish for garnish's sake. Nothing is on the menu by accident.","image":"/images/photos/cocktail-orange-peel.jpg","reverse":false},
  {"label":"04 / Space","title":"Dark wood. Warm light. Room to think.","body":"The space was designed the way a good evening unfolds — slowly. Low light, natural materials, and just enough distance between tables for a private conversation to stay private.","image":"/images/photos/bar-glasses-candle.jpg","reverse":true},
  {"label":"05 / Sound","title":"Music that stays out of the way.","body":"Our sound is chosen the way a good playlist is built for a long drive — present, but never demanding attention. It shifts with the night, never against it.","image":"/images/photos/cocktails-trio-dark.jpg","reverse":false},
  {"label":"06 / Hospitality","title":"Attentive, never intrusive.","body":"Good hospitality is mostly invisible. Our team is trained to notice — an empty glass, a quiet table that wants to stay quiet — without ever making themselves the evening's subject.","image":"/images/photos/cocktail-old-fashioned-light.jpg","reverse":true}
]$jj$::jsonb
where id = 'default';

alter table public.story_content enable row level security;

drop policy if exists "public can read story content" on public.story_content;
create policy "public can read story content" on public.story_content
  for select to anon using (true);

drop policy if exists "authenticated can read story content" on public.story_content;
create policy "authenticated can read story content" on public.story_content
  for select to authenticated using (true);

drop policy if exists "authenticated can write story content" on public.story_content;
create policy "authenticated can write story content" on public.story_content
  for update to authenticated using (true) with check (true);

drop trigger if exists set_updated_at on public.story_content;
create trigger set_updated_at before update on public.story_content
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
-- reservations — table requests submitted from the public /reserve page.
-- Contains guest PII (name/email/phone), so anon may only INSERT; only an
-- authenticated admin session can ever read or manage the list.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  party_size integer not null default 2,
  date date not null,
  time time not null,
  notes text not null default '',
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.reservations enable row level security;

drop policy if exists "public can submit reservations" on public.reservations;
create policy "public can submit reservations" on public.reservations
  for insert to anon with check (true);

drop policy if exists "authenticated can read reservations" on public.reservations;
create policy "authenticated can read reservations" on public.reservations
  for select to authenticated using (true);

drop policy if exists "authenticated can write reservations" on public.reservations;
create policy "authenticated can write reservations" on public.reservations
  for all to authenticated using (true) with check (true);

drop trigger if exists set_updated_at on public.reservations;
create trigger set_updated_at before update on public.reservations
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
-- After running this file, create your admin login in
-- Supabase → Authentication → Users → Add user (email + password).
-- That account is the only one that should ever sign in at /admin.
-- ─────────────────────────────────────────────────────────────────────────
