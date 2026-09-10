import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0B0E14',
        surface: '#111622',
        elevated: '#182030',
        borderSubtle: 'rgba(255,255,255,0.08)',
        borderHighlight: 'rgba(59,130,246,0.4)',
        cobalt: '#2563EB',
        cobaltHover: '#1D4ED8',
        cyan: '#38BDF8',
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
        textMuted: '#64748B',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'tight-heading': '-0.03em',
        'overline-tracking': '0.08em',
      },
    },
  },
  plugins: [],
} satisfies Config
