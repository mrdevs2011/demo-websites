// ===========================================================================
// ILOVA KIRISH NUQTASI (ENTRY POINT)
// ---------------------------------------------------------------------------
// Bu fayl barcha UI modullarini import qilib, sahifa yuklangach ularni
// ishga tushiradi. Boshqa hech qanday biznes-mantiq shu yerda yozilmaydi —
// faqat "orkestratsiya" (bog'lash) vazifasini bajaradi.
// ===========================================================================

import { renderProducts, initCategoryFilter } from './ui/products.js';
import { initCart } from './ui/cart.js';
import { initCheckout } from './ui/checkout.js';

function initApp() {
  renderProducts();      // Mahsulotlar to'rini birinchi marta chizish
  initCategoryFilter();  // Kategoriya tugmalarini faollashtirish
  initCart();             // Savatcha panelini va uning state-obunasini ishga tushirish
  initCheckout();         // Checkout modal va buyurtma yuborish oqimini ulash
}

document.addEventListener('DOMContentLoaded', initApp);
