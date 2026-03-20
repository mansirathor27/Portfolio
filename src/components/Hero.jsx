import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { useTheme } from 'styled-components';
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const glow = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.background};
  padding: 0 5%;
`;

const BackgroundOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Orb = styled.div`
  position: absolute;
  width: ${props => props.size || '300px'};
  height: ${props => props.size || '300px'};
  background: ${props => props.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: ${float} ${props => props.duration || '8s'} infinite ease-in-out;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
`;

const FloatingShapes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Shape = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '50px'};
  height: ${props => props.size || '50px'};
  background: ${props => props.color || 'rgba(102, 126, 234, 0.1)'};
  border-radius: ${props => props.round ? '50%' : '10px'};
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  animation: ${rotate} ${props => props.duration || '20s'} linear infinite;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 1000px;
`;

const Greeting = styled(motion.span)`
  font-size: 1.2rem;
  color: ${props => props.theme.primary};
  display: block;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Name = styled(motion.h1)`
  font-size: 5rem;
  margin-bottom: 1rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }

  .first-name {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }

  .last-name {
    color: ${props => props.theme.text};
    display: inline-block;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      height: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      opacity: 0.3;
      z-index: -1;
    }
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text};
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  .highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 30%;
      bottom: 0;
      left: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      opacity: 0.2;
      z-index: -1;
    }
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.text}cc;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.8;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin: 2.5rem 0;
  flex-wrap: wrap;
`;

const Button = styled(motion.button)`
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
    }
  }

  &.secondary {
    background: transparent;
    border: 2px solid #667eea;
    color: ${props => props.theme.text};
    
    &:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform: translateY(-3px);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin: 2rem 0;
`;

const SocialIcon = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.cardBg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.5rem;
  text-decoration: none;
  border: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  svg {
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.1);
    
    &::before {
      opacity: 1;
    }
    
    svg {
      color: white;
      transform: scale(1.1);
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  cursor: pointer;
  
  a {
    color: ${props => props.theme.text};
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    
    span {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }

  animation: ${float} 2s ease-in-out infinite;
`;

const TypewriterText = styled(motion.span)`
  display: inline-block;
  position: relative;
  
  &::after {
    content: '|';
    position: absolute;
    right: -8px;
    color: #667eea;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

function Hero() {
  const theme = useTheme();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

 

  useEffect(() => {
     const titles = ['Full Stack Developer', 'Problem Solver', 'MERN Expert', 'Tech Enthusiast'];
    const handleTyping = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Mansi_Rathor_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <HeroSection id="home" ref={ref}>
      <BackgroundOrbs>
        <Orb 
          size="400px" 
          top="-100px" 
          right="-100px"
          duration="10s"
        />
        <Orb 
          size="300px" 
          bottom="-50px" 
          left="-50px"
          duration="15s"
        />
        <Orb 
          size="200px" 
          top="50%" 
          left="30%"
          duration="12s"
        />
      </BackgroundOrbs>

      <FloatingShapes>
        <Shape
          size="60px"
          top="20%"
          left="10%"
          duration="25s"
          round
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <Shape
          size="80px"
          bottom="20%"
          right="15%"
          duration="30s"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <Shape
          size="40px"
          top="30%"
          right="25%"
          duration="20s"
          round
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </FloatingShapes>

      <HeroContent
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <Greeting
          theme={theme}
          variants={itemVariants}
        >
          👋 WELCOME TO MY PORTFOLIO
        </Greeting>

        <Name
          theme={theme}
          variants={itemVariants}
        >
          <span className="first-name">Mansi</span>{' '}
          <span className="last-name">Rathor</span>
        </Name>

        <Title
          theme={theme}
          variants={itemVariants}
        >
          I'm a{' '}
          <span className="highlight">
            <TypewriterText>
              {text}
            </TypewriterText>
          </span>
        </Title>

        <Description
          theme={theme}
          variants={itemVariants}
        >
          Crafting innovative web solutions with modern technologies.
          Passionate about creating seamless user experiences and solving complex problems.
        </Description>

        <ButtonGroup variants={itemVariants}>
          <Button
            className="primary"
            onClick={handleDownloadResume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload style={{ marginRight: '0.5rem' }} />
            Download Resume
          </Button>
          <Button
            className="secondary"
            theme={theme}
            onClick={() => {
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </Button>
        </ButtonGroup>

        <SocialLinks variants={itemVariants}>
          <SocialIcon
            theme={theme}
            href="http://www.linkedin.com/in/mansi-rathor"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLinkedin />
          </SocialIcon>
          <SocialIcon
            theme={theme}
            href="https://github.com/mansirathor27"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub />
          </SocialIcon>
          <SocialIcon
            theme={theme}
            href="mailto:mansirathor575@gmail.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMail />
          </SocialIcon>
        </SocialLinks>
      </HeroContent>

      <ScrollIndicator
        theme={theme}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <a href="#about">
          <FiArrowDown />
          <span>Scroll</span>
        </a>
      </ScrollIndicator>
    </HeroSection>
  );
}

export default Hero;