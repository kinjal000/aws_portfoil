/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark base palette
        bg: {
          primary:   '#090e0c',
          secondary: '#0d1410',
          card:      '#111a15',
          elevated:  '#162019',
        },
        // Emerald accent system
        emerald: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        // Text palette
        text: {
          primary:   '#f0faf4',
          secondary: '#9db5a7',
          muted:     '#556b60',
          accent:    '#10b981',
        },
        // Border/divider
        border: {
          subtle:  '#1a2e22',
          default: '#1e3728',
          accent:  '#10b981',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        'display': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'heading': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':  'spin 20s linear infinite',
        'float':      'float 6s ease-in-out infinite',
        'glow':       'glow 2s ease-in-out infinite alternate',
        'shimmer':    'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px #10b98120' },
          'to':   { boxShadow: '0 0 20px #10b98140, 0 0 40px #10b98120' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)`,
        'gradient-emerald': 'linear-gradient(135deg, #10b981, #059669)',
        'gradient-dark':    'linear-gradient(135deg, #090e0c, #0d1410)',
        'gradient-card':    'linear-gradient(135deg, #111a15, #0d1410)',
        'gradient-hero':    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 60%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      boxShadow: {
        'emerald-sm':  '0 0 10px rgba(16, 185, 129, 0.15)',
        'emerald-md':  '0 0 20px rgba(16, 185, 129, 0.2), 0 0 40px rgba(16, 185, 129, 0.08)',
        'emerald-lg':  '0 0 30px rgba(16, 185, 129, 0.25), 0 0 60px rgba(16, 185, 129, 0.1)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':  '0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(16, 185, 129, 0.08)',
      },
    },
  },
  plugins: [],
}
