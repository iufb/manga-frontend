/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: {
    screens: {
      mobile: "350px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },

    extend: {
      gridTemplateColumns: {
        navbar: "100px 1fr 100px",
      },
      gridTemplateRows: {
        navbar: "100px",
      },
      backgroundImage: {
        register: "url('/bg-blur.jpg')",
        login: "url('/bg-wave.svg)",
      },
      colors: {
        indigoGrey: "#6c8480",
        lightGrey: "#d4dcda",
        customWhite: "#f4f4f4",
      },
    },
  },
  plugins: [require("daisyui")],
};
