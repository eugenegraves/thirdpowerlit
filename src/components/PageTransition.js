import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/animations.module.css';
import LoadingAnimation from './LoadingAnimation';

const PageTransition = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [initialRender, setInitialRender] = useState(true);

  // Set initial children on first render
  useEffect(() => {
    if (initialRender) {
      setDisplayChildren(children);
      setInitialRender(false);
    }
  }, [children, initialRender]);

  // Handle route changes
  useEffect(() => {
    let isMounted = true;

    const handleStart = (url) => {
      // Don't transition on hash changes
      if (router.asPath !== url && !url.includes('#')) {
        setIsLoading(true);
        setTransitionStage('fadeOut');
      }
    };

    const handleComplete = (url) => {
      if (!isMounted) return;
      
      // Update displayed children and reset state
      if (router.asPath === url || url.includes('#')) {
        // Same URL or hash change - just reset loading state
        setIsLoading(false);
        setTransitionStage('fadeIn');
      } else {
        // Actual page change - update children after brief animation
        setDisplayChildren(children);
        setTransitionStage('fadeIn');
        setIsLoading(false);
      }
    };

    const handleError = () => {
      if (!isMounted) return;
      setIsLoading(false);
      setTransitionStage('fadeIn');
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      isMounted = false;
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router, children]);

  // Always update children when not transitioning out
  useEffect(() => {
    if (transitionStage === 'fadeIn') {
      setDisplayChildren(children);
    }
  }, [children, transitionStage]);

  return (
    <>
      <LoadingAnimation isLoading={isLoading} />
      <div 
        className={`transition-opacity duration-300 min-h-screen ${
          transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {displayChildren}
      </div>
    </>
  );
};

export default PageTransition; 