import React from 'react';
import './Icons.css';


interface IconProps {
  src: string;
  alt: string;
}

const Icon: React.FC<IconProps> = ({ src, alt }) => {
  return (
    <div className={`icon-wrapper ${alt.toLowerCase().replace(/\s+/g, '-')}`}> 
      <img src={src} alt={alt} className="icon" />
      <div className="icon-label">{alt}</div>
    </div>
  );
};

const Icons: React.FC = () => {
  return (
    <div className="icons-container">
      <Icon src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1714706494/638-6386413_react-logo-png-white-transparent-png_ewwwwa.jpg" alt="React" />
      <Icon src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1714705483/python_w2kvey.png" alt="Python" />
      <Icon src="" alt="Django" />
    </div>
  );
};

export default Icons;
