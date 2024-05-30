import React from 'react';
import Image from 'next/image';
import './Icons.css';

interface IconProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

function Icon({
  src,
  alt,
  width,
  height,
}: IconProps) {
  return (
    <div className={`icon-wrapper ${alt.toLowerCase().replace(/\s+/g, '-')}`}>
      <Image
        src={src}
        alt={alt}
        className="icon"
        width={width}
        height={height}
      />
      <div className="icon-label">{alt}</div>
    </div>
  );
}

function Icons() {
  return (
    <div className="icons-container">
      <Icon
        src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1714706494/638-6386413_react-logo-png-white-transparent-png_ewwwwa.jpg"
        alt="React"
        width={500}
        height={500}
      />
      <Icon
        src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1714705483/python_w2kvey.png"
        alt="Python"
        width={500}
        height={500}
      />
      <Icon src="" alt="Django" width={500} height={500} />
    </div>
  );
}

export default Icons;
