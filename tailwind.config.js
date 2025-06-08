/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme
        primary: {
          light: '#ffffff', // White
          dark: '#000000',  // Black
        },
        secondary: {
          light: '#f3f4f6', // Light gray
          dark: '#111827',  // Dark gray
        },
        accent: {
          light: '#2563eb', // Blue-600
          dark: '#3b82f6',  // Blue-500
        },
        text: {
          primary: {
            light: '#111827', // Gray-900
            dark: '#f9fafb',  // Gray-50
          },
          secondary: {
            light: '#6b7280', // Gray-500
            dark: '#9ca3af',  // Gray-400
          }
        }
      }
    }
  },
  plugins: [],
}