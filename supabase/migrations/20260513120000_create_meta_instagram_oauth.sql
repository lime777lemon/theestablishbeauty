-- Meta Instagram Unified Login で取得したアクセストークン（サーバー専用）。
-- /api/auth/meta/callback が service_role で upsert。anon からは触れない。
-- ブラウザや静的 HTML には出さない。Instagram 自動投稿 Cron 有効化前に投入すること。

create table if not exists public.meta_instagram_oauth (
  id text primary key default 'default',
  updated_at timestamptz not null default now(),
  access_token text not null,
  token_type text null,
  expires_in integer null,
  client_business_id text null,
  instagram_accounts jsonb not null default '[]'::jsonb
);

alter table public.meta_instagram_oauth enable row level security;

comment on table public.meta_instagram_oauth is
  'Meta OAuth tokens for Instagram Graph API; service_role only; never expose to clients.';
