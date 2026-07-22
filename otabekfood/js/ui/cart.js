// ===========================================================================
// SAVATCHA DRAWER UI KOMPONENTI
// ---------------------------------------------------------------------------
// cartStore'dagi o'zgarishlarga obuna bo'ladi (subscribe) va har safar holat
// yangilanganda ekranni qayta chizadi (render).
// ===========================================================================

import { formatSom } from '../utils/format.js';
import {
  subscribe, increaseQty, decreaseQty, removeFromCart, getCartItemsCount,
} from '../state/cartStore.js';

const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsEl = document.getElementById('cartItems');
const cartEmptyMsg = document.getElementById('cartEmptyMsg');
const cartCountEl = document.getElementById('cartCount');

function renderCartItem({ product, qty }) {
  return `
    <div class="flex items-center gap-3 bg-white/60 rounded-xl p-3">
      <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-chili-600 flex items-center justify-center text-white shrink-0">
        <i class="fa-solid ${product.icon}"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-sm text-char-900 truncate">${product.name}</p>
        <p class="text-xs text-char-900/50">${formatSom(product.price)}</p>
      </div>
      <div class="flex items-center gap-2">
        <button data-dec="${product.id}" class="w-7 h-7 rounded-full bg-char-900/10 hover:bg-char-900/20 flex items-center justify-center text-xs">
          <i class="fa-solid fa-minus"></i>
        </button>
        <span class="w-5 text-center text-sm font-semibold">${qty}</span>
        <button data-inc="${product.id}" class="w-7 h-7 rounded-full bg-char-900/10 hover:bg-char-900/20 flex items-center justify-center text-xs">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <button data-remove="${product.id}" class="w-7 h-7 rounded-full text-chili-600 hover:bg-chili-600/10 flex items-center justify-center ml-1">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;
}

function renderCart(snapshot) {
  // Badge
  cartCountEl.textContent = snapshot.count;
  cartCountEl.classList.remove('badge-pop');
  void cartCountEl.offsetWidth; // reflow — animatsiyani qayta ishga tushirish
  cartCountEl.classList.add('badge-pop');

  // Items ro'yxati
  if (snapshot.entries.length === 0) {
    cartItemsEl.innerHTML = '';
    cartEmptyMsg.classList.remove('hidden');
  } else {
    cartEmptyMsg.classList.add('hidden');
    cartItemsEl.innerHTML = snapshot.entries.map(renderCartItem).join('');

    cartItemsEl.querySelectorAll('[data-dec]').forEach(b =>
      b.addEventListener('click', () => decreaseQty(Number(b.dataset.dec))));
    cartItemsEl.querySelectorAll('[data-inc]').forEach(b =>
      b.addEventListener('click', () => increaseQty(Number(b.dataset.inc))));
    cartItemsEl.querySelectorAll('[data-remove]').forEach(b =>
      b.addEventListener('click', () => removeFromCart(Number(b.dataset.remove))));
  }

  // Summalar (savatcha paneli)
  document.getElementById('cartSubtotal').textContent = formatSom(snapshot.subtotal);
  document.getElementById('cartDelivery').textContent = snapshot.delivery === 0 ? "Bepul" : formatSom(snapshot.delivery);
  document.getElementById('cartTotal').textContent = formatSom(snapshot.total);

  // Summalar (checkout modal ichidagi qisqacha xulosa)
  document.getElementById('modalSubtotal').textContent = formatSom(snapshot.subtotal);
  document.getElementById('modalDelivery').textContent = snapshot.delivery === 0 ? "Bepul" : formatSom(snapshot.delivery);
  document.getElementById('modalTotal').textContent = formatSom(snapshot.total);
}

export function openCart() {
  cartDrawer.classList.remove('translate-x-full');
  cartOverlay.classList.remove('opacity-0', 'pointer-events-none');
  cartOverlay.classList.add('opacity-100');
}

export function closeCart() {
  cartDrawer.classList.add('translate-x-full');
  cartOverlay.classList.add('opacity-0', 'pointer-events-none');
  cartOverlay.classList.remove('opacity-100');
}

export function initCart() {
  document.getElementById('cartOpenBtn').addEventListener('click', openCart);
  document.getElementById('cartCloseBtn').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // cartStore holati o'zgarganda avtomatik qayta chizish
  subscribe(renderCart);
}

export { getCartItemsCount };
