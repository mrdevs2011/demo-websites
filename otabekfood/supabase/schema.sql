-- ===========================================================================
-- OTABEKFOOD — SUPABASE SXEMASI
-- ---------------------------------------------------------------------------
-- Bu faylni Supabase loyihangizda: Dashboard -> SQL Editor -> New query
-- bo'limiga qo'yib ishga tushiring.
-- ===========================================================================

create table if not exists public.orders (
  id             bigint generated always as identity primary key,
  customer_name  text not null,
  customer_phone text not null,
  address        text not null,
  comment        text,
  latitude       double precision,
  longitude      double precision,
  items          jsonb not null,           -- [{product_id, name, price, qty, line_total}, ...]
  subtotal       numeric not null,
  delivery_fee   numeric not null default 0,
  total          numeric not null,
  status         text not null default 'new', -- new | confirmed | delivering | done | cancelled
  created_at     timestamptz not null default now()
);

-- Row Level Security'ni yoqish
alter table public.orders enable row level security;

-- Mijozlar (anon foydalanuvchilar) yangi buyurtma yaratishi (INSERT) mumkin,
-- lekin mavjud buyurtmalarni o'qiy olmaydi/o'zgartira olmaydi.
create policy "Anon foydalanuvchilar buyurtma yarata oladi"
  on public.orders
  for insert
  to anon
  with check (true);

-- Admin panel uchun: faqat authenticated (tizimga kirgan) foydalanuvchilar
-- buyurtmalarni o'qiy oladi. Kerak bo'lsa, bu yerga o'z admin rolingizga
-- mos qo'shimcha shartlar qo'shishingiz mumkin.
create policy "Authenticated foydalanuvchilar buyurtmalarni o'qiy oladi"
  on public.orders
  for select
  to authenticated
  using (true);

-- Tezkor filtrlash uchun indekslar
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
