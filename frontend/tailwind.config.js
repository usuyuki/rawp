const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class', // mediaはos依存に自動でなるため手動で変えられうようにclassへ
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--dot-gothic-16)', ...fontFamily.sans],
                DotGothic16: ['var(--dot-gothic-16)'],
            },
        },
        colors: {
            white: 'var(--white)',
            black: 'var(--black)',
            primary: 'var(--primary)',
            secondary: 'var(--secondary)',
            tertiary: 'var(--tertiary)',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
