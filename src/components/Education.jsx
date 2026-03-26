import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';

const EducationSection = styled.section`
  min-height: 100vh;
  background: ${props => props.theme.background};
`;

const EducationContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Timeline = styled.div`
  position: relative;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, #00d4ff, #6d28d9);
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.position === 'left' ? 'flex-end' : 'flex-start'};
  padding: 1rem 0;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 50px;
  }
`;

const TimelineContent = styled(motion.div)`
  width: 45%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    border-color: rgba(0, 212, 255, 0.4);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.position === 'left' ? 'right: -10px;' : 'left: -10px;'}
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: #00d4ff;
    box-shadow: 0 0 10px #00d4ff;
    border-radius: 50%;
    border: 3px solid #0a0a0f;

    @media (max-width: 768px) {
      left: -30px;
    }
  }
`;

const Institution = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.primary};
  margin-bottom: 0.5rem;
`;

const Degree = styled.h4`
  font-size: 1.1rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
`;

const Details = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${props => props.theme.accent};
  font-size: 0.9rem;

  svg {
    font-size: 1rem;
  }
`;

const Achievement = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem;
  background: ${props => props.theme.background};
  border-radius: 10px;
  color: ${props => props.theme.primary};
  font-size: 0.9rem;
`;

function Education() {
  const theme = useTheme();

  const educationData = [
    {
      position: 'right',
      institution: "Lovely Professional University",
      degree: "Bachelor of Technology - Computer Science and Engineering",
      location: "Phagwara, Punjab",
      duration: "Aug' 23 – Present",
      cgpa: "8.23",
      achievements: [
        "Solved 150+ coding challenges across platforms",
        "Active participant in hackathons and coding competitions"
      ]
    },
    {
      position: 'left',
      institution: "K.L.G Public School",
      degree: "Intermediate (12th)",
      location: "Saharanpur, Uttar Pradesh",
      duration: "Apr' 22 – Mar' 23",
      percentage: "88.8%",
      achievements: []
    },
    {
      position: 'right',
      institution: "K.L.G Public School",
      degree: "Matriculation (10th)",
      location: "Saharanpur, Uttar Pradesh",
      duration: "Apr' 20 – Mar' 21",
      percentage: "95.6%",
      achievements: []
    }
  ];

  return (
    <EducationSection id="education">
      <EducationContainer>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education Journey
        </motion.h2>

        <Timeline>
          {educationData.map((item, index) => (
            <TimelineItem
              key={index}
              position={item.position}
              initial={{ opacity: 0, x: item.position === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TimelineContent
                theme={theme}
                position={item.position}
                whileHover={{ scale: 1.02 }}
              >
                <Institution theme={theme}>{item.institution}</Institution>
                <Degree theme={theme}>{item.degree}</Degree>
                
                <Details>
                  <DetailItem theme={theme}>
                    <FiCalendar /> {item.duration}
                  </DetailItem>
                  <DetailItem theme={theme}>
                    <FiMapPin /> {item.location}
                  </DetailItem>
                </Details>

                {item.cgpa && (
                  <Achievement theme={theme}>
                    <FiAward /> CGPA: {item.cgpa}
                  </Achievement>
                )}

                {item.percentage && (
                  <Achievement theme={theme}>
                    <FiAward /> Percentage: {item.percentage}
                  </Achievement>
                )}

                {item.achievements && item.achievements.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    {item.achievements.map((achievement, i) => (
                      <Achievement key={i} theme={theme}>
                        <FiAward /> {achievement}
                      </Achievement>
                    ))}
                  </div>
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </EducationContainer>
    </EducationSection>
  );
}

export default Education;