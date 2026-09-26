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
        background: "#0f1115",
        surface: {
          DEFAULT: "#15171d",
          card: "#1b1f28",
          panel: "#20242e",
          border: "#282d38",
        },
        accent: {
          DEFAULT: "#ccff00",
          hover: "#b8e600",
          muted: "rgba(204, 255, 0, 0.15)",
        },
      },
      fontFamily: {
        heading: ["var(--font-oswald)", "Oswald", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        fitlog: {
          primary: "#ccff00",
          secondary: "#20242e",
          accent: "#c2f800",
          neutral: "#1b1f28",
          "base-100": "#0f1115",
          "base-200": "#15171d",
          "base-300": "#20242e",
          info: "#38bdf8",
          success: "#ccff00",
          warning: "#facc15",
          error: "#f87171",
        },
      },
      "dark",
    ],
    darkTheme: "fitlog",
    base: true,
    styled: true,
    utils: true,
  },
};

export default config;
