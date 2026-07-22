/* ============================================
   Tailwind CDN theme configuration
   Brand color palette: Indigo/Violet + White
   ============================================ */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f4f2ff',
          100: '#ece8ff',
          200: '#d9d3ff',
          300: '#bcaeff',
          400: '#9b7fff',
          500: '#7c4dff',
          600: '#6425f0',
          700: '#5417ce',
          800: '#4514a5',
          900: '#391284',
        },
        ink: '#140e2b',
      },
      boxShadow: {
        brand: '0 20px 45px -15px rgba(100, 37, 240, 0.45)',
        card: '0 10px 30px -10px rgba(20, 14, 43, 0.15)',
      },
    }
  }
};
