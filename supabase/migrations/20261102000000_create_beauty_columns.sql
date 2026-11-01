create extension if not exists "pgcrypto";

create table if not exists public.beauty_columns (
  id uuid primary key default gen_random_uuid(),
  published_on date not null unique,
  category_id text not null,
  title_ja text not null,
  title_en text not null,
  excerpt_ja text not null,
  excerpt_en text not null,
  body_ja text not null,
  body_en text not null,
  created_at timestamptz not null default now()
);

create index if not exists beauty_columns_published_on_idx
  on public.beauty_columns (published_on desc);

alter table public.beauty_columns enable row level security;
