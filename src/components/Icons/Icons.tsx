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
        src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1721658429/core_orh9sy.png"
        alt="React"
        width={500}
        height={500}
      />
      <Icon
        src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1721662932/icons8-express-js-64_zxdrg1.png"
        alt="Expressjs"
        width={500}
        height={500}
      />
      <Icon
        src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1721660334/5f1c62fe-93dd-4b42-a1c0-c5c0146bce12_nandmk.png"
        alt="mongodb"
        width={500}
        height={500}
      />
        <Icon
        src="https://res.cloudinary.com/dgtqptpu1/image/upload/v1721661175/icons8-nodejs-64_v4a3sp.png"
        alt="node"
        width={500}
        height={500}
      />
    </div>
  );
}

export default Icons;
