import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Animations from '../utils/animations';

// Use public paths instead of direct imports
const cameraImage = '/assets/panasonic-lumix-fz300-01.jpg.webp';
const webDevImage = '/assets/What-is-website-development.jpg';
const uiUXImage = '/assets/c00bce58c817ec3a16945711111641d37320ae67-2240x1260.webp';
const linguaFluxImage = '/assets/LingaFlux-Home.png';

// ImageWrapper component for using Next.js Image with fallback
const ImageWrapper = ({ src, alt, className }) => {
  return (
    <div className={`relative ${className || ''}`}>
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        className={className}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
};

const ServiceCard = ({ number, title, description, image, isActive = false }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !cardRef.current) return;
    
    const initCardAnimations = async () => {
      try {
        // Dynamically import GSAP
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule.gsap;
        
        // Add hover effect with smoother transitions
        const card = cardRef.current;
        
        // Find elements safely
        const imageEl = card.querySelector('img');
        const cardContent = card.querySelector('.flex');
        const cardContainer = card.parentElement;
        
        // Ensure we have required elements
        if (!cardContent || !cardContainer) return;
        
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
            }, 0);
            
          // Only animate image if found
          if (imageEl) {
            enterTl.to(imageEl, {
              scale: 1.08,
              duration: 0.8,
              ease: "power4.out"
            }, 0);
          }
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
            }, 0);
            
          // Only animate image if found
          if (imageEl) {
            leaveTl.to(imageEl, {
              scale: 1,
              duration: 0.5,
            }, 0);
          }
          
          leaveTl.to(cardContainer, {
            zIndex: 1,
            duration: 0.01,
            delay: 0.5
          });
        };
        
        // Force initial state to ensure card is visible
        gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        gsap.set(cardContent, { scale: 1, opacity: 1 });
        if (imageEl) {
          gsap.set(imageEl, { scale: 1, opacity: 1 });
        }
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
      } catch (error) {
        console.error("Error initializing card animations:", error);
      }
    };
    
    initCardAnimations();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`service-card relative w-full rounded-lg overflow-hidden mb-8 ${isActive ? 'glass-gold active' : 'glass'} hover:z-10`}
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
        <div className="w-full md:w-1/4 relative" style={{ height: '250px' }}>
          <Image 
            src={image} 
            alt={`${title} - Professional ${title} Services by ThirdPowerLit`} 
            fill
            style={{ objectFit: 'cover' }}
            className="hover:opacity-90 transition-opacity duration-300"
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

