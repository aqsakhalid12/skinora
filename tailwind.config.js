/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  // Preflight is off so browser defaults match the original design exactly
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        ivory: '#f6f1ea',
        ink: '#1f1b18',
        muted: '#6b625a',
        brand: '#8a5a45', // eyebrow, sale badge
        accent: '#a8715a', // leaf, badges, stars
        success: '#2f6b4f',
        error: '#a8321f',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
