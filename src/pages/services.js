import React, { useEffect } from 'react';
import Head from 'next/head';
import ServicesPage from './ServicesPage';

export default function Services() {
  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === 'undefined') return;
    
    const initAnimations = async () => {
      try {
        // Dynamically import GSAP and ScrollTrigger
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default || gsapModule.gsap;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        // Register the ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Initialize any service-page specific animations here
        const serviceCards = document.querySelectorAll('.service-card');
        if (serviceCards.length > 0) {
          gsap.from(serviceCards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.services-section',
              start: 'top 70%',
            }
          });
        }

        // Process steps animation
        const processSteps = document.querySelectorAll('.process-step');
        if (processSteps.length > 0) {
          gsap.from(processSteps, {
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: '.process-section',
              start: 'top 80%',
            }
          });
        }
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    // Run the animations initialization
    initAnimations();
  }, []);

  return (
    <>
      <Head>
        <title>Our Services | ThirdPowerLit</title>
        <meta 
          name="description" 
          content="Professional web development, photography, and editing services at ThirdPowerLit. Discover our custom solutions to elevate your brand online."
        />
      </Head>
      <ServicesPage />
    </>
  );
} 