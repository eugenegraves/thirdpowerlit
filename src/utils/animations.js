// Centralized animation utilities for the application
// This file handles GSAP animations with SSR compatibility

// Function to initialize GSAP only on the client side
const initGSAP = async () => {
  if (typeof window === 'undefined') return { gsap: null, ScrollTrigger: null };
  
  try {
    // Dynamically import GSAP and plugins
    const gsapModule = await import('gsap');
    const ScrollTriggerModule = await import('gsap/ScrollTrigger');
    
    const gsap = gsapModule.default || gsapModule.gsap;
    const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
    
    // Register plugins
    gsap.registerPlugin(ScrollTrigger);
    
    return { gsap, ScrollTrigger };
  } catch (error) {
    console.error("Failed to initialize GSAP:", error);
    return { gsap: null, ScrollTrigger: null };
  }
};

// Page enter animation
export const pageEnterAnimation = async (element) => {
  if (typeof window === 'undefined' || !element) return;
  
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return;
    
    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        clearProps: "all" 
      }
    );
  } catch (error) {
    console.error("Error in pageEnterAnimation:", error);
  }
};

// Page exit animation
export const pageExitAnimation = async (element, onComplete) => {
  if (typeof window === 'undefined' || !element) return onComplete?.();
  
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return onComplete?.();
    
    gsap.to(element, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        onComplete?.();
      }
    });
  } catch (error) {
    console.error("Error in pageExitAnimation:", error);
    onComplete?.();
  }
};

// Create all scroll-based animations
export const createScrollAnimations = async (selectors = {}) => {
  if (typeof window === 'undefined') return;
  
  try {
    const { gsap, ScrollTrigger } = await initGSAP();
    if (!gsap || !ScrollTrigger) return;
    
    const {
      textElements = '.animate-text',
      imageElements = '.animate-image',
      cardElements = '.animate-card',
      staggerElements = '.animate-stagger',
      progressElements = '.skill-progress'
    } = selectors;
    
    // Animate text elements when they come into view
    const texts = document.querySelectorAll(textElements);
    if (texts.length) {
      texts.forEach(text => {
        ScrollTrigger.create({
          trigger: text,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              text,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
            );
          },
          once: true
        });
      });
    }
    
    // Animate image elements with scale and fade
    const images = document.querySelectorAll(imageElements);
    if (images.length) {
      images.forEach(image => {
        // Set initial state for better perceived performance
        gsap.set(image, { 
          scale: 0.95, 
          opacity: 0,
          filter: "blur(5px)"
        });
        
        ScrollTrigger.create({
          trigger: image,
          start: "top 85%",
          onEnter: () => {
            // Create a smoother, more sophisticated animation sequence
            gsap.to(image, {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "expo.out",
              clearProps: "filter", // Clear filter after animation for better performance
              onComplete: () => {
                // Optional: Add a subtle hover effect after animation completes
                if (image.classList.contains('hover-effect')) {
                  const enterHover = () => {
                    gsap.to(image, {
                      scale: 1.03,
                      filter: "brightness(1.1)",
                      duration: 0.4,
                      ease: "power2.out"
                    });
                  };
                  
                  const leaveHover = () => {
                    gsap.to(image, {
                      scale: 1,
                      filter: "brightness(1)",
                      duration: 0.4,
                      ease: "power2.inOut"
                    });
                  };
                  
                  image.addEventListener('mouseenter', enterHover);
                  image.addEventListener('mouseleave', leaveHover);
                  
                  // Store the event listeners for cleanup
                  image._hoverCleanup = () => {
                    image.removeEventListener('mouseenter', enterHover);
                    image.removeEventListener('mouseleave', leaveHover);
                  };
                }
              }
            });
          },
          once: true
        });
      });
    }
    
    // Animate cards with a bounce effect
    const cards = document.querySelectorAll(cardElements);
    if (cards.length) {
      cards.forEach(card => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              card,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.75)" }
            );
          },
          once: true
        });
      });
    }
    
    // Staggered animations for groups of elements
    const staggerGroups = document.querySelectorAll(staggerElements);
    if (staggerGroups.length) {
      staggerGroups.forEach(group => {
        const children = group.children;
        
        if (!children.length) return;
        
        ScrollTrigger.create({
          trigger: group,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              children,
              { y: 30, opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                stagger: 0.1, 
                duration: 0.5, 
                ease: "power2.out" 
              }
            );
          },
          once: true
        });
      });
    }
    
    // Animate progress bars for skills
    const progressBars = document.querySelectorAll(progressElements);
    if (progressBars.length) {
      progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage') || '0';
        const value = parseInt(percentage);
        
        gsap.set(bar, { width: 0 });
        
        ScrollTrigger.create({
          trigger: bar,
          start: "top 90%",
          onEnter: () => {
            gsap.to(bar, {
              width: `${value}%`,
              duration: 1.2,
              ease: "power2.inOut"
            });
          },
          once: true
        });
      });
    }
    
    // Cleanup function to kill all ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up any event listeners added to images
      document.querySelectorAll(imageElements).forEach(image => {
        if (image._hoverCleanup && typeof image._hoverCleanup === 'function') {
          image._hoverCleanup();
          delete image._hoverCleanup;
        }
      });
      
      // Clean up any event listeners added to stagger items
      document.querySelectorAll(`${staggerElements} > *`).forEach(item => {
        if (item._hoverCleanup && typeof item._hoverCleanup === 'function') {
          item._hoverCleanup();
          delete item._hoverCleanup;
        }
      });
    };
  } catch (error) {
    console.error("Error in createScrollAnimations:", error);
  }
};

