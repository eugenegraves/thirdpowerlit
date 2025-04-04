import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import * as Animations from './utils/animations';

// Components will be imported here
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const appRef = useRef(null);
  const pageRef = useRef(null);

  // Initialize animations when the app loads
  useEffect(() => {
    // Apply a subtle animation to the footer
    const footerElements = document.querySelectorAll('footer h2, footer p, footer a');
    gsap.set(footerElements, { opacity: 0, y: 20 });
    
    ScrollTrigger.create({
      trigger: 'footer',
      start: 'top bottom-=100',
      onEnter: () => {
        gsap.to(footerElements, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out'
        });
      },
      once: true
    });
    
    // Apply shimmer effect to gold text
    const goldElements = document.querySelectorAll('.text-gold');
    if (goldElements.length > 0) {
      Animations.goldShimmer(goldElements);
    }
  }, []);

  // Handle page transitions
  const navigateTo = (page) => {
    if (currentPage === page || isPageTransitioning) return;
    
    setIsPageTransitioning(true);
    
    // Create a timeline for smooth transition
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPage(page);
        setIsPageTransitioning(false);
        
        // Scroll to top after page change
        gsap.to(window, {
          scrollTo: 0,
          duration: 0.1,
          ease: 'power1.out'
        });
      }
    });
    
    // Fade out current page
    tl.to(pageRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: 'power2.in'
    });
  };

  // Render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'services':
        return <ServicesPage navigateTo={navigateTo} />;
      case 'portfolio':
        return <PortfolioPage navigateTo={navigateTo} />;
      case 'about':
        return <AboutPage navigateTo={navigateTo} />;
      case 'contact':
        return <ContactPage navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };
  
  // Animate the page entrance when it changes
  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          clearProps: 'all'
        }
      );
    }
  }, [currentPage]);

  return (
    <div className="App" ref={appRef}>
      <Navbar currentPage={currentPage} navigateTo={navigateTo} />
      <div ref={pageRef} className="page-transition-container">
        {renderPage()}
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={() => {
          gsap.to(window, {
            scrollTo: 0,
            duration: 1,
            ease: 'power3.inOut'
          });
        }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gold-gradient text-primary flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity duration-300 opacity-0"
        id="scrollTopBtn"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gold">THIRD POWER LIT</h2>
              <p className="text-gray-400 mt-2">Creative services for the digital age</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.68 0H1.32C0.6 0 0 0.6 0 1.32v21.36C0 23.4 0.6 24 1.32 24h11.5v-9.3H9.69v-3.62h3.13V8.41c0-3.1 1.9-4.79 4.66-4.79c1.32 0 2.46 0.1 2.8 0.15v3.24h-1.92c-1.5 0-1.8 0.71-1.8 1.76v2.31h3.59l-0.47 3.62h-3.12V24h6.12c0.73 0 1.32-0.6 1.32-1.32V1.32C24 0.6 23.4 0 22.68 0z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Third Power Lit. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-gold text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-gold text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Show/hide scroll to top button based on scroll position
window.addEventListener('load', () => {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        gsap.to(scrollTopBtn, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(scrollTopBtn, { opacity: 0, duration: 0.3 });
      }
    });
  }
});

export default App;
