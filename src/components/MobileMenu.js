import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const MobileMenu = ({ isOpen, onClose }) => {
  const router = useRouter();
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  
  // Reset refs array
  linksRef.current = [];
  
  // Add to the refs array
  const addToRefs = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };
  
  // Get current page from router path
  const currentPage = router.pathname === '/' ? 'home' : router.pathname.substring(1);
  
  // Animate menu opening and closing
  useEffect(() => {
    if (typeof window === 'undefined' || !menuRef.current) return;
    
    const initAnimation = async () => {
      try {
        // Dynamically import GSAP
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule.gsap;
        
        const tl = gsap.timeline({ paused: true });
        
        // Menu background animation
        tl.fromTo(
          menuRef.current, 
          { 
            opacity: 0,
            xPercent: 100
          },
          { 
            opacity: 1,
            xPercent: 0,
            duration: 0.5,
            ease: 'power3.out'
          }
        );
        
        // Menu links staggered animation
        tl.fromTo(
          linksRef.current,
          { 
            opacity: 0,
            y: 20
          },
          { 
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: 'back.out(1.7)'
          },
          '-=0.2'
        );
        
        if (isOpen) {
          tl.play();
        } else {
          gsap.to(menuRef.current, {
            opacity: 0,
            xPercent: 100,
            duration: 0.3,
            ease: 'power3.in'
          });
        }
        
        return () => {
          tl.kill();
        };
      } catch (error) {
        console.error("Error initializing animations:", error);
      }
    };
    
    initAnimation();
  }, [isOpen]);
  
  // Handle navigation and close menu
  const handleNavigation = (path) => {
    onClose();
    router.push(path);
  };
  
  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="fixed inset-0 z-50 glass-gold flex flex-col px-6 py-12"
      style={{ opacity: 0 }}
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-secondary"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Menu links */}
      <div className="flex flex-col items-center justify-center flex-grow space-y-6">
        <button 
          ref={addToRefs}
          onClick={() => handleNavigation('/')}
          className={`text-2xl font-bold ${currentPage === 'home' ? 'text-gold' : 'text-white hover:text-secondary-light'}`}
        >
          Home
        </button>
        <button 
          ref={addToRefs}
          onClick={() => handleNavigation('/services')}
          className={`text-2xl font-bold ${currentPage === 'services' ? 'text-gold' : 'text-white hover:text-secondary-light'}`}
        >
          Services
        </button>
        <button 
          ref={addToRefs}
          onClick={() => handleNavigation('/portfolio')}
          className={`text-2xl font-bold ${currentPage === 'portfolio' ? 'text-gold' : 'text-white hover:text-secondary-light'}`}
        >
          Portfolio
        </button>
        <button 
          ref={addToRefs}
          onClick={() => handleNavigation('/about')}
          className={`text-2xl font-bold ${currentPage === 'about' ? 'text-gold' : 'text-white hover:text-secondary-light'}`}
        >
          About
        </button>
        <button 
          ref={addToRefs}
          onClick={() => handleNavigation('/contact')}
          className={`text-2xl font-bold ${currentPage === 'contact' ? 'text-gold' : 'text-white hover:text-secondary-light'}`}
        >
          Contact
        </button>
      </div>
      
      {/* Social links */}
      <div className="flex justify-center space-x-6 mt-8">
        <a href="#" className="text-gray-300 hover:text-gold transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.68 0H1.32C0.6 0 0 0.6 0 1.32v21.36C0 23.4 0.6 24 1.32 24h11.5v-9.3H9.69v-3.62h3.13V8.41c0-3.1 1.9-4.79 4.66-4.79c1.32 0 2.46 0.1 2.8 0.15v3.24h-1.92c-1.5 0-1.8 0.71-1.8 1.76v2.31h3.59l-0.47 3.62h-3.12V24h6.12c0.73 0 1.32-0.6 1.32-1.32V1.32C24 0.6 23.4 0 22.68 0z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/thirdpowerlit/" className="text-gray-300 hover:text-gold transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-300 hover:text-gold transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default MobileMenu; 