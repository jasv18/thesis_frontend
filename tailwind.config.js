/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ['Playfair Display', 'serif'],
        openSans: ['Open Sans', 'sans-serif']
      },
      colors: {
        'dark-gray': '#8D99AE',
        'light-gray': '#EDF2F4',
        'dark-pink': '#D90429',
        'light-pink': '#EF233C',
        'dark-blue': '#2B2D42',
        'my-cream': '#FDF0D5'
      }
    }
  },
  plugins: []
}
