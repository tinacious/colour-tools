/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {

    extend: {
      colors: {
        td_pink: '#f39',
        td_blue: '#33d5ff',
        td_coolGrey: '#b3b3d4',
        td_meanGreen: '#00d364',
        td_candyPurple: '#c6f',
        td_sunsetYellow: '#fc6',
        td_poolSideTurquoise: '#00ced1',
        td_nightTimeCampingSky: '#1d1d26',
        td_rainyDayGrey: '#c8c8d5',
        td_tangerine: '#ffaa00',
        td_dangerRed: '#ff365f',
        td_cranberry: '#f10f69',
      },
    },
  },
  plugins: [],
}

