-- Ejecuta en Supabase → SQL Editor (una vez por proyecto).
-- Habilita lectura pública de donaciones confirmadas y Realtime.

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  khipu_payment_id text not null unique,
  amount integer not null check (amount > 0),
  currency text not null default 'CLP',
  donor_label text not null default 'Donación anónima',
  message text,
  khipu_status text not null,
  created_at timestamptz not null default now()
);

create index if not exists donations_created_at_idx
  on public.donations (created_at desc);

alter table public.donations enable row level security;

create policy "donations_public_read"
  on public.donations
  for select
  to anon, authenticated
  using (true);

-- Inserts/updates solo vía service role (API), no desde el navegador.

alter publication supabase_realtime add table public.donations;
