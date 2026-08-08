import React, { useEffect, useRef } from 'react';

interface PetalParticlesProps {
  className?: string;
}

export const PetalParticles: React.FC<PetalParticlesProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;

    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle definition: mixture of falling rose/blush petals and soft gold glowing dust
    const particleCount = Math.min(Math.floor(window.innerWidth / 50), 22);
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      type: 'petal' | 'dust';
      color: string;
    }

    const petalsColors = [
      'rgba(244, 219, 216, 0.25)', // Soft blush
      'rgba(223, 211, 195, 0.22)', // Studio light gold
      'rgba(197, 168, 128, 0.28)', // Studio gold
      'rgba(250, 248, 245, 0.18)', // Cream accent
    ];

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 3,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: Math.sin(Math.random() * Math.PI) * 0.25,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      opacity: Math.random() * 0.25 + 0.1,
      type: Math.random() > 0.4 ? 'petal' : 'dust',
      color: petalsColors[Math.floor(Math.random() * petalsColors.length)],
    }));

    const drawPetal = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      
      // Draw an elegant organic petal path
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.7, size * 0.6, 0, size);
      ctx.bezierCurveTo(-size * 0.7, size * 0.6, -size * 0.8, -size * 0.5, 0, -size);
      ctx.fill();
      ctx.restore();
    };

    const drawDust = (x: number, y: number, size: number, color: string) => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.3 + p.speedX;
        p.rotation += p.rotationSpeed;

        // Wrap around top/bottom and sides
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        if (p.type === 'petal') {
          drawPetal(p.x, p.y, p.size, p.rotation, p.color);
        } else {
          drawDust(p.x, p.y, p.size, p.color);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
