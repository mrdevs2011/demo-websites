// =============================================================================
// MA'LUMOTLAR: Xizmatlar va ustalar ro'yxati
// =============================================================================

export const SERVICES = [
  { id: 'hair_cut',       name: "Ayollar soch kesish", desc: "Konsultatsiya + yuvish + kesish + ukladka", duration: 45,  price: 120000, icon: 'fa-scissors' },
  { id: 'hair_color',     name: "Soch bo'yash",         desc: "To'liq bo'yash, professional bo'yoqlar bilan", duration: 120, price: 350000, icon: 'fa-palette' },
  { id: 'hair_style',     name: "Soch turmagi",         desc: "Kechki va kundalik murakkab turmaklar",   duration: 60,  price: 180000, icon: 'fa-wand-magic-sparkles' },
  { id: 'manicure',       name: "Manikur",              desc: "Gigienik manikur + gel lak qoplash",       duration: 60,  price: 100000, icon: 'fa-hand-sparkles' },
  { id: 'pedicure',       name: "Pedikur",              desc: "SPA pedikur + gel lak qoplash",            duration: 75,  price: 130000, icon: 'fa-shoe-prints' },
  { id: 'makeup',         name: "Kunduzgi makiyaj",     desc: "Tabiiy va nafis kunduzgi makiyaj",         duration: 45,  price: 150000, icon: 'fa-paintbrush' },
  { id: 'evening_makeup', name: "Kechki makiyaj",       desc: "Tadbirlar uchun murakkab kechki makiyaj",  duration: 60,  price: 220000, icon: 'fa-star' },
  { id: 'brows',          name: "Qosh dizayni",         desc: "Qosh shakllantirish + bo'yash",            duration: 30,  price: 80000,  icon: 'fa-eye' },
  { id: 'barber_cut',     name: "Erkaklar soch kesish", desc: "Klassik va zamonaviy erkaklar sartaroshligi", duration: 40, price: 90000,  icon: 'fa-user-tie' },
  { id: 'lash_ext',       name: "Kiprik uzaytirish",    desc: "Klassik va 2D/3D kiprik lamination texnikasi",  duration: 90,  price: 260000, icon: 'fa-eye' },
  { id: 'lash_lam',       name: "Kiprik laminatsiyasi", desc: "Tabiiy kiprikni bo'yash va shakllantirish",     duration: 50,  price: 170000, icon: 'fa-eye-low-vision' },
  { id: 'spa_face',       name: "Yuz uchun SPA parvarish", desc: "Tozalash, massaj va namlantiruvchi niqob",   duration: 60,  price: 210000, icon: 'fa-spa' },
  { id: 'massage',        name: "Tana massaji",         desc: "Bo'shashtiruvchi klassik tana massaji",         duration: 60,  price: 240000, icon: 'fa-hands' },
  { id: 'hair_therapy',   name: "Soch davolash (keratin)", desc: "Keratin bilan sochni tiklash va parvarish",  duration: 90,  price: 320000, icon: 'fa-droplet' },
  { id: 'nail_art',       name: "Nail art dizayni",     desc: "Individual dizayn bilan tirnoq bezash",         duration: 45,  price: 130000, icon: 'fa-gem' },
  { id: 'beard_care',     name: "Soqol parvarishi",     desc: "Soqol shakllantirish va issiq sochiq bilan tarash", duration: 30, price: 65000, icon: 'fa-user-tie' },
  { id: 'bride_package',  name: "Kelinchak paketi",     desc: "To'y kuni uchun soch + makiyaj to'liq paket",   duration: 150, price: 650000, icon: 'fa-crown' },
];

export const MASTERS = [
  { id: 'madina',  name: 'Madina Yusupova',  role: "Bosh usta / Soch", exp: "12 yillik tajriba", img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=400&auto=format&fit=crop', specialties: ['hair_cut', 'hair_color', 'hair_style'] },
  { id: 'dilnoza', name: 'Dilnoza Karimova', role: "Manikur ustasi",   exp: "8 yillik tajriba",  img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400&auto=format&fit=crop', specialties: ['manicure', 'pedicure'] },
  { id: 'zarina',  name: 'Zarina Aliyeva',   role: "Vizajist",         exp: "6 yillik tajriba",  img: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=400&auto=format&fit=crop', specialties: ['makeup', 'evening_makeup', 'brows'] },
  { id: 'jasur',   name: 'Jasur Rahimov',    role: "Barber",           exp: "10 yillik tajriba", img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=400&auto=format&fit=crop', specialties: ['barber_cut', 'beard_care'] },
  { id: 'nigora',  name: 'Nigora Tosheva',   role: "Kiprik ustasi",    exp: "5 yillik tajriba",  img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', specialties: ['lash_ext', 'lash_lam'] },
  { id: 'shahnoza',name: 'Shahnoza Nazarova',role: "SPA / Massaj ustasi", exp: "9 yillik tajriba", img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop', specialties: ['spa_face', 'massage'] },
];

/** Narxni "250 000 so'm" ko'rinishida formatlaydi */
export function money(n) {
  return n.toLocaleString('ru-RU').replace(/,/g, ' ') + " so'm";
}

/** Sanani "24-iyul, Payshanba" ko'rinishida formatlaydi */
export function formatDateUz(dateStr) {
  if (!dateStr) return '—';
  const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getDate()}-${months[d.getMonth()]}, ${days[d.getDay()]}`;
}

/** Ish kuni uchun 09:00–19:30 oralig'ida 30 daqiqalik slotlar ro'yxati */
export function generateDaySlots() {
  const slots = [];
  for (let h = 9; h < 20; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}
