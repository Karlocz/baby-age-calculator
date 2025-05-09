/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}", // Certifique-se de que os arquivos TSX/JSX estejam inclusos aqui
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
