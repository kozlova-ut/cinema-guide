/** @type {import('tailwindcss').Config} */
export default {
	content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
			screens: {
				'xs': '425px'
			},
			fontFamily: {
				'play-regular': ['Play-Regular'],
				'play-bold': ['Play-Bold']
			}, 
			colors: {
				'accent-main': '#6A5DC2',
				'accent-additional': '#DC5DFC',
				'gray': '#393B3C',
				'green': '#308E21',
			}
		},
  },
	safelist: ['router-link-active'],
  plugins: [],
}

