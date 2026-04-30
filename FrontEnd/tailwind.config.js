/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#ffffff', // Monochrome White
                    dark: '#eeeeee',
                    hover: '#d1d1d1',
                    light: '#737373',
                },
                slate: {
                    50: '#000000', // Pure Black
                    100: '#0a0a0a',
                    200: '#1a1a1a',
                    300: '#262626',
                    400: '#404040',
                    500: '#737373',
                    600: '#a3a3a3',
                    700: '#d1d1d1',
                    800: '#eeeeee',
                    900: '#ffffff',
                }
            },

            boxShadow: {
                'classic': '0 4px 6px -1px rgb(255 255 255 / 0.05), 0 2px 4px -2px rgb(255 255 255 / 0.05)',
                'classic-lg': '0 10px 15px -3px rgb(255 255 255 / 0.05), 0 4px 6px -4px rgb(255 255 255 / 0.05)',
                'classic-xl': '0 20px 25px -5px rgb(255 255 255 / 0.05), 0 8px 10px -6px rgb(255 255 255 / 0.05)',
            }

        },
    },
    plugins: [],
}
