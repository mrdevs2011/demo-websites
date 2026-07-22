import { supabaseClient } from './supabaseClient.js';

// supabase/schema.sql da yaratilgan haqiqiy jadval nomi — "orders"
// ("fastfood_orders" jadvali mavjud emas edi, shuning uchun checkout doim
// "relation does not exist" xatosi bilan yiqilardi).
const TABLE = 'orders';

/**
 * Buyurtmani Supabase "orders" jadvaliga saqlaydi.
 * `order` obyekti checkout.js'dagi buildOrderPayload() natijasi bo'lib,
 * ustun nomlari schema.sql bilan bir xil: customer_name, customer_phone,
 * address, comment, latitude, longitude, items, subtotal, delivery_fee,
 * total, status, created_at.
 *
 * Eslatma: anon kalitda faqat INSERT huquqi bor (SELECT yo'q), shuning
 * uchun .select() bilan qaytgan qatorni o'qib bo'lmaydi — shu sababli
 * saqlangan payloadning o'zini qaytaramiz.
 */
export async function saveOrder(order) {
  const { error } = await supabaseClient.from(TABLE).insert([order]);

  if (error) throw new Error(`Supabase xatoligi: ${error.message}`);

  return order;
}
