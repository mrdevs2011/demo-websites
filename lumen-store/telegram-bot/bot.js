/* =========================================================================
   bot.js — LUMEN Telegram bot namunasi
   -------------------------------------------------------------------------
   Xaridor saytdagi "Telegramga o'tish" tugmasini bosganda quyidagi
   ko'rinishdagi linkka yo'naltiriladi:

       https://t.me/dokon_bot?start=order_abc123_x9f2k

   Bot /start buyrug'ini order_code payload bilan qabul qiladi, shu kod
   bo'yicha Supabase'dan buyurtma va mijoz ma'lumotlarini o'qiydi, so'ng
   xaridorga tasdiqlash xabarini va do'kon egasiga (ADMIN_CHAT_ID) bildirishnoma
   yuboradi.

   Ishga tushirish:
     1) npm install   (shu papka ichida)
     2) .env faylini .env.example asosida to'ldiring
     3) node bot.js
   ========================================================================= */

require('dotenv').config();
const { Telegraf } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');

const {
  BOT_TOKEN,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  ADMIN_CHAT_ID
} = process.env;

if (!BOT_TOKEN || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Xatolik: .env faylida BOT_TOKEN, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY to\'ldirilishi shart.');
  process.exit(1);
}

// Diqqat: bot tomonida SERVICE ROLE kalitidan foydalaniladi (RLS'ni chetlab
// o'tadi), chunki bot serverda ishlaydi va bu kalit hech qachon frontendga
// chiqarilmasligi kerak.
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const bot = new Telegraf(BOT_TOKEN);

function formatItems(items) {
  return items
    .map(i => `• ${i.name} (${i.size}) x${i.qty} — ${Number(i.price * i.qty).toLocaleString('uz-UZ')} so'm`)
    .join('\n');
}

bot.start(async (ctx) => {
  const payload = ctx.startPayload; // "order_abc123_x9f2k"

  if (!payload) {
    return ctx.reply(
      "Salom! 👋 LUMEN do'koni botiga xush kelibsiz.\n" +
      "Saytdan buyurtma berganingizda siz avtomatik shu yerga yo'naltirilasiz."
    );
  }

  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select('*, customers(*)')
      .eq('order_code', payload)
      .single();

    if (error || !order) {
      return ctx.reply("Kechirasiz, bu buyurtma topilmadi. Iltimos, qaytadan urinib ko'ring yoki qo'llab-quvvatlash xizmatiga murojaat qiling.");
    }

    const customer = order.customers;

    await ctx.reply(
      `✅ Buyurtmangiz qabul qilindi!\n\n` +
      `🧾 Buyurtma raqami: ${order.order_code}\n` +
      `👤 ${customer.full_name}\n` +
      `📞 ${customer.phone}\n` +
      (customer.address ? `📍 ${customer.address}\n` : '') +
      `\n🛍 Mahsulotlar:\n${formatItems(order.items)}\n\n` +
      `💰 Jami: ${Number(order.total).toLocaleString('uz-UZ')} so'm\n\n` +
      `Operatorimiz tez orada siz bilan bog'lanadi.`
    );

    // Do'kon egasiga (admin) bildirishnoma
    if (ADMIN_CHAT_ID) {
      await bot.telegram.sendMessage(
        ADMIN_CHAT_ID,
        `🆕 Yangi buyurtma: ${order.order_code}\n` +
        `👤 ${customer.full_name} | 📞 ${customer.phone}\n` +
        `${formatItems(order.items)}\n` +
        `💰 Jami: ${Number(order.total).toLocaleString('uz-UZ')} so'm`
      );
    }

    // Buyurtma holatini yangilash
    await supabase.from('orders').update({ status: 'confirmed' }).eq('order_code', payload);

  } catch (err) {
    console.error(err);
    ctx.reply("Texnik xatolik yuz berdi. Birozdan so'ng qaytadan urinib ko'ring.");
  }
});

bot.launch();
console.log('LUMEN Telegram bot ishga tushdi ✅');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
