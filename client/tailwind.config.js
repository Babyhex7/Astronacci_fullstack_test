/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warna brand Astronacci (merah-oranye-kuning)
        primary: {
          50: "#fef7f0",
          100: "#fdeee0",
          200: "#fad9b8",
          300: "#f6be85",
          400: "#f09a50",
          500: "#eb7a2a",
          600: "#dc5f1f",
          700: "#b6461b",
          800: "#91381e",
          900: "#76301c",
        },
        accent: {
          50: "#fff5f5",
          100: "#ffe3e3",
          200: "#ffc9c9",
          300: "#ffa3a3",
          400: "#ff6b6b",
          500: "#e53935",
          600: "#d32f2f",
          700: "#c62828",
          800: "#b71c1c",
          900: "#991b1b",
        },
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
