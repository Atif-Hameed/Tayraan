import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#179AE0",
        orange: "#FF7300",
        green: "#026C34",
        gray: "#E1E1E1",
        lightGreen: "#79DE90",
        bordered: "#1212121A",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      backgroundImage: {
        heroBanner: "url('/assets/images/container-Banner.png')",
        greenGradient: "linear-gradient(58.16deg, #016733 -6.21%, #1C1466 103.2%)",
        heroCard: "url('/assets/images/hero-card.png')"
      }
    },
  },
  plugins: [],
};

export default config;
