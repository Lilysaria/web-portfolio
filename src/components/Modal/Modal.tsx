import React, { ReactNode } from 'react';
import './Modal.css';

/**
 * Interface defining the properties for the Modal component.
 * @interface ModalProps
 * @property {boolean} isOpen - Determines if the modal is open.
 * @property {() => void} closeModal - Function to call when closing the modal.
 * @property {string} title - Title of the modal.
 * @property {ReactNode} children - Content of the modal.
 * @property {'small' | 'large'} [size='large'] - Optional size of the modal, defaults to 'large'.
 */
interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: ReactNode;
  size?: 'small' | 'large';
}

/**
 * Modal component that displays content in a modal dialog.
 *
 * @param {ModalProps} props - The properties passed to the Modal component.
 * @returns {React.ReactElement | null} The Modal component or null if not open.
 */
function Modal({
  isOpen,
  closeModal,
  title,
  children,
  size = 'large',
}: ModalProps): React.ReactElement | null {
  if (!isOpen) return null;

  return (
    <button
      type="button"
      className="modal open"
      onClick={closeModal}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          closeModal();
        }
      }}
      tabIndex={0}
    >
      <div
        className={`modal-container ${size === 'small' ? 'small' : ''} ${title === 'Project' ? 'project-modal' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.stopPropagation();
          }
        }}
        role="presentation"
        tabIndex={-1}
      >
        <div className="img-frame" />
        <div className="hero-content fade-in-text">
          <h1>{title}</h1>
          {children}
        </div>
        <button type="button" onClick={closeModal}>Close</button>
      </div>
    </button>
  );
}

export default Modal;
