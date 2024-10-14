/** @type {import('tailwindcss').Config} */
export default {
	content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
			screens: {
				'xxs': '375px',
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
				'rating-red': '#C82020',
				'rating-gray': '#777777',
				'rating-green': '#308E21',
				'rating-gold': '#A59400',
			}
		},
  },
	safelist: ['router-link-active'],
  plugins: [],
}

