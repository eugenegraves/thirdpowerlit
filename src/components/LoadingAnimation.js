import React, { useEffect, useState } from 'react';
import styles from '../styles/animations.module.css';

const LoadingAnimation = ({ isLoading }) => {
  const [showLoader, setShowLoader] = useState(false);
  
  useEffect(() => {
    let showTimeout;
    let hideTimeout;
    
    if (isLoading) {
      // Show loader after a short delay to avoid flashing for quick transitions
      showTimeout = setTimeout(() => {
        setShowLoader(true);
      }, 150);
      
      // Safety timeout to automatically hide loader after 5 seconds
      hideTimeout = setTimeout(() => {
        setShowLoader(false);
      }, 5000);
    } else if (showLoader) {
      // Add slight delay before hiding to avoid UI flashing
      showTimeout = setTimeout(() => {
        setShowLoader(false);
      }, 300);
    }
    
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [isLoading, showLoader]);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative">
        <div className={`w-16 h-16 border-4 border-gold border-t-transparent rounded-full`} 
          style={{ animation: 'spin 1s linear infinite' }}>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-gold text-xs font-bold ${styles.fadeIn}`}>TPL</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;

// Add keyframe animation for spinning
const styleTag = typeof document !== 'undefined' ? document.createElement('style') : null;
if (styleTag) {
  styleTag.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleTag);
} 