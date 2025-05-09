/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5722', // Exemplo de cor primária
        secondary: '#4caf50', // Exemplo de cor secundária
        pink: {
          200: '#fbb6ce', // Cor rosa
          400: '#f06292', // Cor rosa mais forte (pode ser usada em bordas, ícones, etc)
        },
        blue: {
          200: '#93c5fd', // Cor azul clara
          400: '#3b82f6', // Cor azul mais forte
        },
        green: {
          100: '#d1fae5', // Cor verde clara
          400: '#34d399', // Cor verde mais forte
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class', // Habilitando o modo escuro via classe
  plugins: [],
}
