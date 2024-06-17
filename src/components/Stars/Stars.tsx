import React, { useEffect, useRef } from 'react';
import './Stars.css';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
}

// Stars component that creates an animated starry background
function Stars(): JSX.Element {
  // useRef is used to create a reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Get the canvas and context
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d')!;
    let animationFrameId: number;

    // Set the canvas to full screen
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;

    // Function to create stars with random properties
    const createStars = (count: number): Star[] => {
      const stars: Star[] = Array.from({ length: count }, () => {
        const x = Math.random() * canvas!.width * 0.4 + canvas!.width * 0.3;
        const y = Math.random() * canvas!.height;
        const size = Math.random() * 2 + 1;
        const speed = Math.random() * 0.1 + 0.05;
        return {
          x,
          y,
          size,
          speed,
        };
      });

      return stars;
    };

    // Create the stars
    const stars = createStars(100);

    // Function to move stars
    const moveStars = (): void => {
      stars.forEach((star, index) => {
        const newY = star.y - star.speed;
        if (newY < 0) {
          stars[index] = {
            ...star,
            y: canvas!.height,
          };
        } else {
          stars[index] = {
            ...star,
            y: newY,
          };
        }
      });
    };

    // Function to draw stars
    const drawStars = (): void => {
      // Clear the canvas before drawing
      context.clearRect(0, 0, canvas!.width, canvas!.height);
      // Set the color of the stars
      context.fillStyle = 'white';
      // Draw each star
      stars.forEach((star) => {
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();
      });
    };

    // Function to animate the stars
    const animate = (): void => {
      moveStars();
      drawStars();
      // Request the next animation frame
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation
    animate();

    // Clean up function to cancel the animation when the component unmounts
    // to prevent memory leaks
    return (): void => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Render the canvas
  return <canvas ref={canvasRef} className="canvas" />;
}

export default Stars;