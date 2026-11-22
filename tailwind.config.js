/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        maroon: {
          950: '#2A0010',
          900: '#3D0015',
          800: '#56001C',
          700: '#6B0020',
          600: '#800020',
          500: '#9B1030',
          400: '#B92040',
          300: '#D45070',
          200: '#EDA8B8',
          100: '#F7D8DF',
          50:  '#FDF2F4',
        },
      },
      typography: {
        scout: {
          css: {
            '--tw-prose-body': '#374151',
            '--tw-prose-headings': '#111827',
            '--tw-prose-lead': '#6B7280',
            '--tw-prose-links': '#800020',
            '--tw-prose-bold': '#111827',
            '--tw-prose-counters': '#6B7280',
            '--tw-prose-bullets': '#800020',
            '--tw-prose-hr': '#E5E7EB',
            '--tw-prose-quotes': '#374151',
            '--tw-prose-quote-borders': '#800020',
            '--tw-prose-captions': '#6B7280',
            '--tw-prose-code': '#800020',
            '--tw-prose-pre-code': '#374151',
            '--tw-prose-pre-bg': '#F9FAFB',
            '--tw-prose-th-borders': '#E5E7EB',
            '--tw-prose-td-borders': '#E5E7EB',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
