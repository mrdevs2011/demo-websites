// =============================================================================
// HOME: bosh sahifadagi "Xizmatlar" va "Ustalar" bo'limlarini render qilish
// =============================================================================
import { SERVICES, MASTERS, money } from './data.js';
import { openBooking } from './booking.js';

export function renderServices() {
  const grid = document.getElementById('servicesGrid');
  grid.innerHTML = SERVICES.map(s => `
    <div class="reveal lift group bg-white rounded-2xl border border-emerald-950/8 p-6 cursor-pointer" data-service-card="${s.id}">
      <div class="w-12 h-12 rounded-full bg-emerald-900 text-gold-400 flex items-center justify-center mb-5 group-hover:bg-gold-500 group-hover:text-emerald-950 transition-colors">
        <i class="fa-solid ${s.icon}"></i>
      </div>
      <h3 class="font-display text-lg font-semibold mb-1.5">${s.name}</h3>
      <p class="text-sm text-emerald-950/55 leading-relaxed mb-5">${s.desc}</p>
      <div class="flex items-center justify-between pt-4 border-t border-emerald-950/8">
        <span class="text-xs font-mono text-emerald-950/50"><i class="fa-regular fa-clock mr-1"></i>${s.duration} daqiqa</span>
        <span class="font-display font-semibold text-emerald-800">${money(s.price)}</span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-service-card]').forEach(card => {
    card.addEventListener('click', () => openBooking(card.dataset.serviceCard));
  });

  // Yangi qo'shilgan .reveal elementlarini kuzatuvga olish
  document.querySelectorAll('#servicesGrid .reveal').forEach(el => window.__revealObserver?.observe(el));
}

export function renderMasters() {
  const grid = document.getElementById('mastersGrid');
  grid.innerHTML = MASTERS.map(m => `
    <div class="reveal lift bg-emerald-950/40 border border-cream/10 rounded-2xl overflow-hidden">
      <div class="aspect-[3/4] overflow-hidden">
        <img src="${m.img}" alt="${m.name}" class="w-full h-full object-cover" loading="lazy">
      </div>
      <div class="p-5">
        <h3 class="font-display text-lg font-semibold">${m.name}</h3>
        <p class="text-gold-400 text-xs tracking-wide uppercase mt-1">${m.role}</p>
        <p class="text-cream/50 text-sm mt-2">${m.exp}</p>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('#mastersGrid .reveal').forEach(el => window.__revealObserver?.observe(el));
}
