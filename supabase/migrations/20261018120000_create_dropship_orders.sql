create extension if not exists "pgcrypto";

create table if not exists public.dropship_orders (
  id uuid primary key,
  created_at timestamptz not null default now(),
  status text not null,
  payment_status text not null,
  payment_method text null,
  customer_name text not null,
  customer_email text not null,
  customer_tel text null,
  ship_postal text null,
  ship_region text null,
  ship_address1 text null,
  ship_address2 text null,
  ship_note text null,
  items jsonb not null default '[]'::jsonb,
  subtotal integer not null default 0,
  supplier_ids text[] not null default '{}',
  review_count integer not null default 0
);

create index if not exists dropship_orders_created_at_idx
  on public.dropship_orders (created_at desc);

alter table public.dropship_orders enable row level security;
