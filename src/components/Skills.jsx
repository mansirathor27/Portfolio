import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { useTheme } from 'styled-components';
import { 
  // Programming Languages
  SiCplusplus, 
  SiJavascript, 
  SiPython, 
  SiPhp, 
  SiOpenjdk,
  
  // Frontend
  SiHtml5, 
  Si1001Tracklists, 
  SiTailwindcss, 
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiFigma,
  
  // Backend & Tools
  SiNodedotjs, 
  SiExpress,
  SiMysql, 
  SiMongodb, 
  SiGit, 
  SiGithub,
  SiPostgresql,
} from 'react-icons/si';

const glowPulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 5px rgba(102, 126, 234, 0.5)); }
  50% { filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.8)); }
`;


const SkillsSection = styled.section`
  min-height: 100vh;
  background: ${props => props.theme.background};
  padding: 100px 5%;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #667eea, #764ba2, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &::before {
    content: 'SKILLS';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 8rem;
    font-weight: 800;
    color: ${props => props.theme.text};
    opacity: 0.03;
    white-space: nowrap;
    z-index: -1;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    
    &::before {
      font-size: 4rem;
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(motion.div)`
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  min-width: 0;   /* ✅ VERY IMPORTANT */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #667eea, #764ba2, #ff6b6b);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-10px) rotateX(5deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #667eea;
  animation: ${glowPulse} 3s infinite;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.text};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 3px;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  background: ${props => props.theme.background};
  border-radius: 15px;
  transition: all 0.3s ease;
  min-width: 0;
  
  &:hover {
    background: linear-gradient(135deg, #667eea20, #764ba220);
    transform: translateX(10px);
  }
`;

const SkillIcon = styled.div`
  font-size: 1.5rem;
  color: #667eea;
  min-width: 30px;
`;

const SkillName = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.text};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;   /* ✅ prevents pushing */
`;

const SkillLevel = styled.div`
  width: 80px;
  min-width: 80px;
  height: 6px;
  background: ${props => props.theme.border};
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.level || '0%'};
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 3px;
    animation: skillFill 1.5s ease-out forwards;
  }
  
  @keyframes skillFill {
    from { width: 0; }
    to { width: ${props => props.level || '0%'}; }
  }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
  background: ${props => props.color || 'linear-gradient(135deg, #667eea20, #764ba220)'};
  border-radius: ${props => props.round ? '50%' : '30%'};
  filter: blur(40px);
  z-index: 1;
  pointer-events: none;
`;

const ExpandButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

function Skills() {
  const theme = useTheme();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const skillCategories = [
    {
      id: 1,
      title: 'Languages',
      icon: '💻',
      color: '#667eea',
      skills: [
        { name: 'C++', icon: SiCplusplus, level: '90%' },
        { name: 'C', icon: SiOpenjdk, level: '85%' },
        { name: 'JavaScript', icon: SiJavascript, level: '88%' },
        { name: 'Python', icon: SiPython, level: '85%' },
        { name: 'PHP', icon: SiPhp, level: '80%' },
        { name: 'Java', icon: SiOpenjdk, level: '82%' },
      ]
    },
    {
      id: 2,
      title: 'Frontend',
      icon: '🎨',
      color: '#764ba2',
      skills: [
        { name: 'HTML5', icon: SiHtml5, level: '95%' },
        { name: 'CSS3', icon: Si1001Tracklists, level: '92%' },
        { name: 'Tailwind', icon: SiTailwindcss, level: '88%' },
        { name: 'React', icon: SiReact, level: '85%' },
        { name: 'Next.js', icon: SiNextdotjs, level: '75%', expanded: true },
        { name: 'Redux', icon: SiRedux, level: '80%', expanded: true },
        { name: 'Figma', icon: SiFigma, level: '70%', expanded: true }
      ]
    },
    {
      id: 3,
      title: 'Backend & Tools',
      icon: '⚙️',
      color: '#ff6b6b',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, level: '85%' },
        { name: 'Express', icon: SiExpress, level: '85%' },
        { name: 'MySQL', icon: SiMysql, level: '80%' },
        { name: 'MongoDB', icon: SiMongodb, level: '82%' },
        { name: 'Git', icon: SiGit, level: '90%' },
        { name: 'GitHub', icon: SiGithub, level: '90%' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: '70%', expanded: true },
    
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <SkillsSection id="skills">
      {/* Background floating shapes */}
      <FloatingShape
        size="200px"
        style={{ top: '10%', left: '5%', position: 'absolute' }}
        round
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <FloatingShape
        size="180px"
        style={{ bottom: '10%', right: '5%', position: 'absolute' }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <SkillsContainer>
        <SectionTitle
          theme={theme}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technical Expertise
        </SectionTitle>

        <SkillsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category) => (
            <SkillCard
              key={category.id}
              theme={theme}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <CardIcon>{category.icon}</CardIcon>
              <CardTitle theme={theme}>{category.title}</CardTitle>
              
              <SkillsList>
                {(expandedCategory === category.id 
                  ? category.skills 
                  : category.skills.filter(s => !s.expanded)
                ).map((skill, skillIndex) => {
                  const IconComponent = skill.icon;
                  return (
                    <SkillItem
                      key={skillIndex}
                      theme={theme}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <SkillIcon>
                        <IconComponent />
                      </SkillIcon>
                      <SkillName theme={theme}>{skill.name}</SkillName>
                      <SkillLevel level={skill.level} />
                    </SkillItem>
                  );
                })}
              </SkillsList>

              {category.skills.filter(s => s.expanded).length > 0 && (
                <ExpandButton
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedCategory === category.id ? 'Show Less' : 'Show More'}
                </ExpandButton>
              )}
            </SkillCard>
          ))}
        </SkillsGrid>
      </SkillsContainer>
    </SkillsSection>
  );
}

export default Skills;