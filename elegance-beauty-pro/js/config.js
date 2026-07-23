// =============================================================================
// SOZLAMALAR: Supabase va Telegram
// Bu yerga o'zingizning haqiqiy ma'lumotlaringizni kiriting.
// =============================================================================

export const SUPABASE_URL = "https://sozmshtdllglgvaxmgnv.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_lqY1Eudg7Nw2uVgoCYaOpQ_FMjuNXZf";

export const TELEGRAM_BOT_TOKEN = "8712396525:AAE1qSBw6T85qXLsJL0rvcLfx-D2YSoHvGc";
export const TELEGRAM_CHAT_ID   = "5327086859";

/*
  Supabase'da kerak bo'ladigan jadval strukturasi (SQL Editor'da bajaring):

  create table bookings (
    id bigint generated always as identity primary key,
    service_id text not null,
    service_name text not null,
    master_id text not null,
    master_name text not null,
    booking_date date not null,
    booking_time text not null,
    client_name text not null,
    client_phone text not null,
    price bigint not null,
    duration int not null,
    status text default 'new',
    created_at timestamptz default now()
  );

  alter table bookings enable row level security;
  create policy "Allow public insert" on bookings for insert to anon with check (true);
*/
