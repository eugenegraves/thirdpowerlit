import React from 'react';
import Link from 'next/link';
import styles from '../styles/animations.module.css';

const Button = ({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  animateHover = true,
  animateEntry = false,
  animationDelay = 0,
  className = '',
  ...props 
}) => {
  // Define button styles based on variant
  const variantClasses = {
    primary: 'bg-gold text-black hover:bg-yellow-600 transition-colors duration-300',
    secondary: 'border-2 border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-300',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-black transition-colors duration-300',
    ghost: 'text-gold hover:text-yellow-400 transition-colors duration-300'
  };

  // Define button sizes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  // Animation classes
  const hoverAnimClass = animateHover ? styles.hoverLift : '';
  
  // Calculate base classes
  const baseClasses = `
    font-medium rounded-lg inline-flex items-center justify-center
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${fullWidth ? 'w-full' : ''}
    ${hoverAnimClass}
    ${className}
  `.trim();

  // Data attributes for entry animation
  const animationProps = animateEntry ? {
    'data-animation': styles.fadeInUp,
    'data-delay': styles[`delay-${animationDelay}`]
  } : {};

  // Return link or button based on href
  if (href) {
    return (
      <Link href={href}>
        <span className={baseClasses} {...animationProps} {...props}>
          {children}
        </span>
      </Link>
    );
  }

  return (
    <button 
      className={baseClasses}
      onClick={onClick}
      type={props.type || 'button'}
      {...animationProps}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 