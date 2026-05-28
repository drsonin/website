/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				clinic: {
					50:  '#eff6ff',
					100: '#dbeafe',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e3a5f',
					900: '#0f3460',
					950: '#0a1e3d',
				},
			},
		},
	},
	plugins: [],
};
