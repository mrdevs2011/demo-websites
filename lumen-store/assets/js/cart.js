/* =========================================================================
   cart.js
   -------------------------------------------------------------------------
   Savat (cart drawer) bilan bog'liq barcha mantiq: qo'shish, miqdorni
   o'zgartirish, o'chirish, jamini hisoblash, ochish/yopish.
   ========================================================================= */

window.App = window.App || {};

App.addToCart = function (pid) {
  const product = App.PRODUCTS.find(p => p.id === pid);
  const size = App.state.selectedSizes[pid];
  if (!size) {
    alert("Iltimos, avval o'lchamni tanlang.");
    return;
  }
  const existing = App.state.cart.find(c => c.productId === pid && c.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    App.state.cart.push({ productId: pid, name: product.name, size, qty: 1, price: product.price, img: product.img });
  }
  App.renderCart();
  App.openCart();
};

App.changeQty = function (index, delta) {
  App.state.cart[index].qty += delta;
  if (App.state.cart[index].qty <= 0) App.state.cart.splice(index, 1);
  App.renderCart();
};

App.removeItem = function (index) {
  App.state.cart.splice(index, 1);
  App.renderCart();
};

App.cartTotal = function () {
  return App.state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
};

App.renderCart = function () {
  const itemsBox = document.getElementById('cartItems');
  const countEl = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  const totalQty = App.state.cart.reduce((s, i) => s + i.qty, 0);
  countEl.textContent = totalQty;

  if (App.state.cart.length === 0) {
    itemsBox.innerHTML = `<div class="drawer-empty">Savat bo'sh. Mahsulot tanlab qo'shing!</div>`;
    checkoutBtn.disabled = true;
  } else {
    itemsBox.innerHTML = App.state.cart.map((item, i) => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">O'lcham: ${item.size}</div>
          <div class="cart-item-row">
            <div class="qty-control">
              <button data-action="minus" data-i="${i}">−</button>
              <span>${item.qty}</span>
              <button data-action="plus" data-i="${i}">+</button>
            </div>
            <span class="cart-item-price">${App.formatSum(item.price * item.qty)}</span>
          </div>
          <button class="remove-btn" data-remove="${i}">O'chirish</button>
        </div>
      </div>
    `).join('');
    checkoutBtn.disabled = false;

    itemsBox.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => App.changeQty(Number(btn.dataset.i), btn.dataset.action === 'plus' ? 1 : -1));
    });
    itemsBox.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => App.removeItem(Number(btn.dataset.remove)));
    });
  }
  totalEl.textContent = App.formatSum(App.cartTotal());
};

App.openCart = function () {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
};
App.closeCart = function () {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
};

App.initCart = function () {
  document.getElementById('openCartBtn').addEventListener('click', App.openCart);
  document.getElementById('closeCartBtn').addEventListener('click', App.closeCart);
  document.getElementById('overlay').addEventListener('click', () => { App.closeCart(); App.closeCheckout(); });
};
