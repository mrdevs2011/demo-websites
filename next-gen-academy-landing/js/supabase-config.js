/* ============================================
   SUPABASE SOZLAMALARI
   Bu yerga o'zingizning Supabase loyihangiz
   ma'lumotlarini kiriting.

   Qayerdan olish mumkin:
   Supabase Dashboard -> Settings -> API
     - Project URL      -> SUPABASE_URL
     - anon public key  -> SUPABASE_ANON_KEY

   Kerakli jadval (edu_leads) ustunlari:
     - full_name   (text)
     - phone       (text)
     - course      (text)
     - created_at  (timestamptz)
   ============================================ */

const SUPABASE_URL = 'https://sozmshtdllglgvaxmgnv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_lqY1Eudg7Nw2uVgoCYaOpQ_FMjuNXZf';

/* ============================================
   TELEGRAM SOZLAMALARI
   Yangi ariza (lead) kelganda shu bot orqali
   adminga xabar yuboriladi.
   ============================================ */
const TELEGRAM_BOT_TOKEN = '8808363209:AAGBupMoqCj5MiJFKY3B7hOdkXghfsTp1A4';
const TELEGRAM_CHAT_ID = '5327086859';
