import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
// Add at the end of your GlobalStyles

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

/* Beautiful selection color */
::selection {
  background: ${props => props.theme.primary};
  color: white;
}

/* Base Styles */
:root {
  --noise-opacity: 0.05;
}

@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

/* Loading animation for images */
img {
  transition: opacity 0.3s ease;
}

img.loading {
  opacity: 0;
}

img.loaded {
  opacity: 1;
}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
    background: ${props => props.theme.background};
  }

  .app {
    position: relative;
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow: hidden;
  }

  /* Noise Overlay */
  .app::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
    opacity: var(--noise-opacity);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  .cursor-glow {
    width: 400px;
    height: 400px;
    background: ${props => props.theme.primary}20;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    filter: blur(80px);
    transform: translate(-50%, -50%);
    transition: background 0.3s ease;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.cardBg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.secondary};
  }

  /* Glass Effect Class */
  .glass {
    background: ${props => props.theme === 'light' 
      ? 'rgba(255, 255, 255, 0.4)' 
      : 'rgba(255, 255, 255, 0.03)'};
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid ${props => props.theme === 'light'
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(255, 255, 255, 0.08)'};
    box-shadow: 0 8px 32px 0 ${props => props.theme === 'light'
      ? 'rgba(31, 38, 135, 0.1)'
      : 'rgba(0, 0, 0, 0.3)'};
    border-radius: 20px;
  }

  .glass-card {
    background: ${props => props.theme === 'light' 
      ? 'rgba(255, 255, 255, 0.7)' 
      : 'rgba(22, 33, 62, 0.7)'};
    backdrop-filter: blur(12px);
    border: 1px solid ${props => props.theme.border};
    box-shadow: 0 10px 40px ${props => props.theme.shadow};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    transform: translateY(-5px);
    border-color: ${props => props.theme.primary};
    box-shadow: 0 20px 60px ${props => props.theme.primary}20;
  }

  /* Section Styles */
  section {
    padding: 100px 5%;
    position: relative;
    overflow: hidden;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
    position: relative;
    background: linear-gradient(135deg, ${props => props.theme.primary}, ${props => props.theme.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.primary}, ${props => props.theme.accent});
    border-radius: 2px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    section {
      padding: 60px 20px;
    }
    
    .section-title {
      font-size: 2rem;
    }
  }
`;

export default GlobalStyles;