const ServicesPage = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);
  const ctaButtonRefs = useRef([]);

  useEffect(() => {
    const initAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animation
        if (heroRef.current) {
          gsap.fromTo(
            heroRef.current.querySelector('h1'),
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
          );
          
          gsap.fromTo(
            heroRef.current.querySelector('p'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
          );
        }
        
        // Services section animation
        if (servicesRef.current) {
          const heading = servicesRef.current.querySelector('h2');
          // Target all service cards
          const cards = servicesRef.current.querySelectorAll('.service-card, [class*="glass"]');
          
          if (heading) {
            gsap.fromTo(
              heading,
              { y: -30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
            );
          }
          
          if (cards && cards.length > 0) {
            ScrollTrigger.create({
              trigger: servicesRef.current,
              start: "top 70%",
              onEnter: () => {
                gsap.fromTo(
                  cards,
                  { x: -50, opacity: 0 },
                  { 
                    x: 0, 
                    opacity: 1, 
                    stagger: 0.2, 
                    duration: 0.8, 
                    ease: "power3.out" 
                  }
                );
              },
              once: true
            });
            
            // Add floating animation to active service card
            const activeCard = servicesRef.current.querySelector('.active, .glass-gold');
            if (activeCard) {
              gsap.to(activeCard, {
                y: -10,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1 // Wait for the initial animation to complete
              });
            }
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
                  stagger: 0.3, 
                  duration: 0.7, 
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
                  delay: 0.5, 
                  duration: 0.4, 
                  ease: "back.out(2)" 
                }
              );
            },
            once: true
          });
        }
        
        // CTA section animation
        if (ctaRef.current) {
          ScrollTrigger.create({
            trigger: ctaRef.current,
            start: "top 75%",
            onEnter: () => {
              gsap.fromTo(
                ctaRef.current,
                { y: 30, opacity: 0 },
                { 
                  y: 0, 
                  opacity: 1, 
                  duration: 0.8, 
                  ease: "power2.out" 
                }
              );
            },
            once: true
          });
        }
        
        // Add hover animations to CTA buttons
        if (ctaButtonRefs.current.length > 0) {
          const animations = await import('../utils/animations');
          // Make sure each button reference exists before applying animations
          const validButtons = ctaButtonRefs.current.filter(btn => btn !== null);
          if (validButtons.length > 0) {
            animations.goldButtonHover(validButtons);
          }
        }
        
        // Cleanup function
        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    initAnimations();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section ref={heroRef} className="py-24 px-4 animated-bg text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold">Professional</span> Services
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
            Comprehensive digital solutions including website development, 
            photography, and editing to elevate your brand presence.
          </p>
        </div>
      </section>
      
      {/* Services list section */}
      <section ref={servicesRef} className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-white">What We</span> <span className="text-gold">Offer</span>
          </h2>
          
          <div className="space-y-6">
            <ServiceCard 
              number="01"
              title="Website Building"
              description="Custom website development with responsive designs optimized for all devices. We create fast-loading, modern websites with a focus on user experience and conversion optimization."
              image={webDevImage}
              isActive={true}
            />
            
            <ServiceCard 
              number="02"
              title="Photography"
              description="Professional photography services for products, events, portraits, and commercial use. We capture stunning visuals that showcase your brand and products in their best light."
              image={cameraImage}
            />
            
            <ServiceCard 
              number="03"
              title="Editing & Retouching"
              description="Expert photo editing and retouching to enhance your visual content. We perfect every detail, from color correction to complex compositing, to achieve polished, professional results."
              image={uiUXImage}
            />
          </div>
        </div>
      </section>
      
      {/* Process section */}
      <section ref={processRef} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gold bg-gold-gradient bg-clip-text text-transparent bg-300% animate-text">
            Our Process
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-20">
            <div className="glass p-8 rounded-lg text-center mb-8 md:mb-0 md:w-1/4 process-step">
              <div className="w-16 h-16 rounded-full bg-secondary-dark/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary-light">Discovery</h3>
              <p className="text-gray-300">We begin by understanding your needs, goals, and vision through detailed consultation.</p>
            </div>
            
            <div className="hidden md:block">
              <svg className="w-12 h-12 text-secondary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            
            <div className="glass p-8 rounded-lg text-center mb-8 md:mb-0 md:w-1/4 process-step">
              <div className="w-16 h-16 rounded-full bg-secondary-dark/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary-light">Creation</h3>
              <p className="text-gray-300">Our team develops custom solutions based on your requirements and industry best practices.</p>
            </div>
            
            <div className="hidden md:block">
              <svg className="w-12 h-12 text-secondary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            
            <div className="glass p-8 rounded-lg text-center md:w-1/4 process-step">
              <div className="w-16 h-16 rounded-full bg-secondary-dark/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">03</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-secondary-light">Delivery</h3>
              <p className="text-gray-300">We provide final products with comprehensive support to ensure your complete satisfaction.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section ref={ctaRef} className="py-24 px-4 glass-gold">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to elevate your digital presence?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 text-gray-200">
            Let's turn your vision into reality with our professional services.
          </p>
          <Link href="/contact">
            <button 
              ref={el => ctaButtonRefs.current[0] = el}
              className="glass border border-secondary px-8 py-3 rounded-md text-white font-medium hover:bg-gradient-to-r hover:from-secondary hover:to-secondary/80 transition-all duration-300"
            >
              Contact Us Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage; 