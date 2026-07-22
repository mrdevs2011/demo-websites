# LUMEN — Kiyim, Poyabzal & Aksessuarlar Do'koni

Minimalistik, Indigo/Black/White uslubidagi onlayn do'kon katalog sayti.
Hero-slayder, mahsulot kartochkalari (o'lcham tanlash bilan), qidiruv/saralash,
savat va **Supabase + Telegram bot** integratsiyasi bilan.

## 📁 Loyiha tuzilishi

```
lumen-store/
├── index.html                 # Asosiy sahifa (markup)
├── package.json                # Statik saytni lokal serverda ishga tushirish uchun
├── assets/
│   ├── css/
│   │   └── style.css          # Barcha stillar
│   └── js/
│       ├── config.js          # Supabase / Telegram sozlamalari (BU YERNI TO'LDIRING)
│       ├── products-data.js   # Namunaviy mahsulotlar ro'yxati
│       ├── state.js           # Umumiy holat (state) va yordamchi funksiyalar
│       ├── products.js        # Katalog render, filtr, qidiruv, saralash
│       ├── cart.js            # Savat (drawer) mantiqi
│       ├── slider.js          # Hero banner slayder
│       ├── checkout.js        # Buyurtma yuborish + Supabase + Telegram redirect
│       └── main.js            # Kirish nuqtasi — barcha modullarni ishga tushiradi
├── supabase/
│   └── schema.sql             # customers / orders jadvallari + RLS policy'lar
└── telegram-bot/
    ├── bot.js                 # Telegram bot (Node.js, Telegraf)
    ├── package.json
    └── .env.example           # Bot uchun maxfiy kalitlar namunasi
```

## 🚀 Ishga tushirish

### 1. Frontend saytni ko'rish

Eng oddiy yo'l — brauzerda to'g'ridan-to'g'ri `index.html` faylini oching.

Yoki lokal server orqali (tavsiya etiladi, chunki ba'zi brauzerlar `file://`
orqali skriptlarni cheklashi mumkin):

```bash
cd lumen-store
npm start
# http://localhost:8080 manzilida ochiladi
```

### 2. Supabase sozlash

1. https://supabase.com/dashboard saytida yangi loyiha yarating.
2. **SQL Editor** bo'limiga o'ting va `supabase/schema.sql` faylidagi
   so'rovlarni ishga tushiring — bu `customers` va `orders` jadvallarini
   va tegishli xavfsizlik (RLS) qoidalarini yaratadi.
3. **Project Settings → API** bo'limidan `Project URL` va `anon public` kalitni
   nusxalab, `assets/js/config.js` fayliga qo'ying:

```js
window.APP_CONFIG = {
  SUPABASE_URL: 'https://xxxxx.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOi...',
  TELEGRAM_BOT_USERNAME: 'dokon_bot'
};
```

### 3. Telegram bot sozlash

1. Telegram'da **@BotFather** ga o'ting, `/newbot` buyrug'i bilan yangi bot
   yarating va tokenni oling.
2. `telegram-bot/.env.example` faylini `telegram-bot/.env` nomi bilan
   nusxalab, quyidagilarni to'ldiring:
   - `BOT_TOKEN` — BotFather bergan token
   - `SUPABASE_URL` — Supabase loyihangiz URL manzili
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase **service_role** kaliti
     (Project Settings → API → service_role; bu kalit **maxfiy**, uni hech
     qachon frontendga yoki Git'ga qo'ymang)
   - `ADMIN_CHAT_ID` — yangi buyurtmalar haqida xabar oladigan chat ID
     (ixtiyoriy)
3. Botni ishga tushiring:

```bash
cd telegram-bot
npm install
npm start
```

### 4. To'liq oqim qanday ishlaydi

1. Xaridor saytda mahsulot(lar)ni tanlab, o'lchamini belgilab, savatga
   qo'shadi.
2. "Buyurtma berish" tugmasi bosilganda ism, telefon va manzil so'raladi.
3. Forma yuborilganda:
   - `customers` jadvaliga yangi mijoz yoziladi,
   - `orders` jadvaliga buyurtma (mahsulotlar ro'yxati JSON ko'rinishida,
     umumiy summa, holati) yoziladi va noyob `order_code` beriladi.
4. Xaridor avtomatik ravishda
   `https://t.me/<bot_username>?start=order_XXXXXXXX` manziliga
   yo'naltiriladi.
5. Telegram bot shu `order_code` orqali Supabase'dan buyurtma va mijoz
   ma'lumotlarini o'qiydi, xaridorga tasdiqlash xabarini, do'kon egasiga esa
   bildirishnoma yuboradi.

## 🎨 Dizayn

- **Ranglar**: Indigo `#4F46E5`, Black `#0B0B12`, White `#FFFFFF` + neytral
  kulrang fon va chegirma uchun funksional qizil urg'u.
- **Shriftlar**: sarlavhalar uchun *Space Grotesk*, matn uchun *Inter*.
- **Komponentlar**: hero-slayder, mahsulot kartochkalari (o'lcham chiplari
  bilan), kategoriya filtri, narx bo'yicha saralash, slayd-savat (drawer),
  buyurtma modali.

## 📦 Joylashtirish (deploy)

- **Frontend**: Netlify, Vercel yoki GitHub Pages kabi har qanday statik
  hosting xizmatiga `index.html` + `assets/` papkasini yuklash kifoya.
- **Telegram bot**: Railway, Render, VPS yoki har qanday Node.js
  hosting'da doimiy ishlaydigan process sifatida ishga tushiriladi
  (`npm start` yoki PM2 orqali).

## ⚠️ Muhim eslatmalar

- `SUPABASE_ANON_KEY` — bu ochiq (public) kalit, frontendda ishlatilishi
  xavfsiz, lekin RLS qoidalari orqali faqat kerakli amallarga (masalan,
  faqat `insert`) ruxsat berilishi kerak (`supabase/schema.sql` faylida
  namuna keltirilgan).
- `SUPABASE_SERVICE_ROLE_KEY` — bu **maxfiy** kalit, faqat serverda
  (Telegram bot) ishlatilishi kerak, uni hech qachon frontend kodiga yoki
  ochiq repositoryga qo'ymang.
- Namunaviy mahsulotlar `assets/js/products-data.js` faylida statik massiv
  sifatida berilgan; real loyihada bu ma'lumotlar Supabase'dagi alohida
  `products` jadvalidan olinishi mumkin.
