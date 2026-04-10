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
                    DEFAULT: '#5b52f1',
                    hover: '#4a42d6',
                },
                retro: {
                    yellow: '#f9f871',
                    pink: '#ff66c4',
                    blue: '#00d4ff',
                    dark: '#1a1a1a',
                    light: '#f0f0f0',
                    border: '#000000',
                }
            },
            boxShadow: {
                'retro-hard': '4px 4px 0px 0px rgba(0,0,0,1)',
                'retro-hard-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
                'retro-hard-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
            }
        },
    },
    plugins: [],
}
