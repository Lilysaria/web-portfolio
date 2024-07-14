import React from 'react';
import './StyledMarkdownComponent.css';

const StyledMarkdownComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="styled-markdown">
      {children}
      <div className="styled-markdown-footer">
        <p>Published on: 2024-06-25</p>
        <div className="styled-markdown-tags">
          <span className="tag">React</span>
          <span className="tag">Next.js</span>
          <span className="tag">MDX</span>
        </div>
      </div>
    </div>
  );
};

export default StyledMarkdownComponent;
