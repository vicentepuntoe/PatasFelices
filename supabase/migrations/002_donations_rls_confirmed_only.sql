-- Lectura pública solo de pagos confirmados (anon / Realtime en el navegador).

drop policy if exists "donations_public_read" on public.donations;

create policy "donations_public_read"
  on public.donations
  for select
  to anon, authenticated
  using (lower(khipu_status) in ('done', 'paid', 'completed'));
