import { SUPABASE_URL, SUPABASE_ANON_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from './config.js';

let supabaseClient = null;

export function initSupabase() {
  try {
    if (window.supabase && SUPABASE_URL.startsWith('https://') && !SUPABASE_URL.includes('YOUR-PROJECT-REF')) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
  } catch (e) {
    console.warn('Supabase init xatosi:', e);
  }
  return supabaseClient;
}

/**
 * Telegram bot orqali adminga bron haqida xabar yuboradi.
 * config.js'da TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID to'ldirilmagan bo'lsa
 * jim o'tkazib yuboriladi (xatolik tashlamaydi).
 */
async function notifyTelegram(row) {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN.includes('YOUR_TELEGRAM') ||
      !TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID.includes('YOUR_TELEGRAM')) {
    console.warn('Telegram sozlanmagan (config.js): bildirishnoma yuborilmadi.');
    return;
  }

  const text =
    `💇 <b>YANGI BRON!</b>\n\n` +
    `👤 <b>Mijoz:</b> ${row.client_name}\n` +
    `📞 <b>Telefon:</b> ${row.client_phone}\n` +
    `💅 <b>Xizmat:</b> ${row.service_name}\n` +
    `🧑‍🎨 <b>Usta:</b> ${row.master_name}\n` +
    `📅 <b>Sana:</b> ${row.booking_date} ${row.booking_time}\n` +
    `💰 <b>Narx:</b> ${Number(row.price).toLocaleString('uz-UZ')} so'm\n` +
    `⏱ <b>Davomiyligi:</b> ${row.duration} daqiqa`;

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
    });
    const result = await res.json();
    if (!result.ok) console.warn('Telegram xabari yuborilmadi:', result.description);
  } catch (err) {
    console.warn("Telegram API bilan bog'lanishda xatolik:", err);
  }
}

/**
 * Berilgan usta va sana uchun band bo'lgan vaqtlarni Supabase'dan
 * (xavfsiz `booked_slots` view orqali) o'qib keladi.
 * @returns {Promise<string[]>} band vaqtlar ro'yxati, masalan ["10:00","14:30"]
 */
export async function fetchBookedSlots(masterId, date) {
  if (!supabaseClient) return [];
  const { data, error } = await supabaseClient
    .from('booked_slots')
    .select('booking_time')
    .eq('master_id', masterId)
    .eq('booking_date', date);

  if (error) {
    console.warn("Band vaqtlarni o'qishda xatolik:", error.message);
    return [];
  }
  return data.map(r => r.booking_time);
}

/**
 * Bron ma'lumotlarini Supabase 'bookings' jadvaliga saqlaydi
 * (README/config.js'dagi SQL sxema bilan bir xil jadval va ustun nomlari).
 * @param {object} payload - { service, master, date, time, name, phone }
 */
export async function submitBookingToBackend({ service, master, date, time, name, phone }) {
  const row = {
    service_id: service.id,
    service_name: service.name,
    master_id: master.id,
    master_name: master.name,
    booking_date: date,
    booking_time: time,
    client_name: name,
    client_phone: phone,
    price: service.price,
    duration: service.duration,
  };

  if (!supabaseClient) {
    console.warn("Supabase ulanmagan (demo rejim). Ma'lumotlar faqat konsolga chiqarildi:", row);
    await notifyTelegram(row);
    return row;
  }

  const { error } = await supabaseClient.from('bookings').insert([row]);
  if (error) {
    // Postgres unique constraint xatosi (kod 23505) — demak shu vaqtga
    // ayni damda boshqa kimdir ulgurib bron qilib qo'ygan.
    if (error.code === '23505') {
      throw new Error("Kechirasiz, bu vaqt hozirgina band qilindi. Iltimos, boshqa vaqtni tanlang.");
    }
    throw new Error('Supabase xatosi: ' + error.message);
  }

  await notifyTelegram(row);

  return row;
}
