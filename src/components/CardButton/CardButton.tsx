import React, { useState, FormEvent, ChangeEvent, useContext } from 'react';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Modal from '../Modal/Modal';
import { Project } from '../ExpandableCard/ExpandableCard';
import { AuthContext } from '../../../contexts/authContext';
import './CardButton.css';

/**
 * CardButton component for creating new projects.
 * Utilizes React hooks for state management and context for global state access.
 * Incorporates a markdown editor for project content and a modal for the creation form.
 *
 * @returns {JSX.Element} The CardButton component.
 */
function CardButton(): JSX.Element {
  /**
   * Uses the AuthContext to check if the user is logged in.
   */
  const { isLoggedIn } = useContext(AuthContext);

  /**
   * State to manage the creation form visibility.
   */
  const [isCreating, setIsCreating] = useState(false);

  /**
   * State to manage the new project's data.
   */
  const [newProject, setNewProject] = useState<Project>({
    id: '',
    title: '',
    summary: '',
    imageUrl: '',
    section: 'work',
    detailContent: {
      content: '',
    },
  });

  /**
   * Handles the form submission for creating a new project.
   * Prevents the default form submission behavior.
   * Validates the form data and sends a POST request to the server.
   *
   * @param {FormEvent<HTMLFormElement>} event - The form event.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  const handleCreate = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!newProject.detailContent.content.trim()) {
      return;
    }
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    });
    if (!response.ok) {
      const errorData = await response.json();
    }
    setIsCreating(false);
  };

  /**
   * Handles changes to the input fields in the form.
   * Updates the newProject state with the input values.
   *
   * @param {ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} event - The change event.
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setNewProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Handles changes to the markdown content.
   * Updates the newProject state with the markdown content.
   *
   * @param {string} text - The markdown text.
   */
  const handleMarkdownChange = (text: string) => {
    setNewProject((prevState) => ({
      ...prevState,
      detailContent: {
        ...prevState.detailContent,
        content: text,
      },
    }));
  };

  return (
    <div className="card-button-container">
      {isLoggedIn && (
        <button type="button" onClick={() => setIsCreating(true)}>Add Project</button>
      )}
      {isCreating && (
        <Modal isOpen closeModal={() => setIsCreating(false)} title="Create Project">
          <form onSubmit={handleCreate}>
            <input type="text" name="title" value={newProject.title} onChange={handleInputChange} placeholder="Title" required />
            <input type="text" name="summary" value={newProject.summary} onChange={handleInputChange} placeholder="Summary" required />
            <input type="text" name="imageUrl" value={newProject.imageUrl} onChange={handleInputChange} placeholder="Image URL" required />
            <MarkdownEditor
              name="content"
              value={newProject.detailContent.content}
              onChange={({ text }) => handleMarkdownChange(text)}
              renderHTML={(text) => <ReactMarkdown remarkPlugins={[gfm]} children={text} />}
              placeholder="Content"
            />
            <ReactMarkdown remarkPlugins={[gfm]}>{newProject.detailContent.content}</ReactMarkdown>
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
