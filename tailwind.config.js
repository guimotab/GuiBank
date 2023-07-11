/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.{html,js}'],
  theme: {
    screens: {
      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    },
    extend: {
      margin:{
        "6.25rem": "6.25rem",
        "21rem": "21rem",
        "25rem": "25rem"
      },
      width:{
        "33rem" : "33rem",
      },
      maxWidth:{
        "27": "27rem",
      },
      keyframes:{
        carregamento: {
          to: { transform: "scaleX(1.25)" },
          from: { transform: "translateY(-12px) scaleX(1)" },
        },
      },
      animation:{
        "carregar-um": "carregamento 450ms alternate infinite",
        "carregar-dois": "carregamento 450ms 150ms alternate infinite",
        "carregar-tres": "carregamento 450ms 300ms alternate infinite",
      },
      colors: {
        cor: {
          primaria: '#DBE2EF',
          secundaria: '#3F72AF',
          terciaria: '#112D4E',
          rendimento: '#cfe5ff',
          outline: '#011e42',
          clara: '#eeeeee',
          branco: '#fff',
          preto: '#000',
          cinza_escuro: '#111111', 
          cinza_claro: '#616161',
          cinza_transparente: '#49494927',
          hover: '#1355a0',
          carregamento: "#517bac",
          erro: "#b92626",
        },
        fontFamily:{
          primaria: ["Work Sans, sans-serif"],
          secundaria: ["Open Sans, sans-serif"]
        }
      },
      components: {
        
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
    }
  },
  plugins: [],
}

