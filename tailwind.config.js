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
      colors: {
        cor: {
          primaria: '#DBE2EF',
          secundaria: '#3F72AF',
          terciaria: '#112D4E',
          outline: '#011e42',
          clara: '#eeeeee',
          branco: '#fff',
          preto: '#000',
          cinza_escuro: '#111111', 
          cinza_claro: '#616161',
          cinza_transparente: '#49494927',
          hover: '#1355a0',
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
      // é o @keyframe do css
      keyframes: {
        //variável
        sino_kf: {
          // no 0% e 100% ele roda pra direita
          '0%, 100%': {
            transform: 'rotate(-10deg)'
          },
          //no 50% ele roda para esquerda
          '50%': {
            transform: 'rotate(10deg)'
          }
        },
        animation: {
          //traz a configuração do sino_kf
          sino: 'sino_kf 0.31s ease-in-out infinite'
        }
      }
    }
  },
  plugins: [],
}

