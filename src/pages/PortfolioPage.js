import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import albumCoverImage from '../assets/Sitting-HeadDown-Halo-AlbumCover-Edit.jpg';
import moneyAlbumCoverImage from '../assets/money-album-cover.JPG';
import linguaFluxImage from '../assets/LingaFlux-Home.png';
import malrboroImage from '../assets/Track-App-Screenshot.png';
import trackAppImage1 from '../assets/marlboro_login.png';
import trackAppImage2 from '../assets/dashboard_pic.png';
import trackAppImage3 from '../assets/inventory.png';
import dataImage1 from '../assets/data-image-1.png';
import dataImage2 from '../assets/data-image-2.png';
import dataImage3 from '../assets/data-image-3.png';
import sessaProfileImage from '../assets/sessa-profile.png';
const projects = [
  {
    id: 4,
    title: 'Marlboro Track & Field Team Management System',
    category: 'UI/UX Design',
    description: 'A comprehensive back-office management solution designed for Marlboro\'s coaching staff to streamline athletic program operations. Features include roster management, equipment inventory tracking, practice scheduling, team announcements, performance analytics, and event coordination—all within an intuitive dashboard that prioritizes efficiency and reduces administrative overhead.',
    image: `${malrboroImage}`,
    images: [
      `${trackAppImage1}`,
      `${trackAppImage2}`,
      `${trackAppImage3}`
    ],
    tags: ['React', 'Firebase', 'Three.js', 'Express.js'],
    url: '',
    client: 'Marlboro High School Track & Field',
    date: 'April 2025',
    services: ['UI/UX Design', 'Web Application Development', 'Software Architecture']
  },
  {
    id: 1,
    title: 'A Data Visualization: Nutrition → Obesity',
    category: 'Web Development',
    description: 'A data visualization project that explores the relationship between nutrition and obesity. The project uses a dataset of nutrition and obesity statistics to create a visual representation of the relationship between the two. This project is complete with responsive design principles & intereactive animations/effects.',
    image: `${dataImage2}`,
    images: [
      `${dataImage1}`,
      `${dataImage2}`,
      `${dataImage3}`
    ],
    tags: ['React', 'Node.js', 'Vite', 'GSAP', 'Recharts'],
    url: 'https://eugenegraves.github.io/The-Effects-of-Diet-on-Obesity/',
    client: 'Health Research Institute',
    date: 'March 2025',
    services: ['Data Analysis', 'Web Development', 'UI Design']
  },
  {
    id: 2,
    title: 'Album Cover Photoshoot & Design',
    category: 'Photography',
    description: 'A photoshoot and design project for album covers of various genres. This project showcases a range of styles and techniques, from classic to modern, and includes a mix of color and black and white images.',
    image: `${albumCoverImage}`,
    images: [
      `${albumCoverImage}`,
      `${moneyAlbumCoverImage}`
    ],
    tags: ['Panasonic LUMIX FZ300', 'Adobe Photoshop', 'Adobe Lightroom'],
    url: '',
    client: 'Self',
    date: 'March 2025',
    services: ['Photography', 'Photo Editing', 'Graphic Design']
  },
  {
    id: 3,
    title: 'LinguaFlux: New & Improved Google Translate',
    category: 'Web Design',
    description: 'A reimagined language translation platform that enhances communication across cultures. Featuring real-time translation in 75+ languages, AI-powered contextual understanding, custom terminology management, and a sleek, intuitive interface that prioritizes accessibility and user experience.',
    image: `${linguaFluxImage}`,
    images: [
      `${linguaFluxImage}`
    ],
    tags: ['React', 'Vite', 'API Integration', 'GSAP', 'Three.js'],
    url: 'https://lingua-flux.vercel.app',
    client: 'Self',
    date: 'March 2025',
    services: ['Web Design', 'UX Research', 'Front-end Development']
  },
];

