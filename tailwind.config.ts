import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(10, 80%, 60%)", // Vibrant red-orange
          foreground: "hsl(10, 80%, 30%)",
        },
        secondary: {
          DEFAULT: "hsl(120, 40%, 60%)", // Fresh green
          foreground: "hsl(120, 40%, 30%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 70%, 50%)", // Red for destructive actions
          foreground: "hsl(0, 70%, 30%)",
        },
        muted: {
          DEFAULT: "hsl(200, 20%, 70%)", // Soft blue-gray
          foreground: "hsl(200, 20%, 40%)",
        },
        accent: {
          DEFAULT: "hsl(45, 100%, 50%)", // Bright yellow for accents
          foreground: "hsl(45, 100%, 30%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 95%)", // Light background
          foreground: "hsl(0, 0%, 20%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 98%)", // Light card background
          foreground: "hsl(0, 0%, 10%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
