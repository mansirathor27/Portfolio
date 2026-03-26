/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          deep: '#0a0a0f',
          purple: '#667eea',
          neon: '#764ba2',
          cyan: '#00d4ff',
          crimson: '#ff0055',
        },
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'neon-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      boxShadow: {
        'neon-glow': '0 0 15px rgba(102, 126, 234, 0.4)',
        'glass-neu': '10px 10px 20px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'glass-neu-inset': 'inset 5px 5px 10px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.05)',
      },
      backdropBlur: {
        'huge': '20px',
      }
    },
  },
  plugins: [],
}
