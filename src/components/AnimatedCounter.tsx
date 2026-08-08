import React, { useEffect, useState, useRef } from 'react';
import { animate, useInView, useReducedMotion, motion } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  duration = 1.8,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      setIsCompleted(true);
      return;
    }

    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
        onComplete: () => {
          setCount(target);
          setIsCompleted(true);
        },
      });

      return () => controls.stop();
    }
  }, [isInView, target, duration, shouldReduceMotion]);

  return (
    <motion.span
      ref={ref}
      animate={isCompleted ? { scale: [1, 1.12, 1] } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`inline-block font-serif ${className}`}
    >
      {count}
      {suffix}
    </motion.span>
  );
};
