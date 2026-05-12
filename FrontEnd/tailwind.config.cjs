/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Sora', 'sans-serif'],
                sora: ['Sora', 'sans-serif'],
            },
            colors: {
                background: '#0A0A0C',
                surface: '#111113',
                border: '#1e1e22',
                'text-primary': '#e0e0e8',
                'text-muted': '#666677',
                primary: '#8B5CF6', // Purple
                secondary: '#FF8C42', // Orange
                tertiary: '#0EA5E9', // Cyan
                slate: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
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
