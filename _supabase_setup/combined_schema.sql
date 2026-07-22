-- =============================================================================
-- UMUMIY SUPABASE SXEMASI — 4 TA LOYIHA UCHUN (1 TA PROJECT)
-- -----------------------------------------------------------------------------
-- Loyihalar: lumen-store, next-gen-academy-landing, otabekfood,
--            elegance-beauty-pro
-- Hammasi bitta Supabase project (sozmshtdllglgvaxmgnv) ichida ishlaydi,
-- shuning uchun jadval nomlari bir-biriga urilib qolmasligi kerak.
--
-- MUHIM: lumen-store va otabekfood ikkalasida ham "orders" nomli jadval bor,
-- lekin ustunlari boshqa-boshqa. Shuning uchun bu yerda otabekfood'niki
-- "otabekfood_orders" deb nomlandi (pastdagi eslatmaga qarang — kodda ham
-- shu joyni o'zgartirish kerak).
--
-- Ishlatish: Supabase Dashboard -> SQL Editor -> shu faylni to'liq
-- yopishtirib "Run" tugmasini bosing. Xavfsiz — barcha "create table"lar
-- "if not exists" bilan, qayta ishga tushirsangiz ham xato bermaydi.
-- =============================================================================

create extension if not exists pgcrypto;

-- =============================================================================
-- 1) LUMEN-STORE
-- =============================================================================

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  address text,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text unique not null,
  customer_id uuid references public.customers(id),
  items jsonb not null,
  total numeric not null,
  status text default 'new',
  created_at timestamptz default now()
);

create index if not exists idx_orders_order_code on public.orders(order_code);
create index if not exists idx_orders_customer_id on public.orders(customer_id);

alter table public.customers enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Anon insert customers" on public.customers;
create policy "Anon insert customers" on public.customers
  for insert to anon
  with check (true);

drop policy if exists "Anon insert orders" on public.orders;
create policy "Anon insert orders" on public.orders
  for insert to anon
  with check (true);

-- =============================================================================
-- 2) NEXT-GEN ACADEMY LANDING
-- =============================================================================

create table if not exists public.edu_leads (
  id bigint generated always as identity primary key,
  full_name text not null,
  phone text not null,
  course text not null,
  created_at timestamptz default now()
);

alter table public.edu_leads enable row level security;

drop policy if exists "Anyone can insert leads" on public.edu_leads;
create policy "Anyone can insert leads"
  on public.edu_leads for insert
  to anon
  with check (true);

-- =============================================================================
-- 3) OTABEKFOOD
-- -----------------------------------------------------------------------------
-- E'TIBOR: jadval nomi "orders" emas, "otabekfood_orders" — chunki
-- lumen-store'da allaqachon "orders" jadvali bor. Kodda ham
-- js/config/app.config.js faylidagi ordersTable qiymatini
-- "otabekfood_orders" ga o'zgartiring (pastdagi izohga qarang).
-- =============================================================================

create table if not exists public.otabekfood_orders (
  id             bigint generated always as identity primary key,
  customer_name  text not null,
  customer_phone text not null,
  address        text not null,
  comment        text,
  latitude       double precision,
  longitude      double precision,
  items          jsonb not null,
  subtotal       numeric not null,
  delivery_fee   numeric not null default 0,
  total          numeric not null,
  status         text not null default 'new',
  created_at     timestamptz not null default now()
);

alter table public.otabekfood_orders enable row level security;

drop policy if exists "Anon foydalanuvchilar buyurtma yarata oladi" on public.otabekfood_orders;
create policy "Anon foydalanuvchilar buyurtma yarata oladi"
  on public.otabekfood_orders
  for insert
  to anon
  with check (true);

drop policy if exists "Authenticated foydalanuvchilar buyurtmalarni o'qiy oladi" on public.otabekfood_orders;
create policy "Authenticated foydalanuvchilar buyurtmalarni o'qiy oladi"
  on public.otabekfood_orders
  for select
  to authenticated
  using (true);

create index if not exists otabekfood_orders_status_idx on public.otabekfood_orders (status);
create index if not exists otabekfood_orders_created_at_idx on public.otabekfood_orders (created_at desc);

-- =============================================================================
-- 4) ELEGANCE BEAUTY PRO
-- =============================================================================

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

drop policy if exists "Allow public insert" on public.bookings;
create policy "Allow public insert" on public.bookings
  for insert to anon
  with check (true);

create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

-- =============================================================================
-- TEKSHIRISH: barcha jadvallar yaratilganini ko'rish
-- =============================================================================
-- select table_name from information_schema.tables
-- where table_schema = 'public'
-- order by table_name;
