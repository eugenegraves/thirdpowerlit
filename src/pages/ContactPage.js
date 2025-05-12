import React, { useState, useEffect, useRef } from 'react';
import { ImageWrapper } from '../components/ImageWrapper';
import { NextSeo } from 'next-seo';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    serviceType: 'photography'
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    message: ''
  });

  const contactHeaderRef = useRef(null);
  const contactFormRef = useRef(null);
  const contactInfoRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      submitting: true,
      submitted: false,
      success: false,
      message: ''
    });

    // Simulate form submission
    try {
      // In a real implementation, you would send data to your API or form endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({
        submitting: false,
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will be in touch soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        serviceType: 'photography'
      });
    } catch (error) {
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: 'There was an error submitting your message. Please try again.'
      });
    }
  };

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
        if (contactHeaderRef.current) {
          gsap.fromTo(
            '.contact-header h1',
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1,
              ease: 'power3.out'
            }
          );
          
          gsap.fromTo(
            '.contact-header p',
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
        
        // Animate form section
        if (contactFormRef.current) {
          gsap.fromTo(
            '.contact-form-wrapper',
            { opacity: 0, x: -50 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 1,
              scrollTrigger: {
                trigger: contactFormRef.current,
                start: 'top 80%',
              },
              ease: 'power3.out'
            }
          );
          
          gsap.fromTo(
            '.contact-form-wrapper .form-group',
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              stagger: 0.1,
              delay: 0.3,
              scrollTrigger: {
                trigger: contactFormRef.current,
                start: 'top 80%',
              },
              ease: 'power2.out'
            }
          );
        }
        
        // Animate contact info
        if (contactInfoRef.current) {
          gsap.fromTo(
            '.contact-info',
            { opacity: 0, x: 50 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 1,
              scrollTrigger: {
                trigger: contactInfoRef.current,
                start: 'top 80%',
              },
              ease: 'power3.out'
            }
          );
          
          gsap.fromTo(
            '.contact-info-item',
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              stagger: 0.2,
              delay: 0.3,
              scrollTrigger: {
                trigger: contactInfoRef.current,
                start: 'top 80%',
              },
              ease: 'power2.out'
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
        title="Contact - Third Power Lit"
        description="Get in touch with ThirdPowerLit for photography services, web design, or any questions you might have. Let's create something amazing together."
        canonical="https://thirdpowerlit.com/contact"
        openGraph={{
          url: 'https://thirdpowerlit.com/contact',
          title: 'Contact - Third Power Lit',
          description: 'Get in touch with ThirdPowerLit for photography services, web design, or any questions.',
          images: [
            {
              url: '/images/og-contact.jpg',
              width: 1200,
              height: 630,
              alt: 'Contact Third Power Lit',
            },
          ],
        }}
      />
      
      {/* Header Section */}
      <section className="py-20" ref={contactHeaderRef}>
        <div className="container mx-auto px-4">
          <div className="contact-header text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-8 text-gold">Get In Touch</h1>
            <p className="text-xl text-gray-300">
              Have a question, project idea, or just want to say hello? I'd love to hear from you. Fill out the form below or use the contact details to get in touch.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Info */}
      <section className="py-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="w-full lg:w-1/2">
              <div className="glass p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gold mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-gray-300 mb-2">Service You're Interested In</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50"
                    >
                      <option value="">Select a Service</option>
                      <option value="web-development">Web Development</option>
                      <option value="photography">Photography</option>
                      <option value="photo-editing">Photo Editing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-transparent border-2 border-gold text-gold py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-gold/80 hover:to-amber-500/80 hover:text-white transition-all duration-300"
                      disabled={formStatus.submitting}
                    >
                      {formStatus.submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>

                  {formStatus.submitted && (
                    <div className={`mt-4 p-4 rounded-md ${formStatus.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="glass p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-gold mr-4">
                      <i className="fas fa-map-marker-alt text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Our Location</h4>
                      <p className="text-gray-300">Marlboro, New Jersey</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-gold mr-4">
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email Us</h4>
                      <a href="mailto:eugene.graves@thirdpowerlit.com" className="text-gray-300 hover:text-gold transition-colors">eugene.graves@thirdpowerlit.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-gold mr-4">
                      <i className="fas fa-clock text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Business Hours</h4>
                      <p className="text-gray-300">Monday - Friday: 9AM - 6PM<br />Weekends: By appointment</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass overflow-hidden rounded-lg">
                <div className="relative aspect-[16/9] w-full">
                  <div className="w-full h-full flex items-center justify-center py-12 px-6">
                    <div className="text-center">
                      <span className="text-8xl md:text-9xl font-bold" 
                        style={{ 
                          backgroundImage: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          display: 'inline-block'
                        }}>
                        Lit³
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 justify-center">
                <a href="https://twitter.com/thirdpowerlit" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a href="https://instagram.com/thirdpowerlit" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a href="https://linkedin.com/company/thirdpowerlit" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">
                  <i className="fab fa-linkedin-in text-2xl"></i>
                </a>
                <a href="https://facebook.com/thirdpowerlit" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">
                  <i className="fab fa-facebook-f text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage; 