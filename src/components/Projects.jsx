import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import resumeImage from "../assets/images/resumebuilderimage.png";
import contactImage from "../assets/images/contactmanagement.jpg";
import bankerImage from "../assets/images/bankeralgorithm.jpg";
import ChatImage from "../assets/images/chatappimage.jpg";
import { 
  FiGithub, 
  FiClock, 

} from 'react-icons/fi';

const ProjectsSection = styled.section`
  min-height: 100vh;
  background: ${props => props.theme.background};
  padding: 70px 5%;
  position: relative;
  overflow: hidden;
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #667eea, #764ba2, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  &::before {
    content: 'PROJECTS';
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

const ProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.border};
  border-radius: 25px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
  
  &:hover {
    box-shadow: 0 30px 60px rgba(102, 126, 234, 0.3);
  }
`;

const ProjectImageContainer = styled(motion.div)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px;
  
  @media (max-width: 968px) {
    height: 220px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    ${props => props.theme.cardBg} 100%
  );
  pointer-events: none;
`;

const ProjectContent = styled.div`
  padding:  1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
`;



const ProjectTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ProjectDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.accent};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.text};
  margin-bottom: 2rem;
  overflow-wrap: break-word;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
`;

const TechTag = styled(motion.span)`
  padding: 0.5rem 1.2rem;
  background: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.primary};
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-color: transparent;
  }
`;



const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.7rem 1.2rem;
  flex-wrap: wrap;
  margin-top: auto;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &.live {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.5);
    }
  }
  
  &.github {
    background: transparent;
    border: 2px solid #667eea;
    color: #667eea;
    
    &:hover {
      background: #667eea;
      color: white;
      transform: translateY(-3px);
    }
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
`;

const NavButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    border-color: ${props => props.theme.border};
    color: ${props => props.theme.text};
  }
  
  &:not(:disabled):hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-color: transparent;
    transform: translateX(${props => props.direction === 'prev' ? '-5px' : '5px'});
  }
`;

const PageIndicator = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 2rem 0;
`;

const PageDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #667eea, #764ba2)'
    : props.theme.border
  };
  cursor: pointer;
  transition: width 0.3s ease;
  
  &:hover {
    width: 24px;
  }
`;

function Projects() {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 2;



  const projects = [
    {
      id: 1,
      title: "AI-Powered Resume Builder",
      date: "October 2025",
      description: "A revolutionary full-stack MERN application that leverages artificial intelligence to help users create professional resumes. Features include AI-powered content generation for summaries and experience descriptions, multiple customizable templates, and real-time preview. The platform uses natural language processing to suggest improvements and optimize resume content for better job matching.",
      longDescription: "This intelligent resume builder goes beyond simple templates by analyzing job descriptions and suggesting relevant skills and experiences. Users can import their LinkedIn profiles, track application status, and receive analytics on their resume's performance. The AI engine learns from successful resumes to provide personalized recommendations.",
      tech: ["React.js", "Node.js", "MongoDB", "Express", "OpenAI API", "Tailwind CSS"],
      features: [
        "AI-powered content suggestions",
        "Multiple professional templates",
        "Real-time PDF generation",
        "ATS keyword optimization",
        "Analytics dashboard"
      ],

      githubLink: "https://github.com/mansirathor27/ResumeBuilder",
      image: resumeImage,
    },
    {
      id: 2,
      title: "Contact Management System",
      date: "May 2025",
      description: "A sophisticated contact management solution designed for businesses and individuals. This responsive web application offers secure authentication, comprehensive CRUD operations, and advanced features like smart contact grouping, import/export capabilities, and activity tracking. The system includes a beautiful dashboard with analytics and insights.",
      longDescription: "Built with scalability in mind, this system can handle thousands of contacts with lightning-fast search and filtering. Features include custom fields, tags, notes, and interaction history. The application also integrates with email services for bulk communications and provides API access for third-party integrations.",
      tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Chart.js"],
      features: [
        "Advanced search & filtering",
        "CSV/Excel import/export",
        "Activity tracking",
        "Custom fields",
        "Analytics dashboard"
      ],
      
      githubLink: "https://github.com/mansirathor27/Contact-Management-System",
      image: contactImage,
    },
    {
      id: 3,
      title: "Banker's Algorithm Simulator",
      date: "May 2025",
      description: "An interactive educational tool that visualizes the Banker's Algorithm for deadlock avoidance in operating systems. This Python-based simulator helps students understand complex OS concepts through real-time visualization of process allocation, resource requests, and safety algorithm execution.",
      longDescription: "The simulator provides step-by-step visualization of the Banker's Algorithm, allowing users to input custom process and resource configurations. It features animated state transitions, safety checks, and detailed explanations of each step. Perfect for computer science students and educators.",
      tech: ["Python", "Tkinter", "Matplotlib", "NetworkX"],
      features: [
        "Interactive visualization",
        "Custom process/resource input",
        "Step-by-step execution",
        "Safety algorithm demonstration",
        "Export simulation results"
      ],
      githubLink: "https://github.com/akshat2508/Bankers-algorithm-simulator",
      image: bankerImage
    },
    {
  id: 4,
  title: "Chatty - Real-Time Chat Application",
  date: "May 2025",
  description: "A real-time chat application that enables users to communicate instantly without refreshing the page. Built using modern web technologies, it provides seamless messaging with a responsive and user-friendly interface.",
  longDescription: "Chatty is a full-stack real-time messaging application developed as a group project. The platform allows multiple users to join and exchange messages instantly using WebSockets. The frontend is built with React.js for a dynamic and responsive UI, while Node.js and Express handle the backend services. The application ensures smooth real-time communication, efficient message handling, and a clean chat interface. This project helped in understanding how real-time systems work and how frontend and backend integrate in a full-stack application.",
  tech: ["React.js", "Node.js", "Express.js", "WebSockets", "CSS3"],
  features: [
    "Real-time messaging without page refresh",
    "Multiple users chat support",
    "Responsive chat interface",
    "Instant message updates",
    "Full-stack integration"
  ],
  githubLink: "https://github.com/neetka/chat-app",
  image: ChatImage
}
    
  ];

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = currentPage * projectsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  return (
    <ProjectsSection id="projects">
      <ProjectsContainer>
        <SectionTitle
          theme={theme}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Work
        </SectionTitle>

        <ProjectsWrapper>
          <AnimatePresence mode="wait">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                theme={theme}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                layout
              >
                <ProjectImageContainer
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectImage 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                  />
                  <ImageOverlay theme={theme} />
                </ProjectImageContainer>

                <ProjectContent>
                  

                  <ProjectTitle theme={theme}>{project.title}</ProjectTitle>
                  
                  <ProjectDate theme={theme}>
                    <FiClock /> {project.date}
                  </ProjectDate>

                  <ProjectDescription theme={theme}>
                    {project.description}
                  </ProjectDescription>

                  <TechStack>
                    {project.tech.map((tech, i) => (
                      <TechTag
                        key={i}
                        theme={theme}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </TechTag>
                    ))}
                  </TechStack>



                  <ProjectLinks>
                    <ProjectLink
                      className="github"
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub /> View Code
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsWrapper>

        <PageIndicator>
          {[...Array(totalPages)].map((_, i) => (
            <PageDot
              key={i}
              theme={theme}
              active={currentPage === i}
              onClick={() => setCurrentPage(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </PageIndicator>

        <NavigationButtons>
          <NavButton
            direction="prev"
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Previous Projects
          </NavButton>
          <NavButton
            direction="next"
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Projects →
          </NavButton>
        </NavigationButtons>
      </ProjectsContainer>
    </ProjectsSection>
  );
}

export default Projects;