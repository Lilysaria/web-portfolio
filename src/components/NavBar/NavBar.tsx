import React from 'react';
import './NavBar.css';

/**
 * Props for NavBar component.
 * @prop {Function} setShowSection - Function to set the current section.
 * @prop {Function} setParallaxVisible - Function to set the visibility of the parallax effect.
 */
interface NavbarProps {
  setShowSection: (section: string | null) => void;
  setParallaxVisible: (visible: boolean) => void;
}

/**
 * Navigation bar component that allows users to navigate to different sections of the website.
 *
 * @param {NavbarProps} props - The props for the NavBar component.
 * @returns {JSX.Element} The NavBar component.
 */
function NavBar({ setShowSection, setParallaxVisible }: NavbarProps): JSX.Element {
  /**
   * Handles click events on navigation buttons.
   *
   * @param {string} section - The ID of the section to navigate to.
   */
  function handleClick(section: string) {
    setShowSection(section);
    setParallaxVisible(true);
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="navbar-container">
      <button type="button" className="navbar-button" onClick={() => handleClick('work')}>
        Work
      </button>
      <button type="button" className="navbar-button" onClick={() => handleClick('playground')}>
        Playground
      </button>
      <button type="button" className="navbar-button" onClick={() => handleClick('writings')}>
        Writings
      </button>
    </div>
  );
}

export default NavBar;
