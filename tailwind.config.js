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
    
        max_Xll: { max: '1360px' },
        max_xl: { max: '1286px' },
        max_xml: { max: '1270px' },
        // => @media (max-width: 1279px) { ... }
        max_x: { max: '1150px' },
        max_lg: { max: '1050px' },
        // => @media (max-width: 1050px) { ... }
        max_md2: { max: '900px' },
        max_md: { max: '767px' },
        // => @media (max-width: 767px) { ... }
        max_sm: { max: '640px' },
        max_sm8: { max: '825px' },
        // => @media (max-width: 639px) { ... }
        max_smm1: { max: '565px' },
        max_smm: { max: '500px' },
      },
    },
  },
  plugins: [],
}