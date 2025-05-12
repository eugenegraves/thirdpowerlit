import React, { useEffect } from 'react';
import Head from 'next/head';
import ContactPage from './ContactPage';

export default function Contact() {
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
          
          // Contact form animations
          const formElements = document.querySelectorAll('.form-element');
          if (formElements.length > 0) {
            gsap.from(formElements, {
              y: 20,
              opacity: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out",
              delay: 0.3
            });
          }

          // Contact info animations
          const contactInfo = document.querySelectorAll('.contact-info-item');
          if (contactInfo.length > 0) {
            gsap.from(contactInfo, {
              x: -30,
              opacity: 0,
              duration: 0.7,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 75%',
              }
            });
          }

          // Map or location animation
          const mapElement = document.querySelector('.contact-map');
          if (mapElement) {
            gsap.from(mapElement, {
              scale: 0.9,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: mapElement,
                start: 'top 80%',
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
        <title>Contact Us | ThirdPowerLit</title>
        <meta 
          name="description" 
          content="Get in touch with our team for website development, photography, and editing services. We're here to bring your vision to life."
        />
      </Head>
      <ContactPage />
    </>
  );
} 