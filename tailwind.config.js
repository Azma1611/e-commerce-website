export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e1b4b',
        secondary: '#312e81',
        accent: '#fbbf24',
        'accent-hover': '#f59e0b',
        'text-main': '#0f1111',
        'text-muted': '#565959',
        'bg-light': '#f3f4f6',
        success: '#059669',
        error: '#dc2626',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(1.05)' },
        },
      },
      animation: {
        float: 'float 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
