import React, { useEffect, useState } from 'react';
import './NatureParallax.css';

function NatureParallax(): JSX.Element {
  const [scrollEffect, setScrollEffect] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      const distanceFromBottom = scrollHeight - (scrollTop + windowHeight);
      const scrollPercentFromBottom = (distanceFromBottom / windowHeight) * 100;

      if (scrollPercentFromBottom <= 50) {
        const normalizedScroll = Math.min(50 - scrollPercentFromBottom, 10);
        setScrollEffect(normalizedScroll * -2); // negative to move it up
      } else {
        setScrollEffect(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="parallax" />

      <div
        className="extra-layer"
        style={{
          transform: `translateY(${scrollEffect}px)`,
        }}
      />
    </>
  );
}

export default NatureParallax;
