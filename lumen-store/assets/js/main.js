/* =========================================================================
   main.js
   -------------------------------------------------------------------------
   Ilovaning kirish nuqtasi (entry point). Barcha modullar yuklangandan
   so'ng shu fayl ularni ishga tushiradi.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  App.initProductFilters();
  App.initCart();
  App.initSlider();
  App.initCheckout();

  App.renderProducts();
  App.renderCart();
});
