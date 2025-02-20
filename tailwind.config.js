/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                OpenSans: ['semibold'],
                bold: ['bold'],
                extraBold: ['extraBold'],
                medium: ['medium'],
                light: ['light'],
                regular: ['regular'],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
