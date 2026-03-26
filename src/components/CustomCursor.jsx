import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useSpring } from 'framer-motion';

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 99999;
`;

const CursorDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background-color: #00d4ff;
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 0 10px #00d4ff;
`;

const CursorOutline = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 212, 255, 0.5);
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    width: 4px;
    height: 4px;
    background: #00d4ff;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s;
  }
`;

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const cursorX = useSpring(0, { stiffness: 1000, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 1000, damping: 40 });
  
  const outlineX = useSpring(0, { stiffness: 500, damping: 30 });
  const outlineY = useSpring(0, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      outlineX.set(e.clientX - 20);
      outlineY.set(e.clientY - 20);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive');
        
      setHovered(isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, outlineX, outlineY]);

  return (
    <CursorWrapper>
      <CursorDot 
        style={{ x: cursorX, y: cursorY }} 
        animate={{ 
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? "#ff0055" : "#00d4ff",
          boxShadow: hovered ? "0 0 20px #ff0055" : "0 0 10px #00d4ff"
        }}
      />
      <CursorOutline 
        style={{ x: outlineX, y: outlineY }} 
        animate={{ 
          scale: hovered ? 1.8 : 1,
          borderColor: hovered ? "rgba(255, 0, 85, 0.5)" : "rgba(0, 212, 255, 0.5)",
          borderWidth: hovered ? "2px" : "1px"
        }}
      />
      {/* Visual Glitch Trail for Premium Feel */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-cyber-purple/30 rounded-full pointer-events-none"
        style={{ x: outlineX, y: outlineY }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: hovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </CursorWrapper>
  );
};

export default CustomCursor;
