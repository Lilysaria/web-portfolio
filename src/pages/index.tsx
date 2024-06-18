import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Icons from '../components/Icons/Icons';
import GlowEffect from '../components/GlowEffect/GlowEffect';
import Stars from '../components/Stars/Stars';
import GreatRift from '../components/GreatRift/GreatRift';
import NavBar from '../components/NavBar/NavBar';
import ExpandableCard, { Project } from '../components/ExpandableCard/ExpandableCard';
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
      .then((response) => response.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="">
      <Icons />
      <GreatRift />
      <GlowEffect />
      <Stars />
      <CardButton />
      <NavBar setShowSection={setShowSection} setParallaxVisible={setParallaxVisible} />
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-5">
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold mb-12 text-white">
            {/* eslint-disable-next-line */}
            Lilysaria Gaska
          </h1>
          <button type="button" className="text-lg mt-2 mb-12 hover:underline cursor-pointer text-white bg-transparent border-none" onClick={() => setModalOpen('Contact')}>Contact +</button>
          <button type="button" className="text-lg hover:underline cursor-pointer text-white bg-transparent border-none" onClick={() => setModalOpen('About')}>About +</button>
        </div>
        <div className="absolute left-1/2 top-0 text-center" style={{ transform: 'translateX(-60%)' }}>
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
            {projects.filter((project) => project.section === 'work').map((project) => (
              <ExpandableCard
                key={project.id}
                project={project}
              />
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
            {projects.filter((project) => project.section === 'playground').map((project) => (
              <ExpandableCard
                key={project.id}
                project={project}
              />
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
            {projects.filter((project) => project.section === 'writings').map((project) => (
              <ExpandableCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
      {parallaxVisible && <NatureParallax />}
      <Modal isOpen={modalOpen === 'About'} closeModal={() => setModalOpen(null)} size="small">
        <div className="about-container">
          <Image
            src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1715051973/IMG_20231128_161356_iblitq.jpg"
            alt="Lilysaria Gaska"
            width={300}
            height={300}
          />
          <p>
            I am a front-end developer with a passion for creating visually
            appealing and user-friendly websites. I value collaboration and am
            always eager to adopt new skills and technologies.
          </p>
        </div>
      </Modal>
      <Modal isOpen={modalOpen === 'Contact'} closeModal={() => setModalOpen(null)} size="small">
        <div className="contact-container">
          <p>Contact me via email at:</p>
          <a href="mailto:bloomday56@gmail.com" target="_blank" rel="noopener noreferrer">bloomyday56@gmail.com</a>
          <p>GitHub:</p>
          <a href="https://github.com/Lilysaria" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          <p>LinkedIn:</p>
          <a href="https://www.linkedin.com/in/lilysaria-gaska/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
          <p>Resume:</p>
          <a href="path_to_your_resume.pdf" target="_blank" rel="noopener noreferrer">Download Resume</a>
          <p>Phone:</p>
          <p className="phone-number">541-761-6895</p>
        </div>
      </Modal>
    </div>
  );
}

export default Index;
