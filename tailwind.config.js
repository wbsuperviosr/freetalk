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
			brightness: ['hover', 'focus'],
			transitionProperty: {
				'height': 'height'
			},
			colors:{
				lxd: '#7e5bae',
				lxl: '#cebef0',
			},
			fontFamily: {
				kaiti: ["Georgia", "Times New Roman", "KaiTi", "STKaiti", "serif"],
				heiti: ["Georgia", "Times New Roman", '"Microsoft YaHei"', "STXihei", "serif"],
				noto: ['"Noto Sans SC"', "sans-serif"]
			}
		},
	},
	plugins: [require('tw-elements/dist/plugin'), require('flowbite/plugin')],


}
