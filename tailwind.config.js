/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // enables toggling dark mode via 'dark' class on <html> or <body>
    content: [
      './app/**/*.{js,ts,jsx,tsx}',    // adjust this if your source folder differs
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
        },
        colors: {
          emerald: {
            600: '#059669',
            700: '#047857',
          },
        },
      },
    },
    plugins: [],
  };
  