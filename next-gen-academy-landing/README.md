# NEXT GEN ACADEMY — Landing Page

O'quv markazlari, xususiy maktablar va ta'lim akademiyalari uchun mo'ljallangan zamonaviy landing page.

## 📁 Loyiha strukturasi

```
edu-landing-project/
├── index.html              ← Asosiy HTML fayl (struktura)
├── css/
│   └── style.css           ← Custom CSS (animatsiyalar, hover effektlar)
├── js/
│   ├── tailwind.config.js  ← Tailwind rang/shrift sozlamalari (Indigo/Violet)
│   ├── main.js             ← Mobil menyu, kurs filtri, FAQ akkordeon
│   ├── supabase-config.js  ← Supabase URL va API kalit (BU YERNI TO'LDIRING)
│   └── lead-form.js        ← Lead-forma yuborish logikasi
└── README.md                ← Shu fayl
```

## 🚀 Ishga tushirish

1. Papkani istalgan joyga ochib oling (masalan, `edu-landing-project`).
2. `index.html` faylini brauzerda oching — hammasi ishlaydi (internet kerak, chunki Tailwind/FontAwesome/Fonts CDN orqali yuklanadi).
3. Haqiqiy saytda ishlatish uchun bu papkani istalgan hosting'ga (Netlify, Vercel, oddiy hosting) shu holicha yuklashingiz mumkin.

## 🔌 Supabase ulash

1. [supabase.com](https://supabase.com) da loyiha yarating.
2. **SQL Editor** bo'limida quyidagi jadvalni yarating:

```sql
create table edu_leads (
  id bigint generated always as identity primary key,
  full_name text not null,
  phone text not null,
  course text not null,
  created_at timestamptz default now()
);

-- Anon foydalanuvchilar forma orqali yozish huquqiga ega bo'lishi uchun:
alter table edu_leads enable row level security;

create policy "Anyone can insert leads"
  on edu_leads for insert
  to anon
  with check (true);
```

3. Supabase dashboard → **Settings → API** bo'limidan `Project URL` va `anon public key`ni oling.
4. `js/supabase-config.js` faylini oching va quyidagi qatorlarni to'ldiring:

```js
const SUPABASE_URL = 'https://sizning-loyihangiz.supabase.co';
const SUPABASE_ANON_KEY = 'sizning-anon-kalitingiz';
```

5. Saqlang — forma endi to'g'ridan-to'g'ri `edu_leads` jadvaliga yozadi.

## 🎨 Dizaynni o'zgartirish

- **Ranglar**: `js/tailwind.config.js` faylidagi `brand` ranglar palitrasini o'zgartiring.
- **Shriftlar**: `index.html` dagi Google Fonts havolasini va `js/tailwind.config.js` dagi `fontFamily`ni o'zgartiring.
- **Matnlar/rasm**: `index.html` ichida to'g'ridan-to'g'ri tahrirlang (rasm URL'lari hozircha Unsplash'dan).
- **Manzil/telefon**: `index.html` dagi `<footer>` bo'limida.

## 📌 Eslatma

Rasm URL manzillari namuna sifatida Unsplash'dan olingan — haqiqiy loyihangiz uchun o'z rasmlaringiz yoki logotipingiz bilan almashtiring.
