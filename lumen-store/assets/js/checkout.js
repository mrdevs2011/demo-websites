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
  // Karta ko'rsatilgan bo'lsa, formani qaytadan ko'rsatamiz (keyingi ochilishga tayyorlab)
  document.getElementById('orderSuccessCard').style.display = 'none';
  document.getElementById('checkoutForm').style.display = '';
};

/**
 * Buyurtma muvaffaqiyatli qabul qilingach, forma o'rniga vizual
 * tasdiqlash kartasini to'ldirib ko'rsatadi.
 */
App.showSuccessCard = function ({ orderCode, full_name, phone, address, items, total }) {
  document.getElementById('scOrderCode').textContent = orderCode;
  document.getElementById('scName').textContent = full_name;
  document.getElementById('scPhone').textContent = phone;

  const addressRow = document.getElementById('scAddressRow');
  if (address) {
    document.getElementById('scAddress').textContent = address;
    addressRow.style.display = '';
  } else {
    addressRow.style.display = 'none';
  }

  document.getElementById('scItems').innerHTML = items.map(i =>
    `<div class="sc-item"><span class="name">${i.name} <span style="color:var(--muted)">(${i.size}) ×${i.qty}</span></span><span class="price">${Number(i.price * i.qty).toLocaleString('uz-UZ')} so'm</span></div>`
  ).join('');

  document.getElementById('scTotal').textContent = `${Number(total).toLocaleString('uz-UZ')} so'm`;

  document.getElementById('checkoutForm').style.display = 'none';
  document.getElementById('orderSuccessCard').style.display = 'block';
};

App.generateOrderCode = function () {
  const rand = Math.random().toString(36).slice(2, 8);
  const ts = Date.now().toString(36);
  return `order_${ts}_${rand}`;
};

App.formatOrderItems = function (items) {
  return items
    .map(i => `▫️ ${i.name} <i>(${i.size})</i> × ${i.qty} — <b>${Number(i.price * i.qty).toLocaleString('uz-UZ')} so'm</b>`)
    .join('\n');
};

/**
 * Telegram bot orqali adminga yangi buyurtma haqida xabar yuboradi.
 * config.js'da TELEGRAM_BOT_TOKEN / ADMIN_CHAT_ID to'ldirilmagan bo'lsa
 * jim o'tkazib yuboriladi (xatolik tashlamaydi).
 */
App.notifyTelegram = async function ({ orderCode, full_name, phone, address, items, total }) {
  const cfg = window.APP_CONFIG;
  if (!cfg.TELEGRAM_BOT_TOKEN || !cfg.ADMIN_CHAT_ID) {
    console.warn('[LUMEN] Telegram sozlanmagan: bildirishnoma yuborilmadi.');
    return;
  }

  const text =
    `🆕 <b>YANGI BUYURTMA</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `🧾 <b>Raqami:</b> <code>${orderCode}</code>\n` +
    `👤 <b>Mijoz:</b> ${full_name}\n` +
    `📞 <b>Telefon:</b> <a href="tel:${phone}">${phone}</a>\n` +
    (address ? `📍 <b>Manzil:</b> ${address}\n` : '') +
    `\n🛍 <b>Mahsulotlar:</b>\n${App.formatOrderItems(items)}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `💰 <b>Jami:</b> ${Number(total).toLocaleString('uz-UZ')} so'm`;

  try {
    const url = `https://api.telegram.org/bot${cfg.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: cfg.ADMIN_CHAT_ID, text, parse_mode: 'HTML' }),
    });
    const result = await res.json();
    if (!result.ok) console.warn('[LUMEN] Telegram xabari yuborilmadi:', result.description);
  } catch (err) {
    console.warn('[LUMEN] Telegram API bilan bog\'lanishda xatolik:', err);
  }
};

App.initCheckout = function () {
  document.getElementById('checkoutBtn').addEventListener('click', App.openCheckout);
  document.getElementById('cancelCheckout').addEventListener('click', App.closeCheckout);
  document.getElementById('closeSuccessCard').addEventListener('click', App.closeCheckout);

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

        // 2) Buyurtmani orders jadvaliga yozamiz
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

      // Adminga to'g'ridan-to'g'ri saytdan Telegram xabari yuboriladi —
      // alohida bot-server (node bot.js) ishlab turishi shart emas.
      await App.notifyTelegram({ orderCode, full_name, phone, address, items, total });

      App.showSuccessCard({ orderCode, full_name, phone, address, items, total });

      App.state.cart = [];
      App.renderCart();
      e.target.reset();
      App.closeCart();

    } catch (err) {
      console.error(err);
      statusEl.textContent = "Xatolik yuz berdi. Supabase sozlamalarini tekshiring.";
      statusEl.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitText.textContent = "Buyurtma berish";
    }
  });
};
