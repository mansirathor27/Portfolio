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

const lightTheme = {
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
  background: '#1a1a2e',
  text: '#ffffff',
  primary: '#a363d9',
  secondary: '#4a47a3',
  accent: '#00d4ff',
  cardBg: '#16213e',
  border: '#0f3460',
  shadow: 'rgba(0, 0, 0, 0.3)',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      <div className="app" style={{
        background: theme === 'light' ? lightTheme.background : darkTheme.background,
        color: theme === 'light' ? lightTheme.text : darkTheme.text
      }}>
        <div className="cursor-glow" style={{
          left: mousePosition.x,
          top: mousePosition.y
        }} />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <Navbar />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Certificates />
            <Contact />
            <Footer />
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;