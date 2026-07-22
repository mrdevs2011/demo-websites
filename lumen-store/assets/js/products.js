/* =========================================================================
   products.js
   -------------------------------------------------------------------------
   Mahsulotlar katalogini render qilish, qidiruv, kategoriya filtri va
   narx bo'yicha saralash mantiqi.
   ========================================================================= */

window.App = window.App || {};

App.getFilteredProducts = function () {
  const state = App.state;
  let list = App.PRODUCTS.filter(p => {
    const matchCat = state.category === 'all' || p.cat === state.category;
    const matchSearch = p.name.toLowerCase().includes(state.search.toLowerCase());
    return matchCat && matchSearch;
  });
  if (state.sort === 'asc') list = list.slice().sort((a, b) => a.price - b.price);
  if (state.sort === 'desc') list = list.slice().sort((a, b) => b.price - a.price);
  return list;
};

App.renderProducts = function () {
  const grid = document.getElementById('productGrid');
  const list = App.getFilteredProducts();
  document.getElementById('resultsCount').textContent = `${list.length} ta mahsulot topildi`;

  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state"><h4>Hech narsa topilmadi</h4><p>Boshqa nom bilan qidirib ko'ring yoki filtrni tozalang.</p></div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
    const selectedSize = App.state.selectedSizes[p.id];
    return `
      <div class="card" data-id="${p.id}">
        <div class="card-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          ${discount ? `<div class="badge-sale">-${discount}%</div>` : ''}
          <div class="badge-cat">${p.cat}</div>
        </div>
        <div class="card-body">
          <div class="card-title">${p.name}</div>
          <div class="card-sizes">
            ${App.SIZES.map(s => `<button class="size-chip ${selectedSize === s ? 'selected' : ''}" data-size="${s}" data-pid="${p.id}">${s}</button>`).join('')}
          </div>
          <div class="card-price-row">
            <span class="price-now">${App.formatSum(p.price)}</span>
            ${p.oldPrice ? `<span class="price-old">${App.formatSum(p.oldPrice)}</span>` : ''}
          </div>
          <button class="add-btn" data-pid="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L4 3H2"/></svg>
            Savatga qo'shish
          </button>
        </div>
      </div>`;
  }).join('');

  grid.querySelectorAll('.size-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = Number(btn.dataset.pid);
      App.state.selectedSizes[pid] = btn.dataset.size;
      App.renderProducts();
    });
  });

  grid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => App.addToCart(Number(btn.dataset.pid)));
  });
};

App.initProductFilters = function () {
  document.getElementById('searchInput').addEventListener('input', (e) => {
    App.state.search = e.target.value;
    App.renderProducts();
  });
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    App.state.sort = e.target.value;
    App.renderProducts();
  });
  document.getElementById('catTabs').addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    document.querySelectorAll('#catTabs button').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    App.state.category = e.target.dataset.cat;
    App.renderProducts();
  });
};
