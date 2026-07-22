/* =========================================================================
   state.js
   -------------------------------------------------------------------------
   Ilovaning umumiy holati (state) va yordamchi funksiyalar.
   Boshqa barcha fayllar shu App.state ob'ektidan foydalanadi.
   ========================================================================= */

window.App = window.App || {};

App.state = {
  search: '',
  category: 'all',
  sort: 'default',
  selectedSizes: {},   // { productId: 'M' }
  cart: []             // { productId, name, size, qty, price, img }
};

App.formatSum = function (n) {
  return n.toLocaleString('uz-UZ') + " so'm";
};
