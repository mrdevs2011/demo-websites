// ===========================================================================
// CHECKOUT MODAL — FORMA, GEOLOKATSIYA VA BUYURTMANI YAKUNLASH OQIMI
// ---------------------------------------------------------------------------
// Bu modul UI hodisalarini tinglaydi va ish jarayonini orkestratsiya qiladi:
//   1) formani tekshiradi,
//   2) cartStore'dan items JSON'ini oladi,
//   3) ordersService orqali Supabase'ga saqlaydi,
//   4) telegramService orqali adminga xabar yuboradi,
//   5) UI'ni tozalaydi va foydalanuvchiga natijani ko'rsatadi.
// ===========================================================================

import {
  getCartItemsCount, getSubtotal, getDeliveryFee, getGrandTotal,
  buildOrderItemsPayload, setUserCoords, getUserCoords, clearCart,
} from '../state/cartStore.js';
import { closeCart } from './cart.js';
import { showToast } from './toast.js';
import { saveOrder } from '../services/ordersService.js';
import { sendTelegramNotification } from '../services/telegramService.js';

const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutModal = document.getElementById('checkoutModal');
const orderForm = document.getElementById('orderForm');
const submitBtn = document.getElementById('submitOrderBtn');
const geoStatus = document.getElementById('geoStatus');
const successCard = document.getElementById('orderSuccessCard');

function openCheckout() {
  if (getCartItemsCount() === 0) {
    showToast("Avval savatchaga mahsulot qo'shing", 'error');
    return;
  }
  closeCart();
  checkoutOverlay.classList.remove('opacity-0', 'pointer-events-none');
  requestAnimationFrame(() => {
    checkoutModal.classList.remove('opacity-0', 'scale-95');
  });
}

function closeCheckout() {
  checkoutModal.classList.add('opacity-0', 'scale-95');
  setTimeout(() => {
    checkoutOverlay.classList.add('opacity-0', 'pointer-events-none');
    // Keyingi safar ochilganda forma qaytadan ko'rinsin
    successCard.classList.add('hidden');
    orderForm.classList.remove('hidden');
  }, 200);
}

/**
 * Buyurtma muvaffaqiyatli qabul qilingach, forma o'rniga
 * "chek" uslubidagi vizual tasdiqlash kartasini ko'rsatadi.
 */
function showSuccessCard(order) {
  document.getElementById('scName').textContent = order.customer_name;
  document.getElementById('scPhone').textContent = order.customer_phone;
  document.getElementById('scAddress').textContent = order.address;

  document.getElementById('scItems').innerHTML = order.items.map(i =>
    `<div class="flex justify-between"><span class="text-char-900/80">${i.name} <span class="text-char-900/40">×${i.qty}</span></span><span class="font-semibold text-char-900">${Number(i.line_total).toLocaleString('uz-UZ')} so'm</span></div>`
  ).join('');

  document.getElementById('scSubtotal').textContent = `${Number(order.subtotal).toLocaleString('uz-UZ')} so'm`;
  document.getElementById('scDelivery').textContent = `${Number(order.delivery_fee).toLocaleString('uz-UZ')} so'm`;
  document.getElementById('scTotal').textContent = `${Number(order.total).toLocaleString('uz-UZ')} so'm`;

  orderForm.classList.add('hidden');
  successCard.classList.remove('hidden');
}

function initGeolocation() {
  document.getElementById('geoLocateBtn').addEventListener('click', () => {
    if (!navigator.geolocation) {
      geoStatus.textContent = "Brauzeringiz geolokatsiyani qo'llab-quvvatlamaydi";
      return;
    }
    geoStatus.textContent = "Joylashuv aniqlanmoqda...";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserCoords(coords);
        document.getElementById('custAddress').value =
          `Geolokatsiya: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
        geoStatus.textContent = "✅ Joylashuv muvaffaqiyatli aniqlandi";
      },
      (err) => {
        geoStatus.textContent = "❌ Joylashuvni aniqlab bo'lmadi: " + err.message;
      }
    );
  });
}

function readFormValues() {
  return {
    name: document.getElementById('custName').value.trim(),
    phone: document.getElementById('custPhone').value.trim(),
    address: document.getElementById('custAddress').value.trim(),
    comment: document.getElementById('custComment').value.trim(),
  };
}

function buildOrderPayload({ name, phone, address, comment }) {
  const coords = getUserCoords();
  const subtotal = getSubtotal();
  const delivery = getDeliveryFee();

  return {
    customer_name: name,
    customer_phone: phone,
    address,
    comment: comment || null,
    latitude: coords ? coords.lat : null,
    longitude: coords ? coords.lng : null,
    items: buildOrderItemsPayload(), // JSONB ustunga saqlanadi
    subtotal,
    delivery_fee: delivery,
    total: subtotal + delivery,
    status: 'new',
    created_at: new Date().toISOString(),
  };
}

async function handleSubmit(e) {
  e.preventDefault();

  const values = readFormValues();
  if (!values.name || !values.phone || !values.address) {
    showToast("Iltimos, barcha majburiy maydonlarni to'ldiring", 'error');
    return;
  }

  const orderPayload = buildOrderPayload(values);

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yuborilmoqda...';

  try {
    // 1) Supabase "orders" jadvaliga saqlash
    const savedOrder = await saveOrder(orderPayload);

    // 2) Telegram botga bildirishnoma yuborish
    await sendTelegramNotification(savedOrder);

    // 3) UI'ni tozalash va vizual tasdiqlash kartasini ko'rsatish
    clearCart();
    orderForm.reset();
    geoStatus.textContent = '';
    showSuccessCard(savedOrder);
  } catch (err) {
    console.error("Buyurtmani saqlashda xatolik:", err);
    showToast("Xatolik yuz berdi. Qaytadan urinib ko'ring", 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Buyurtmani tasdiqlash';
  }
}

export function initCheckout() {
  document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
  document.getElementById('checkoutCloseBtn').addEventListener('click', closeCheckout);
  document.getElementById('closeSuccessCard').addEventListener('click', closeCheckout);
  checkoutOverlay.addEventListener('click', (e) => {
    if (e.target === checkoutOverlay) closeCheckout();
  });

  initGeolocation();
  orderForm.addEventListener('submit', handleSubmit);
}
