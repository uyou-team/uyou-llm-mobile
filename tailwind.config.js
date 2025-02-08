/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'tablet': '901px',
      },
      keyframes: {
        'dialog-show': {
          form: {
            transform: 'scale(0.8, 0.8)',
            opacity: 0
          },
          to: {
            transform: 'scale(1, 1)',
            opacity: 1
          }
        },
        'dialog-hide': {
          to: {
            transform: 'scale(0.8, 0.8)',
            opacity: 0
          }
        }
      }
    }
  },
  plugins: []
}
