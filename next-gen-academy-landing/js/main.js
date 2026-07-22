/* ============================================
   NEXT GEN ACADEMY — UI interactions
   (mobile menu, course filter, FAQ accordion)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  let menuOpen = false;

  if (menuBtn && mobileMenu && menuIcon) {
    menuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.style.maxHeight = menuOpen ? mobileMenu.scrollHeight + 'px' : '0px';
      menuIcon.className = menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.style.maxHeight = '0px';
        menuIcon.className = 'fa-solid fa-bars';
      });
    });
  }

  /* ---------- Course category filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('#courseGrid .course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      courseCards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

});

/* ---------- "Yozilish" tugmasi bosilganda -> formaga o'tish va kursni tanlash ---------- */
function selectCourse(name) {
  const courseSelect = document.getElementById('leadCourse');
  if (courseSelect) courseSelect.value = name;
  const form = document.getElementById('lead-form');
  if (form) form.scrollIntoView({ behavior: 'smooth' });
}
