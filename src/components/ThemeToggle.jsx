import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiSun, FiMoon } from 'react-icons/fi';

const ToggleButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme === 'light' 
    ? 'rgba(255, 255, 255, 0.9)' 
    : 'rgba(26, 26, 46, 0.9)'};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme === 'light'
    ? 'rgba(0, 0, 0, 0.1)'
    : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.theme.text};
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <ToggleButton
      theme={{ theme }}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </ToggleButton>
  );
}

export default ThemeToggle;