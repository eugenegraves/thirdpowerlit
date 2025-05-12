import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const desktopMenuRef = useRef(null);
  const progressBarRef = useRef(null);

  // Effect to handle scroll behavior
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial animations when component mounts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const initAnimations = async () => {
      try {
        // Dynamically import GSAP
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule.gsap;
        
        // Import animations
        const animations = await import('../utils/animations');
        
        // Logo animation
        if (logoRef.current) {
          animations.logoReveal(logoRef.current);
        }

        // Navbar items animation
        if (desktopMenuRef.current) {
          const navItems = desktopMenuRef.current.querySelectorAll('a');
          gsap.fromTo(
            navItems,
            { y: -20, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.1, 
              duration: 0.6, 
              ease: "power3.out",
              delay: 0.3
            }
          );
        }
      } catch (error) {
        console.error("Error loading GSAP:", error);
      }
    };
    
    initAnimations();
  }, []);

  // Add scroll progress animation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initScrollProgress = async () => {
      try {
        // Dynamically import GSAP
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule.gsap;
        
        // Setup the scroll progress animation
        const progressBar = document.getElementById('scrollProgress');
        
        if (progressBar) {
          const handleScrollProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            gsap.to(progressBar, { 
              width: `${scrollPercent}%`, 
              duration: 0.1,
              ease: "none"
            });
          };
          
          window.addEventListener('scroll', handleScrollProgress);
          return () => window.removeEventListener('scroll', handleScrollProgress);
        }
      } catch (error) {
        console.error("Error setting up scroll progress:", error);
      }
    };
    
    initScrollProgress();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const animateMobileMenu = async () => {
      try {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule.gsap;
        
        if (mobileMenuRef.current) {
          if (isOpen) {
            gsap.to(mobileMenuRef.current, { 
              height: 'auto', 
              opacity: 1, 
              duration: 0.3, 
              ease: 'power2.out' 
            });
          } else {
            gsap.to(mobileMenuRef.current, { 
              height: 0, 
              opacity: 0, 
              duration: 0.3, 
              ease: 'power2.in' 
            });
          }
        }
      } catch (error) {
        console.error("Error animating mobile menu:", error);
      }
    };
    
    animateMobileMenu();
  }, [isOpen]);

  // Check if a path is active
  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <nav 
      ref={navRef}
      className={`glass sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-lg' : 'py-3'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl cursor-pointer text-gold" ref={logoRef}>
          <span style={{ 
            backgroundImage: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block'
          }}>Lit³</span>
        </Link>

        {/* Desktop Navigation */}
        <div ref={desktopMenuRef} className="hidden md:flex space-x-8">
          <Link href="/" className={`font-medium relative ${isActive('/') ? 'nav-active' : 'hover:text-secondary-light transition-colors'}`}>
            Home
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shine"></span>
            )}
          </Link>
          <Link href="/services" className={`font-medium relative ${isActive('/services') ? 'nav-active' : 'hover:text-secondary-light transition-colors'}`}>
            Services
            {isActive('/services') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shine"></span>
            )}
          </Link>
          <Link href="/portfolio" className={`font-medium relative ${isActive('/portfolio') ? 'nav-active' : 'hover:text-secondary-light transition-colors'}`}>
            Portfolio
            {isActive('/portfolio') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shine"></span>
            )}
          </Link>
          <Link href="/about" className={`font-medium relative ${isActive('/about') ? 'nav-active' : 'hover:text-secondary-light transition-colors'}`}>
            About
            {isActive('/about') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shine"></span>
            )}
          </Link>
          <Link href="/contact" className={`font-medium relative ${isActive('/contact') ? 'nav-active' : 'hover:text-secondary-light transition-colors'}`}>
            Contact
            {isActive('/contact') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shine"></span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-white overflow-hidden"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute inset-0 ${isOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              </span>
              <span className={`absolute inset-0 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`md:hidden glass-gold w-full py-2 px-4 absolute z-10 origin-top overflow-hidden ${!isOpen ? 'hidden' : ''}`}
        style={{ height: 0, opacity: 0 }}
      >
        <div className="flex flex-col space-y-4">
          <Link 
            href="/" 
            className={`font-medium text-left py-2 ${isActive('/') ? 'border-l-4 pl-2 border-secondary' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/services" 
            className={`font-medium text-left py-2 ${isActive('/services') ? 'border-l-4 pl-2 border-secondary' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link 
            href="/portfolio" 
            className={`font-medium text-left py-2 ${isActive('/portfolio') ? 'border-l-4 pl-2 border-secondary' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            href="/about" 
            className={`font-medium text-left py-2 ${isActive('/about') ? 'border-l-4 pl-2 border-secondary' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`font-medium text-left py-2 ${isActive('/contact') ? 'border-l-4 pl-2 border-secondary' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Progress bar for scrolling */}
      <div className="h-0.5 w-full bg-gray-800 absolute bottom-0 left-0">
        <div 
          className="h-full bg-gold-gradient"
          id="scrollProgress"
          ref={progressBarRef}
          style={{ width: '0%' }}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar; 