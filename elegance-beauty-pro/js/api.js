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
  if (error) throw new Error('Supabase xatosi: ' + error.message);

  await notifyTelegram(row);

  return row;
}
