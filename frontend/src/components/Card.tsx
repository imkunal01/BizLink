import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  neumorphic?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  hover = false,
  gradient = false,
  neumorphic = false,
  glass = false,
  onClick
}: CardProps) {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300';
  
  let variantStyles = 'bg-white shadow-md';
  
  if (gradient) {
    variantStyles = 'bg-gradient-to-br from-white to-neutral-50 shadow-lg';
  } else if (neumorphic) {
    variantStyles = 'neumorphic';
  } else if (glass) {
    variantStyles = 'glass-effect shadow-lg';
  }
  
  const hoverStyles = hover ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : '';
  
  if (onClick) {
    return (
      <motion.div
        whileHover={hover ? { scale: 1.02, y: -4 } : {}}
        whileTap={hover ? { scale: 0.98 } : {}}
        className={`${baseStyles} ${variantStyles} ${hoverStyles} ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={`${baseStyles} ${variantStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
