/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",      // soft indigo accent
        secondary: "#A0AEC0",    // muted blue-gray
        accent: "#F6AD55",       // warm accent
        bgDark: "#F7FAFC",       // very light background
        bgLight: "#EDF2F7",      // light gray background
        textMain: "#2D3748",     // dark slate for text
      },
    },
  },
  plugins: [],
}