import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import Magnetic from './Magnetic';

const FooterContainer = styled.footer`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 212, 255, 0.1);
  padding: 3rem 5%;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00d4ff;
  font-size: 1.2rem;
  border: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: #00d4ff;
    color: #0a0a0f;
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
    transform: translateY(-3px);
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.text};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  svg {
    color: ${props => props.theme.primary};
    animation: heartbeat 1.5s ease infinite;
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const Footer = () => {
  const theme = useTheme();

  return (
    <FooterContainer theme={theme}>
      <FooterContent>
        <SocialLinks>
          <Magnetic>
            <SocialLink
              theme={theme}
              href="https://github.com/mansirathor27"
              target="_blank"
            >
              <FiGithub />
            </SocialLink>
          </Magnetic>
          <Magnetic>
            <SocialLink
              theme={theme}
              href="http://www.linkedin.com/in/mansi-rathor"
              target="_blank"
            >
              <FiLinkedin />
            </SocialLink>
          </Magnetic>
          <Magnetic>
            <SocialLink
              theme={theme}
              href="mailto:mansirathor575@gmail.com"
            >
              <FiMail />
            </SocialLink>
          </Magnetic>
        </SocialLinks>

        <Copyright theme={theme}>
          Made with <FiHeart /> by Mansi Rathor © {new Date().getFullYear()}
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;