import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/anthony.png')",
        "contact-bg": "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/markus-spiske-iar-afB0QQw-unsplash.jpg')",
      },
      colors: {
        'site-primary-color': '#223A59',
        'site-secondary-color': '#EDF0F5',
        'site-tertiary-color': '#FF9B42',
        'site-quaternary-color': '#E8EBED',
        'site-quinary-color': '#D6D9DC',
        'contact-form-bg': '#FFFDFD',
      },
      margin: {
        100: "45rem",
      },
      animation: {
        relax_ping: 'ping 5s cubic-bezier(0, 0, 0.8, 0.1) infinite'
      },
      transitionDelay: {
        random: 'random'
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
      }
    },
  },
  plugins: [],
};
export default config;
