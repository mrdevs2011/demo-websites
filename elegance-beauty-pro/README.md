# ELEGANCE BEAUTY — Onlayn Bron Sayti

Go'zallik saloni / Barbershop / Klinika uchun mo'ljallangan, to'liq interaktiv
onlayn bron (booking) sayti. Toza HTML/CSS/JS (ES modullar) asosida qurilgan,
build-tool talab qilmaydi — istalgan statik hostingga to'g'ridan-to'g'ri
joylashtirish mumkin.

## 📁 Loyiha strukturasi

```
elegance-beauty-pro/
├── index.html              # Sahifa strukturasi (semantik HTML)
├── css/
│   └── styles.css          # Maxsus uslublar (ticket dizayni, animatsiyalar)
├── js/
│   ├── tailwind.config.js  # Tailwind rang/shrift sozlamalari
│   ├── config.js           # Supabase va Telegram kalitlari (BU YERNI TO'LDIRING)
│   ├── data.js              # Xizmatlar, ustalar ro'yxati + yordamchi funksiyalar
│   ├── state.js             # Bron jarayonining vaqtinchalik holati
│   ├── api.js                # Supabase'ga saqlash + Telegram bildirishnoma
│   ├── home.js               # Bosh sahifadagi xizmatlar/ustalar kartochkalari
│   ├── booking.js            # Bron modali: qadamlar, vaqt slotlari, yuborish
│   ├── ui.js                  # Header scroll effekti, mobil menyu, animatsiya
│   └── main.js                # Kirish nuqtasi — barcha modullarni ulaydi
└── README.md
```

## 🚀 Ishga tushirish

Fayllar oddiy statik fayllar, lekin ES modullar (`type="module"`) brauzer
xavfsizligi (CORS) sabab `file://` orqali to'g'ri ishlamaydi. Shu sababli
mahalliy serverdan ochish kerak:

```bash
# Python bilan
python3 -m http.server 8000

# yoki Node bilan (npx)
npx serve .
```

So'ng brauzerda `http://localhost:8000` manzilini oching.

Production'ga chiqarishda istalgan statik hosting (Netlify, Vercel, GitHub
Pages, oddiy nginx/apache) ishlaydi — build qadam shart emas.

## ⚙️ Sozlash

### 1. Supabase

1. [supabase.com](https://supabase.com) saytida yangi loyiha yarating.
2. **SQL Editor**'da quyidagi jadvalni yarating (kod `js/config.js` faylida ham izoh sifatida bor):

```sql
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
```

3. `js/config.js` faylida quyidagilarni o'z qiymatlaringiz bilan almashtiring:

```js
export const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
export const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

### 2. Telegram bot

1. Telegram'da **@BotFather** orqali yangi bot yarating va tokenni oling.
2. Bildirishnoma boradigan chat/guruh ID sini oling (masalan **@userinfobot** yordamida, yoki botni guruhga qo'shib `getUpdates` orqali).
3. `js/config.js` faylida:

```js
export const TELEGRAM_BOT_TOKEN = "123456:ABC-DEF...";
export const TELEGRAM_CHAT_ID   = "-1001234567890";
```

> ⚠️ **Xavfsizlik eslatmasi:** Bot tokenini frontendda ochiq saqlash ishlab
> chiqarish (production) muhiti uchun tavsiya etilmaydi, chunki u brauzer
> orqali ko'rinadi. Jiddiy loyiha uchun buni backend/serverless funksiya
> (masalan Supabase Edge Function) orqali yashirin qilib yuborish tavsiya
> etiladi. Bu loyihada soddalik uchun to'g'ridan-to'g'ri frontend'dan
> yuborilmoqda.

### 3. Xizmatlar, narxlar va ustalarni tahrirlash

Barcha ro'yxatlar `js/data.js` faylida — yangi xizmat yoki usta qo'shish
uchun shu faylga mos obyekt qo'shish kifoya, boshqa hech qanday joyni
o'zgartirish shart emas.

## 🎨 Dizayn

- **Ranglar:** Emerald (#0B3B2E) + Gold (#C9A227) + Cream (#FAF8F3)
- **Shriftlar:** Playfair Display (sarlavhalar), Manrope (matn), JetBrains Mono (raqamlar/narxlar)
- **Signature element:** "chipta" (boarding-pass) uslubidagi bron xulosasi kartochkasi

## ✅ Ishlamay qolsa nima qilish kerak (demo rejim)

Agar `config.js` ichidagi qiymatlar to'ldirilmagan bo'lsa, sayt xatosiz
"demo rejim"da ishlayveradi: bron ma'lumotlari faqat brauzer konsoliga
(`console.warn`) chiqariladi, foydalanuvchiga xatolik ko'rsatilmaydi.
