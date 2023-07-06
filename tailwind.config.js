/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        cor: {
          primaria: '#DBE2EF',
          secundaria: '#3F72AF',
          terciaria: '#112D4E',
          clara: '#F9F7F7'
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

