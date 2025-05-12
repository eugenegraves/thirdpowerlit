import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { ImageWrapper } from '../components/ImageWrapper';
import ContactForm from '../components/ContactForm';
import ServiceCard from '../components/ServiceCard';
import TypewriterText from '../components/TypewriterText';
import styles from '../styles/animations.module.css';

// Updated image paths to use the correct images directory
const heroImage = '/images/hero/hero-image.jpg';
const trackAppImage = '/images/portfolio/app-screenshot.jpg';
const dataVisualizationImage = '/assets/data-image-1.png';
const albumCoverImage = '/images/portfolio/album-cover.jpg';
const trackTeamImage = '/assets/Track-App-Screenshot.png';
const queenOfLensesImage = '/assets/qol-homepage.png';

const HomePage = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const projectsRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    // Dynamically import GSAP only on client-side
    const initGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        if (heroRef.current) {
          gsap.fromTo(
            '.hero-content h1', 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
          );
          
          gsap.fromTo(
            '.hero-content p', 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
          );
          
          gsap.fromTo(
            '.hero-content .cta-button', 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
          );
          
          gsap.fromTo(
            '.hero-image', 
            { opacity: 0, scale: 0.9 }, 
            { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: 'power2.out' }
          );
        }
        
        // About section animations
        if (aboutRef.current) {
          gsap.fromTo(
            '.about-content',
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1,
              scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
        
        // Stats animations
        if (statsRef.current) {
          gsap.fromTo(
            '.stat-item',
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              stagger: 0.2,
              scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
        
        // Projects animations
        if (projectsRef.current) {
          gsap.fromTo(
            '.projects-header',
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              scrollTrigger: {
                trigger: '.projects-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
          
          gsap.fromTo(
            '.project-card',
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              stagger: 0.2,
              scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
        
        // Services animations
        if (servicesRef.current) {
          gsap.fromTo(
            '.services-header',
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              scrollTrigger: {
                trigger: '.services-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
          
          gsap.fromTo(
            '.service-item',
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              stagger: 0.2,
              scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
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
      // Only run if window exists
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
  }, []);

  return (
    <>
      <NextSeo
        title="Third Power Lit - Premium Photography & Web Design"
        description="Professional photography and elite web design services by Third Power Lit. Premium quality with a personal touch."
        canonical="https://thirdpowerlit.com/"
        openGraph={{
          url: 'https://thirdpowerlit.com/',
          title: 'Third Power Lit - Premium Photography & Web Design',
          description: 'Professional photography and elite web design services. Premium quality with a personal touch.',
          images: [
            {
              url: '/images/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Third Power Lit',
            },
          ],
        }}
      />
      
      {/* Hero Section */}
      <section 
        className="flex flex-col md:flex-row items-center py-20 min-h-[90vh] relative overflow-hidden" 
        ref={heroRef}
        style={{
          background: '#121212',
          position: 'relative'
        }}
      >
        {/* Gold radial gradient overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40" 
          style={{
            background: 'radial-gradient(circle at center, rgba(191, 149, 63, 0.6) 0%, rgba(251, 245, 183, 0.35) 25%, rgba(170, 119, 28, 0.2) 50%, rgba(18, 18, 18, 0) 75%)',
            pointerEvents: 'none'
          }}
        ></div>
        
        <div className="w-full md:w-1/2 p-4 md:p-10 hero-content z-10">
          <h1 className={`text-5xl md:text-6xl font-bold mb-4 text-white ${styles.fadeInUp}`}>
            WEB<br />DEVELOPMENT &<br />
            <span style={{ 
              backgroundImage: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>CREATIVE DESIGN</span>
          </h1>
          <p className={`text-xl uppercase mb-6 text-gray-400 tracking-wide ${styles.fadeInUp} ${styles['delay-200']}`}>
            PROFESSIONAL WEB DEVELOPMENT, PHOTOGRAPHY & DIGITAL SERVICES
          </p>
          <div className="flex flex-col items-end mb-8">
            <TypewriterText 
              text="I AM PASSIONATE ABOUT CREATING WEBSITES THAT STAND OUT FROM THE CROWD."
              speed={15}
              delay={1500}
              className="text-lg text-gray-300 text-right max-w-sm"
              breakLines={true}
              wordsPerLine={3}
            />
          </div>
          <a 
            href="/contact" 
            className={`cta-button px-8 py-3 text-white text-lg font-medium rounded-full ${styles.fadeInUp} ${styles['delay-400']}`}
            style={{ 
              background: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
              color: '#000',
              fontWeight: '600',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Let's Work Together
          </a>
        </div>
        <div className={`w-full md:w-1/2 flex items-center justify-center hero-image ${styles.fadeIn} ${styles['delay-300']} z-10`}>
          <div className="border border-gold rounded-lg overflow-hidden" style={{ maxWidth: "600px", maxHeight: "800px" }}>
            <ImageWrapper 
              src={heroImage}
              alt="Professional portrait" 
              width={600} 
              height={800}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[#181818]" ref={aboutRef}>
        <div className="container mx-auto px-4 about-section">
          <div className="about-content max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-bold mb-10 text-gold ${styles.fadeInUp}`}>About My Craft</h2>
            <p className={`text-lg md:text-xl mb-10 text-gray-300 ${styles.fadeInUp} ${styles['delay-200']}`}>
              With over 4 years of experience in photography and design, I've developed a distinctive style that combines technical precision with artistic vision. My work aims to capture authentic moments and create digital experiences that resonate with audiences and achieve business objectives.
            </p>
            <div className={`flex flex-wrap justify-center gap-6 ${styles.fadeInUp} ${styles['delay-300']}`}>
              <Link href="/about">
                <span className={`px-6 py-3 border-2 border-secondary text-white text-lg font-medium rounded-lg hover:bg-gradient-to-r hover:from-yellow-600 hover:to-amber-500 hover:text-white transition duration-300 ${styles.hoverLift}`}>
                  Learn More
                </span>
              </Link>
              <Link href="/portfolio">
                <span className={`px-6 py-3 border-2 border-gold text-gold text-lg font-medium rounded-lg hover:bg-gold hover:text-black transition duration-300 ${styles.hoverLift}`}>
                  View Portfolio
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" ref={statsRef}>
        <div className="container mx-auto px-4 stats-section">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${styles.staggered}`}>
            <div className={`stat-item glass p-8 rounded-lg text-center ${styles.hoverGlow}`}>
              <p className={`text-4xl md:text-5xl font-bold text-gold mb-2 ${styles.textShimmer}`}>6</p>
              <p className="text-white text-lg">Projects Completed</p>
            </div>
            <div className={`stat-item glass p-8 rounded-lg text-center ${styles.hoverGlow}`}>
              <p className={`text-4xl md:text-5xl font-bold text-gold mb-2 ${styles.textShimmer}`}>100%</p>
              <p className="text-white text-lg">Client Satisfaction</p>
            </div>
            <div className={`stat-item glass p-8 rounded-lg text-center ${styles.hoverGlow}`}>
              <p className={`text-4xl md:text-5xl font-bold text-gold mb-2 ${styles.textShimmer}`}>4+</p>
              <p className="text-white text-lg">Years Experience</p>
            </div>
            <div className={`stat-item glass p-8 rounded-lg text-center ${styles.hoverGlow}`}>
              <p className={`text-4xl md:text-5xl font-bold text-gold mb-2 ${styles.textShimmer}`}>2</p>
              <p className="text-white text-lg">Returning Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20" ref={projectsRef}>
        <div className="container mx-auto px-4 projects-section">
          <div className="projects-header text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-gold ${styles.fadeInUp}`}>Featured Projects</h2>
            <p className={`text-lg text-gray-300 max-w-3xl mx-auto ${styles.fadeInUp} ${styles['delay-200']}`}>
              A selection of my finest work showcasing photography, web design, and branding projects that demonstrate my versatility and attention to detail.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 projects-grid ${styles.staggered}`}>
            {/* Project 1 */}
            <div className={`project-card glass rounded-lg overflow-hidden ${styles.hoverGlow}`}>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <ImageWrapper 
                  src={queenOfLensesImage}
                  alt="Queen of Lenses Photography" 
                  fill={true}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 bg-secondary text-white rounded-full">React</span>
                  <span className="text-xs px-3 py-1 bg-secondary text-white rounded-full">Vite</span>
                  <span className="text-xs px-3 py-1 bg-secondary text-white rounded-full">CSS Modules</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 text-gold ${styles.fadeIn}`}>Queen of Lenses Photography</h3>
                <p className="text-gray-300 mb-4">User-focused website for Queen of Lenses, showcasing Sabine Wancique's premium photography services. Built with React and Vite, the site features a luxurious Rose Gold, White, and Black design.</p>
                <Link href="/portfolio">
                  <span className="text-gold hover:text-yellow-400 font-medium inline-flex items-center transition duration-300">
                    View Details
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className={`project-card glass rounded-lg overflow-hidden ${styles.hoverGlow}`}>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <ImageWrapper 
                  src={trackTeamImage}
                  alt="Marlboro Track & Field Team Management System" 
                  fill={true}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 bg-secondary text-white rounded-full">Web App</span>
                  <span className="text-xs px-3 py-1 bg-secondary text-white rounded-full">Dashboard</span>
                  <span className="text-xs px-3 py-1 bg-secondary text-white rounded-full">Management System</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 text-gold ${styles.fadeIn}`}>Marlboro Track & Field Team Management System</h3>
                <p className="text-gray-300 mb-4">A comprehensive back-office management solution designed for Marlboro's coaching staff to streamline athletic program operations.</p>
                <Link href="/portfolio">
                  <span className="text-gold hover:text-yellow-400 font-medium inline-flex items-center transition duration-300">
                    View Details
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className={`project-card glass rounded-lg overflow-hidden ${styles.hoverGlow}`}>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <ImageWrapper 
                  src={dataVisualizationImage}
                  alt="Data Visualization Project" 
                  fill={true}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 bg-secondary text-white rounded-full">Data Visualization</span>
                  <span className="text-xs px-3 py-1 bg-secondary text-white rounded-full">Interactive</span>
                  <span className="text-xs px-3 py-1 bg-secondary text-white rounded-full">Responsive</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 text-gold ${styles.fadeIn}`}>A Data Visualization: Nutrition → Obesity</h3>
                <p className="text-gray-300 mb-4">A data visualization project that explores the relationship between nutrition and obesity. The project uses a dataset of nutrition and obesity statistics to create a visual representation of the relationship between the two.</p>
                <Link href="/portfolio">
                  <span className="text-gold hover:text-yellow-400 font-medium inline-flex items-center transition duration-300">
                    View Details
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className={`text-center mt-12 ${styles.fadeInUp} ${styles['delay-400']}`}>
            <Link href="/portfolio">
              <span className={`px-8 py-3 border-2 border-secondary text-white text-lg font-medium rounded-lg hover:bg-gradient-to-r hover:from-yellow-600 hover:to-amber-500 hover:text-white transition duration-300 inline-block ${styles.hoverLift}`}>
                View All Projects
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 glass-gold" ref={servicesRef}>
        <div className="container mx-auto px-4 services-section">
          <div className="services-header text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-white ${styles.fadeInUp}`}>My Services</h2>
            <p className={`text-lg text-white max-w-3xl mx-auto ${styles.fadeInUp} ${styles['delay-200']}`}>
              I offer comprehensive creative solutions that cater to your unique needs, from stunning photography to cutting-edge web design.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 services-grid ${styles.staggered}`}>
            {/* Service 1 */}
            <div className={`service-item glass rounded-lg p-8 text-center ${styles.hoverGlow}`}>
              <div className={`w-20 h-20 mx-auto mb-6 bg-gold rounded-full flex items-center justify-center ${styles.pulse}`}>
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-gold ${styles.fadeIn}`}>Photography</h3>
              <p className="text-white mb-6">Professional photography services for products, events, portraits, and more, delivered with meticulous attention to detail.</p>
              <Link href="/services">
                <span className="text-gold hover:text-yellow-400 font-medium inline-flex items-center justify-center transition duration-300">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className={`service-item glass rounded-lg p-8 text-center ${styles.hoverGlow}`}>
              <div className={`w-20 h-20 mx-auto mb-6 bg-gold rounded-full flex items-center justify-center ${styles.pulse}`}>
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-gold ${styles.fadeIn}`}>Web Design</h3>
              <p className="text-white mb-6">Custom website design and development that combines aesthetic appeal with functionality to create engaging digital experiences.</p>
              <Link href="/services">
                <span className="text-gold hover:text-yellow-400 font-medium inline-flex items-center justify-center transition duration-300">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className={`service-item glass rounded-lg p-8 text-center ${styles.hoverGlow}`}>
              <div className={`w-20 h-20 mx-auto mb-6 bg-gold rounded-full flex items-center justify-center ${styles.pulse}`}>
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-gold ${styles.fadeIn}`}>Editing & Retouching</h3>
              <p className="text-white mb-6">Professional photo editing and retouching services that enhance your images while maintaining a natural and authentic look.</p>
              <Link href="/services">
                <span className="text-gold hover:text-yellow-400 font-medium inline-flex items-center justify-center transition duration-300">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          
          <div className={`text-center mt-12 ${styles.fadeInUp} ${styles['delay-400']}`}>
            <Link href="/services">
              <span className={`px-8 py-3 border-2 border-white text-white text-lg font-medium rounded-lg hover:bg-white hover:text-black transition duration-300 inline-block ${styles.hoverLift}`}>
                Explore All Services
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className={`glass-gold rounded-lg p-10 md:p-16 text-center ${styles.goldShine}`}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-white ${styles.fadeInUp}`}>Ready to Start Your Project?</h2>
            <p className={`text-lg text-white mb-10 max-w-2xl mx-auto ${styles.fadeInUp} ${styles['delay-200']}`}>
              Let's collaborate to bring your vision to life. Whether you need photography, web design, or both, I'm here to help you create something exceptional.
            </p>
            <Link href="/contact">
              <span className={`px-10 py-4 bg-black text-gold text-xl font-medium rounded-lg hover:bg-gold hover:text-black transition duration-300 inline-block ${styles.fadeInUp} ${styles['delay-400']} ${styles.hoverLift}`}>
                Get in Touch
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage; 