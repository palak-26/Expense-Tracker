/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       colors: {
        expense: {
          green: '#22C55E',       
          greenAlt: '#10B981',    
          purpleLight: '#A78BFA', 
          purpleDark: '#7C3AED',  
          violet: '#8B5CF6',      
          slateDark: '#1E293B',   
          slateLight: '#64748B',  
          slateDeep: '#0F172A', 
          lightPink : '#f2eeef', 
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
}

