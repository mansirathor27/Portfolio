import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import Preloader from './components/Preloader';

const lightTheme = {
  type: 'light',
  background: '#ffffff',
  text: '#2d3436',
  primary: '#6c5ce7',
  secondary: '#a8a4e6',
  accent: '#00b894',
  cardBg: '#f5f6fa',
  border: '#dfe6e9',
  shadow: 'rgba(0, 0, 0, 0.1)',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

const darkTheme = {
  type: 'dark',
  background: '#0a0a0f',
  text: '#ffffff',
  primary: '#00d4ff',
  secondary: '#6d28d9',
  accent: '#00d4ff',
  cardBg: 'rgba(255, 255, 255, 0.03)',
  border: 'rgba(0, 212, 255, 0.1)',
  shadow: 'rgba(0, 0, 0, 0.5)',
  gradient: 'linear-gradient(135deg, #00d4ff 0%, #6d28d9 100%)'
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" setLoading={setLoading} />
        ) : (
          <motion.div 
            key="main"
            className="app relative"
            style={{
              background: theme === 'light' ? lightTheme.background : darkTheme.background,
              color: theme === 'light' ? lightTheme.text : darkTheme.text,
              minHeight: '100vh'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="cursor-glow" style={{
              left: mousePosition.x,
              top: mousePosition.y
            }} />
            <CustomCursor />
            <CommandPalette 
              isOpen={isPaletteOpen} 
              setIsOpen={setIsPaletteOpen} 
              toggleTheme={toggleTheme}
              theme={theme}
            />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <Navbar />
            <motion.main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Education />
              <Certificates />
              <Contact />
              <Footer />
            </motion.main>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;