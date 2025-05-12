import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { ImageWrapper } from '../components/ImageWrapper';

// Constants for images
const aboutImages = {
  founder: '/images/about/founder.jpg',
  studio: '/images/about/studio.jpg',
};

const testimonials = [
  {
    id: 1,
    name: "Anthony Sessa",
    position: "Head Track & Field Coach, Marlboro High School",
    content: "The Track & Field Management System built by Eugene revolutionized how we organize our team. The custom software streamlined athlete performance tracking, meet scheduling, and record management - saving us countless hours and improving our training effectiveness.",
    avatar: "/images/testimonials/testimonial1.jpg"
  },
  {
    id: 2,
    name: "Sabine Wancique",
    position: "Business Owner, Queen of Lenses Photography",
    content: "The website perfectly captures the elegance and vision of my photography brand. Its sleek design and seamless functionality have elevated client engagement and bookings. Exceptional work delivered with efficiency and precision.",
    avatar: "/images/testimonials/sabine-head.png"
  }
];

const AboutPage = () => {
  const aboutHeroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const clientsRef = useRef(null);
  const skillsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  
  const skills = [
    { name: "Photography", percentage: 95 },
    { name: "Web Design", percentage: 90 },
    { name: "Branding", percentage: 85 },
    { name: "UI/UX Design", percentage: 80 },
    { name: "Digital Marketing", percentage: 75 }
  ];

  useEffect(() => {
    let ctx;
    
    // Only run on client side
    if (typeof window !== 'undefined') {
      const initAnimations = async () => {
        try {
          const { default: gsap } = await import('gsap');
          const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');
          
          gsap.registerPlugin(ScrollTrigger);
          
          // Hero section animation
          gsap.fromTo(
            '.about-title',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
          );
          
          gsap.fromTo(
            '.about-subtitle',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
          );
          
          // Story section animation with ScrollTrigger
          if (storyRef.current) {
            gsap.fromTo(
              '.story-content h2',
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                scrollTrigger: {
                  trigger: '.story-content',
                  start: 'top 80%',
                  toggleActions: 'play none none none'
                }
              }
            );
            
            gsap.fromTo(
              '.story-content p',
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                delay: 0.2,
                scrollTrigger: {
                  trigger: '.story-content',
                  start: 'top 80%',
                  toggleActions: 'play none none none'
                }
              }
            );
            
            gsap.fromTo(
              '.story-image-container',
              { opacity: 0, scale: 0.95 },
              { 
                opacity: 1, 
                scale: 1, 
                duration: 1,
                scrollTrigger: {
                  trigger: '.story-image-container',
                  start: 'top 80%',
                  toggleActions: 'play none none none'
                }
              }
            );
          }
          
          // Values section animation
          if (valuesRef.current) {
            ScrollTrigger.batch('.value-item', {
              onEnter: batch => {
                gsap.fromTo(
                  batch, 
                  { opacity: 0, x: -30 },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out'
                  }
                );
              },
              start: 'top 85%',
              once: true
            });
          }
          
          // Clients section animation
          if (clientsRef.current) {
            gsap.fromTo(
              '.clients-title',
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                  trigger: clientsRef.current,
                  start: 'top 80%',
                  toggleActions: 'play none none none'
                }
              }
            );
            
            gsap.fromTo(
              '.client-logo',
              { opacity: 0, y: 20 },
              { 
                opacity: 1, 
                y: 0, 
                stagger: 0.1,
                duration: 0.6,
                delay: 0.3,
                scrollTrigger: {
                  trigger: '.clients-grid',
                  start: 'top 85%',
                  toggleActions: 'play none none none'
                }
              }
            );
          }
          
          // Animate skills section
          if (skillsRef.current) {
            gsap.fromTo(
              '.skills-header',
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                  trigger: skillsRef.current,
                  start: 'top 80%',
                },
                ease: 'power3.out'
              }
            );
            
            gsap.fromTo(
              '.skill-item',
              { opacity: 0, x: -30 },
              { 
                opacity: 1, 
                x: 0, 
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                  trigger: skillsRef.current,
                  start: 'top 75%',
                },
                ease: 'power2.out'
              }
            );
            
            // Animate skill bars
            gsap.fromTo(
              '.progress-bar-fill',
              { width: 0 },
              { 
                width: function(index, target) {
                  // Get the percentage from the data attribute
                  return target.getAttribute('data-width');
                },
                duration: 1.5,
                delay: 0.5,
                scrollTrigger: {
                  trigger: skillsRef.current,
                  start: 'top 70%',
                },
                ease: 'power2.inOut'
              }
            );
          }
          
          // Animate testimonials
          if (testimonialsRef.current) {
            gsap.fromTo(
              '.testimonials-header',
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                  trigger: testimonialsRef.current,
                  start: 'top 80%',
                },
                ease: 'power3.out'
              }
            );
            
            gsap.fromTo(
              '.testimonial-card',
              { opacity: 0, y: 50 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                  trigger: testimonialsRef.current,
                  start: 'top 70%',
                },
                ease: 'power2.out'
              }
            );
          }
          
          // Animate CTA section
          if (ctaRef.current) {
            gsap.fromTo(
              '.cta-content',
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                  trigger: ctaRef.current,
                  start: 'top 80%',
                },
                ease: 'power3.out'
              }
            );
          }
          
          // Set context for cleanup
          ctx = gsap.context(() => {});
        } catch (error) {
          console.error('Error initializing GSAP:', error);
        }
      };
      
      initAnimations();
    }
    
    return () => {
      if (ctx) {
        ctx.revert(); // Clean up all GSAP animations
      }
    };
  }, []);
  
  return (
    <>
      <NextSeo
        title="About - Third Power Lit"
        description="Learn about the passion, skills, and journey behind ThirdPowerLit. Professional photographer and web designer dedicated to creating powerful visual experiences."
        canonical="https://thirdpowerlit.com/about"
        openGraph={{
          url: 'https://thirdpowerlit.com/about',
          title: 'About - Third Power Lit',
          description: 'Learn about the passion, skills, and journey behind ThirdPowerLit.',
          images: [
            {
              url: '/images/og-about.jpg',
              width: 1200,
              height: 630,
              alt: 'About Third Power Lit',
            },
          ],
        }}
      />
      
      <main className="flex flex-col w-full">
        {/* About Hero Section */}
        <section ref={aboutHeroRef} className="py-16 px-6 md:px-12 bg-gradient-to-b from-primary to-primary-dark">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="about-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About <span className="text-secondary">ThirdPowerLit</span>
            </h1>
            <p className="about-subtitle text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              We're a creative team passionate about bringing digital visions to life through 
              web development, design, and professional photography.
            </p>
          </div>
        </section>
        
        {/* Our Story/Bio Section (Combined) */}
        <section ref={storyRef} className="py-16 px-6 md:px-12 bg-primary-dark">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
              <div className="w-full md:w-1/2 relative">
                <div className="glass overflow-hidden rounded-lg p-4">
                  <div className="w-full h-full">
                    <img
                      src="/assets/hero-image.jpg"
                      alt="ThirdPowerLit"
                      className="w-full h-auto rounded transition-all duration-500 filter grayscale hover:filter-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">Our Story</h2>
                <p className="text-gray-300 mb-4">
                  Hi, I'm the creative force behind ThirdPowerLit. With over 4 years of experience in photography and web design, I've developed a passion for creating compelling visual narratives that help brands stand out in a crowded digital landscape.
                </p>
                <p className="text-gray-300 mb-4">
                  ThirdPowerLit was founded with a simple mission: to empower businesses and creatives through stunning visuals and functional websites. What started as a passion project has evolved into a comprehensive digital service.
                </p>
                <p className="text-gray-300">
                  What sets me apart is my dedication to understanding each client's unique vision and translating that into visually stunning and functionally effective designs. Whether it's through a captivating photograph or an intuitive website, my goal is to create work that resonates and delivers results.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section ref={valuesRef} className="py-16 px-6 md:px-12 bg-primary">
          <div className="max-w-6xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                Our <span className="text-secondary">Values</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="value-item">
                  <div className="flex items-start">
                    <div className="text-secondary text-4xl font-bold mr-4">01</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Excellence in Execution</h3>
                      <p className="text-gray-300">
                        We hold ourselves to the highest standards in every aspect of our work, 
                        from code quality to design details. Mediocrity is never an option.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="value-item">
                  <div className="flex items-start">
                    <div className="text-secondary text-4xl font-bold mr-4">02</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Creative Innovation</h3>
                      <p className="text-gray-300">
                        We embrace creative thinking and innovative approaches, constantly 
                        seeking new ways to solve problems and create compelling experiences.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="value-item">
                  <div className="flex items-start">
                    <div className="text-secondary text-4xl font-bold mr-4">03</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Client Partnership</h3>
                      <p className="text-gray-300">
                        We view our client relationships as true partnerships, collaborating 
                        closely to understand goals and deliver results that exceed expectations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="value-item">
                  <div className="flex items-start">
                    <div className="text-secondary text-4xl font-bold mr-4">04</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Continuous Growth</h3>
                      <p className="text-gray-300">
                        We're committed to continuous learning and improvement, staying at 
                        the forefront of technology and design trends to deliver cutting-edge solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Clients Section */}
        <section ref={clientsRef} className="py-16 px-6 md:px-12 bg-gradient-to-b from-primary to-primary-dark">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="clients-title text-3xl md:text-4xl font-bold text-white mb-12">
              Trusted by <span className="text-secondary">Amazing Clients</span>
            </h2>
            
            <div className="clients-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="client-logo glass p-6 rounded-xl flex items-center justify-center h-[150px]">
                <img 
                  src="/assets/brand-1.png" 
                  alt="Client Logo" 
                  className="max-w-full max-h-full object-contain w-auto h-auto"
                />
              </div>
              <div className="client-logo glass p-6 rounded-xl flex items-center justify-center h-[150px]">
                <img 
                  src="/assets/brand-2.png" 
                  alt="Client Logo" 
                  className="max-w-full max-h-full object-contain w-auto h-auto"
                />
              </div>
              <div className="client-logo glass p-6 rounded-xl flex items-center justify-center h-[150px]">
                <img 
                  src="/assets/brand-3.png" 
                  alt="Client Logo" 
                  className="max-w-full max-h-full object-contain w-auto h-auto"
                />
              </div>
            </div>
            
            <div className="glass-gold p-8 rounded-xl">
              <p className="text-xl text-white mb-8">
                "Eugene transformed our vision into a digital reality that exceeded our expectations. 
                His attention to detail and creative approach made all the difference."
              </p>
              <div className="flex flex-col items-center">
                <p className="font-semibold text-secondary">Sabine Wancique</p>
                <p className="text-gray-300">Founder, Classbridge EdTech</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="py-20 bg-[#181818]" ref={skillsRef}>
          <div className="container mx-auto px-4">
            <div className="skills-header text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gold">My Skills & Expertise</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                I've honed my skills across various creative disciplines, allowing me to deliver comprehensive solutions for all your visual needs.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item mb-8">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                    <span className="text-gold font-medium">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                    <div 
                      className="progress-bar-fill h-full rounded-full"
                      data-width={`${skill.percentage}%`}
                      style={{
                        backgroundImage: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20" ref={testimonialsRef}>
          <div className="container mx-auto px-4">
            <div className="testimonials-header text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gold">Client Testimonials</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Don't just take my word for it. Here's what my clients have to say about working with ThirdPowerLit.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card glass-gold rounded-lg p-6 transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 relative">
                      <ImageWrapper
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                      <p className="text-gray-300">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-200 italic mb-4">"{testimonial.content}"</p>
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star mr-1"></i>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-[#181818]" ref={ctaRef}>
          <div className="container mx-auto px-4">
            <div className="cta-content text-center">
              <h2 className="text-4xl font-bold mb-8 text-gold">Let's Create Something Beautiful Together</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                Ready to elevate your brand with stunning visuals and engaging web design? I'd love to hear about your project and how we can collaborate.
              </p>
              <Link 
                href="/contact" 
                className="px-8 py-3 border-2 border-gold text-gold text-lg font-medium rounded-lg hover:bg-gold hover:text-black transition duration-300 inline-block"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage; 