import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GoldLineDrawProps {
  className?: string;
  width?: number | string;
}

export const GoldLineDraw: React.FC<GoldLineDrawProps> = ({
  className = '',
  width = 120,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`flex items-center justify-center my-4 ${className}`}>
      <svg
        width={width}
        height="16"
        viewBox="0 0 160 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-hidden="true"
      >
        {/* Left flourish line */}
        <motion.path
          d="M 10 10 L 65 10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="text-studio-gold"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Center Diamond / Petal Motif */}
        <motion.polygon
          points="80,5 86,10 80,15 74,10"
          fill="currentColor"
          className="text-studio-gold"
          initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        />
        <motion.circle
          cx="80"
          cy="10"
          r="1.8"
          fill="currentColor"
          className="text-studio-cream"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />

        {/* Right flourish line */}
        <motion.path
          d="M 95 10 L 150 10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="text-studio-gold"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
};
