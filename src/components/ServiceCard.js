import React from 'react';
import Link from 'next/link';
import { ImageWrapper } from './ImageWrapper';
import styles from '../styles/animations.module.css';

const ServiceCard = ({ title, description, iconPath, link, index = 0 }) => {
  // Calculate delay based on index (for staggered animations)
  const delayClass = `delay-${(index % 8) * 100 + 100}`;
  
  return (
    <div 
      className="glass rounded-lg overflow-hidden h-full flex flex-col"
      data-animation={styles.fadeInUp}
      data-delay={styles[delayClass]}
    >
      <div className="p-6 flex-grow">
        <div 
          className={`w-16 h-16 mb-4 bg-gold rounded-full flex items-center justify-center ${styles.pulse}`}
          data-animation={styles.scaleIn}
          data-delay={styles[`delay-${200 + index * 100}`]}
        >
          {iconPath ? (
            <ImageWrapper 
              src={iconPath} 
              alt={`${title} icon`} 
              width={32} 
              height={32}
              className="text-black"
            />
          ) : (
            <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        
        <h3 
          className="text-xl font-bold mb-3 text-gold"
          data-animation={styles.fadeIn}
          data-delay={styles[`delay-${300 + index * 100}`]}
        >
          {title}
        </h3>
        
        <p 
          className="text-gray-300 mb-4"
          data-animation={styles.fadeIn}
          data-delay={styles[`delay-${400 + index * 100}`]}
        >
          {description}
        </p>
      </div>
      
      <div className="p-6 pt-0 mt-auto">
        {link && (
          <Link href={link}>
            <span className={`text-gold hover:text-yellow-400 font-medium inline-flex items-center transition duration-300 ${styles.hoverLift}`}>
              Learn More
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ServiceCard; 