/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	// corePlugins: {
	// 	preflight: false,
	// },
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-roboto)", ...fontFamily.sans],
			},
			colors: {
				primary: {
					50: "#e6fcff",
					100: "#a7ecfa",
					200: "#79d6ed",
					300: "#4fbee0",
					400: "#28a6d4",
					500: "#058dc7",
					600: "#006ba1",
					700: "#004e7a",
					800: "#003254",
					900: "#001a2e",
				},
			},
		},
		container: {
			center: true,
		},
	},
	plugins: [],
};











