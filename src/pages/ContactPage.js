import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen">
      {/* Contact Hero */}
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gold">GET IN TOUCH</h1>
          <p className="text-lg md:text-xl max-w-3xl text-gray-300">
            HAVE A PROJECT IN MIND OR NEED CREATIVE SERVICES? LET'S DISCUSS HOW I CAN HELP 
            BRING YOUR VISION TO LIFE WITH PROFESSIONAL EXPERTISE AND ARTISTIC FLAIR.
          </p>
        </div>
      </section>
      
      {/* Contact Form and Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Contact Information */}
            <div className="w-full md:w-1/3">
              <div className="glass-gold p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-gold">CONTACT INFO</h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-2 text-gold">Email</h3>
                  <a href="mailto:contact@thirdpowerlit.com" className="text-gray-300 hover:text-secondary transition-colors">
                    contact@thirdpowerlit.com
                  </a>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-2 text-gold">Phone</h3>
                  <a href="tel:+1234567890" className="text-gray-300 hover:text-secondary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-2 text-gold">Location</h3>
                  <p className="text-gray-300">New York, NY</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2 text-gold">Social Media</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.68 0H1.32C0.6 0 0 0.6 0 1.32v21.36C0 23.4 0.6 24 1.32 24h11.5v-9.3H9.69v-3.62h3.13V8.41c0-3.1 1.9-4.79 4.66-4.79c1.32 0 2.46 0.1 2.8 0.15v3.24h-1.92c-1.5 0-1.8 0.71-1.8 1.76v2.31h3.59l-0.47 3.62h-3.12V24h6.12c0.73 0 1.32-0.6 1.32-1.32V1.32C24 0.6 23.4 0 22.68 0z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="w-full md:w-2/3">
              <div className="glass p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-gold">SEND A MESSAGE</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-600 focus:border-secondary py-2 px-3 outline-none text-white"
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-600 focus:border-secondary py-2 px-3 outline-none text-white"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-600 focus:border-secondary py-2 px-3 outline-none text-white"
                      required 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      rows="5" 
                      className="w-full bg-transparent border border-gray-600 focus:border-secondary rounded-md py-2 px-3 outline-none text-white"
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-gold-gradient text-primary px-8 py-3 flex items-center font-bold rounded-md hover:opacity-90 transition-opacity duration-300"
                  >
                    Send Message
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gold">FREQUENTLY ASKED QUESTIONS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gold">What services do you offer?</h3>
              <p className="text-gray-300">
                We offer a range of creative services including website design and development, 
                UI/UX design, photography, and photo editing/retouching services. Each service 
                can be customized to meet your specific needs.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gold">How long does a typical project take?</h3>
              <p className="text-gray-300">
                Project timelines vary depending on scope and complexity. A basic website might take 
                2-4 weeks, while more complex projects can take 2-3 months. We'll provide you with a 
                detailed timeline during our initial consultation.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gold">Do you offer maintenance services?</h3>
              <p className="text-gray-300">
                Yes, we offer website maintenance packages to keep your site secure, updated, and 
                performing optimally. We can also provide training for your team to handle basic 
                content updates.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gold">What is your pricing structure?</h3>
              <p className="text-gray-300">
                Our pricing is project-based and depends on the scope and requirements of your project. 
                We provide detailed quotes after an initial consultation to understand your needs. 
                Contact us for a free quote.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="h-96 relative">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="glass-gold p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2 text-gold">VISIT OUR STUDIO</h3>
            <p className="text-gray-300">123 Creative Ave, New York, NY 10001</p>
          </div>
        </div>
        <div className="h-full w-full">
          {/* This would be replaced with an actual map component or embed */}
          <div className="w-full h-full bg-gray-800 opacity-60"></div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 