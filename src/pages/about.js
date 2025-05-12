import React, { useEffect } from 'react';
import Head from 'next/head';
import AboutPage from './AboutPage';

export default function About() {
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
          
          // Animate the team members
          const teamMembers = document.querySelectorAll('.team-member');
          if (teamMembers.length > 0) {
            gsap.from(teamMembers, {
              y: 50,
              opacity: 0,
              duration: 0.7,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: '.team-section',
                start: 'top 75%',
              }
            });
          }

          // Animate about content paragraphs
          const aboutContent = document.querySelectorAll('.about-content p');
          if (aboutContent.length > 0) {
            gsap.from(aboutContent, {
              y: 30,
              opacity: 0,
              duration: 0.5,
              stagger: 0.15,
              ease: "power2.out",
              delay: 0.3
            });
          }

          // Animate timeline items
          const timelineItems = document.querySelectorAll('.timeline-item');
          if (timelineItems.length > 0) {
            gsap.from(timelineItems, {
              x: index => index % 2 === 0 ? -40 : 40,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: '.timeline-section',
                start: 'top 80%',
              }
            });
          }

          // Animate statistics
          const stats = document.querySelectorAll('.stat-item');
          if (stats.length > 0) {
            gsap.from(stats, {
              scale: 0.8,
              opacity: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 75%',
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
        <title>About Us | ThirdPowerLit</title>
        <meta 
          name="description" 
          content="Learn about ThirdPowerLit's journey, mission, and the team behind our website development, photography, and editing services."
        />
      </Head>
      <AboutPage />
    </>
  );
} 