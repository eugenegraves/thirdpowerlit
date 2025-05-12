import React, { useEffect } from 'react';
import Head from 'next/head';
import PortfolioPage from './PortfolioPage';

export default function Portfolio() {
  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window !== 'undefined') {
      const initializeAnimations = async () => {
        try {
          // Dynamically import GSAP and ScrollTrigger
          const gsapModule = await import('gsap');
          const ScrollTriggerModule = await import('gsap/ScrollTrigger');
          
          const gsap = gsapModule.default || gsapModule.gsap;
          const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
          
          // Register plugins
          gsap.registerPlugin(ScrollTrigger);
          
          // Portfolio item animations
          const portfolioItems = document.querySelectorAll('.portfolio-item');
          if (portfolioItems.length > 0) {
            gsap.from(portfolioItems, {
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 70%',
              }
            });
          }

          // Portfolio filter animations
          const filterButtons = document.querySelectorAll('.filter-btn');
          if (filterButtons.length > 0) {
            gsap.from(filterButtons, {
              scale: 0.9,
              opacity: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.7)",
              delay: 0.3
            });
          }

          // Project details animations
          const projectDetail = document.querySelector('.project-detail');
          if (projectDetail) {
            gsap.from(projectDetail, {
              scale: 0.95,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: '.project-detail',
                start: 'top 65%',
              }
            });
          }
        } catch (error) {
          console.error("Error initializing animations:", error);
        }
      };
      
      initializeAnimations();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Portfolio | ThirdPowerLit</title>
        <meta 
          name="description" 
          content="Explore our diverse portfolio of websites, photography, and editing projects that showcase our creativity and expertise."
        />
      </Head>
      <PortfolioPage />
    </>
  );
} 