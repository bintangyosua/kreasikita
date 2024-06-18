import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import { withUt } from "uploadthing/tw";

const config = {
  darkMode: "class",
  content: [
    // "./pages/**/*.{ts,tsx}",
    // "./components/**/*.{ts,tsx}",
    // "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        purple: "#5B5BD6",
        purplest: "#E0DFFE",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;

export default withUt(config);
