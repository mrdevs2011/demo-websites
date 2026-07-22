/* =========================================================================
   slider.js
   -------------------------------------------------------------------------
   Hero banner slayderining ishlash mantiqi: avtomatik almashish,
   nuqta navigatsiyasi, oldinga/orqaga tugmalari.
   ========================================================================= */

window.App = window.App || {};

App.initSlider = function () {
  const slides = document.querySelectorAll('.slide');
  const dotsBox = document.getElementById('heroDots');
  let currentSlide = 0;
  let autoTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsBox.appendChild(dot);
  });

  function goToSlide(i) {
    slides[currentSlide].classList.remove('active');
    dotsBox.children[currentSlide].classList.remove('active');
    currentSlide = (i + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dotsBox.children[currentSlide].classList.add('active');
    resetAutoplay();
  }
  function resetAutoplay() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  document.getElementById('nextSlide').addEventListener('click', () => goToSlide(currentSlide + 1));
  document.getElementById('prevSlide').addEventListener('click', () => goToSlide(currentSlide - 1));
  resetAutoplay();
};
