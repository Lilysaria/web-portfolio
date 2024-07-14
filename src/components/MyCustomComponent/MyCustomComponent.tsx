import React from 'react';

interface MyCustomComponentProps {
  children: React.ReactNode;
}

const MyCustomComponent: React.FC<MyCustomComponentProps> = ({ children }) => {
  return (
    <div style={{ padding: '20px', margin: '20px 0', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      {children}
    </div>
  );
};

export default MyCustomComponent;
