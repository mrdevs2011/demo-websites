// =============================================================================
// BOOKING: bron modali — qadamlar, slotlar, xulosa va yuborish
// =============================================================================
import { SERVICES, MASTERS, money, formatDateUz, generateDaySlots } from './data.js';
import { state, resetState, bookedSlotsCache } from './state.js';
import { submitBookingToBackend } from './api.js';

const modal = () => document.getElementById('bookingModal');

const stepLabels = {
  1: '1-qadam / 4 — Xizmat va usta',
  2: '2-qadam / 4 — Sana va vaqt',
  3: "3-qadam / 4 — Aloqa ma'lumotlari",
  4: '4-qadam / 4 — Tasdiqlash',
};

/* ---------------------------------------------------------------------------
   Ochish / yopish
--------------------------------------------------------------------------- */
export function openBooking(preselectServiceId) {
  modal().classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  resetState(preselectServiceId);

  renderModalServiceList();
  renderModalMasterList();
  goToStep(1);

  document.getElementById('bookingDate').value = '';
  document.getElementById('clientName').value = '';
  document.getElementById('clientPhone').value = '';

  const status = document.getElementById('submitStatus');
  status.classList.add('hidden');
  status.textContent = '';
}

export function closeBooking() {
  modal().classList.add('hidden');
  document.body.style.overflow = '';
}

/* ---------------------------------------------------------------------------
   1-qadam: Xizmat va usta ro'yxatlari
--------------------------------------------------------------------------- */
function renderModalServiceList() {
  const wrap = document.getElementById('modalServiceList');
  wrap.innerHTML = SERVICES.map(s => `
    <button type="button" data-service-id="${s.id}"
      class="service-opt text-left border rounded-xl px-4 py-3.5 transition-colors ${state.serviceId === s.id ? 'border-gold-500 bg-gold-500/10' : 'border-emerald-950/12 hover:border-emerald-950/30'}">
      <div class="flex items-center justify-between mb-1">
        <span class="font-semibold text-sm">${s.name}</span>
        <i class="fa-solid ${s.icon} text-emerald-800/50 text-sm"></i>
      </div>
      <div class="flex items-center gap-3 text-xs text-emerald-950/50 font-mono">
        <span>${s.duration} daq</span><span>•</span><span>${money(s.price)}</span>
      </div>
    </button>
  `).join('');

  wrap.querySelectorAll('[data-service-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.serviceId = btn.dataset.serviceId;
      renderModalServiceList();
      renderModalMasterList();
    });
  });
}

function renderModalMasterList() {
  const wrap = document.getElementById('modalMasterList');
  const relevant = state.serviceId ? MASTERS.filter(m => m.specialties.includes(state.serviceId)) : MASTERS;
  const list = relevant.length ? relevant : MASTERS;

  wrap.innerHTML = list.map(m => `
    <button type="button" data-master-id="${m.id}"
      class="master-opt text-center border rounded-xl p-3 transition-colors ${state.masterId === m.id ? 'border-gold-500 bg-gold-500/10' : 'border-emerald-950/12 hover:border-emerald-950/30'}">
      <img src="${m.img}" class="w-14 h-14 rounded-full object-cover mx-auto mb-2" alt="${m.name}">
      <div class="text-xs font-semibold leading-tight">${m.name.split(' ')[0]}</div>
    </button>
  `).join('');

  wrap.querySelectorAll('[data-master-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.masterId = btn.dataset.masterId;
      renderModalMasterList();
    });
  });
}

/* ---------------------------------------------------------------------------
   Qadamlar orasida yurish
--------------------------------------------------------------------------- */
function goToStep(n) {
  state.step = n;
  document.querySelectorAll('.booking-step').forEach(el => {
    el.classList.toggle('hidden', Number(el.dataset.step) !== n);
  });
  document.querySelectorAll('[data-step-dot]').forEach(dot => {
    const s = Number(dot.dataset.stepDot);
    dot.classList.toggle('bg-gold-500', s <= n);
    dot.classList.toggle('bg-emerald-950/10', s > n);
  });
  document.getElementById('stepLabel').textContent = stepLabels[n];
  document.getElementById('backBtn').classList.toggle('hidden', n === 1);
  document.getElementById('nextBtn').classList.toggle('hidden', n === 4);
  document.getElementById('confirmBtn').classList.toggle('hidden', n !== 4);

  if (n === 2) renderTimeSlots();
  if (n === 4) renderSummary();
}

function stepBack() {
  if (state.step > 1) goToStep(state.step - 1);
}

function stepNext() {
  if (state.step === 1) {
    if (!state.serviceId) return alert('Iltimos, xizmatni tanlang.');
    if (!state.masterId) return alert('Iltimos, ustani tanlang.');
  }
  if (state.step === 2) {
    const dateVal = document.getElementById('bookingDate').value;
    if (!dateVal) return alert('Iltimos, sanani tanlang.');
    if (!state.time) return alert("Iltimos, bo'sh vaqtni tanlang.");
    state.date = dateVal;
  }
  if (state.step === 3) {
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    if (!name) return alert('Iltimos, ismingizni kiriting.');
    if (phone.length < 7) return alert("Iltimos, to'g'ri telefon raqam kiriting.");
    state.name = name;
    state.phone = phone;
  }
  if (state.step < 4) goToStep(state.step + 1);
}

