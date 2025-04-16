import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import * as Animations from '../utils/animations';
import trackAppImage from '../assets/Track-App-Screenshot.png';
import dataVisualizationImage from '../assets/data-visualization-cover.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const HomePage = ({ navigateTo }) => {
  const heroSectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const statBoxesRef = useRef(null);
  const projectsRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const featuredSectionRef = useRef(null);
  const typeTextRef = useRef(null);
  const ctaButtonRefs = useRef([]);

  // Initialize animations once the component mounts
  useEffect(() => {
    // Hero section entrance animation
    if (heroSectionRef.current) {
      const tl = gsap.timeline();
      
      // Staggered animation for hero elements
      tl.fromTo(
        heroTextRef.current.querySelector('h1'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        heroTextRef.current.querySelector('p'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        heroTextRef.current.querySelector('.mt-12 p'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        heroTextRef.current.querySelector('button'),
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      );
      
      // Animate the hero image with a reveal effect
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { 
            clipPath: "inset(0 0% 0 0)", 
            opacity: 1, 
            duration: 1.2, 
            ease: "power2.inOut",
            delay: 0.3 
          }
        );
        
        // Add floating animation to right side elements
        const tags = heroImageRef.current.querySelectorAll('.text-sm');
        Animations.floatingAnimation(tags, 5);
      }
    }
    
    // Animate typewriter effect for "I AM PASSIONATE ABOUT..." text
    if (typeTextRef.current) {
      const text = typeTextRef.current.innerHTML;
      typeTextRef.current.innerHTML = "";
      
      Animations.typeText(typeTextRef.current, text, 2);
    }
    
    // About section stats counter animation
    if (statBoxesRef.current) {
      const statBoxes = statBoxesRef.current.querySelectorAll('.glass');
      ScrollTrigger.create({
        trigger: aboutSectionRef.current,
        start: "top 80%",
        onEnter: () => {
          // Animate the stat boxes
          gsap.fromTo(
            statBoxes,
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.2, 
              duration: 0.7, 
              ease: "back.out(1.5)"
            }
          );
          
          // Animate the counters
          const statNumbers = statBoxesRef.current.querySelectorAll('h3');
          statNumbers.forEach((statNumber, index) => {
            let finalValue;
            let prefix = '';
            let suffix = '';
            
            switch(index) {
              case 0:
                finalValue = 5;
                suffix = 'M+';
                break;
              case 1:
                finalValue = 3;
                suffix = 'K+';
                break;
              case 2:
                finalValue = 2;
                suffix = '+';
                break;
              default:
                finalValue = 0;
            }
            
            Animations.animateCounter(statNumber, finalValue, 2.5, prefix, suffix);
          });
        },
        once: true
      });
    }
    
    // Featured projects animation
    if (featuredSectionRef.current) {
      const projectCards = featuredSectionRef.current.querySelectorAll('.group');
      
      ScrollTrigger.create({
        trigger: featuredSectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            projectCards,
            { y: 100, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.2, 
              duration: 0.8, 
              ease: "power3.out" 
            }
          );
        },
        once: true
      });
      
      // Add hover animations to project cards
      projectCards.forEach(card => {
        const image = card.querySelector('img');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.1,
            opacity: 1,
            duration: 0.4,
            ease: "power1.out"
          });
          
          gsap.to(card, {
            y: -10,
            duration: 0.4,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            opacity: 0.8,
            duration: 0.4,
            ease: "power1.out"
          });
          
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });
    }
    
    // Services section parallax and reveal animation
    if (servicesRef.current) {
      const servicesText = servicesRef.current.querySelectorAll('h2, p');
      
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            servicesText,
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.3, 
              duration: 0.8, 
              ease: "power2.out" 
            }
          );
          
          gsap.fromTo(
            servicesRef.current.querySelector('button'),
            { y: 30, opacity: 0, scale: 0.9 },
            { 
              y: 0, 
              opacity: 1, 
              scale: 1, 
              duration: 0.6, 
              delay: 0.4,
              ease: "back.out(1.7)" 
            }
          );
        },
        once: true
      });
      
      // Add a subtle parallax effect to the services section
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(servicesRef.current, {
            backgroundPosition: `50% ${50 + (self.progress * 30)}%`,
            ease: "none"
          });
        }
      });
    }
    
    // Add hover animations to CTA buttons
    if (ctaButtonRefs.current.length > 0) {
      Animations.goldButtonHover(ctaButtonRefs.current);
    }
    
    // Clean up ScrollTriggers when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroSectionRef} className="py-12 md:py-20 px-4 animated-bg">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Hero Text */}
            <div ref={heroTextRef} className="w-full md:w-1/2 mb-10 md:mb-0 text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
                DIGITAL ARTISTRY &<br />
                <span className="text-gold">INNOVATION</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-400">
                MULTI-DISCIPLINARY ARTIST & CREATIVE PROFESSIONAL
              </p>
              
              <div className="mt-12">
                <p ref={typeTextRef} className="text-sm md:text-base text-right md:pr-20 text-gray-300">
                  I AM PASSIONATE ABOUT<br />
                  CREATING WEBSITES THAT<br />
                  STAND OUT FROM THE<br />
                  CROWD.
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="mt-10">
                <button 
                  ref={el => ctaButtonRefs.current[0] = el}
                  onClick={() => navigateTo('contact')}
                  className="glass-gold px-8 py-3 rounded-full text-white hover:bg-gradient-to-r hover:from-secondary hover:to-secondary/80 transition-all duration-300"
                >
                  Let's Work Together
                </button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="w-full md:w-1/2">
              <div ref={heroImageRef} className="glass-gold rounded-lg overflow-hidden">
                <img 
                  src="/hero-image.jpg"
                  alt="Creative Professional" 
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="mt-6 flex flex-col items-end">
                <div className="text-right">
                  <div className="text-sm font-medium text-secondary-light">UI/UX</div>
                  <div className="text-sm font-medium mt-2 text-secondary-light">WEB DESIGN</div>
                  <div className="text-sm font-medium mt-2 text-secondary-light">LANDING PAGE</div>
                  <div className="text-sm font-medium mt-2 text-secondary-light">UI DESIGN</div>
                  <div className="text-sm font-medium mt-2 text-secondary-light">PHOTOGRAPHY</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator hidden md:block"></div>
      </section>
      
      {/* About Section Preview */}
      <section ref={aboutSectionRef} className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold">ABOUT</h2>
              <p className="text-lg mb-8 max-w-md text-gray-300">
                PROFESSIONAL DESIGNER & DEVELOPER, KNOWN FOR CREATIVE PROWESS AND TECHNICAL EXPERTISE.
              </p>
              <button 
                ref={el => ctaButtonRefs.current[1] = el}
                onClick={() => navigateTo('about')}
                className="flex items-center text-lg font-medium text-secondary-light hover:text-secondary transition-colors"
              >
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
            <div ref={statBoxesRef} className="w-full md:w-1/2 grid grid-cols-3 gap-6">
              <div className="text-center py-8 glass rounded-lg">
                <h3 className="text-3xl font-bold text-gold">5M+</h3>
                <p className="text-sm mt-2 text-gray-300">SUCCESS PROJECTS</p>
              </div>
              <div className="text-center py-8 glass rounded-lg">
                <h3 className="text-3xl font-bold text-gold">3K+</h3>
                <p className="text-sm mt-2 text-gray-300">PRODUCT LAUNCHES</p>
              </div>
              <div className="text-center py-8 glass rounded-lg">
                <h3 className="text-3xl font-bold text-gold">2+</h3>
                <p className="text-sm mt-2 text-gray-300">YEARS EXPERIENCE</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Project Preview */}
      <section ref={featuredSectionRef} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-gold">FEATURED PROJECT</h2>
          
          <div ref={projectsRef} className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/3 group cursor-pointer" onClick={() => navigateTo('portfolio')}>
              <div className="overflow-hidden glass rounded-lg">
                <img 
                  src={trackAppImage}
                  alt="Track & Field Team Management System" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-secondary text-primary text-sm mb-2 rounded">WEB DESIGN</span>
                <h3 className="text-xl font-bold">Marlboro Track & Field Team Management System</h3>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 group cursor-pointer" onClick={() => navigateTo('portfolio')}>
              <div className="overflow-hidden glass rounded-lg">
                <img 
                  src={dataVisualizationImage} 
                  alt="Data Visualization Project" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-secondary text-primary text-sm mb-2 rounded">WEB DESIGN</span>
                <h3 className="text-xl font-bold">Nutrition & Obesity: Data Visualization</h3>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 group cursor-pointer" onClick={() => navigateTo('portfolio')}>
              <div className="overflow-hidden glass rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Photography Project" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-secondary text-primary text-sm mb-2 rounded">PHOTOGRAPHY</span>
                <h3 className="text-xl font-bold">Product Photography Campaign</h3>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              ref={el => ctaButtonRefs.current[2] = el}
              onClick={() => navigateTo('portfolio')}
              className="glass-gold px-8 py-3 rounded-full text-white hover:bg-gradient-to-r hover:from-secondary hover:to-secondary/80 transition-all duration-300"
            >
              View All Projects
            </button>
          </div>
        </div>
      </section>
      
      {/* Services Preview with CTA */}
      <section ref={servicesRef} className="py-16 px-4 glass-gold">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-gold">THE SERVICES WE<br />PROVIDE</h2>
          
          <p className="text-lg mb-12 max-w-3xl mx-auto text-white">
            CREATING VISUALLY APPEALING AND FUNCTIONAL WEBSITES TAILORED TO THE CLIENT'S NEEDS AND GOALS, 
            PROVIDING A CONSISTENT USER EXPERIENCE ACROSS PLATFORMS.
          </p>
          
          <div className="text-center">
            <button 
              ref={el => ctaButtonRefs.current[3] = el}
              onClick={() => navigateTo('services')}
              className="glass-gold px-8 py-3 rounded-full text-white hover:bg-gradient-to-r hover:from-secondary hover:to-secondary/80 transition-all duration-300"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 