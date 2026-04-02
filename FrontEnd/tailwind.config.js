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
                }
            }
        },
    },
    plugins: [],
}
