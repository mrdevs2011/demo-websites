// ===========================================================================
// LOYIHA KONFIGURATSIYASI
// ---------------------------------------------------------------------------
// Bu fayl butun loyiha uchun yagona sozlamalar manbai (single source of
// truth). Haqiqiy qiymatlarni shu yerga qo'yasiz.
//
// XAVFSIZLIK ESLATMASI:
//   - SUPABASE_ANON_KEY ochiq (public) kalit bo'lib, uni frontendda
//     ishlatish xavfsiz — lekin Supabase'da albatta Row Level Security
//     (RLS) siyosatlarini yoqing (supabase/schema.sql fayliga qarang).
//   - TELEGRAM_BOT_TOKEN esa MAXFIY kalit. Uni frontendda saqlash faqat
//     demo/o'quv maqsadida qabul qilinadi. Production uchun
//     "README.md -> Xavfsizlik" bo'limidagi Edge Function usulidan
//     foydalaning.
// ===========================================================================

export const SUPABASE_CONFIG = {
  url: "https://sozmshtdllglgvaxmgnv.supabase.co",
  anonKey: "sb_publishable_lqY1Eudg7Nw2uVgoCYaOpQ_FMjuNXZf",
  ordersTable: "otabekfood_orders",
};

export const TELEGRAM_CONFIG = {
  botToken: "8644681367:AAF5CVlfcIerknSKKRyZ6BBYeU6jsdCZ12g",
  adminChatId: "5327086859",
};

export const DELIVERY_CONFIG = {
  fee: 15000,             // Standart yetkazib berish narxi (so'm)
  freeDeliveryLimit: 150000, // Shu summadan yuqori buyurtmalarda bepul
};
