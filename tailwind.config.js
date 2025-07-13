/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "serif"],
                lexend: ["Lexend", "serif"],
                "geist-mono": ["Geist Mono", "monospace"],
            },
            colors: {
                "lili-red": "#c7254e",
                "lexend-grey": "#000000c2",
            },
        },
    },
    plugins: [],
};
