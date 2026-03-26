import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { FiAward, FiExternalLink, FiCalendar } from 'react-icons/fi';

const CertificatesSection = styled.section`
  min-height: 50vh;
  background: ${props => props.theme.background};
`;

const CertificatesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const CertificateCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 212, 255, 0.4);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #00d4ff, #6d28d9);
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
  }
`;

const CertificateIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.primary};
  margin-bottom: 1rem;
`;

const CertificateTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
`;

const CertificateIssuer = styled.p`
  color: ${props => props.theme.primary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const CertificateDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${props => props.theme.accent};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const CertificateLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

function Certificates() {
  const theme = useTheme();

  const certificates = [
    {
      title: "HackWithVertos 1.0 - 24 Hour Hackathon",
      issuer: "Lovely Professional University",
      date: "Jul '25",
      link: "https://github.com/mansirathor27/Certificates/blob/main/hackathon.pdf"
    },
    {
      title: "NPTEL Certification in Cloud Computing",
      issuer: "IIT Kharagpur",
      date: "Apr '25",
      link: "https://github.com/mansirathor27/Certificates/blob/main/Cloud%20Computing%20(1).pdf"
    },
    {
      title: "Mastering Data Structure and Algorithms Using C++",
      issuer: "LPU",
      date: "Nov '24",
      link: "https://github.com/mansirathor27/Certificates/blob/main/summerTraining.pdf"
    }
  ];

  return (
    <CertificatesSection id="certificates">
      <CertificatesContainer>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </motion.h2>

        <CertificatesGrid>
          {certificates.map((cert, index) => (
            <CertificateCard
              key={index}
              theme={theme}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <CertificateIcon theme={theme}>
                <FiAward />
              </CertificateIcon>
              <CertificateTitle theme={theme}>{cert.title}</CertificateTitle>
              <CertificateIssuer theme={theme}>{cert.issuer}</CertificateIssuer>
              <CertificateDate theme={theme}>
                <FiCalendar /> {cert.date}
              </CertificateDate>
              <CertificateLink
                theme={theme}
                href={cert.link}
                target="_blank"
                whileHover={{ x: 5 }}
              >
                View Certificate <FiExternalLink />
              </CertificateLink>
            </CertificateCard>
          ))}
        </CertificatesGrid>
      </CertificatesContainer>
    </CertificatesSection>
  );
}

export default Certificates;