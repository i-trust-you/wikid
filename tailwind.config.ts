/* eslint-disable import/no-anonymous-default-export */
/** @type {import("tailwindcss").Config} */
export default {
	theme: {
		screens: {
			tablet: "768px",
			desktop: "1200px",
		},
		fontSize: {
			"5xl": ["48px", "46px"],
			"4xl": ["40px", "42px"],
			"3xl": ["32px", "42px"],
			"2xl": ["24px", "32px"],
			xl: ["20px", "32px"],
			"2lg": ["18px", "26px"],
			lg: ["16px", "26px"],
			md: ["14px", "24px"],
			sm: ["13px", "22px"],
			xs: ["12px", "18px"],
		},
		colors: {
			primary: {
				100: "#EEF9F6",
				200: "#4CBFA4",
				300: "#32A68A",
			},
			gray: {
				100: "#F7F7FA",
				200: "#E4E5F0",
				300: "#C6CADA",
				400: "#8F95B2",
				500: "#474D66",
				600: "#3B415B",
			},
			red: {
				100: "#FBEDED",
				200: "#D14343",
			},
			black: "#000000",
			white: "#FFFFFF",
			purple: "#8E66FF",
			yellow: "#FDD181",
			transparent: "transparent",
		},
	},
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
};
