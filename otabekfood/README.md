# OtabekFood — Fast-Food Onlayn Buyurtma Sayti

Tailwind CSS + vanilla JS (ES Modules) + Supabase + Telegram Bot integratsiyasi bilan qurilgan, ko'p fayldan iborat real loyiha strukturasi.

## 📁 Papka strukturasi

```
otabekfood/
├── index.html                     # Faqat markup (HTML)
├── css/
│   └── style.css                  # Maxsus stillar (receipt uslubi, animatsiyalar)
├── js/
│   ├── tailwind.config.js         # Tailwind rang/shrift sozlamalari
│   ├── main.js                    # Ilova kirish nuqtasi (entry point)
│   ├── config/
│   │   └── app.config.js          # Supabase va Telegram kalitlari shu yerda
│   ├── data/
│   │   └── products.js            # Mahsulotlar ro'yxati (demo statik massiv)
│   ├── state/
│   │   └── cartStore.js           # Savatcha holati (pub/sub state)
│   ├── services/
│   │   ├── supabaseClient.js      # Supabase klientini yaratish
│   │   ├── ordersService.js       # orders jadvaliga yozish
│   │   └── telegramService.js     # Telegram Bot API orqali xabar yuborish
│   ├── ui/
│   │   ├── toast.js                # Bildirishnoma komponenti
│   │   ├── products.js             # Mahsulotlar grid + kategoriya filtri
│   │   ├── cart.js                 # Savatcha paneli (drawer)
│   │   └── checkout.js             # Buyurtma formasi + geolokatsiya
│   └── utils/
│       └── format.js               # Pul formatlash
├── supabase/
│   └── schema.sql                  # "orders" jadvalini yaratuvchi SQL
├── .env.example                    # Kelajakdagi backend/Edge Function uchun namuna
├── package.json                    # Lokal serverni ishga tushirish uchun
└── README.md
```

## 🚀 O'rnatish va ishga tushirish

Bu — build-tizimsiz (bundler'siz) sof statik loyiha, ammo ES Modules (`import`/`export`)
brauzerlarda **faqat HTTP server orqali** ishlaydi (`file://` orqali ochilganda CORS xatosi chiqadi).

### 1-usul — Node.js bilan (tavsiya etiladi)

```bash
npm install
npm run dev
```

So'ng brauzerda: `http://localhost:5173`

### 2-usul — Python bilan

```bash
python3 -m http.server 5173
```

### 3-usul — VS Code "Live Server" kengaytmasi

`index.html` faylini o'ng tugma bilan bosib **"Open with Live Server"** ni tanlang.

## ⚙️ Sozlash

### 1. Supabase

1. [supabase.com](https://supabase.com) da yangi loyiha yarating.
2. **SQL Editor** bo'limida `supabase/schema.sql` faylidagi kodni ishga tushiring — bu `orders` jadvalini va Row Level Security siyosatlarini yaratadi.
3. **Project Settings → API** bo'limidan `URL` va `anon public` kalitni oling.
4. Ularni `js/config/app.config.js` ichidagi `SUPABASE_CONFIG` ga qo'ying.

### 2. Telegram bot

1. Telegram'da [@BotFather](https://t.me/BotFather) ga `/newbot` yuboring — bot yaratiladi va sizga **BOT_TOKEN** beriladi.
2. Admin chat ID sini aniqlang:
   - Shaxsiy xabar uchun: [@userinfobot](https://t.me/userinfobot) ga `/start` yozing.
   - Guruh uchun: botni guruhga qo'shing, bironta xabar yozing, so'ng brauzerda `https://api.telegram.org/bot<TOKEN>/getUpdates` sahifasini oching va `"chat":{"id": ...}` qiymatini toping.
3. Ikkalasini ham `js/config/app.config.js` ichidagi `TELEGRAM_CONFIG` ga qo'ying.

## 🔒 Xavfsizlik bo'yicha muhim eslatma

`TELEGRAM_BOT_TOKEN` maxfiy kalit hisoblanadi. Uni frontendda (brauzer kodida) saqlash faqat
**demo/o'quv** maqsadlarida qabul qilinadi, chunki har qanday foydalanuvchi brauzer konsolidan
uni ko'rishi mumkin.

**Production (haqiqiy ishlab chiqarish) uchun tavsiya etilgan sxema:**

1. Supabase'da **Edge Function** yarating (masalan `notify-telegram`).
2. `TELEGRAM_BOT_TOKEN` ni frontendda emas, balki shu Edge Function'ning
   **Secrets** bo'limida saqlang.
3. `js/services/telegramService.js` ichidagi to'g'ridan-to'g'ri
   `fetch("https://api.telegram.org/...")` chaqiruvini
   `fetch("https://YOUR-PROJECT.functions.supabase.co/notify-telegram", {...})`
   ga almashtiring — Edge Function esa o'zi Telegram API'ga murojaat qiladi.

Bu usulda token hech qachon brauzerga chiqmaydi.

## 🧩 Arxitektura tamoyillari

- **config/** — barcha sozlamalar (kalitlar, narxlar) bitta joyda.
- **data/** — statik yoki keyinchalik API'dan olinadigan ma'lumotlar.
- **state/** — ilova holati, pub/sub orqali UI'ga xabar beradi.
- **services/** — tashqi API'lar bilan ishlash (Supabase, Telegram) — UI kodidan butunlay ajratilgan.
- **ui/** — faqat DOM bilan ishlaydigan, state va servislarni chaqiradigan komponentlar.
- **main.js** — hamma narsani bog'laydigan yagona kirish nuqtasi.

Bu bo'linish tufayli, masalan, Telegram o'rniga boshqa bildirishnoma xizmatiga
o'tish kerak bo'lsa, faqat `telegramService.js` faylini o'zgartirish kifoya —
UI yoki state kodiga tegish shart emas.

## 📦 Mahsulotlarni Supabase'dan olishga o'tish

Hozir `js/data/products.js` statik massiv qaytaradi. Buni Supabase'dagi
`products` jadvaliga ulash uchun faylning boshidagi izohlarga qarang —
u yerda tayyor kod namunasi berilgan.
