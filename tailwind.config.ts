/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}", // Adapte para onde seus arquivos .tsx ou .jsx estão localizados
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5722', // Exemplo de cor primária
        secondary: '#4caf50', // Exemplo de cor secundária
      },
    },
  },
  plugins: [],
}