// Image hover effect with GSAP
export const imageHoverEffect = async (images) => {
  if (typeof window === 'undefined') return;
  
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return;
    
    const elements = Array.isArray(images) ? images : Array.from(images);
    
    elements.forEach(img => {
      const parent = img.parentElement;
      
      // Skip if no parent or already initialized
      if (!parent || parent.dataset.hoverInit) return;
      
      parent.dataset.hoverInit = 'true';
      
      // Create animations
      const enterAnimation = () => {
        gsap.to(img, {
          scale: 1.05,
          filter: 'brightness(1.1)',
          duration: 0.4,
          ease: "power2.out"
        });
      };
      
      const leaveAnimation = () => {
        gsap.to(img, {
          scale: 1,
          filter: 'brightness(1)',
          duration: 0.3,
          ease: "power2.inOut"
        });
      };
      
      // Add event listeners
      parent.addEventListener('mouseenter', enterAnimation);
      parent.addEventListener('mouseleave', leaveAnimation);
      
      // Store cleanup function on parent element for future reference
      parent._cleanupAnimation = () => {
        parent.removeEventListener('mouseenter', enterAnimation);
        parent.removeEventListener('mouseleave', leaveAnimation);
        delete parent.dataset.hoverInit;
      };
    });
    
    // Return cleanup function
    return () => {
      elements.forEach(img => {
        const parent = img.parentElement;
        if (parent && parent._cleanupAnimation) {
          parent._cleanupAnimation();
        }
      });
    };
  } catch (error) {
    console.error("Error in imageHoverEffect:", error);
  }
};

