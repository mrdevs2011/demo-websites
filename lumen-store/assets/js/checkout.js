window.App = window.App || {};

App.openCheckout = function () {
  if (App.state.cart.length === 0) return;
  document.getElementById('checkoutModal').classList.add('open');
};

App.closeCheckout = function () {
  document.getElementById('checkoutModal').classList.remove('open');
  const statusEl = document.getElementById('orderStatus');
  statusEl.textContent = '';
  statusEl.className = 'status-msg';
};

App.generateOrderCode = function () {
  const rand = Math.random().toString(36).slice(2, 8);
  const ts = Date.now().toString(36);
  return `order_${ts}_${rand}`;
};

App.initCheckout = function () {
  document.getElementById('checkoutBtn').addEventListener('click', App.openCheckout);
  document.getElementById('cancelCheckout').addEventListener('click', App.closeCheckout);

  document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitOrderBtn');
    const submitText = document.getElementById('submitOrderText');
    const statusEl = document.getElementById('orderStatus');

    const full_name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();

    submitBtn.disabled = true;
    submitText.innerHTML = '<span class="spinner"></span>';
    statusEl.className = 'status-msg';
    statusEl.textContent = '';

    const orderCode = App.generateOrderCode();
    const items = App.state.cart.map(i => ({
      id: i.productId,
      name: i.name,
      size: i.size,
      qty: i.qty,
      price: i.price,
    }));
    const total = App.cartTotal();

    try {
      if (App.supabase) {
        // Mijoz id'sini oldindan generatsiya qilamiz — anon kalitda faqat
        // INSERT huquqi bor (SELECT yo'q), shuning uchun .select() bilan
        // qaytgan qatorni o'qib bo'lmaydi.
        const customerId = crypto.randomUUID();

        // 1) Mijozni customers jadvaliga yozamiz
        const { error: customerError } = await App.supabase
          .from('customers')
          .insert({ id: customerId, full_name, phone, address: address || null });
        if (customerError) throw customerError;

        // 2) Buyurtmani orders jadvaliga yozamiz (bot shu jadvaldan o'qiydi)
        const { error: orderError } = await App.supabase
          .from('orders')
          .insert({
            order_code: orderCode,
            customer_id: customerId,
            items,
            total,
            status: 'new',
          });
        if (orderError) throw orderError;
      } else {
        console.warn('[LUMEN] Supabase ulanmagan: config.js faylida sozlamalarni tekshiring.');
      }

      statusEl.textContent = "Buyurtma qabul qilindi! Telegram botga yo'naltirilmoqda...";
      statusEl.classList.add('success');

      const telegramLink = `https://t.me/${window.APP_CONFIG.TELEGRAM_BOT_USERNAME}?start=${orderCode}`;
      setTimeout(() => {
        window.open(telegramLink, '_blank');
        App.state.cart = [];
        App.renderCart();
        App.closeCheckout();
        App.closeCart();
        e.target.reset();
      }, 900);

    } catch (err) {
      console.error(err);
      statusEl.textContent = "Xatolik yuz berdi. Supabase sozlamalarini tekshiring.";
      statusEl.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitText.textContent = "Telegramga o'tish";
    }
  });
};
