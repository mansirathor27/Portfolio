import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 2rem;
  background: ${props => props.scrolled 
    ? (props.theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(18, 18, 18, 0.95)')
    : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  letter-spacing: -0.5px;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2.5rem;
  list-style: none;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: ${props => props.theme === 'light' 
      ? 'rgba(255, 255, 255, 0.98)' 
      : 'rgba(18, 18, 18, 0.98)'};
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    z-index: 999;
  }
`;

const NavLink = styled(motion.li)`
  a {
    text-decoration: none;
    color: ${props => props.theme.text};
    font-weight: 500;
    font-size: 1rem;
    position: relative;
    padding: 0.5rem 0;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transition: width 0.3s ease;
    }

    &:hover {
      color: #667eea;
      
      &::before {
        width: 100%;
      }
    }
  }
`;

const MobileMenuBtn = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: ${props => props.theme.text};
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseBtn = styled(motion.div)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2rem;
  cursor: pointer;
  color: ${props => props.theme.text};
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'];

  const scrollToSection = (item) => {
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <NavbarContainer
      theme={theme}
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContent>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('home')}
        >
          Mansi Rathor
        </Logo>

        <MobileMenuBtn onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </MobileMenuBtn>

        <NavLinks theme={theme} isOpen={isOpen}>
          {isOpen && (
            <CloseBtn
              theme={theme}
              onClick={() => setIsOpen(false)}
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <FiX />
            </CloseBtn>
          )}
          
          {navItems.map((item, index) => (
            <NavLink
              key={item}
              theme={theme}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <a href={`#${item.toLowerCase()}`} onClick={(e) => {
                e.preventDefault();
                scrollToSection(item);
              }}>
                {item}
              </a>
            </NavLink>
          ))}
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
}

export default Navbar;