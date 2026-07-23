// ===========================================================================
// MAHSULOTLAR GRID VA KATEGORIYA FILTRI
// ===========================================================================

import { getProductsByCategory } from '../data/products.js';
import { formatSom } from '../utils/format.js';
import { addToCart } from '../state/cartStore.js';
import { showToast } from './toast.js';

let currentCategory = 'all';

function renderProductCard(p) {
  return `
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group border border-char-900/5">
      <div class="w-full h-36 overflow-hidden bg-amber-100">
        <img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" referrerpolicy="no-referrer" onerror="this.onerror=null;this.closest('.h-36').innerHTML='<div class=\\'w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-chili-600 text-white text-3xl\\'><i class=\\'fa-solid ${p.icon}\\'></i></div>';">
      </div>
      <div class="p-5">
      <h3 class="font-display text-lg text-char-900">${p.name}</h3>
      <p class="text-char-900/50 text-sm mt-1 mb-4 min-h-[2.5rem]">${p.desc}</p>
      <div class="flex items-center justify-between">
        <span class="font-display text-xl text-chili-600">${formatSom(p.price)}</span>
        <button data-add="${p.id}" class="w-10 h-10 rounded-full bg-char-900 hover:bg-chili-600 text-white flex items-center justify-center transition">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      </div>
    </div>
  `;
}

export function renderProducts() {
  const grid = document.getElementById('productGrid');
  const filtered = getProductsByCategory(currentCategory);

  grid.innerHTML = filtered.map(renderProductCard).join('');

  grid.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.add);
      addToCart(id);
      const product = filtered.find(p => p.id === id);
      showToast(`${product.name} savatchaga qo'shildi`);
    });
  });
}

export function initCategoryFilter() {
  const bar = document.getElementById('categoryBar');
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    currentCategory = btn.dataset.cat;
    bar.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts();
  });
}
