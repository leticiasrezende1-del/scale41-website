-- Run in Supabase > SQL Editor > New query
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  message text not null,
  language text not null default 'de'
);
alter table public.leads enable row level security;
-- No public policies: only the server-side service role can insert/read.
