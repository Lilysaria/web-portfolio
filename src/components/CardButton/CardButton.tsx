import React, { useState, FormEvent, ChangeEvent, useContext } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Modal from '../Modal/Modal';
import { Project as ExpandableCardProject } from '../ExpandableCard/ExpandableCard';
import { AuthContext } from '../../../contexts/authContext';

interface CardButtonProps {
  onProjectCreated: () => void;
}

interface Project {
  _id: string;
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  section: 'work' | 'playground' | 'writings';
  detailContent: {
    content: MDXRemoteSerializeResult;
  };
}

function CardButton({ onProjectCreated }: CardButtonProps): JSX.Element {
  const { isLoggedIn } = useContext(AuthContext);
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState<Project>({
    _id: '',
    id: '',
    title: '',
    summary: '',
    imageUrl: '',
    section: 'work',
    detailContent: {
      content: {} as MDXRemoteSerializeResult,
    },
  });

  const handleCreate = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const contentString = newProject.detailContent.content.toString();
    if (!contentString.trim()) {
      return;
    }

    const mdxSource = await serialize(contentString);

    setIsCreating(false);

    // Save the new project with serialized MDX content
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newProject, detailContent: { content: mdxSource } }),
    });

    if (response.ok) {
      onProjectCreated();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    setNewProject((prevState) => ({
      ...prevState,
      detailContent: {
        ...prevState.detailContent,
        content: value as unknown as MDXRemoteSerializeResult, // Cast the value to the correct type
      },
    }));
  };

  return (
    <div className="card-button-container">
      {isLoggedIn && (
        <button type="button" onClick={() => setIsCreating(true)}>Add Project</button>
      )}
      {isCreating && (
        <Modal isOpen={isCreating} closeModal={() => setIsCreating(false)} title="Create Project">
          <form onSubmit={handleCreate}>
            <input type="text" name="title" value={newProject.title} onChange={handleInputChange} placeholder="Title" required />
            <input type="text" name="summary" value={newProject.summary} onChange={handleInputChange} placeholder="Summary" required />
            <input type="text" name="imageUrl" value={newProject.imageUrl} onChange={handleInputChange} placeholder="Image URL" required />
            <textarea
              name="content"
              value={newProject.detailContent.content as unknown as string} // Cast the value to string for the textarea
              onChange={handleContentChange}
              placeholder="Content"
              rows={10}
              required
            />
            <select name="section" value={newProject.section} onChange={handleInputChange} required>
              <option value="work">Work</option>
              <option value="playground">Playground</option>
              <option value="writings">Writings</option>
            </select>
            <button type="submit">Create</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default CardButton;
