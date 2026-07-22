-- =========================================================================
-- LUMEN do'koni uchun Supabase SQL sxemasi
-- -------------------------------------------------------------------------
-- Ishlatish: Supabase Dashboard -> SQL Editor -> shu faylni yopishtirib
-- "Run" tugmasini bosing.
-- =========================================================================

-- Mijozlar jadvali
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  address text,
  created_at timestamptz default now()
);

-- Buyurtmalar jadvali
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_code text unique not null,        -- Telegramga yuboriladigan qisqa kod (?start=order_code)
  customer_id uuid references customers(id),
  items jsonb not null,                   -- [{id, name, size, qty, price}, ...]
  total numeric not null,
  status text default 'new',              -- new / confirmed / shipped / done / cancelled
  created_at timestamptz default now()
);

-- Tezkor qidiruv uchun indeks
create index if not exists idx_orders_order_code on orders(order_code);
create index if not exists idx_orders_customer_id on orders(customer_id);

-- -------------------------------------------------------------------------
-- Row Level Security (RLS)
-- -------------------------------------------------------------------------
-- Frontend anon (public) kalit bilan yozadi, shuning uchun anon uchun
-- faqat INSERT ruxsati beramiz. O'qish/yangilash faqat bot/admin tomonidan
-- service_role kaliti orqali amalga oshiriladi (RLS'ni chetlab o'tadi).

alter table customers enable row level security;
alter table orders enable row level security;

create policy "Anon insert customers" on customers
  for insert to anon
  with check (true);

create policy "Anon insert orders" on orders
  for insert to anon
  with check (true);

-- Ixtiyoriy: agar xaridorga o'z buyurtmasini ko'rish imkoni kerak bo'lsa,
-- alohida select policy qo'shish mumkin (masalan telefon raqami orqali).
