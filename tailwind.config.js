/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#07090F',
          900: '#0C0F1A',
          800: '#111827',
          700: '#141D2E',
          600: '#192338',
          500: '#1E2A3A',
          400: '#243348',
        },
        accent: {
          blue: '#4F8EF7',
          'blue-dim': '#3B7EE8',
          'blue-subtle': '#1A3563',
          gold: '#F0B429',
          'gold-dim': '#C9941D',
        },
      },
      typography: {
        scout: {
          css: {
            '--tw-prose-body': '#CBD5E1',
            '--tw-prose-headings': '#F1F5F9',
            '--tw-prose-lead': '#94A3B8',
            '--tw-prose-links': '#4F8EF7',
            '--tw-prose-bold': '#F1F5F9',
            '--tw-prose-counters': '#64748B',
            '--tw-prose-bullets': '#4F8EF7',
            '--tw-prose-hr': '#1E2A3A',
            '--tw-prose-quotes': '#CBD5E1',
            '--tw-prose-quote-borders': '#4F8EF7',
            '--tw-prose-captions': '#64748B',
            '--tw-prose-code': '#93C5FD',
            '--tw-prose-pre-code': '#CBD5E1',
            '--tw-prose-pre-bg': '#111827',
            '--tw-prose-th-borders': '#1E2A3A',
            '--tw-prose-td-borders': '#1E2A3A',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
