// Tailwind CDN uchun sozlama. Bu fayl Tailwind skripti DOM'ni skanerlashidan
// oldin yuklanishi kerak, shuning uchun index.html'da <script src="...tailwindcss">
// tegidan darhol keyin ulanadi (module emas, oddiy global skript).

tailwind.config = {
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#07211A',
          900: '#0B3B2E',
          800: '#0E4B3A',
          700: '#145C43',
          600: '#1B7050',
        },
        gold: {
          300: '#E8D48A',
          400: '#D9BB5C',
          500: '#C9A227',
          600: '#A9821C',
        },
        cream: '#FAF8F3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    }
  }
};
