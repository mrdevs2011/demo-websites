// ===========================================================================
// TELEGRAM BOT SERVISI
// ---------------------------------------------------------------------------
// Buyurtma Supabase'ga saqlangach, shu servis restoran adminining
// Telegramiga xabar yuboradi (Telegram Bot API -> sendMessage).
//
// SOZLASH QADAMLARI:
//   1. Telegram'da @BotFather bilan suhbatlashib, "/newbot" buyrug'i orqali
//      yangi bot yarating -> sizga BOT_TOKEN beriladi.
//   2. Adminning yoki guruhning chat_id sini aniqlang:
//        - Shaxsiy chat uchun: @userinfobot ga /start yozing.
//        - Guruh uchun: botni guruhga qo'shing, bir xabar yozing, so'ng
//          https://api.telegram.org/bot<TOKEN>/getUpdates orqali
//          "chat":{"id": ...} qiymatini oling.
//   3. js/config/app.config.js faylidagi TELEGRAM_CONFIG ni to'ldiring.
//
// XAVFSIZLIK ESLATMASI:
//   Production muhitda BOT_TOKEN ni frontendda saqlamang — buni har kim
//   ko'ra oladi va botingizdan foydalanishi mumkin. Buning o'rniga:
//     - Supabase Edge Function yarating (masalan "notify-telegram"),
//     - Frontend faqat shu Edge Function'ni chaqirsin,
//     - BOT_TOKEN Edge Function ichida "sir" (secret) sifatida saqlansin.
//   Bu faylda oddiy fetch() usuli faqat o'quv/demo maqsadida ko'rsatilgan.
// ===========================================================================

import { TELEGRAM_CONFIG } from '../config/app.config.js';

/**
 * Buyurtma tafsilotlarini o'qish uchun qulay HTML-formatdagi matnga aylantiradi.
 */
function buildOrderMessage(order) {
  const itemsText = order.items
    .map(i => `• ${i.name} x${i.qty} — ${i.line_total.toLocaleString('uz-UZ')} so'm`)
    .join('\n');

  return (
`🔥 <b>YANGI BUYURTMA!</b>

👤 <b>Mijoz:</b> ${order.customer_name}
📞 <b>Telefon:</b> ${order.customer_phone}
📍 <b>Manzil:</b> ${order.address}
${order.comment ? `📝 <b>Izoh:</b> ${order.comment}\n` : ''}
🧾 <b>Buyurtma tarkibi:</b>
${itemsText}

💰 <b>Mahsulotlar:</b> ${order.subtotal.toLocaleString('uz-UZ')} so'm
🚚 <b>Yetkazib berish:</b> ${order.delivery_fee.toLocaleString('uz-UZ')} so'm
💵 <b>Jami:</b> ${order.total.toLocaleString('uz-UZ')} so'm`
  );
}

/**
 * Telegram Bot API orqali admin chatiga buyurtma haqida xabar yuboradi.
 * Xatolik yuz bersa, ishni to'xtatmaydi — faqat konsolga log yozadi, chunki
 * buyurtma allaqachon Supabase'da saqlangan bo'ladi.
 * @param {Object} order - saqlangan buyurtma obyekti
 */
export async function sendTelegramNotification(order) {
  const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.adminChatId,
        text: buildOrderMessage(order),
        parse_mode: "HTML",
      }),
    });

    const result = await response.json();
    if (!result.ok) {
      console.warn("Telegram xabari yuborilmadi:", result.description);
    }
    return result;
  } catch (err) {
    console.warn("Telegram API bilan bog'lanishda xatolik:", err);
    // Ixtiyoriy: bu yerda buyurtmani "telegram_notified: false" deb
    // belgilab, keyinroq qayta yuborish uchun navbat (queue) yaratish mumkin.
  }
}
