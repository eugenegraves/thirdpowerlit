import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Page transition animations
export const pageEntrance = (container) => {
  const tl = gsap.timeline();
  
  // Animate the container from opacity 0 to 1
  tl.fromTo(
    container,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
  );
  
  // Animate headings with a stagger
  tl.fromTo(
    `${container} h1, ${container} h2`,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
    "-=0.4"
  );
  
  // Animate paragraphs with a stagger
  tl.fromTo(
    `${container} p`,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
    "-=0.3"
  );
  
  // Animate buttons
  tl.fromTo(
    `${container} button`,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power1.out" },
    "-=0.2"
  );
  
  return tl;
};

// Hero section animation
export const animateHero = (element) => {
  const tl = gsap.timeline();
  
  tl.fromTo(
    `${element} img`,
    { scale: 1.2, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
  );
  
  return tl;
};

// Text gradual reveal animation
export const typeText = (element, text, duration = 1.5) => {
  return gsap.to(element, {
    duration: duration,
    text: text,
    ease: "none"
  });
};

// Card reveal animation for services and projects
export const revealCards = (elements, staggerTime = 0.2) => {
  return gsap.fromTo(
    elements,
    { y: 100, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      stagger: staggerTime,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elements,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      }
    }
  );
};

// Section parallax effect
export const parallaxSection = (element, speed = 0.5) => {
  return ScrollTrigger.create({
    trigger: element,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      gsap.to(element, {
        y: self.progress * 100 * speed,
        ease: "none",
        overwrite: "auto"
      });
    }
  });
};

// Gold gradient button hover effect
export const goldButtonHover = (buttons) => {
  buttons.forEach(button => {
    const originalScale = 1;
    
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.out",
        background: "linear-gradient(to right, #FCF6BA, #BF953F, #FCF6BA)",
        backgroundSize: "200% 100%",
      });
      
      gsap.to(button, {
        backgroundPosition: "100% 0%",
        duration: 1,
        ease: "none",
        repeat: -1,
        yoyo: true
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: originalScale,
        duration: 0.3,
        ease: "power1.out",
        backgroundPosition: "0% 0%",
        repeat: 0
      });
    });
  });
};

// Glass card hover effect
export const glassCardHover = (cards) => {
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)",
        y: -5,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
};

// Continuous floating animation for elements
export const floatingAnimation = (elements, intensity = 5) => {
  elements.forEach((element, index) => {
    const delay = index * 0.2;
    const duration = 2 + Math.random();
    
    gsap.to(element, {
      y: `+=${intensity}`,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay
    });
  });
};

// Number counter animation
export const animateCounter = (element, endValue, duration = 2, prefix = '', suffix = '') => {
  let startValue = 0;
  
  return gsap.to(element, {
    innerText: endValue,
    duration: duration,
    snap: { innerText: 1 },
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: element,
      start: "top bottom-=100",
      toggleActions: "play none none none"
    },
    onUpdate: function() {
      element.innerText = prefix + Math.floor(this.targets()[0].innerText) + suffix;
    }
  });
};

// Logo reveal animation
export const logoReveal = (element) => {
  const tl = gsap.timeline();
  
  tl.fromTo(
    element,
    { 
      scale: 0.5, 
      opacity: 0,
      textShadow: "0 0 0px rgba(212, 175, 55, 0)" 
    },
    { 
      scale: 1, 
      opacity: 1, 
      duration: 1, 
      ease: "elastic.out(1, 0.3)",
      textShadow: "0 0 10px rgba(212, 175, 55, 0.5)" 
    }
  );
  
  return tl;
};

// Image gallery hover effect
export const imageHoverEffect = (images) => {
  images.forEach(image => {
    image.addEventListener('mouseenter', () => {
      gsap.to(image, {
        scale: 1.05,
        filter: "grayscale(0%) brightness(1.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    image.addEventListener('mouseleave', () => {
      gsap.to(image, {
        scale: 1,
        filter: "grayscale(30%) brightness(1)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
};

// Scrolling text animation for banners
export const scrollingText = (element, direction = 1) => {
  const text = element.innerText;
  const repeatedText = (text + ' ').repeat(10);
  element.innerText = repeatedText;
  
  gsap.to(element, {
    x: direction > 0 ? "-50%" : "0%",
    ease: "none",
    repeat: -1,
    duration: 20
  });
};

// Gold shimmer effect
export const goldShimmer = (elements) => {
  elements.forEach(element => {
    const tl = gsap.timeline({repeat: -1, repeatDelay: 3});
    
    tl.to(element, {
      backgroundImage: "linear-gradient(90deg, #BF953F 0%, #FCF6BA 30%, #FBF5B7 50%, #AA771C 70%, #BF953F 100%)",
      backgroundPosition: "200% 0",
      backgroundSize: "200% 100%",
      duration: 0
    });
    
    tl.to(element, {
      backgroundPosition: "-200% 0",
      duration: 1.5,
      ease: "sine.inOut"
    });
  });
};

export default {
  pageEntrance,
  animateHero,
  typeText,
  revealCards,
  parallaxSection,
  goldButtonHover,
  glassCardHover,
  floatingAnimation,
  animateCounter,
  logoReveal,
  imageHoverEffect,
  scrollingText,
  goldShimmer
}; 