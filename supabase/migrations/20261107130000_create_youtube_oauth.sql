-- YouTube OAuth refresh token. Server-side only. Does not upload videos.
-- /api/auth/youtube/callback writes with the service role. anon cannot read this table.

create table if not exists public.youtube_oauth (
  id text primary key default 'default',
  updated_at timestamptz not null default now(),
  refresh_token_encrypted text not null,
  access_token_encrypted text null,
  token_type text null,
  expires_at timestamptz null,
  scope text null,
  channel_id text null,
  channel_title text null
);

alter table public.youtube_oauth enable row level security;

revoke all on table public.youtube_oauth from anon, authenticated;

comment on table public.youtube_oauth is
  'Encrypted YouTube OAuth tokens; service_role only; never expose to clients.';
