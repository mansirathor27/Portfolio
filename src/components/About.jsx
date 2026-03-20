import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { FiUser, FiCode, FiAward } from 'react-icons/fi';
import profileImage from '../assets/images/profile.jpg';
const AboutSection = styled.section`
  min-height: 100vh;
  background: ${props => props.theme.background};
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled(motion.div)`
  width: 350px;   /* control size */
  max-width: 100%;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);

  img {
    width: 100%;
    height: 400px;     /* fixed height */
    object-fit: cover; /* prevents stretching */
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

const ContentContainer = styled(motion.div)``;

const Name = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${props => props.theme.primary}, ${props => props.theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.text};
  margin-bottom: 2rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: ${props => props.theme.cardBg};
  border-radius: 15px;
  border: 1px solid ${props => props.theme.border};
  backdrop-filter: blur(10px);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.primary};
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.text};
`;

const Highlights = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


function About() {
  const theme = useTheme();

  const stats = [
    { value: "250+", label: "Problems Solved" },
    { value: "8.23", label: "Current CGPA" },
    { value: "3+", label: "Projects" }
  ];

  

  return (
    <AboutSection id="about">
      <AboutContainer>
        <ImageContainer
          theme={theme}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={profileImage}
            alt="Mansi Rathor"
          />
        </ImageContainer>

        <ContentContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Name theme={theme}>About Me</Name>
          <Description theme={theme}>
            I’m Mansi, a passionate developer who enjoys turning ideas into interactive and meaningful web applications through code. My interest in technology began with curiosity about how websites work, which later grew into a passion for programming and problem solving. I am currently a final-year B.Tech Computer Science student with a strong interest in Full Stack Development and continuously learning new technologies to improve my skills as a developer.

          </Description>

          <StatsContainer>
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                theme={theme}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <StatValue theme={theme}>{stat.value}</StatValue>
                <StatLabel theme={theme}>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsContainer>

        </ContentContainer>
      </AboutContainer>
    </AboutSection>
  );
}

export default About;