/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        'bg-sky-500',
        'bg-teal-500',
        'bg-green-500',
        'bg-amber-500',
        'bg-rose-500',
        'bg-pink-500',
        'bg-fuchsia-500',
        'bg-violet-500',
        'bg-indigo-500',
        'bg-blue-500',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Jost', ...defaultTheme.fontFamily.sans],
            },
            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
            },
            colors: {
                background: '#020015',
            },
            listStyleType: {
                awesome: '"⚪ "',
            },
            letterSpacing: {
                'wide-wide': '0.2em',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
