-- =============================================================================
-- 個人・法人の会員登録テーブル（Supabase Studio 用）
-- =============================================================================
-- 使い方:
--   1. Supabase Dashboard → SQL Editor → New query
--   2. このファイルの全文を貼り付け → Run
--   3. 左メニュー Table Editor → schema「public」→
--        「consumer_registrations」（個人） / 「business_registrations」（法人）
--
-- 注意:
--   - 既に supabase/migrations/20260512140000_create_consumer_and_business_registrations.sql
--     を適用済みなら、CREATE はスキップされ（IF NOT EXISTS）、冪等です。
--   - データの挿入は /api/auth-sign-up（Vercel / ローカル dev-server）が行います。
--   - RLS は有効のままです。Table Editor はプロジェクト管理者として閲覧・編集できます。
-- =============================================================================

create extension if not exists "pgcrypto";

-- 個人用（EMR-TEK 消費者）
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

-- ---------------------------------------------------------------------------
-- 確認用（件数。必要ならコメントを外して Run）
-- ---------------------------------------------------------------------------
-- select 'consumer_registrations' as table_name, count(*)::bigint as rows from public.consumer_registrations
-- union all
-- select 'business_registrations', count(*)::bigint from public.business_registrations;
