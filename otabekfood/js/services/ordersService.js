import { supabaseClient } from './supabaseClient.js';
import { SUPABASE_CONFIG } from '../config/app.config.js';

// E'TIBOR: agar bitta Supabase loyihasi bir nechta demo-sayt orasida
// bo'lishilsa (masalan _supabase_setup/combined_schema.sql orqali),
// "orders" nomi lumen-store'ning o'z jadvali bilan to'qnashadi — shu
// sababli jadval nomi endi config.js (SUPABASE_CONFIG.ordersTable) dan
// olinadi, hardcoded emas.
const TABLE = SUPABASE_CONFIG.ordersTable;

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