// Gold button hover animation
export const goldButtonHover = async (buttons) => {
  if (typeof window === 'undefined') return;
  
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return;
    
    const elements = Array.isArray(buttons) ? buttons : Array.from(buttons);
    
    elements.forEach(button => {
      // Skip if null or not a DOM element
      if (!button || !button.tagName) return;
      
      // Skip if already initialized
      if (button.dataset && button.dataset.hoverInit) return;
      
      // Safely set dataset property
      try {
        if (button.dataset) {
          button.dataset.hoverInit = 'true';
        }
      } catch (err) {
        console.warn('Could not set dataset property on button', err);
      }
      
      // Create animations
      const enterAnimation = () => {
        gsap.to(button, {
          backgroundColor: 'rgba(212, 175, 55, 0.15)',
          boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      const leaveAnimation = () => {
        gsap.to(button, {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          scale: 1,
          duration: 0.2,
          ease: "power2.inOut",
          clearProps: "backgroundColor,boxShadow"
        });
      };
      
      // Add event listeners
      button.addEventListener('mouseenter', enterAnimation);
      button.addEventListener('mouseleave', leaveAnimation);
      
      // Store cleanup function on button element
      button._cleanupAnimation = () => {
        button.removeEventListener('mouseenter', enterAnimation);
        button.removeEventListener('mouseleave', leaveAnimation);
        try {
          if (button.dataset) {
            delete button.dataset.hoverInit;
          }
        } catch (err) {
          // Ignore errors when trying to clean up
        }
      };
    });
    
    // Return cleanup function
    return () => {
      elements.forEach(button => {
        if (button && button._cleanupAnimation) {
          button._cleanupAnimation();
        }
      });
    };
  } catch (error) {
    console.error("Error in goldButtonHover:", error);
  }
};

// Animate hero section
export const animateHero = async (heroRef) => {
  if (typeof window === 'undefined' || !heroRef) return;
  
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return;
    
    const headings = heroRef.querySelectorAll('h1, h2');
    const paragraphs = heroRef.querySelectorAll('p');
    const buttons = heroRef.querySelectorAll('button, .btn');
    
    // More selective targeting of images to avoid conflicts
    // Skip images that are handled by onLoadingComplete
    const heroImages = Array.from(heroRef.querySelectorAll('img:not([data-animated]), .hero-image:not([data-animated])'));
    
    // Create a timeline with smoother defaults
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
        duration: 0.8
      }
    });
    
    // Animate headings
    if (headings.length) {
      tl.fromTo(
        headings,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, ease: "power3.out" },
        0
      );
    }
    
    // Animate paragraphs
    if (paragraphs.length) {
      tl.fromTo(
        paragraphs,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.3
      );
    }
    
    // Animate buttons with a bounce effect
    if (buttons.length) {
      tl.fromTo(
        buttons,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" },
        0.5
      );
      
      // Add hover animation to buttons
      goldButtonHover(buttons);
    }
    
    // Only animate images that don't already have their own animation
    if (heroImages.length) {
      // First set initial state
      gsap.set(heroImages, { 
        scale: 0.95, 
        opacity: 0,
        filter: "blur(5px) brightness(0.8)",
        transformOrigin: "center center"
      });
      
      // Then create an enhanced animation sequence
      tl.to(
        heroImages,
        { 
          scale: 1,
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          duration: 1.2, 
          stagger: 0.1,
          ease: "expo.out"
        },
        0.2
      );
      
      // Mark these images as animated to avoid double animations
      heroImages.forEach(img => {
        img.dataset.animated = "true";
      });
    }
    
    // Avoid animating the stable container with glass-gold-stable class
    // Only add floating animations to containers that need it
    const animatableContainers = heroRef.querySelectorAll('.animate-float');
    
    if (animatableContainers.length) {
      animatableContainers.forEach(container => {
        // Check if it already has an animation to avoid duplicates
        if (!container.dataset.floating) {
          container.dataset.floating = "true";
          
          gsap.to(container, {
            y: "-5px",
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5
          });
        }
      });
    }
    
    return tl;
  } catch (error) {
    console.error("Error in animateHero:", error);
  }
};

// Typewriter text animation
export const typeText = async (element, text, duration = 2) => {
  if (typeof window === 'undefined' || !element) return;
  
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return;
    
    // Check if TextPlugin is available
    try {
      const TextPluginModule = await import('gsap/TextPlugin');
      const TextPlugin = TextPluginModule.TextPlugin;
      gsap.registerPlugin(TextPlugin);
      
      gsap.to(element, {
        duration: duration,
        text: {
          value: text,
          delimiter: ''
        },
        ease: 'none'
      });
    } catch (error) {
      // Fallback if TextPlugin is not available
      console.warn("GSAP TextPlugin not available, using fallback method");
      const length = text.length;
      let i = 0;
      
      const interval = setInterval(() => {
        element.textContent = text.substring(0, i);
        i++;
        
        if (i > length) {
          clearInterval(interval);
        }
      }, (duration * 1000) / length);
    }
  } catch (error) {
    console.error("Error in typeText:", error);
  }
};

// Counter animation for statistics
export const animateCounter = async (element, endValue, duration = 2, prefix = '', suffix = '') => {
  if (typeof window === 'undefined' || !element) return;
  
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return;
    
    const obj = { value: 0 };
    
    return gsap.to(obj, {
      value: endValue,
      duration: duration,
      ease: 'power2.out',
      onUpdate: function() {
        element.textContent = prefix + Math.floor(obj.value) + suffix;
      }
    });
  } catch (error) {
    console.error("Error in animateCounter:", error);
  }
};

// Floating animation for elements
export const floatingAnimation = async (elements, duration = 3) => {
  if (typeof window === 'undefined' || !elements) return;
  
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return;
    
    const items = Array.isArray(elements) ? elements : [elements];
    
    items.forEach((el, index) => {
      gsap.to(el, {
        y: '10px',
        duration: duration + (index * 0.2),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  } catch (error) {
    console.error("Error in floatingAnimation:", error);
  }
};

// Logo reveal animation
export const logoReveal = async (element) => {
  if (typeof window === 'undefined' || !element) return;
  
  try {
    const { gsap } = await initGSAP();
    if (!gsap) return;
    
    gsap.fromTo(
      element,
      { 
        opacity: 0,
        scale: 0.8,
        textShadow: "0 0 0px rgba(212, 175, 55, 0)"
      },
      { 
        opacity: 1,
        scale: 1,
        textShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
        duration: 1.2,
        ease: "elastic.out(1, 0.3)"
      }
    );
  } catch (error) {
    console.error("Error in logoReveal:", error);
  }
}; 