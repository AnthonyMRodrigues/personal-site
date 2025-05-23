import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'site-primary-color': '#002344',
        'site-secondary-color': '#f1d0a4',
        'secondary-yellow': '#f1d0a4',
      },
      margin: {
        100: "45rem",
      },
      animation: {
        'relax_ping': 'ping 5s cubic-bezier(0, 0, 0.8, 0.1) infinite',
        'fade-in': 'fade-in 0.5s forwards',
        'fade-out': 'fade-out 0.5s 2.5s forwards',
      },
      transitionDelay: {
        random: 'random'
      },
      fontFamily: {
        sans: ['Cormorant Garamond', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        futura: ['var(--font-futura)', 'sans-serif'],
        montserrat: "var(--font-montserrat)",
        lato: "var(--font-lato)",
        'la-orleans': ['La Orleans', 'serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
