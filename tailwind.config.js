/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',  // Extra small devices
        'sm': '640px',  // Small devices (default Tailwind)
        'md': '768px',  // Medium devices (default Tailwind)
        'lg': '1024px', // Large devices (default Tailwind)
        'xl': '1280px', // Extra large devices (default Tailwind)
        '2xl': '1536px', // 2X large devices (default Tailwind)
        '3xl': '1600px', // Custom breakpoint for extra large devices
        '4xl': '1920px', // Custom breakpoint for very large devices
      },
    },
  },
  plugins: [],
}