import React, { useState, useRef } from 'react';
import GithubCommits from '../components/GithubCommits/GithubCommits';
import GlowEffect from '../components/GlowEffect/GlowEffect';
import Stars from '../components/Stars/Stars';
import GreatRift from '../components/GreatRift/GreatRift';
import NavBar from '../components/NavBar/NavBar';
import ExpandableCard, {
  Project,
} from '../components/ExpandableCard/ExpandableCard';
import NatureParallax from '../components/NatureParallax/NatureParallax';
import Modal from '../components/Modal/Modal';
import CardButton from '../components/CardButton/CardButton';
import Starfield from '../components/Starfield/Starfield';

interface Props {
  initialProjects: Project[];
}

const Index: React.FC<Props> = ({ initialProjects }) => {
  const [showSection, setShowSection] = useState<string | null>('work');
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [parallaxVisible, setParallaxVisible] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleProjectCreated = () => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data));
  };

  return (
    <div>
      <Starfield />
      <GithubCommits />
      <GreatRift />
      <GlowEffect />
      <Stars />
      <CardButton onProjectCreated={handleProjectCreated} />
      <NavBar
        setShowSection={setShowSection}
        setParallaxVisible={setParallaxVisible}
      />

      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-5">
        <div className="flex items-center relative">
         
          <h1 className="text-xl font-bold mb-12 text-white mobile-text-smaller mobile-name custom-font">
            Lilysaria Gaska
          </h1>
          <div className="absolute top-full mt-2 left-0 flex flex-col">
            <button
              type="button"
              className="text-lg hover:underline cursor-pointer text-white bg-transparent border-none mb-12"
              onClick={() => setModalOpen('About')}
            >
              About +
            </button>
            <button
              type="button"
              className="text-lg hover:underline cursor-pointer text-white bg-transparent border-none"
              onClick={() => setModalOpen('Contact')}
            >
              Contact +
            </button>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-0 text-center mobile-title custom-font"
          style={{ transform: 'translateX(-60%)' }}
        >
          <h2 className="text-lg text-white mobile-text-smaller-h2">
            Web Developer
          </h2>
          <p className="text-sm mt-1 text-white mobile-text-smaller-p">
            Murphy, Oregon
          </p>
        </div>
      </div>

      <div ref={sectionRef}>
        {showSection === 'work' && (
          <div id="work" style={gridStyle}>
            {projects
              .filter(project => project.section === 'work')
              .map(project => (
                <ExpandableCard key={project.id} project={project} />
              ))}
          </div>
        )}
        {showSection === 'playground' && (
          <div id="playground" style={gridStyle}>
            {projects
              .filter(project => project.section === 'playground')
              .map(project => (
                <ExpandableCard key={project.id} project={project} />
              ))}
          </div>
        )}
        {showSection === 'writings' && (
          <div id="writings" style={gridStyle}>
            {projects
              .filter(project => project.section === 'writings')
              .map(project => (
                <ExpandableCard key={project.id} project={project} />
              ))}
          </div>
        )}
      </div>

      {parallaxVisible && <NatureParallax />}

      <Modal
        isOpen={modalOpen === 'About'}
        closeModal={() => setModalOpen(null)}
        size="small"
        title="About"
      >
        <div className="about-container">
          <div className="hello-header mb-2">
            <h2 className="hello-text">Hello,</h2>
          </div>
          <div className="paragraph-content mt-[-30px]">
            <p>
              My name is Lily, an aspiring web developer living in Oregon.
              Inspired by other developers and the changing web sphere, I hope
              to develop alongside others. I have a passion for front-end and
              back-end technologies and web design. I have discovered my
              favorite approaches are more methodical, with an openness to being
              creative. I am deeply committed to learning the web and am excited
              to continue expanding my knowledge with new technologies like
              state management libraries (such as Redux), TypeScript,
              server-side rendering with Next.js, and Python, as well as
              emerging areas like cloud computing and DevOps.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalOpen === 'Contact'}
        closeModal={() => setModalOpen(null)}
        size="small"
        title="Contact"
      >
        <div className="contact-container text-center">
          <div className="flex flex-col items-center mt-4">
            <button
              className="btn-6 mb-2"
              onClick={() =>
                window.open('mailto:lilysaria@protonmail.com', '_blank')
              }
            >
              <span>lilysaria@protonmail.com</span>
            </button>
            <button
              className="btn-6 mb-2"
              onClick={() =>
                window.open('https://github.com/Lilysaria', '_blank')
              }
            >
              <span>GitHub</span>
            </button>
            <button
              className="btn-6 mb-2"
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/lilysaria-gaska/',
                  '_blank',
                )
              }
            >
              <span>LinkedIn</span>
            </button>
            <button
              className="btn-6 mb-2"
              onClick={() =>
                window.open('https://github.com/Lilysaria/resume/blob/main/Lily%2BGaska%2BResume.pdf', '_blank')
              }
            >
              <span>Resume</span>
            </button>
            <button
              className="btn-6 mb-2"
              onClick={() => (window.location.href = 'tel:+15417616895')}
            >
              <span>541-761-6895</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const gridStyle = {
  margin: 'auto',
  maxWidth: '60rem',
  padding: '0 1rem',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1rem',
};

// fetching data at build time
export async function getStaticProps() {
  const res = await fetch(process.env.API_URL as string);
  const initialProjects: Project[] = await res.json();

  return {
    props: {
      initialProjects,
    },
    revalidate: 10,
  };
}

export default Index;
