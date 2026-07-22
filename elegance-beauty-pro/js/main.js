// =============================================================================
// MAIN: loyihaning kirish nuqtasi — barcha modullarni ishga tushiradi
// =============================================================================
import { initSupabase } from './api.js';
import { renderServices, renderMasters } from './home.js';
import { initBookingModal } from './booking.js';
import { initHeaderScroll, initMobileMenu, initRevealAnimations } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initSupabase();

  initRevealAnimations();   // avval observer tayyorlanadi
  renderServices();         // ...keyin dinamik kartochkalar qo'shiladi
  renderMasters();

  initBookingModal();
  initHeaderScroll();
  initMobileMenu();
});
