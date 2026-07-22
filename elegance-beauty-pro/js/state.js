// =============================================================================
// STATE: joriy bron jarayonining vaqtinchalik holati
// =============================================================================

export const state = {
  step: 1,
  serviceId: null,
  masterId: null,
  date: null,
  time: null,
  name: '',
  phone: '',
};

export function resetState(preselectServiceId) {
  state.step = 1;
  state.serviceId = preselectServiceId || null;
  state.masterId = null;
  state.date = null;
  state.time = null;
  state.name = '';
  state.phone = '';
}

// Soddalashtirilgan "band vaqtlar" bazasi (demo/kesh maqsadida).
// Haqiqiy loyihada har safar Supabase'dan so'ralishi tavsiya etiladi.
// Kalit: `${masterId}_${date}` -> ["10:00", "14:30", ...]
export const bookedSlotsCache = {};
