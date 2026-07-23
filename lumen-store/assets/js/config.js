/* =========================================================================
   config.js
   -------------------------------------------------------------------------
   Loyihaning barcha sozlamalari shu yerda. Boshqa hech qaysi faylni
   o'zgartirishga hojat yo'q — faqat shu 4 ta qiymatni to'ldiring.

   1) Supabase loyihasi yarating: https://supabase.com/dashboard
      Project Settings -> API bo'limidan URL va anon public key'ni oling.
   2) Telegram bot yarating: @BotFather orqali /newbot buyrug'i bilan,
      sizga bergan tokenni TELEGRAM_BOT_TOKEN'ga qo'ying.
   3) ADMIN_CHAT_ID — buyurtma xabarlari keladigan Telegram chat ID
      (@userinfobot orqali bilib olishingiz mumkin).

   Buyurtma kelganda sayt to'g'ridan-to'g'ri (serversiz) Telegram'ga
   xabar yuboradi — alohida bot-server (node bot.js) ishga tushirish
   SHART EMAS.
   ========================================================================= */

window.APP_CONFIG = {
  SUPABASE_URL: 'https://sozmshtdllglgvaxmgnv.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_lqY1Eudg7Nw2uVgoCYaOpQ_FMjuNXZf',
  TELEGRAM_BOT_TOKEN: '8953636269:AAH32_kca-wroPKqxrMhOk2Rug1gQKZxznU', // <-- bot tokeni
  ADMIN_CHAT_ID: '5327086859'                                          // <-- xabar keladigan chat ID
};

window.App = window.App || {};

App.supabase = null;
try {
  const cfg = window.APP_CONFIG;
  const isConfigured = cfg.SUPABASE_URL.includes('supabase.co') && !cfg.SUPABASE_URL.includes('YOUR-PROJECT');
  if (window.supabase && isConfigured) {
    App.supabase = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  } else {
    console.warn('[LUMEN] Supabase sozlanmagan. config.js faylida SUPABASE_URL / SUPABASE_ANON_KEY ni to\'ldiring.');
  }
} catch (e) {
  console.error('[LUMEN] Supabase init xatosi:', e);
}
