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
        navy: {
          900: "#0a0f1e",
          800: "#0f172a",
          700: "#1e293b",
          600: "#2d3f5c",
        },
        brand: {
          orange: "#f97316",
          "orange-dark": "#ea580c",
          "orange-light": "#fb923c",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(249, 115, 22, 0.35)",
        "glow-lg": "0 0 80px -12px rgba(249, 115, 22, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
