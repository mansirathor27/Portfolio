import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) !important;
  width: auto;
  min-width: 60%;
  max-width: 90%;
  padding: 0.5rem 2rem;
  background: rgba(10, 10, 15, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 212, 255, 0.05);
  
  @media (max-width: 768px) {
    width: 90%;
    min-width: 90%;
    top: 10px;
  }
`;

const NavProgress = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 30px;
  right: 30px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  transform-origin: left;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Ensure it takes full width within padding */
`;

const Logo = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: 800;
  color: #fff;
  cursor: pointer;
  letter-spacing: 2px;
  font-family: 'Mono', monospace;
  
  span {
    color: #00d4ff;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  }
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
    background: ${props => props.theme.type === 'light' 
      ? 'rgba(255, 255, 255, 0.98)' 
      : 'rgba(10, 10, 15, 0.98)'};
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
    color: rgba(255, 255, 255, 0.6);
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;

    &:hover {
      color: #00d4ff;
    }
  }
  
  &.active a {
    color: #fff;
    background: rgba(0, 212, 255, 0.1);
    border-radius: 50px;
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
  // const [_scrolled, setScrolled] = useState(false); // Changed to _scrolled to indicate intentionally unused
  const theme = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'];

  const scrollToSection = (item) => {
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <Nav
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.8, type: "spring", damping: 15 }}
    >
      <NavProgress style={{ scaleX }} />
      <NavContent className="!justify-between !mx-0 !max-w-none">
        <Logo
          whileHover={{ scale: 1.02 }}
          onClick={() => scrollToSection('home')}
        >
          Mansi<span>Rathor</span>
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
    </Nav>
  );
}

export default Navbar;