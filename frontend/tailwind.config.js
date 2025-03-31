import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{jsx,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          400: '#b0b0b0',
          500: '#27272a'
        },
        stone: {
          200: '#d1d5db',
        },
        yellow: {
          700: '#9b5500',
          950: '#82450034',
        },
        gray: {
          700: '#4b5563',
        },
        indigo: {
          600: '#4f46e5',
          950: '#0c1a3a',
        },
      },
      fontFamily: {
        sans: ['Michroma', 'sans-serif'],
      },
    },
  },
  plugins: [],
});
