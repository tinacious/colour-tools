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
        td_grey_50: '#0B0B0E',
        td_grey_100: '#16161D',
        td_grey_200: '#2C2C3A',
        td_grey_300: '#424257',
        td_grey_400: '#585874',
        td_grey_500: '#6E6E91',
        td_grey_600: '#8B8BA7',
        td_grey_700: '#A8A8BD',
        td_grey_800: '#C5C5D3',
        td_grey_900: '#E2E2E9',
        td_grey_950: '#F1F1F4',
      },
    },
  },
  plugins: [],
}

