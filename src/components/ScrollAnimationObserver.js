import React, { useEffect, useRef } from 'react';

const ScrollAnimationObserver = ({ children }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Set up Intersection Observer
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '0px 0px -10% 0px', // Slightly above the bottom of viewport
      threshold: 0.1 // Trigger when 10% of the target is visible
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        // Add animation classes when element comes into view
        if (entry.isIntersecting) {
          const target = entry.target;
          const animation = target.dataset.animation || 'fadeIn';
          const delay = target.dataset.delay || '';
          
          // Add animation class from our module
          if (animation) {
            target.classList.add(animation);
          }
          
          // Add delay class if specified
          if (delay) {
            target.classList.add(delay);
          }
          
          // Stop observing once animated
          observer.unobserve(target);
        }
      });
    };

    // Create observer
    observerRef.current = new IntersectionObserver(handleIntersect, observerOptions);

    // Get all elements with data-animation attribute
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    // Observe each element
    animatedElements.forEach(element => {
      observerRef.current.observe(element);
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return <>{children}</>;
};

export default ScrollAnimationObserver; 