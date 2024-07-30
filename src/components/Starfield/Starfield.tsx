import React, { useEffect, useRef } from 'react';

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight);
    const stars = [],
      shootingStars = [],
      layers = [
        { speed: 0.015, scale: 0.2, count: 320 },
        { speed: 0.03, scale: 0.5, count: 50 },
        { speed: 0.05, scale: 0.75, count: 30 },
      ],
      starsAngle = 145,
      shootingStarSpeed = { min: 15, max: 20 },
      shootingStarOpacityDelta = 0.01,
      trailLengthDelta = 0.01,
      shootingStarEmittingInterval = 2000,
      shootingStarLifeTime = 500,
      maxTrailLength = 300,
      starBaseRadius = 2,
      shootingStarRadius = 3;
    let paused = false;

    const particle = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 0,

      create(x: number, y: number, speed: number, direction: number) {
        const obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        obj.vx = Math.cos(direction) * speed;
        obj.vy = Math.sin(direction) * speed;
        obj.opacity = 1;
        obj.trailLengthDelta = 0;
        obj.isSpawning = false;
        obj.isDying = false;
        obj.isDead = false;
        return obj;
      },

      getSpeed() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      },

      setSpeed(speed: number) {
        const heading = this.getHeading();
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
      },

      getHeading() {
        return Math.atan2(this.vy, this.vx);
      },

      setHeading(heading: number) {
        const speed = this.getSpeed();
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
      },

      update() {
        this.x += this.vx;
        this.y += this.vy;
      },
    };

    function randomRange(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    function degreesToRads(degrees: number) {
      return (degrees / 180) * Math.PI;
    }

    for (let j = 0; j < layers.length; j += 1) {
      const layer = layers[j];
      for (let i = 0; i < layer.count; i += 1) {
        const star = particle.create(
          randomRange(0, width),
          randomRange(0, height),
          0,
          0,
        );
        star.radius = starBaseRadius * layer.scale;
        star.setSpeed(layer.speed);
        star.setHeading(degreesToRads(starsAngle));
        stars.push(star);
      }
    }

    function createShootingStar() {
      const shootingStar = particle.create(
        randomRange(width / 2, width),
        randomRange(0, height / 2),
        0,
        0,
      );
      shootingStar.setSpeed(
        randomRange(shootingStarSpeed.min, shootingStarSpeed.max),
      );
      shootingStar.setHeading(degreesToRads(starsAngle));
      shootingStar.radius = shootingStarRadius;
      shootingStar.opacity = 0;
      shootingStar.trailLengthDelta = 0;
      shootingStar.isSpawning = true;
      shootingStar.isDying = false;
      shootingStars.push(shootingStar);
    }

    function killShootingStar(shootingStar) {
      setTimeout(() => {
        shootingStar.isDying = true;
      }, shootingStarLifeTime);
    }

    function update() {
      if (!paused && context) {
        context.clearRect(0, 0, width, height);

        const gradient = context.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#00264d');
        gradient.addColorStop(0.3, '#0074D9');
        gradient.addColorStop(0.7, '#7FDBFF');
        gradient.addColorStop(1, '#B0E0E6');

        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
        context.fill();

        stars.forEach(star => {
          star.update();
          drawStar(star);
          if (star.x > width) {
            star.x = 0;
          }
          if (star.x < 0) {
            star.x = width;
          }
          if (star.y > height) {
            star.y = 0;
          }
          if (star.y < 0) {
            star.y = height;
          }
        });

        shootingStars.forEach((shootingStar, i) => {
          if (shootingStar.isSpawning) {
            shootingStar.opacity =
              (shootingStar.opacity ?? 0) + shootingStarOpacityDelta;
            if (shootingStar.opacity >= 1.0) {
              shootingStar.isSpawning = false;
              killShootingStar(shootingStar);
            }
          }
          if (shootingStar.isDying) {
            shootingStar.opacity =
              (shootingStar.opacity ?? 0) - shootingStarOpacityDelta;
            if (shootingStar.opacity <= 0.0) {
              shootingStar.isDying = false;
              shootingStar.isDead = true;
            }
          }
          shootingStar.trailLengthDelta =
            (shootingStar.trailLengthDelta ?? 0) + trailLengthDelta;

          shootingStar.update();
          if (shootingStar.opacity ?? 0 > 0.0) {
            drawShootingStar(shootingStar);
          }

          if (shootingStar.isDead) {
            shootingStars.splice(i, 1);
          }
        });
      }
      requestAnimationFrame(update);
    }

    function drawStar(star) {
      if (context) {
        context.fillStyle = 'rgb(255, 221, 157)';
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        context.fill();
      }
    }

    function drawShootingStar(p) {
      const x = p.x,
        y = p.y,
        currentTrailLength = maxTrailLength * (p.trailLengthDelta ?? 0),
        pos = lineToAngle(x, y, -currentTrailLength, p.getHeading());

      if (context) {
        context.fillStyle = 'rgba(255, 255, 255, ' + (p.opacity ?? 0) + ')';
        const starLength = 5;
        context.beginPath();
        context.moveTo(x - 1, y + 1);

        context.lineTo(x, y + starLength);
        context.lineTo(x + 1, y + 1);

        context.lineTo(x + starLength, y);
        context.lineTo(x + 1, y - 1);

        context.lineTo(x, y + 1);
        context.lineTo(x, y - starLength);

        context.lineTo(x - 1, y - 1);
        context.lineTo(x - starLength, y);

        context.lineTo(x - 1, y + 1);
        context.lineTo(x - starLength, y);

        context.closePath();
        context.fill();

        context.fillStyle = 'rgba(255, 221, 157, ' + (p.opacity ?? 0) + ')';
        context.beginPath();
        context.moveTo(x - 1, y - 1);
        context.lineTo(pos.x, pos.y);
        context.lineTo(x + 1, y + 1);
        context.closePath();
        context.fill();
      }
    }

    update();

    setInterval(() => {
      if (paused) return;
      createShootingStar();
    }, shootingStarEmittingInterval);

    window.onfocus = () => {
      paused = false;
    };

    window.onblur = () => {
      paused = true;
    };

    let resizeTimeout;
    window.onresize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 100);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default Starfield;

function lineToAngle(x1, y1, length, radians) {
  const x2 = x1 + length * Math.cos(radians),
    y2 = y1 + length * Math.sin(radians);
  return { x: x2, y: y2 };
}
