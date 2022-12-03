/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js",
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        kaiti: ["Georgia", "Times New Roman", "KaiTi", "STKaiti", "serif"],
        noto: ['"Noto Sans SC"', "sans-serif"]
      }
    },
  },
  plugins: [require('tw-elements/dist/plugin'), require('flowbite/plugin')],


}
