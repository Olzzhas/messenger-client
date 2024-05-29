/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
         },
      },
   },
   plugins: [
      function ({ addUtilities }) {
         addUtilities({
            // '.scrollbar-hide': {
            //    '-ms-overflow-style': 'none' /* IE и Edge */,
            //    'scrollbar-width': 'none' /* Firefox */,
            // },
            // '.scrollbar-hide::-webkit-scrollbar': {
            //    display: 'none' /* Chrome, Safari и Opera */,
            // },
            '.scrollbar::-webkit-scrollbar': {
               width: '12px',
            },
            '.scrollbar::-webkit-scrollbar-track': {
               background: '#f1f1f1',
            },
            '.scrollbar::-webkit-scrollbar-thumb': {
               background: '#888',
               borderRadius: '16px',
            },
            '.scrollbar::-webkit-scrollbar-thumb:hover': {
               background: '#555',
            },
            /* Стилизация полосы прокрутки для Firefox */
            '.scrollbar': {
               scrollbarWidth: 'thin',
               scrollbarColor: '#888 #f1f1f1',
            },
         });
      },
   ],
};