const categories = [
  'All',
  'Web Development',
  'Photography',
  'Web Design',
  'Editing',
  'Branding',
  'UI/UX Design'
];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  
  const handleProjectClick = (project) => {
    setActiveProject(project);
    setCurrentSlide(0); // Reset slide index when opening a new project
  };
  
  const handleCloseModal = () => {
    setActiveProject(null);
  };
  
  const goToNextSlide = () => {
    if (isAnimating || !activeProject) return;
    
    setIsAnimating(true);
    const nextSlide = (currentSlide + 1) % activeProject.images.length;
    
    // Preload the next image before starting animation
    const preloadImage = new Image();
    preloadImage.src = activeProject.images[nextSlide];
    preloadImage.onload = () => {
      const slideContainer = document.querySelector('.carousel-slide-container');
      const currentImg = slideContainer.querySelector('.carousel-slide.active');
      const nextImg = document.createElement('img');
      
      nextImg.src = activeProject.images[nextSlide];
      nextImg.alt = `${activeProject.title} - Image ${nextSlide + 1}`;
      nextImg.className = 'carousel-slide max-w-full max-h-full object-contain opacity-0';
      nextImg.style.position = 'absolute';
      
      slideContainer.appendChild(nextImg);

      // Use a single timeline with simpler animations
      gsap.timeline({
        defaults: { duration: 0.4, ease: 'power1.inOut' },
        onComplete: () => {
          currentImg.remove();
          nextImg.classList.add('active');
          nextImg.style.position = 'relative';
          setIsAnimating(false);
        }
      })
      .to(currentImg, { opacity: 0 }, 0)
      .to(nextImg, { opacity: 1 }, 0);
      
      setCurrentSlide(nextSlide);
    };
  };
  
  const goToPrevSlide = () => {
    if (isAnimating || !activeProject) return;
    
    setIsAnimating(true);
    const prevSlide = (currentSlide - 1 + activeProject.images.length) % activeProject.images.length;
    
    // Preload the previous image before starting animation
    const preloadImage = new Image();
    preloadImage.src = activeProject.images[prevSlide];
    preloadImage.onload = () => {
      const slideContainer = document.querySelector('.carousel-slide-container');
      const currentImg = slideContainer.querySelector('.carousel-slide.active');
      const prevImg = document.createElement('img');
      
      prevImg.src = activeProject.images[prevSlide];
      prevImg.alt = `${activeProject.title} - Image ${prevSlide + 1}`;
      prevImg.className = 'carousel-slide max-w-full max-h-full object-contain opacity-0';
      prevImg.style.position = 'absolute';
      
      slideContainer.appendChild(prevImg);

      // Use a single timeline with simpler animations
      gsap.timeline({
        defaults: { duration: 0.4, ease: 'power1.inOut' },
        onComplete: () => {
          currentImg.remove();
          prevImg.classList.add('active');
          prevImg.style.position = 'relative';
          setIsAnimating(false);
        }
      })
      .to(currentImg, { opacity: 0 }, 0)
      .to(prevImg, { opacity: 1 }, 0);
      
      setCurrentSlide(prevSlide);
    };
  };
  
  const handleSlideClick = (index) => {
    if (!isAnimating && currentSlide !== index) {
      setIsAnimating(true);
      
      // Preload the new image before starting animation
      const preloadImage = new Image();
      preloadImage.src = activeProject.images[index];
      preloadImage.onload = () => {
        const slideContainer = document.querySelector('.carousel-slide-container');
        const currentImg = slideContainer.querySelector('.carousel-slide.active');
        const newImg = document.createElement('img');
        
        newImg.src = activeProject.images[index];
        newImg.alt = `${activeProject.title} - Image ${index + 1}`;
        newImg.className = 'carousel-slide max-w-full max-h-full object-contain opacity-0';
        newImg.style.position = 'absolute';
        
        slideContainer.appendChild(newImg);

        // Use a single timeline with simpler animations
        gsap.timeline({
          defaults: { duration: 0.4, ease: 'power1.inOut' },
          onComplete: () => {
            currentImg.remove();
            newImg.classList.add('active');
            newImg.style.position = 'relative';
            setIsAnimating(false);
          }
        })
        .to(currentImg, { opacity: 0 }, 0)
        .to(newImg, { opacity: 1 }, 0);
        
        setCurrentSlide(index);
      };
    }
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeProject) return;
      
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, currentSlide, isAnimating]);
  
  return (
    <div className="min-h-screen">
      {/* Portfolio Hero */}
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gold">MY PORTFOLIO</h1>
          <p className="text-lg md:text-xl max-w-3xl text-gray-300">
            EXPLORE MY FEATURED PROJECTS SHOWCASING MY SKILLS AND EXPERIENCE
            IN WEB DEVELOPMENT, DESIGN, PHOTOGRAPHY, AND CREATIVE SERVICES.
          </p>
        </div>
      </section>
      
      {/* Filter Categories */}
      <section className="py-8 px-4 sticky top-16 z-40 glass">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-2 mx-2 my-2 rounded-full border transition-colors ${
                  activeCategory === category 
                    ? 'bg-gold-gradient text-primary border-secondary' 
                    : 'text-gray-300 border-gray-700 hover:border-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="glass overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="px-4 py-2 bg-gold-gradient text-primary rounded-full flex items-center">
                      View Project
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-gold text-sm uppercase tracking-wider">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gold">{project.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                  <div className="mt-4 flex flex-wrap">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="text-xs mr-2 mb-2 px-2 py-1 rounded-full bg-secondary/10 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80" onClick={handleCloseModal}>
          <div className="max-w-6xl w-full glass-gold rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative bg-black/20">
              {/* Image container with fixed aspect ratio */}
              <div className="carousel-slide-container relative flex justify-center items-center p-8" style={{ height: '70vh' }}>
                <img 
                  src={activeProject.images[currentSlide]} 
                  alt={`${activeProject.title} - Image ${currentSlide + 1}`} 
                  className="carousel-slide active max-w-full max-h-full object-contain"
                />
              </div>
              
              {/* Carousel Controls */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                <button 
                  className="w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-80 transition-all focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevSlide();
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-80 transition-all focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextSlide();
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Slide Indicators */}
              <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-2">
                {activeProject.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-gold scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSlideClick(index);
                    }}
                  />
                ))}
              </div>
              
              <button 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-80 transition-all"
                onClick={handleCloseModal}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gold">{activeProject.title}</h2>
                <span className="text-secondary bg-secondary/10 px-3 py-1 rounded-full text-sm">
                  {activeProject.category}
                </span>
              </div>
              <p className="text-gray-300 mb-6">{activeProject.description}</p>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 text-gold">Project Details</h3>
                <ul className="text-gray-300">
                  <li className="mb-2">
                    <span className="font-semibold text-secondary-light">Client:</span> {activeProject.client}
                  </li>
                  <li className="mb-2">
                    <span className="font-semibold text-secondary-light">Date:</span> {activeProject.date}
                  </li>
                  <li className="mb-2">
                    <span className="font-semibold text-secondary-light">Services:</span> {activeProject.services.join(', ')}
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 text-gold">Technologies Used</h3>
                <div className="flex flex-wrap">
                  {activeProject.tags.map((tag, index) => (
                    <span key={index} className="text-sm mr-2 mb-2 px-3 py-1 rounded-full bg-secondary/10 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center mb-8">
                <a 
                  href={activeProject.url || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-block glass-gold px-8 py-3 rounded-full text-white hover:bg-gradient-to-r hover:from-secondary hover:to-secondary/80 transition-all duration-300 ${!activeProject.url && 'opacity-75 cursor-not-allowed'}`}
                >
                  View Live Project
                </a>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <button 
                  className="text-gray-300 hover:text-gold transition-colors flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = projects.findIndex(p => p.id === activeProject.id);
                    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
                    handleProjectClick(projects[prevIndex]);
                  }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Previous Project
                </button>
                <button 
                  className="text-gray-300 hover:text-gold transition-colors flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = projects.findIndex(p => p.id === activeProject.id);
                    const nextIndex = (currentIndex + 1) % projects.length;
                    handleProjectClick(projects[nextIndex]);
                  }}
                >
                  Next Project
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Client Testimonials */}
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gold">CLIENT TESTIMONIALS</h2>
          
          <div className="flex justify-center">
            <div className="glass p-8 rounded-lg max-w-2xl">
              <div className="text-secondary text-3xl mb-6">❞</div>
              <p className="text-gray-300 mb-6">
                "The Track & Field Management System built by Eugene revolutionized how we organize our team. The custom software streamlined athlete performance tracking, meet scheduling, and record management - saving us countless hours and improving our training effectiveness."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-600 mr-4 overflow-hidden">
                  <img src={sessaProfileImage} alt="Anthony Sessa" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-gold">Anthony Sessa</p>
                  <p className="text-gray-400 text-sm">Head Coach, MHS Track & Field</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 glass-gold">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">HAVE A PROJECT IN MIND?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-300">
            Let's collaborate to create something exceptional that meets your goals and exceeds your expectations.
          </p>
          <button className="bg-gold-gradient text-primary px-8 py-3 inline-flex items-center font-bold hover:opacity-90 transition-opacity duration-300 rounded-md">
            Contact Me
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage; 