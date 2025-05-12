import React, { useState, useEffect, useRef } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ImageWrapper } from '../components/ImageWrapper';
import styles from '../styles/animations.module.css';

// Carousel component for project images
const ImageCarousel = ({ images, projectTitle, projectId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  useEffect(() => {
    // Add animation effect when changing slides
    if (slideRef.current) {
      const animate = async () => {
        try {
          const { gsap } = await import('gsap');
          gsap.fromTo(
            slideRef.current,
            { opacity: 0.7, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
          );
        } catch (error) {
          console.error("Error animating slide:", error);
        }
      };
      
      animate();
    }
  }, [currentIndex]);
  
  // For Album Cover project (id 3), use a different layout to preserve aspect ratio
  const isAlbumProject = projectId === 3;
  
  return (
    <div className={`relative w-full ${isAlbumProject ? 'flex justify-center' : 'h-[300px] md:h-[400px]'} mb-6 overflow-hidden rounded-lg`}>
      {/* Current Slide */}
      <div 
        ref={slideRef} 
        className={`relative ${isAlbumProject ? 'w-auto max-w-full max-h-[500px]' : 'w-full h-full'}`}
      >
        {isAlbumProject ? (
          // For album covers, use img tag with auto dimensions to preserve aspect ratio
          <img
            src={images[currentIndex]}
            alt={`${projectTitle} - Slide ${currentIndex + 1}`}
            className="max-h-[500px] w-auto object-contain rounded-lg"
          />
        ) : (
          // For other projects, use ImageWrapper with fill
          <ImageWrapper
            src={images[currentIndex]}
            alt={`${projectTitle} - Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        )}
        
        {/* Slide counter */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Previous/Next buttons */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 flex items-center justify-center text-white transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 flex items-center justify-center text-white transition-all duration-300"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Thumbnail indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-gold w-4' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const projectsRef = useRef(null);
  const modalRef = useRef(null);

  // Project data with updated image paths to use existing assets
  const projects = [
    {
      id: 5,
      title: 'Queen of Lenses Photography',
      category: 'webdesign',
      tags: ['React', 'Vite', 'CSS Modules'],
      image: '/assets/qol-homepage.png',
      images: [
        '/assets/qol-1.png',
        '/assets/qol-2.png',
        '/assets/qol-3.png'
      ],
      description: 'User-focused website for Queen of Lenses, showcasing Sabine Wancique\'s premium photography services. Built with React and Vite, the site features a luxurious Rose Gold, White, and Black design. Key sections—Home, About, Portfolio, Services, Testimonials, and Contact—drive engagement and bookings. Responsive layouts, crafted with vanilla CSS modules, ensure a seamless experience across devices.',
      longDescription: 'User-focused website for Queen of Lenses, showcasing Sabine Wancique\'s premium photography services. Built with React and Vite, the site features a luxurious Rose Gold, White, and Black design. Key sections—Home, About, Portfolio, Services, Testimonials, and Contact—drive engagement and bookings. Responsive layouts, crafted with vanilla CSS modules, ensure a seamless experience across devices. The design emphasizes visual storytelling with elegant image galleries, smooth transitions, and intuitive navigation. Performance optimizations include lazy loading of images, code splitting, and optimized asset delivery to ensure fast load times without compromising the premium feel of the site. A custom CMS integration allows the client to easily update portfolio images and testimonials without developer assistance.',
      client: 'Sabine Wancique',
      date: 'May 2025',
      website: 'https://qolenses.com'
    },
    {
      id: 6,
      title: 'Classbridge Landing Page',
      category: 'webdesign',
      tags: ['React', 'Vite', 'Landing Page'],
      image: '/assets/classbridge-1.png',
      images: [
        '/assets/classbridge-1.png',
        '/assets/classbridge-2.png',
        '/assets/classbridge-3.png'
      ],
      description: 'A dynamic landing page for Classbridge, a specialized learning application supporting kids and teachers in achieving educational goals. Built with React and Vite, the page features a vibrant, user-friendly interface to generate interest and engagement during the app\'s development phase. Utilized vanilla CSS modules for responsive, modern styling, ensuring accessibility across devices, delivering a polished platform to drive anticipation and user sign-ups.',
      longDescription: 'A dynamic landing page for Classbridge, a specialized learning application supporting kids and teachers in achieving educational goals. Built with React and Vite, the page features a vibrant, user-friendly interface to generate interest and engagement during the app\'s development phase. Utilized vanilla CSS modules for responsive, modern styling, ensuring accessibility across devices, delivering a polished platform to drive anticipation and user sign-ups. The landing page incorporates subtle animations and interactive elements to highlight key features and benefits, coupled with strategic call-to-action placements to maximize conversion rates. The design language emphasizes trust and educational excellence through thoughtful color psychology and typography choices, creating a welcoming environment for potential users while maintaining a professional appearance.',
      client: 'Classbridge EdTech',
      date: 'May 2025',
      website: 'https://www.classbridge.info'
    },
    {
      id: 1,
      title: 'Marlboro Track & Field Team Management System',
      category: 'webdesign',
      tags: ['Web App', 'Dashboard', 'Management System'],
      image: '/assets/Track-App-Screenshot.png', 
      images: [
        '/assets/marlboro_login.png',
        '/assets/dashboard_pic.png',
        '/assets/inventory.png'
      ],
      description: 'A comprehensive back-office management solution designed for Marlboro\'s coaching staff to streamline athletic program operations.',
      longDescription: 'A comprehensive back-office management solution designed for Marlboro\'s coaching staff to streamline athletic program operations. Features include roster management, equipment inventory tracking, practice scheduling, team announcements, performance analytics, and event coordination—all within an intuitive dashboard that prioritizes efficiency and reduces administrative overhead.',
      client: 'Anthony Sessa (Head Coach)',
      date: 'April 2025',
      website: ''
    },
    {
      id: 4,
      title: 'LinguaFlux: New & Improved Google Translate',
      category: 'webdesign',
      tags: ['Web App', 'Translation', 'UI/UX'],
      image: '/images/portfolio/ecommerce-platform.jpg',
      images: [
        '/images/portfolio/ecommerce-platform.jpg'
      ],
      description: 'A reimagined language translation platform that enhances communication across cultures. Featuring real-time translation in 8+ languages, AI-powered contextual understanding, custom terminology management, and a sleek, intuitive interface that prioritizes accessibility and user experience.',
      longDescription: 'A reimagined language translation platform that enhances communication across cultures. Featuring real-time translation in 8+ languages, AI-powered contextual understanding, custom terminology management, and a sleek, intuitive interface that prioritizes accessibility and user experience. The platform incorporates advanced machine learning algorithms to provide more accurate translations than conventional tools, particularly for idioms and cultural expressions that typically lose meaning in direct translation. The responsive design ensures a consistent experience across all devices, while offline capabilities allow for essential functionality without internet access.',
      client: 'Personal Project',
      date: 'March 2025',
      website: 'https://lingua-flux.vercel.app'
    },
    {
      id: 2,
      title: 'A Data Visualization: Nutrition → Obesity',
      category: 'webdesign',
      tags: ['Data Visualization', 'Interactive', 'Responsive'],
      image: '/assets/data-image-1.png',
      images: [
        '/assets/data-image-1.png',
        '/assets/data-image-2.png',
        '/assets/data-image-3.png'
      ],
      description: 'A data visualization project that explores the relationship between nutrition and obesity. The project uses a dataset of nutrition and obesity statistics to create a visual representation of the relationship between the two.',
      longDescription: 'A data visualization project that explores the relationship between nutrition and obesity. The project uses a dataset of nutrition and obesity statistics to create a visual representation of the relationship between the two. This project is complete with responsive design principles & intereactive animations/effects. The visualization allows users to explore complex datasets through intuitive interfaces, making it easier to identify patterns and correlations between dietary habits and obesity rates across different demographics and regions.',
      client: 'Personal Research Project',
      date: 'March 2025',
      website: 'https://eugenegraves.github.io/The-Effects-of-Diet-on-Obesity/'
    },
    {
      id: 3,
      title: 'Album Cover Photoshoot & Design',
      category: 'photography',
      tags: ['Album Art', 'Photography', 'Design'],
      image: '/assets/Sitting-HeadDown-Halo-AlbumCover-Edit.jpg',
      images: [
        '/assets/Sitting-HeadDown-Halo-AlbumCover-Edit.jpg',
        '/assets/money-album-cover.JPG'
      ],
      description: 'A photoshoot and design project for album covers of various genres. This project showcases a range of styles and techniques, from classic to modern, and includes a mix of color and black and white images.',
      longDescription: 'A photoshoot and design project for album covers of various genres. This project showcases a range of styles and techniques, from classic to modern, and includes a mix of color and black and white images. Each album cover was conceptualized to match the unique sound and identity of the artist, creating visual narratives that complement their music. The process involved close collaboration with musicians to understand their artistic vision, careful attention to lighting and composition during photoshoots, and meticulous post-processing to achieve the desired aesthetic for each cover.',
      client: 'Various Artists',
      date: 'March 2025',
      website: ''
    }
  ];

  // Filter projects when activeCategory changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleProjects(projects);
    } else {
      setVisibleProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  // Handle modal open/close
  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Allow scrolling again
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    
    if (isModalOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  useEffect(() => {
    // Dynamically import GSAP only on client-side
    const initGSAP = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        const gsapModule = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate header section
        if (headerRef.current) {
          gsap.fromTo(
            '.portfolio-header h1',
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1,
              ease: 'power3.out'
            }
          );
          
          gsap.fromTo(
            '.portfolio-header p',
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1,
              delay: 0.3,
              ease: 'power3.out'
            }
          );
        }
        
        // Animate filter buttons
        if (filterRef.current) {
          gsap.fromTo(
            '.filter-buttons button',
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.6,
              stagger: 0.1,
              delay: 0.5,
              ease: 'power2.out'
            }
          );
        }
        
        // Animate project items when they come into view
        if (projectsRef.current) {
          const projectItems = document.querySelectorAll('.portfolio-item');
          
          projectItems.forEach(item => {
            gsap.fromTo(
              item,
              { opacity: 0, y: 50 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                  trigger: item,
                  start: 'top 85%',
                },
                ease: 'power3.out'
              }
            );
          });
        }
        
        // Animate modal when it opens
        if (isModalOpen && modalRef.current) {
          gsap.fromTo(
            modalRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
          );
        }
      } catch (error) {
        console.error("Failed to initialize GSAP:", error);
      }
    };

    // Initialize GSAP
    initGSAP();

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        const initScrollTriggerCleanup = async () => {
          try {
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            ScrollTrigger.getAll().forEach(t => t.kill());
          } catch (error) {
            console.error("Failed to cleanup ScrollTrigger:", error);
          }
        };
        
        initScrollTriggerCleanup();
      }
    };
  }, [visibleProjects, isModalOpen]); // Re-run when visibleProjects or modal state changes

  return (
    <>
      <NextSeo
        title="Portfolio - Third Power Lit"
        description="Explore the photography portfolio and web design work by ThirdPowerLit. A showcase of creative projects across various disciplines."
        canonical="https://thirdpowerlit.com/portfolio"
        openGraph={{
          url: 'https://thirdpowerlit.com/portfolio',
          title: 'Portfolio - Third Power Lit',
          description: 'Explore the creative work portfolio by ThirdPowerLit featuring photography and web design projects.',
          images: [
            {
              url: '/images/portfolio/featured-portfolio.jpg',
              width: 1200,
              height: 630,
              alt: 'ThirdPowerLit Portfolio',
            },
          ],
        }}
      />
      
      {/* Header Section */}
      <section className="py-20" ref={headerRef}>
        <div className="container mx-auto px-4">
          <div className="portfolio-header text-center max-w-3xl mx-auto">
            <h1 className={`text-5xl font-bold mb-8 text-gold ${styles.fadeInUp}`}>My Portfolio</h1>
            <p className={`text-xl text-gray-300 ${styles.fadeInUp} ${styles['delay-200']}`}>
              A showcase of my creative work across photography, web design, and branding. Each project represents my passion for visual storytelling and technical expertise.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-4 mb-10" ref={filterRef}>
        <div className="container mx-auto px-4">
          <div className={`filter-buttons flex flex-wrap justify-center gap-4 ${styles.fadeInUp} ${styles['delay-300']}`}>
            <button 
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === 'all' 
                  ? 'border border-gold bg-transparent font-bold text-transparent bg-clip-text bg-gold-gradient' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              } ${styles.hoverLift}`}
              onClick={() => setActiveCategory('all')}
            >
              <span className={activeCategory === 'all' ? 'bg-clip-text bg-gold-gradient text-transparent' : ''}>
                All Projects
              </span>
            </button>
            <button 
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === 'photography' 
                  ? 'border border-gold bg-transparent font-bold' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              } ${styles.hoverLift}`}
              onClick={() => setActiveCategory('photography')}
            >
              <span className={activeCategory === 'photography' ? 'bg-clip-text bg-gold-gradient text-transparent' : ''}>
                Photography
              </span>
            </button>
            <button 
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === 'webdesign' 
                  ? 'border border-gold bg-transparent font-bold' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              } ${styles.hoverLift}`}
              onClick={() => setActiveCategory('webdesign')}
            >
              <span className={activeCategory === 'webdesign' ? 'bg-clip-text bg-gold-gradient text-transparent' : ''}>
                Web Design
              </span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Portfolio Grid */}
      <section className="py-10 pb-20" ref={projectsRef}>
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${styles.staggered}`}>
            {visibleProjects.map(project => (
              <div key={project.id} className={`portfolio-item glass overflow-hidden rounded-lg transition-all duration-300 hover:transform hover:scale-[1.02] ${styles.hoverGlow}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ImageWrapper
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-800 text-gold px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className={`text-xl font-bold text-gold mb-2 ${styles.fadeIn}`}>{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Client: {project.client}</span>
                    <span>{project.date}</span>
                  </div>
                  <button 
                    onClick={() => openModal(project)}
                    className="mt-4 inline-block px-6 py-2 border border-gold text-gold rounded-full hover:bg-gold hover:text-black transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {visibleProjects.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl text-gold mb-4">No projects found</h3>
              <p className="text-gray-300">There are no projects in this category yet. Please check back later or select another category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
          <div 
            ref={modalRef}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto glass border border-gold rounded-lg"
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gold hover:bg-gray-700 transition-all z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="p-8">
              {/* Project Image Carousel */}
              <ImageCarousel 
                images={selectedProject.images || [selectedProject.image]} 
                projectTitle={selectedProject.title}
                projectId={selectedProject.id}
              />
              
              {/* Project Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gold mb-2">{selectedProject.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-800 text-gold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-white mb-3">Project Overview</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                  </div>
                  
                  <div className="glass-gold p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Project Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-300">Client</p>
                        <p className="font-medium text-white">{selectedProject.client}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Date</p>
                        <p className="font-medium text-white">{selectedProject.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Category</p>
                        <p className="font-medium text-white capitalize">{selectedProject.category}</p>
                      </div>
                      
                      {selectedProject.website && (
                        <div className="pt-4">
                          <a 
                            href={selectedProject.website} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full text-center px-4 py-2 bg-gold-gradient bg-[length:200%_100%] animate-gradient-slow text-black rounded-full font-bold tracking-wide hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-500 ease-out shadow-md"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Call To Action */}
      <section className="py-16 glass-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`text-4xl font-bold mb-6 text-white ${styles.fadeInUp}`}>Ready to Start Your Project?</h2>
          <p className={`text-lg text-gray-200 mb-8 max-w-2xl mx-auto ${styles.fadeInUp} ${styles['delay-200']}`}>
            Let's collaborate on your next creative venture. Whether it's photography, web design, or branding, I'm here to bring your vision to life.
          </p>
          <Link href="/contact" className={`px-8 py-3 bg-black text-gold font-medium rounded-lg hover:bg-gray-900 transition duration-300 inline-block ${styles.fadeInUp} ${styles['delay-400']} ${styles.hoverLift}`}>
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage; 