// ===========================================================================
// TAILWIND CSS KONFIGURATSIYASI (CDN rejimi uchun)
// Ranglar, shriftlar va soyalar shu yerda markazlashtirilgan.
// ===========================================================================
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        display: ['"Baloo 2"', 'cursive'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        amber: {
          50: '#FFFBEB', 100: '#FEF3C7', 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706', 700: '#B45309', 900: '#78350F'
        },
        chili: {
          500: '#DC2626', 600: '#B91C1C', 700: '#991B1B', 900: '#450A0A'
        },
        char: { 900: '#1C1917', 800: '#292524', 700: '#3F3F35' }
      },
      boxShadow: {
        ticket: '0 10px 30px -10px rgba(0,0,0,0.35)'
      }
    }
  }
};
