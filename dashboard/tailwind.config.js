/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: '390px',
        tablet_p: { raw: '(min-width: 768px) and (orientation : portrait)' },
        tablet_l: { raw: '(min-width: 1024px) and (orientation : landscape)' },
        laptop: '1280px',
        desktop: '1728px',
      },
      colors: {
        primary: '#F59600',
        secondary: '#3a3b3f',
      },
      fontFamily: {
        Nezto: ['Nezto'],
        NeztoBold: ['Nezto Bold'],
        NeztoSuperBold: ['Nezto Super Bold'],
        NeztoLight: ['Nezto Light'],
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey]

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`)

          return { ...vars, ...newVars }
        }, {})
      }
      addBase({
        ':root': extractColorVars(theme('colors')),
      })
    },
  ],
}
