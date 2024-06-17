import React, { useState, useContext } from 'react';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import Modal from '../Modal/Modal';
import { AuthContext } from '../../../contexts/authContext';
import './ExpandableCard.css';

/**
 * Structure of a project.
 */
export interface Project {
  _id: string;
  title: string;
  summary: string;
  imageUrl: string;
  section: 'work' | 'playground' | 'writings';
  detailContent: {
    content: string;
  };
}

/**
 * Defines props for ExpandableCard component.
 */
interface ExpandableCardProps {
  project: Project;
}

/**
 * Displays a project card with options to expand for more details or delete.
 * @param {ExpandableCardProps} props - Component props.
 * @returns {JSX.Element} Rendered component.
 */
function ExpandableCard({ project }: ExpandableCardProps): JSX.Element {
  const { isLoggedIn } = useContext(AuthContext);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  /**
   * Toggles the expanded view of the project card.
   * @param {string} title - Project title.
   */
  const toggleExpand = (title: string) => {
    setExpandedProject(expandedProject === title ? null : title);
  };

  /**
   * Deletes the project via a DELETE request.
   */
  const deleteProject = async () => {
    console.log('Deleting project with id:', project._id);
    try {
      const response = await fetch('/api/projects', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: project._id }),
      });
    } catch (error) {
      console.error('Failed to delete the project:', error);
    }
  };

  return (
    <div className="card-container">
      <button type="button" className="card" onClick={() => toggleExpand(project.title)} tabIndex={0}>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover object-center" />
          <div className="p-4">
            <h2 className="font-bold text-lg">{project.title}</h2>
            <p className="text-gray-600">{project.summary}</p>
          </div>
        </div>
      </button>
      {isLoggedIn && (
        <button type="button" onClick={deleteProject}>Delete</button>
      )}
      {expandedProject === project.title && (
        <Modal
          isOpen
          closeModal={() => toggleExpand(project.title)}
        >
          <div className="project-details">
            <ReactMarkdown remarkPlugins={[gfm]}>{project.detailContent.content}</ReactMarkdown>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ExpandableCard;
