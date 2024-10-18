import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Modal from '../Modal/Modal';
import MyCustomComponent from '../MyCustomComponent/MyCustomComponent';
import StyledMarkdownComponent from '../StyledMarkdownComponent/StyledMarkdownComponent';
import { AuthContext } from '../../../contexts/authContext';
import './ExpandableCard.css';

export interface Project {
  _id?: string;
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  section: 'work' | 'playground' | 'writings';
  detailContent: {
    content: MDXRemoteSerializeResult;
  };
}

interface ExpandableCardProps {
  project: Project;
}

function ExpandableCard({ project }: ExpandableCardProps): JSX.Element {
  const { isLoggedIn } = useContext(AuthContext);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleExpand = (title: string) => {
    setExpandedProject(expandedProject === title ? null : title);
  };

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
      <button
        type="button"
        className="card w-full h-full"
        onClick={() => toggleExpand(project.title)}
        tabIndex={0}
      >
        <div className="bg-blue shadow-md rounded-lg overflow-hidden relative w-full h-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-40 object-cover object-center"
            width={500}
            height={200}
            onLoadingComplete={() => console.log('Image loaded!')}
          />
          <div className="p-4">
            <h2 className="font-bold text-lg">{project.title}</h2>
            <p className="text-gray-600">{project.summary}</p>
          </div>
          <div className="learn-more-overlay">
            <span>Learn more</span>
          </div>
        </div>
      </button>
      {isLoggedIn && (
        <button type="button" onClick={deleteProject}>
          Delete
        </button>
      )}
      {expandedProject === project.title && (
        <Modal
          isOpen
          closeModal={() => toggleExpand(project.title)}
          title={project.title}
        >
          <div className="project-details">
            <MDXRemote
              {...project.detailContent.content}
              components={{ MyCustomComponent, StyledMarkdownComponent }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ExpandableCard;
