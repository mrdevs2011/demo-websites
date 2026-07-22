-- ===========================================================================
-- NEXT-GEN ACADEMY LANDING — SUPABASE SXEMASI
-- ---------------------------------------------------------------------------
-- Supabase Dashboard -> SQL Editor -> shu faylni yopishtirib "Run" tugmasini
-- bosing. Ustun nomlari js/lead-form.js dagi insert() bilan bir xil.
-- ===========================================================================

create table if not exists public.edu_leads (
  id bigint generated always as identity primary key,
  full_name text not null,
  phone text not null,
  course text not null,
  created_at timestamptz default now()
);

alter table public.edu_leads enable row level security;

create policy "Anyone can insert leads"
  on public.edu_leads for insert
  to anon
  with check (true);
