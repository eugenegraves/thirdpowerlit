import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as Animations from '../utils/animations';

const Navbar = ({ currentPage, navigateTo }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const desktopMenuRef = useRef(null);

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initial animations when component mounts
  useEffect(() => {
    // Logo animation
    if (logoRef.current) {
      Animations.logoReveal(logoRef.current);
    }

    // Navbar items animation
    if (desktopMenuRef.current) {
      const navItems = desktopMenuRef.current.querySelectorAll('button');
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
  }, []);

  // Toggle mobile menu with animation
  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      // Will animate the menu in the useEffect below
    } else {
      // Animate menu out before setting state
      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => setMenuOpen(false)
        });
      } else {
        setMenuOpen(false);
      }
    }
  };

  // Animate mobile menu when it opens/closes
  useEffect(() => {
    if (menuOpen && mobileMenuRef.current) {
      // Get the height of the content
      const height = mobileMenuRef.current.scrollHeight;
      
      // Set initial state
      gsap.set(mobileMenuRef.current, { 
        height: 0,
        opacity: 0
      });
      
      // Animate to open
      gsap.to(mobileMenuRef.current, {
        height: height,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      });
      
      // Animate the menu items
      const menuItems = mobileMenuRef.current.querySelectorAll('button');
      gsap.fromTo(
        menuItems,
        { x: -20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.4, 
          ease: "power2.out",
          delay: 0.2
        }
      );
    }
  }, [menuOpen]);

  return (
    <nav 
      ref={navRef}
      className={`glass sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-3'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          ref={logoRef}
          className="font-bold text-2xl cursor-pointer text-gold" 
          onClick={() => navigateTo('home')}
          style={{ WebkitFontSmoothing: 'subpixel-antialiased' }}
        >
          Lit³
        </div>

        {/* Desktop Navigation */}
        <div ref={desktopMenuRef} className="hidden md:flex space-x-8">
          <button 
            className={`font-medium relative ${currentPage === 'home' ? 'nav-active' : 'hover:text-secondary-light transition-colors'}`}
            onClick={() => navigateTo('home')}
          >
            Home
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shine"></span>
            )}
          </button>
          <button 
            className={`font-medium relative ${currentPage === 'services' ? 'nav-active' : 'hover:text-secondary-light transition-colors'}`}
            onClick={() => navigateTo('services')}
          >
            Services
            {currentPage === 'services' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shine"></span>
            )}
          </button>
          <button 
            className={`font-medium relative ${currentPage === 'portfolio' ? 'nav-active' : 'hover:text-secondary-light transition-colors'}`}
            onClick={() => navigateTo('portfolio')}
          >
            Portfolio
            {currentPage === 'portfolio' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shine"></span>
            )}
          </button>
          <button 
            className={`font-medium relative ${currentPage === 'about' ? 'nav-active' : 'hover:text-secondary-light transition-colors'}`}
            onClick={() => navigateTo('about')}
          >
            About
            {currentPage === 'about' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shine"></span>
            )}
          </button>
          <button 
            className={`font-medium relative ${currentPage === 'contact' ? 'nav-active' : 'hover:text-secondary-light transition-colors'}`}
            onClick={() => navigateTo('contact')}
          >
            Contact
            {currentPage === 'contact' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shine"></span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="focus:outline-none text-white overflow-hidden"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute inset-0 ${menuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
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
              <span className={`absolute inset-0 ${menuOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
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
      {menuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden glass-gold w-full py-2 px-4 absolute z-10 origin-top overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="flex flex-col space-y-4">
            <button 
              className={`font-medium text-left py-2 ${currentPage === 'home' ? 'border-l-4 pl-2 border-secondary' : ''}`}
              onClick={() => {
                navigateTo('home');
                toggleMenu();
              }}
            >
              Home
            </button>
            <button 
              className={`font-medium text-left py-2 ${currentPage === 'services' ? 'border-l-4 pl-2 border-secondary' : ''}`}
              onClick={() => {
                navigateTo('services');
                toggleMenu();
              }}
            >
              Services
            </button>
            <button 
              className={`font-medium text-left py-2 ${currentPage === 'portfolio' ? 'border-l-4 pl-2 border-secondary' : ''}`}
              onClick={() => {
                navigateTo('portfolio');
                toggleMenu();
              }}
            >
              Portfolio
            </button>
            <button 
              className={`font-medium text-left py-2 ${currentPage === 'about' ? 'border-l-4 pl-2 border-secondary' : ''}`}
              onClick={() => {
                navigateTo('about');
                toggleMenu();
              }}
            >
              About
            </button>
            <button 
              className={`font-medium text-left py-2 ${currentPage === 'contact' ? 'border-l-4 pl-2 border-secondary' : ''}`}
              onClick={() => {
                navigateTo('contact');
                toggleMenu();
              }}
            >
              Contact
            </button>
          </div>
        </div>
      )}

      {/* Progress bar for scrolling */}
      <div className="h-0.5 w-full bg-gray-800 absolute bottom-0 left-0">
        <div 
          className="h-full bg-gold-gradient"
          id="scrollProgress"
          style={{ width: '0%' }}
        ></div>
      </div>
    </nav>
  );
};

// Add scroll progress animation
window.addEventListener('load', () => {
  const progressBar = document.getElementById('scrollProgress');
  
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      gsap.to(progressBar, { 
        width: `${scrollPercent}%`, 
        duration: 0.1,
        ease: "none"
      });
    });
  }
});

export default Navbar; 