import React from 'react';
import styles from '../styles/animations.module.css';

const SectionTitle = ({ title, subtitle, align = 'center', theme = 'light' }) => {
  // Define text colors based on theme
  const titleColor = theme === 'light' ? 'text-gold' : 'text-white';
  const subtitleColor = theme === 'light' ? 'text-gray-300' : 'text-white';
  
  // Define text alignment
  const alignment = align === 'center' ? 'text-center' : 
                   align === 'left' ? 'text-left' : 
                   align === 'right' ? 'text-right' : 'text-center';
  
  return (
    <div className={`mb-12 ${alignment}`}>
      <h2 
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${titleColor}`}
        data-animation={styles.fadeInUp}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p 
          className={`text-lg max-w-3xl mx-auto ${subtitleColor}`}
          data-animation={styles.fadeInUp}
          data-delay={styles['delay-200']}
        >
          {subtitle}
        </p>
      )}
      
      {/* Decorative line */}
      <div 
        className="w-24 h-1 bg-gold mt-6 mb-2 rounded"
        data-animation={styles.scaleIn}
        data-delay={styles['delay-400']}
        style={{ 
          margin: align === 'center' ? '1.5rem auto' : 
                 align === 'right' ? '1.5rem 0 1.5rem auto' : 
                 '1.5rem 0' 
        }}
      ></div>
    </div>
  );
};

export default SectionTitle; 