/* ---------------------------------------------------------------------------
   2-qadam: Vaqt slotlari
--------------------------------------------------------------------------- */
function renderTimeSlots() {
  const dateVal = document.getElementById('bookingDate').value;
  const wrap = document.getElementById('timeSlotWrap');

  if (!dateVal || !state.masterId) {
    wrap.innerHTML = `<p class="text-sm text-emerald-950/40">Avval sanani tanlang.</p>`;
    return;
  }
  state.date = dateVal;

  const key = `${state.masterId}_${dateVal}`;
  const booked = bookedSlotsCache[key] || [];
  const slots = generateDaySlots();

  wrap.innerHTML = slots.map(t => {
    const isBooked = booked.includes(t);
    const isSelected = state.time === t;
    return `<button type="button" data-time="${t}" ${isBooked ? 'disabled' : ''}
      class="slot-btn font-mono text-sm border rounded-lg px-3.5 py-2.5 ${isSelected ? 'selected' : 'border-emerald-950/15 hover:border-gold-500'}">
      ${t}
    </button>`;
  }).join('');

  wrap.querySelectorAll('[data-time]:not(:disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      state.time = btn.dataset.time;
      renderTimeSlots();
    });
  });
}

/* ---------------------------------------------------------------------------
   4-qadam: Xulosa (chipta)
--------------------------------------------------------------------------- */
function renderSummary() {
  const service = SERVICES.find(s => s.id === state.serviceId);
  const master = MASTERS.find(m => m.id === state.masterId);

  document.getElementById('sumService').textContent = service?.name || '—';
  document.getElementById('sumMaster').textContent = master ? `Usta: ${master.name}` : '—';
  document.getElementById('sumDate').textContent = formatDateUz(state.date);
  document.getElementById('sumTime').textContent = state.time || '—';
  document.getElementById('sumClient').textContent = state.name || '—';
  document.getElementById('sumPhone').textContent = state.phone || '—';
  document.getElementById('sumDuration').textContent = service ? `${service.duration} daqiqa` : '—';
  document.getElementById('sumPrice').textContent = service ? money(service.price) : '—';
}

/* ---------------------------------------------------------------------------
   Yuborish: Supabase + Telegram (api.js orqali)
--------------------------------------------------------------------------- */
async function submitBooking() {
  const service = SERVICES.find(s => s.id === state.serviceId);
  const master = MASTERS.find(m => m.id === state.masterId);
  const statusEl = document.getElementById('submitStatus');
  const confirmBtn = document.getElementById('confirmBtn');

  confirmBtn.disabled = true;
  confirmBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Yuborilmoqda...`;
  statusEl.classList.remove('hidden');
  statusEl.className = 'text-sm mb-2 text-emerald-950/60';
  statusEl.textContent = "Bron ma'lumotlari yuborilmoqda...";

  try {
    await submitBookingToBackend({
      service, master,
      date: state.date,
      time: state.time,
      name: state.name,
      phone: state.phone,
    });

    statusEl.className = 'text-sm mb-2 text-emerald-700 font-semibold';
    statusEl.innerHTML = `<i class="fa-solid fa-circle-check mr-1"></i> Bron muvaffaqiyatli qabul qilindi! Tez orada siz bilan bog'lanamiz.`;
    confirmBtn.innerHTML = `<i class="fa-solid fa-check mr-1"></i> Yuborildi`;

    const key = `${state.masterId}_${state.date}`;
    if (!bookedSlotsCache[key]) bookedSlotsCache[key] = [];
    bookedSlotsCache[key].push(state.time);

    setTimeout(closeBooking, 2200);
  } catch (err) {
    console.error(err);
    statusEl.className = 'text-sm mb-2 text-red-600 font-semibold';
    statusEl.textContent = 'Xatolik yuz berdi: ' + err.message + ". Iltimos, qaytadan urinib ko'ring yoki telefon orqali bog'laning.";
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = `<i class="fa-solid fa-check mr-1"></i> Bron qilish`;
  }
}

/* ---------------------------------------------------------------------------
   Modalning statik hodisalarini ulash (bir marta chaqiriladi)
--------------------------------------------------------------------------- */
export function initBookingModal() {
  document.querySelectorAll('[data-open-booking]').forEach(btn => {
    btn.addEventListener('click', () => openBooking());
  });

  document.getElementById('modalCloseBtn').addEventListener('click', closeBooking);
  document.getElementById('modalBackdrop').addEventListener('click', closeBooking);

  document.getElementById('backBtn').addEventListener('click', stepBack);
  document.getElementById('nextBtn').addEventListener('click', stepNext);
  document.getElementById('confirmBtn').addEventListener('click', submitBooking);

  const dateInput = document.getElementById('bookingDate');
  dateInput.min = new Date().toISOString().split('T')[0];
  dateInput.addEventListener('change', renderTimeSlots);

  // Esc bosilganda modalni yopish
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal().classList.contains('hidden')) closeBooking();
  });
}
