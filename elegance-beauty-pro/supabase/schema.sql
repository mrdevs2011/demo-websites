-- ===========================================================================
-- ELEGANCE BEAUTY PRO — SUPABASE SXEMASI
-- ---------------------------------------------------------------------------
-- Supabase Dashboard -> SQL Editor -> shu faylni yopishtirib "Run" tugmasini
-- bosing. Ustun nomlari js/api.js dagi submitBookingToBackend() bilan bir xil.
-- ===========================================================================

create table if not exists public.bookings (
  id            bigint generated always as identity primary key,
  service_id    text not null,
  service_name  text not null,
  master_id     text not null,
  master_name   text not null,
  booking_date  date not null,
  booking_time  text not null,
  client_name   text not null,
  client_phone  text not null,
  price         bigint not null,
  duration      int not null,
  status        text default 'new',
  created_at    timestamptz default now()
);

alter table public.bookings enable row level security;

create policy "Allow public insert" on public.bookings
  for insert to anon
  with check (true);

create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
