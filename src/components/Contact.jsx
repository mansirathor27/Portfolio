import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const ContactSection = styled.section`
  min-height: 100vh;
  background: ${props => props.theme.background};
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.primary};
  font-size: 1.5rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.h4`
  font-size: 0.9rem;
  color: ${props => props.theme.accent};
  margin-bottom: 0.3rem;
`;

const InfoValue = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.text};
`;

const ContactForm = styled(motion.form)`
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  color: ${props => props.theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}40;
  }

  &::placeholder {
    color: ${props => props.theme.text}80;
  }
`;

const TextArea = styled(motion.textarea)`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  color: ${props => props.theme.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}40;
  }

  &::placeholder {
    color: ${props => props.theme.text}80;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, ${props => props.theme.primary}, ${props => props.theme.secondary});
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  background: ${props => props.theme.accent}20;
  border: 1px solid ${props => props.theme.accent};
  border-radius: 10px;
  color: ${props => props.theme.accent};
  text-align: center;
`;

function Contact() {
  const theme = useTheme();
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      form.current.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      label: "Email",
      value: "mansirathor575@gmail.com"
    },
    {
      icon: <FiPhone />,
      label: "Phone",
      value: "+91-8791667081"
    },
    {
      icon: <FiMapPin />,
      label: "Location",
      value: "Phagwara, Punjab, India"
    }
  ];

  return (
    <ContactSection id="contact">
      <ContactContainer>
        <ContactInfo
          theme={theme}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '2rem',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Let's Connect
          </h2>
          
          {contactInfo.map((info, index) => (
            <InfoItem
              key={index}
              theme={theme}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <InfoIcon theme={theme}>{info.icon}</InfoIcon>
              <InfoContent>
                <InfoLabel theme={theme}>{info.label}</InfoLabel>
                <InfoValue theme={theme}>{info.value}</InfoValue>
              </InfoContent>
            </InfoItem>
          ))}
        </ContactInfo>

        <ContactForm
          ref={form}
          theme={theme}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '2rem',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Send Message
          </h2>

          <FormGroup>
            <Input
              theme={theme}
              type="text"
              placeholder="Your Name"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </FormGroup>

          <FormGroup>
            <Input
              theme={theme}
              type="email"
              placeholder="Your Email"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </FormGroup>

          <FormGroup>
            <TextArea
              theme={theme}
              placeholder="Your Message"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </FormGroup>

          <SubmitButton
            theme={theme}
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Sending...' : (
              <>
                Send Message <FiSend />
              </>
            )}
          </SubmitButton>

          {isSuccess && (
            <SuccessMessage
              theme={theme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              Thank you for your message! I'll get back to you soon.
            </SuccessMessage>
          )}
        </ContactForm>
      </ContactContainer>
    </ContactSection>
  );
}

export default Contact;