import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as Animations from '../utils/animations';
import cameraImage from '../assets/panasonic-lumix-fz300-01.jpg.webp';
import webDevImage from '../assets/What-is-website-development.jpg';
import uiUXImage from '../assets/c00bce58c817ec3a16945711111641d37320ae67-2240x1260.webp';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ number, title, description, image, isActive = false }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (cardRef.current) {
      // Add hover effect with smoother transitions
      const card = cardRef.current;
      const imageEl = card.querySelector('img');
      const cardContent = card.querySelector('.flex');
      const cardContainer = card.parentElement;
      
      // Create a timeline for coordinated animations
      let enterTl, leaveTl;
      
      const enterAnimation = () => {
        // Kill any active animations first to prevent conflicts
        if (leaveTl) leaveTl.kill();
        
        enterTl = gsap.timeline({
          defaults: { 
            ease: "circ.out", 
            overwrite: true 
          }
        });
        
        enterTl
          .to(cardContainer, {
            zIndex: 10,
            duration: 0.01
          }, 0)
          .to(card, {
            y: -15,
            duration: 0.6,
            boxShadow: "0 12px 20px -10px rgba(212, 175, 55, 0.3), 0 4px 20px -5px rgba(0, 0, 0, 0.2)",
            transformOrigin: "center bottom"
          }, 0)
          .to(cardContent, {
            scale: 1.01,
            duration: 0.7,
          }, 0)
          .to(imageEl, {
            scale: 1.08,
            duration: 0.8,
            ease: "power4.out"
          }, 0);
      };
      
      const leaveAnimation = () => {
        // Kill any active animations first
        if (enterTl) enterTl.kill();
        
        leaveTl = gsap.timeline({
          defaults: { 
            ease: "power2.inOut", 
            overwrite: true
          }
        });
        
        leaveTl
          .to(card, {
            y: 0,
            boxShadow: "none",
            duration: 0.5,
            clearProps: "boxShadow"
          }, 0)
          .to(cardContent, {
            scale: 1,
            duration: 0.5,
          }, 0)
          .to(imageEl, {
            scale: 1,
            duration: 0.5,
          }, 0)
          .to(cardContainer, {
            zIndex: 1,
            duration: 0.01,
            delay: 0.5
          });
      };
      
      // Force initial state to ensure card is visible
      gsap.set(card, { opacity: 1, y: 0, scale: 1 });
      gsap.set(cardContent, { scale: 1, opacity: 1 });
      gsap.set(imageEl, { scale: 1, opacity: 1 });
      gsap.set(cardContainer, { zIndex: 1 });
      
      // Use a single event listener and add/remove it on mount/unmount
      card.addEventListener('mouseenter', enterAnimation);
      card.addEventListener('mouseleave', leaveAnimation);
      
      // Cleanup event listeners and any running animations
      return () => {
        card.removeEventListener('mouseenter', enterAnimation);
        card.removeEventListener('mouseleave', leaveAnimation);
        if (enterTl) enterTl.kill();
        if (leaveTl) leaveTl.kill();
      };
    }
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative w-full rounded-lg overflow-hidden mb-8 ${isActive ? 'glass-gold' : 'glass'} hover:z-10`}
      style={{ isolation: 'isolate' }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Service number and title */}
        <div className="w-full md:w-1/4 p-6">
          <div className="flex items-center">
            <span className={`text-3xl font-bold mr-4 ${isActive ? 'text-gold' : 'text-secondary-light'}`}>{number}</span>
            <div className={`h-px w-16 ${isActive ? 'bg-secondary' : 'bg-secondary-light'}`}></div>
          </div>
          <h3 className={`text-2xl font-bold mt-6 ${isActive ? 'text-gold' : 'text-secondary-light'}`}>{title}</h3>
        </div>
        
        {/* Service description */}
        <div className={`w-full md:w-2/4 p-6 md:border-l md:border-r ${isActive ? 'border-secondary/20' : 'border-gray-700'}`}>
          <p className={`text-base ${isActive ? 'text-gray-200' : 'text-gray-300'}`}>{description}</p>
        </div>
        
        {/* Service image */}
        <div className="w-full md:w-1/4">
          <img 
            src={image} 
            alt={`${title} - Professional ${title} Services by ThirdPowerLit`} 
            className="w-full h-64 md:h-full object-cover hover:opacity-90 transition-opacity duration-300"
          />
        </div>
      </div>
      
      {/* Arrow button on active card */}
      {isActive && (
        <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gold-gradient text-primary flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      )}
    </div>
  );
};

const ServicesPage = ({ navigateTo }) => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);
  const portfolioRef = useRef(null);
  const ctaButtonRefs = useRef([]);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        heroRef.current.querySelector('h1'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        heroRef.current.querySelector('p'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
    
    // Services cards staggered animation
    if (servicesRef.current) {
      const serviceCards = servicesRef.current.querySelectorAll('div[class*="relative w-full rounded-lg"]');
      
      // Set initial state to be visible but slightly off-position for animation
      gsap.set(serviceCards, { opacity: 1, x: -30 });
      
      // Create an immediate animation instead of waiting for scroll
      gsap.to(serviceCards, { 
        x: 0, 
        opacity: 1, 
        stagger: 0.15, 
        duration: 0.5, 
        ease: "power3.out",
        clearProps: "transform",
        delay: 0.3 // Small delay to ensure cards are properly rendered
      });
      
      // Add subtle float animation to the active card
      const activeCard = servicesRef.current.querySelector('.glass-gold');
      if (activeCard) {
        gsap.to(activeCard, {
          y: "-10px",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1 // Wait for the initial animation to complete
        });
      }
    }
    
    // Process section animation with connected steps
    if (processRef.current) {
      const processBg = processRef.current.querySelector('h2');
      const processSteps = processRef.current.querySelectorAll('.glass');
      const arrows = processRef.current.querySelectorAll('svg');
      
      // Animate the heading with a gradient reveal
      gsap.fromTo(
        processBg,
        { backgroundPosition: "200% 0" },
        { 
          backgroundPosition: "0% 0", 
          duration: 1.5, 
          ease: "sine.inOut" 
        }
      );
      
      // Animate each process step
      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top 70%",
        onEnter: () => {
          // First animate the boxes
          gsap.fromTo(
            processSteps,
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.2, 
              duration: 0.6, 
              ease: "back.out(1.5)" 
            }
          );
          
          // Then animate the connecting arrows
          gsap.fromTo(
            arrows,
            { opacity: 0, scale: 0 },
            { 
              opacity: 1, 
              scale: 1, 
              stagger: 0.3, 
              duration: 0.4, 
              delay: 0.8,
              ease: "back.out(2)" 
            }
          );
        },
        once: true
      });
    }
    
    // CTA section animation with floating effect
    if (ctaRef.current) {
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            ctaRef.current.querySelectorAll('h2, p'),
            { y: 30, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.2, 
              duration: 0.6, 
              ease: "power2.out" 
            }
          );
          
          gsap.fromTo(
            ctaRef.current.querySelector('button'),
            { scale: 0.9, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.5, 
              delay: 0.4,
              ease: "back.out(1.7)" 
            }
          );
        },
        once: true
      });
      
      // Add shimmer effect to the CTA button
      const ctaButton = ctaRef.current.querySelector('button');
      if (ctaButton) {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
        
        tl.to(ctaButton, {
          boxShadow: "0 0 20px rgba(212, 175, 55, 0.7)",
          duration: 0.8,
          ease: "sine.inOut"
        });
        
        tl.to(ctaButton, {
          boxShadow: "0 0 5px rgba(212, 175, 55, 0.3)",
          duration: 0.8,
          ease: "sine.inOut"
        });
      }
    }
    
    // Portfolio preview animation
    if (portfolioRef.current) {
      ScrollTrigger.create({
        trigger: portfolioRef.current,
        start: "top 70%",
        onEnter: () => {
          // Animate text content
          gsap.fromTo(
            portfolioRef.current.querySelectorAll('h2, p, button'),
            { x: -50, opacity: 0 },
            { 
              x: 0, 
              opacity: 1, 
              stagger: 0.15, 
              duration: 0.7, 
              ease: "power2.out" 
            }
          );
          
          // Animate image grid with scale effect
          gsap.fromTo(
            portfolioRef.current.querySelectorAll('.glass'),
            { scale: 0.8, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              stagger: 0.1, 
              duration: 0.5, 
              delay: 0.3,
              ease: "back.out(1.5)" 
            }
          );
        },
        once: true
      });
      
      // Add hover animations to portfolio images
      const portfolioImages = portfolioRef.current.querySelectorAll('img');
      Animations.imageHoverEffect(portfolioImages);
    }
    
    // Add hover animations to CTA buttons
    if (ctaButtonRefs.current.length > 0) {
      Animations.goldButtonHover(ctaButtonRefs.current);
    }
    
    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Services Hero */}
      <section ref={heroRef} className="py-16 px-4 bg-dark-lighter animated-bg">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gold">AVAILABLE SERVICES</h1>
          <p className="text-lg md:text-xl max-w-3xl text-gray-300">
            OFFERING COMPREHENSIVE CREATIVE SOLUTIONS THAT COMBINE TECHNICAL EXPERTISE 
            WITH ARTISTIC VISION TO DELIVER EXCEPTIONAL RESULTS FOR CLIENTS.
          </p>
        </div>
      </section>
      
      {/* Services List */}
      <section ref={servicesRef} className="py-16 px-4">
        <div className="container mx-auto space-y-12">
          <ServiceCard 
            number="01"
            title="UI/UX DESIGN"
            description="Creating intuitive, user-friendly interfaces that enhance user experience while maintaining aesthetic appeal. My UI/UX design process includes research, wireframing, prototyping, and testing to ensure optimal results that meet both user needs and/or business goals."
            image={uiUXImage}
            isActive={false}
          />
          
          <ServiceCard 
            number="02"
            title="WEB DESIGN & DEVELOPMENT"
            description="Building responsive, modern websites that perform well on all devices. Our website development services include custom design, front-end and back-end development, e-commerce solutions, and ongoing maintenance to keep your online presence strong and effective."
            image={webDevImage}
          />
          
          <ServiceCard 
            number="03"
            title="PHOTOGRAPHY & EDITING"
            description="Capturing and enhancing visual content to tell your brand's story. Our photography and editing services include product photography, portrait sessions, commercial shoots, and advanced post-processing to ensure your visuals stand out with professional quality and artistic direction."
            image={cameraImage}
          />
        </div>
      </section>
      
      {/* Process Section */}
      <section ref={processRef} className="py-16 px-4 bg-gold-gradient text-primary">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">OUR PROCESS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative glass rounded-lg p-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold mr-4">01</span>
                <div className="h-px w-16 bg-primary"></div>
              </div>
              <h3 className="text-xl font-bold mt-4">DISCOVERY</h3>
              <p className="mt-4">Understanding your needs, goals, and target audience to lay the foundation for success.</p>
              <div className="absolute -bottom-12 right-1/2 md:bottom-auto md:right-0 md:top-1/2 transform md:rotate-90 md:translate-x-10 -translate-y-1/2 hidden md:block">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            
            <div className="relative glass rounded-lg p-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold mr-4">02</span>
                <div className="h-px w-16 bg-primary"></div>
              </div>
              <h3 className="text-xl font-bold mt-4">PLANNING</h3>
              <p className="mt-4">Developing a strategic roadmap and creative direction to achieve your objectives.</p>
              <div className="absolute -bottom-12 right-1/2 md:bottom-auto md:right-0 md:top-1/2 transform md:rotate-90 md:translate-x-10 -translate-y-1/2 hidden md:block">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            
            <div className="relative glass rounded-lg p-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold mr-4">03</span>
                <div className="h-px w-16 bg-primary"></div>
              </div>
              <h3 className="text-xl font-bold mt-4">CREATION</h3>
              <p className="mt-4">Bringing ideas to life through design, development, and production with attention to detail.</p>
              <div className="absolute -bottom-12 right-1/2 md:bottom-auto md:right-0 md:top-1/2 transform md:rotate-90 md:translate-x-10 -translate-y-1/2 hidden md:block">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            
            <div className="glass rounded-lg p-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold mr-4">04</span>
                <div className="h-px w-16 bg-primary"></div>
              </div>
              <h3 className="text-xl font-bold mt-4">DELIVERY</h3>
              <p className="mt-4">Finalizing and launching projects with quality assurance and ongoing support.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 px-4 glass-gold">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">READY TO GET STARTED?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-300">
            Let's collaborate on your next project and create something exceptional together.
          </p>
          <button 
            ref={el => ctaButtonRefs.current[0] = el}
            onClick={() => navigateTo('contact')}
            className="bg-gold-gradient text-primary px-8 py-3 inline-flex items-center font-bold hover:opacity-90 transition-opacity duration-300 rounded-md"
          >
            Contact Me
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>
      
      {/* Portfolio Preview */}
      <section ref={portfolioRef} className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">CHECK OUT MY PORTFOLIO</h2>
              <p className="text-lg mb-8 max-w-md text-gray-300">
                Explore my completed projects to see my skills and expertise in action.
              </p>
              <button 
                ref={el => ctaButtonRefs.current[1] = el}
                onClick={() => navigateTo('portfolio')}
                className="flex items-center text-lg font-medium text-secondary-light hover:text-secondary transition-colors"
              >
                View Portfolio
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" 
                    alt="Professional Web Development Portfolio - Custom Website Design" 
                    className="w-full h-40 object-cover hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
                <div className="glass rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1547119957-637f8679db1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" 
                    alt="Professional Photography Services - Commercial Photography Portfolio" 
                    className="w-full h-40 object-cover hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
                <div className="glass rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                    alt="UI/UX Design Services - User Interface Development Portfolio" 
                    className="w-full h-40 object-cover hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
                <div className="glass rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                    alt="Photo Editing and Retouching Services - Professional Digital Editing" 
                    className="w-full h-40 object-cover hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage; 