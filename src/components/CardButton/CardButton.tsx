import React, { useState, FormEvent, ChangeEvent, useContext } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Modal from '../Modal/Modal';
import { AuthContext } from '../../../contexts/authContext';
import { Project } from '../ExpandableCard/ExpandableCard';

interface CardButtonProps {
  onProjectCreated: () => void;
}

function CardButton({ onProjectCreated }: CardButtonProps): JSX.Element {
  const { isLoggedIn } = useContext(AuthContext);
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState<Project>({
    id: '',
    title: '',
    summary: '',
    imageUrl: '',
    section: 'work',
    detailContent: {
      content: '' as unknown as MDXRemoteSerializeResult,
    },
  });

  const handleCreate = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const contentString = newProject.detailContent.content.toString();
    if (!contentString.trim()) {
      return;
    }

    const mdxSource: MDXRemoteSerializeResult = await serialize(contentString);

    setIsCreating(false);

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newProject, detailContent: { content: mdxSource } }),
    });

    if (response.ok) {
      onProjectCreated();
    } else {
      const errorData = await response.json();
      console.error('Failed to create project:', errorData);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setNewProject(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    setNewProject(prevState => ({
      ...prevState,
      detailContent: {
        content: value as unknown as MDXRemoteSerializeResult,
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
            <input type="text" name="title" value={newProject.title} onChange={handleInputChange} placeholder="Title" required  />
            <input type="text" name="summary" value={newProject.summary} onChange={handleInputChange} placeholder="Summary" required />
            <input type="text" name="imageUrl" value={newProject.imageUrl} onChange={handleInputChange} placeholder="Image URL" required />
            <textarea
              name="content"
              value={newProject.detailContent.content as unknown as string}
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
