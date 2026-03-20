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
  background: #667eea;
  color: white;
}

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
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .app {
    position: relative;
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
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
      ? 'rgba(255, 255, 255, 0.25)' 
      : 'rgba(255, 255, 255, 0.05)'};
    backdrop-filter: blur(10px);
    border: 1px solid ${props => props.theme === 'light'
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(255, 255, 255, 0.1)'};
    box-shadow: 0 8px 32px 0 ${props => props.theme === 'light'
      ? 'rgba(31, 38, 135, 0.2)'
      : 'rgba(0, 0, 0, 0.4)'};
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