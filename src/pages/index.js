import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

// Import HomePage component and utils
import HomePage from './HomePage';

export default function Home() {
  const homeRef = useRef(null);
  
  useEffect(() => {
    // Dynamically import animations to ensure they only run client-side
    const loadAnimations = async () => {
      const animationsModule = await import('../utils/animations');
      if (homeRef.current) {
        // Apply animations to the home page
        animationsModule.createScrollAnimations();
        animationsModule.animateHero(homeRef.current.querySelector('.hero-section'));
      }
    };
    
    loadAnimations();
  }, []);

  return (
    <>
      <Head>
        <title>ThirdPowerLit - Professional Photography & Web Design</title>
        <meta name="description" content="Professional photography, web design and development services by ThirdPowerLit. Creating striking visuals and powerful digital experiences." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          ref={homeRef}
        >
          <HomePage />
        </motion.div>
      </AnimatePresence>
    </>
  );
} 