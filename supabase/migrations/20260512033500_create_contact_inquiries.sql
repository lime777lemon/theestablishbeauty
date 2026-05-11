-- Create table for contact form submissions
-- Used by /api/contact-inquiry (server-side insert via service_role)

create extension if not exists "pgcrypto";

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text null,
  email text not null,
  inquiry_type text not null,
  message text not null,
  consent boolean not null default true,
  page_path text null,
  locale text null,
  user_agent text null
);

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);

create index if not exists contact_inquiries_email_idx
  on public.contact_inquiries (email);

-- Keep this table private by default.
alter table public.contact_inquiries enable row level security;

