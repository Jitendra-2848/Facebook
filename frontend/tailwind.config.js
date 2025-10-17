/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      font: {
        // This extends the default 'font-sans' utility
        sans: [
          'SFProDisplay-Regular', // Specific font name
          'SF Pro Display',       // Common alternate name for SF Pro
          'Helvetica',            // Included for compatibility
          'Arial',                // Included for compatibility
          'sans-serif',           // Generic fallback
        ],
      },
    },
  },
  plugins: [],
}