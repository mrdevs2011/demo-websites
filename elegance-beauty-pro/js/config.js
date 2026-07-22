/* =========================================================================
   config.js
   -------------------------------------------------------------------------
   Loyihaning barcha sozlamalari shu yerda. Boshqa hech qaysi faylni
   o'zgartirishga hojat yo'q — faqat shu 3 ta qiymatni to'ldiring.

   1) Supabase loyihasi yarating: https://supabase.com/dashboard
      Project Settings -> API bo'limidan URL va anon public key'ni oling.
   2) Telegram bot yarating: @BotFather orqali /newbot buyrug'i bilan,
      bot username'ini shu yerga yozing (masalan: dokon_bot).

   Kerakli SQL sxema /supabase/schema.sql faylida.
   Bot namunasi /telegram-bot papkasida.
   ========================================================================= */

window.APP_CONFIG = {
  SUPABASE_URL: 'https://sozmshtdllglgvaxmgnv.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_lqY1Eudg7Nw2uVgoCYaOpQ_FMjuNXZf',
  TELEGRAM_BOT_USERNAME: 'lumen_store_bot'              // <-- @ belgisisiz bot username
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
