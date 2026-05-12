-- 個人・法人の会員登録を Supabase Studio の Table Editor（public）で一覧できるようにする。
-- /api/auth-sign-up が auth.users 作成後に挿入。RLS 有効・anon からは直接触れない想定（service_role のみ API から）。

create extension if not exists "pgcrypto";

-- 個人用（EMR-TEK 消費者アカウント）
create table if not exists public.consumer_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  email text not null,
  display_name text not null
);

create index if not exists consumer_registrations_created_at_idx
  on public.consumer_registrations (created_at desc);

create index if not exists consumer_registrations_email_idx
  on public.consumer_registrations (email);

alter table public.consumer_registrations enable row level security;

-- 法人用（The Establish Beauty B2B）
create table if not exists public.business_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  email text not null,
  company text not null,
  department text null,
  phone text not null,
  contact_name text not null
);

create index if not exists business_registrations_created_at_idx
  on public.business_registrations (created_at desc);

create index if not exists business_registrations_email_idx
  on public.business_registrations (email);

create index if not exists business_registrations_company_idx
  on public.business_registrations (company);

alter table public.business_registrations enable row level security;
