// ===========================================================================
// SAVATCHA STATE (HOLAT) BOSHQARUVI
// ---------------------------------------------------------------------------
// Oddiy pub/sub pattern: cart ma'lumotlari shu yerda saqlanadi, holat
// o'zgarganda barcha obuna bo'lgan (subscribe qilingan) UI funksiyalari
// avtomatik xabardor qilinadi. Bu UI kodini state mantig'idan ajratadi.
// ===========================================================================

import { getProductById } from '../data/products.js';
import { DELIVERY_CONFIG } from '../config/app.config.js';

let cart = {};              // { productId: qty }
let userCoords = null;      // { lat, lng } — geolokatsiya orqali olinadi
const listeners = new Set();

function notify() {
  listeners.forEach(fn => fn(getSnapshot()));
}

/** UI komponentlari shu funksiya orqali holat o'zgarishiga obuna bo'ladi */
export function subscribe(listenerFn) {
  listeners.add(listenerFn);
  return () => listeners.delete(listenerFn); // unsubscribe
}

export function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  notify();
}

export function increaseQty(id) {
  cart[id] = (cart[id] || 0) + 1;
  notify();
}

export function decreaseQty(id) {
  if (!cart[id]) return;
  cart[id] -= 1;
  if (cart[id] <= 0) delete cart[id];
  notify();
}

export function removeFromCart(id) {
  delete cart[id];
  notify();
}

export function clearCart() {
  cart = {};
  userCoords = null;
  notify();
}

export function setUserCoords(coords) {
  userCoords = coords;
}

export function getUserCoords() {
  return userCoords;
}

export function getCartItemsCount() {
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}

export function getCartEntries() {
  // [{ product, qty }]
  return Object.entries(cart).map(([id, qty]) => ({
    product: getProductById(id),
    qty,
  }));
}

export function getSubtotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = getProductById(id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
}

export function getDeliveryFee() {
  const subtotal = getSubtotal();
  if (subtotal === 0) return 0;
  return subtotal >= DELIVERY_CONFIG.freeDeliveryLimit ? 0 : DELIVERY_CONFIG.fee;
}

export function getGrandTotal() {
  return getSubtotal() + getDeliveryFee();
}

/** Buyurtma yuborish uchun Supabase'ga mos JSON items massivini tayyorlaydi */
export function buildOrderItemsPayload() {
  return getCartEntries().map(({ product, qty }) => ({
    product_id: product.id,
    name: product.name,
    price: product.price,
    qty,
    line_total: product.price * qty,
  }));
}

function getSnapshot() {
  return {
    entries: getCartEntries(),
    count: getCartItemsCount(),
    subtotal: getSubtotal(),
    delivery: getDeliveryFee(),
    total: getGrandTotal(),
  };
}
