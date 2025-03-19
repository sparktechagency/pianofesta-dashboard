/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F9FAFB",
        "secondary-color": "#6A0DAD",
        "base-color": "#262621",
        "highlight-color": "#5D5D5D",
        "input-color": "#F2FBF4",
        "error-color": "#E53935",
        "success-color": "#00C566",
        "warning-color": "#FACC15",
      },
    },
  },
  plugins: [],
};
