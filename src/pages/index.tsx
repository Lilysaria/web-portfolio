import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Icons from '../components/Icons/Icons';
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

function Index(): React.ReactElement {
  const [showSection, setShowSection] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [parallaxVisible, setParallaxVisible] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (showSection && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showSection]);

  useEffect(() => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  const handleProjectCreated = () => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data));
  };

  return (
    <div className="">
      <Icons />
      <GreatRift />
      <GlowEffect />
      <Stars />
      <CardButton onProjectCreated={handleProjectCreated} />
      <NavBar
        setShowSection={setShowSection}
        setParallaxVisible={setParallaxVisible}
      />
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-5">
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold mb-12 text-white">
            {/* eslint-disable-next-line */}
            Lilysaria Gaska
          </h1>
          <button
            type="button"
            className="text-lg mt-2 mb-12 hover:underline cursor-pointer text-white bg-transparent border-none"
            onClick={() => setModalOpen('Contact')}
          >
            Contact +
          </button>
          <button
            type="button"
            className="text-lg hover:underline cursor-pointer text-white bg-transparent border-none"
            onClick={() => setModalOpen('About')}
          >
            About +
          </button>
        </div>
        <div
          className="absolute left-1/2 top-0 text-center"
          style={{ transform: 'translateX(-60%)' }}
        >
          <h2 className="text-lg text-white">Web Developer</h2>
          <p className="text-sm mt-1 text-white">Murphy, Oregon</p>
        </div>
      </div>
      <div ref={sectionRef}>
        {showSection === 'work' && (
          <div
            id="work"
            style={{
              margin: 'auto',
              maxWidth: '60rem',
              padding: '0 1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem',
            }}
          >
            {projects
              .filter(project => project.section === 'work')
              .map(project => (
                <ExpandableCard key={project.id} project={project} />
              ))}
          </div>
        )}
        {showSection === 'playground' && (
          <div
            id="playground"
            style={{
              margin: 'auto',
              maxWidth: '60rem',
              padding: '0 1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem',
            }}
          >
            {projects
              .filter(project => project.section === 'playground')
              .map(project => (
                <ExpandableCard key={project.id} project={project} />
              ))}
          </div>
        )}
        {showSection === 'writings' && (
          <div
            id="writings"
            style={{
              margin: 'auto',
              maxWidth: '60rem',
              padding: '0 1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem',
            }}
          >
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
              onClick={() => window.open('path_to_your_resume.pdf', '_blank')}
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
}

export default Index;
