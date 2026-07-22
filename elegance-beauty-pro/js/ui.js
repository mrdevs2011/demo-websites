// =============================================================================
// UI: header scroll effekti, mobil menyu, scroll-reveal animatsiyasi
// =============================================================================

export function initHeaderScroll() {
  const inner = document.getElementById('headerInner');

  function update() {
    if (window.scrollY > 40) {
      inner.classList.add('bg-cream/90', 'backdrop-blur', 'border-emerald-950/10', 'shadow-sm');
      inner.classList.remove('py-5');
      inner.classList.add('py-3.5');
    } else {
      inner.classList.remove('bg-cream/90', 'backdrop-blur', 'border-emerald-950/10', 'shadow-sm');
      inner.classList.add('py-5');
      inner.classList.remove('py-3.5');
    }
    updateHeaderTheme();
  }

  window.addEventListener('scroll', update);
  update();
}

function updateHeaderTheme() {
  const xizmatlarSection = document.getElementById('xizmatlar');
  if (!xizmatlarSection) return;
  const heroBottom = xizmatlarSection.offsetTop - 100;
  const brand = document.getElementById('brandText');
  const isOverHero = window.scrollY < heroBottom;

  document.querySelectorAll('.nav-link').forEach(a => {
    a.style.color = isOverHero ? '#FAF8F3' : '#14231D';
  });
  brand.style.color = isOverHero ? '#FAF8F3' : '#14231D';
}

export function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  function toggle() {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
  }

  menuBtn.addEventListener('click', toggle);
  document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', toggle));
}

export function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.15 });

  // home.js kabi boshqa modullar keyinchalik qo'shadigan elementlarni ham
  // kuzatuvga olishi uchun observerni global qilib qo'yamiz.
  window.__revealObserver = observer;

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
