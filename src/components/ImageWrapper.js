import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/ImageWrapper.module.css';

/**
 * A wrapper component for Next.js Image with improved loading states
 * and animation support.
 */
export const ImageWrapper = ({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  sizes = '100vw',
  priority = false,
  quality = 80,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  
  // Fallback image
  const fallbackSrc = '/images/placeholder.jpg';
  
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.imageContainer}>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
          </div>
        )}
        
        {hasError ? (
          <>
            <Image
              src={fallbackSrc}
              alt={`Failed to load image: ${alt}`}
              className={styles.placeholderImage}
              fill={fill}
              width={!fill ? width : undefined}
              height={!fill ? height : undefined}
              sizes={sizes}
              priority={priority}
              quality={quality}
              {...props}
            />
            <div className={styles.error}>
              <span className={styles.errorIcon}>⚠️</span>
              <p>Image could not be loaded</p>
            </div>
          </>
        ) : (
          <Image
            src={src}
            alt={alt || "Image"}
            className={isLoading ? 'opacity-0' : 'opacity-100'}
            style={{ transition: 'opacity 0.3s ease' }}
            onLoad={handleLoad}
            onError={handleError}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            sizes={sizes}
            priority={priority}
            quality={quality}
            {...props}
          />
        )}
      </div>
    </div>
  );
};

// Also add a default export for flexibility
export default ImageWrapper; 