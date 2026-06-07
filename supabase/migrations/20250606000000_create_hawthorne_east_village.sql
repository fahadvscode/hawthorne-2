-- Run in Supabase Dashboard → SQL Editor, or via Supabase CLI: supabase db push

create table if not exists public.hawthorne_east_village (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  is_broker text not null default '',
  source text not null default 'hawthorneeastvillagemilton.com',
  page_path text not null default '/',
  form_type text not null default 'hero',
  utm_source text not null default '',
  utm_medium text not null default '',
  utm_campaign text not null default '',
  utm_term text not null default '',
  utm_content text not null default '',
  created_at timestamptz not null default now()
);

comment on table public.hawthorne_east_village is 'Lead registrations from Hawthorne East Village Milton website forms';

create index if not exists hawthorne_east_village_email_idx on public.hawthorne_east_village (email);
create index if not exists hawthorne_east_village_created_at_idx on public.hawthorne_east_village (created_at desc);

alter table public.hawthorne_east_village enable row level security;
