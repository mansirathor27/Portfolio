import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiMoon, FiSun, FiSearch } from 'react-icons/fi';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15vh;
`;

const Palette = styled(motion.div)`
  width: 90%;
  max-width: 600px;
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  box-shadow: 0 20px 70px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const SearchInputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid ${props => props.theme.border};
  gap: 1rem;
  color: ${props => props.theme.text}88;
  
  input {
    flex: 1;
    background: transparent;
    border: none;
    color: ${props => props.theme.text};
    font-size: 1.1rem;
    outline: none;
    &::placeholder {
      color: ${props => props.theme.text}44;
    }
  }
`;

const CommandList = styled.div`
  padding: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
`;

const CommandItem = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  gap: 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: ${props => props.theme.text};
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
  transition: all 0.2s ease;

  &:hover, &.selected {
    background: ${props => props.theme.primary}20;
    color: ${props => props.theme.primary};
  }

  .icon {
    font-size: 1.2rem;
  }

  .shortcut {
    margin-left: auto;
    font-size: 0.8rem;
    opacity: 0.5;
    background: ${props => props.theme.background};
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const CommandPalette = ({ isOpen, setIsOpen, toggleTheme, theme }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    { id: 'home', title: 'Go to Home', icon: <FiHome />, action: () => scrollTo('home') },
    { id: 'about', title: 'About Me', icon: <FiUser />, action: () => scrollTo('about') },
    { id: 'skills', title: 'My Skills', icon: <FiCode />, action: () => scrollTo('skills') },
    { id: 'projects', title: 'Projects', icon: <FiBriefcase />, action: () => scrollTo('projects') },
    { id: 'contact', title: 'Contact', icon: <FiMail />, action: () => scrollTo('contact') },
    { 
        id: 'theme', 
        title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, 
        icon: theme === 'dark' ? <FiSun /> : <FiMoon />, 
        action: toggleTheme 
    },
  ];

  const filteredCommands = commands.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (isOpen) {
        if (e.key === 'Escape') setIsOpen(false);
        if (e.key === 'ArrowDown') setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
        if (e.key === 'ArrowUp') setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        if (e.key === 'Enter') {
          filteredCommands[selectedIndex]?.action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <Palette
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            onClick={e => e.stopPropagation()}
          >
            <SearchInputBox>
              <FiSearch />
              <input 
                autoFocus
                placeholder="Search commands..." 
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                }}
              />
              <span className="shortcut">ESC</span>
            </SearchInputBox>
            <CommandList>
              {filteredCommands.map((cmd, index) => (
                <CommandItem
                  key={cmd.id}
                  className={index === selectedIndex ? 'selected' : ''}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  whileHover={{ x: 5 }}
                >
                  <span className="icon">{cmd.icon}</span>
                  {cmd.title}
                  <span className="shortcut">Enter</span>
                </CommandItem>
              ))}
            </CommandList>
          </Palette>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
