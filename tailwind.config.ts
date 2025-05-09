/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5722', // Exemplo de cor primária
        secondary: '#4caf50', // Exemplo de cor secundária
        pink: {
          200: '#fbb6ce', // Cor rosa
        },
        blue: {
          200: '#93c5fd', // Cor azul
        },
      },
    },
  },
  plugins: [],
}
