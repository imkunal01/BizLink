import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-lime-400 to-cyan-400 text-neutral-900 hover:shadow-lg hover:scale-105 focus:ring-lime-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    secondary: 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:scale-105 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    outline: 'border-2 border-neutral-300 text-neutral-700 hover:border-lime-400 hover:text-lime-600 hover:bg-lime-50 focus:ring-lime-400 disabled:opacity-50 disabled:cursor-not-allowed',
    subtle: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus:ring-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed'
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </motion.button>
  );
}
