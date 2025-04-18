import React from 'react';

const ContactPage = () => {
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
      
      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="glass-gold p-8 rounded-lg max-w-lg w-full aspect-square flex flex-col justify-between">
            <h2 className="text-4xl font-bold mb-8 text-gold text-center">CONTACT INFO</h2>
            
            <div className="mb-10">
              <h3 className="text-2xl font-medium mb-3 text-gold">Email</h3>
              <a href="mailto:contact@thirdpowerlit.com" className="text-gray-300 hover:text-secondary transition-colors text-lg">
                contact@thirdpowerlit.com
              </a>
            </div>
            
            <div className="mb-10">
              <h3 className="text-2xl font-medium mb-3 text-gold">Location</h3>
              <p className="text-gray-300 text-lg">New Jersey</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-medium mb-4 text-gold text-center">Social Media</h3>
              <div className="flex justify-center space-x-8">
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.68 0H1.32C0.6 0 0 0.6 0 1.32v21.36C0 23.4 0.6 24 1.32 24h11.5v-9.3H9.69v-3.62h3.13V8.41c0-3.1 1.9-4.79 4.66-4.79c1.32 0 2.46 0.1 2.8 0.15v3.24h-1.92c-1.5 0-1.8 0.71-1.8 1.76v2.31h3.59l-0.47 3.62h-3.12V24h6.12c0.73 0 1.32-0.6 1.32-1.32V1.32C24 0.6 23.4 0 22.68 0z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Large Logo */}
          <div className="glass p-8 rounded-lg flex items-center justify-center max-w-lg w-full aspect-square">
            <div className="text-gold text-center">
              <div className="flex items-start justify-center">
                <span className="text-9xl font-bold">Lit</span>
                <span className="text-5xl" style={{ marginTop: "-15px", marginLeft: "5px", padding: "10px" }}>  3</span>
              </div>
              <div className="text-secondary-light mt-4 text-xl">THIRD POWER LIT</div>
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
                We offer a comprehensive range of creative services including website design and development, 
                UI/UX design, professional photography, and advanced photo editing/retouching. Our services 
                can be bundled or provided individually to create a customized solution for your needs.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gold">What types of photography do you provide?</h3>
              <p className="text-gray-300">
                Our photography services include product photography, portraits, event coverage, and 
                commercial shoots. We specialize in creating high-quality visuals that tell your brand's story,
                using professional equipment and techniques to ensure exceptional results for any purpose.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gold">What photo editing services are available?</h3>
              <p className="text-gray-300">
                We offer a full spectrum of editing services from basic color correction and retouching 
                to advanced compositing and creative manipulation. Our editing transforms ordinary photos 
                into compelling visuals that enhance your marketing materials, social media, or website.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gold">How does your web development process work?</h3>
              <p className="text-gray-300">
                Our web development process includes discovery, planning, design, development, testing, 
                and launch phases. We focus on creating responsive, modern websites with intuitive interfaces
                and optimal performance. We also offer ongoing maintenance and support after launch.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gold">Do you offer combined service packages?</h3>
              <p className="text-gray-300">
                Yes, we specialize in creating integrated solutions that combine web development, 
                photography, and editing services. These packages provide a cohesive look and feel 
                across all your digital assets, ensuring brand consistency and professional quality.
              </p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gold">What is your pricing structure?</h3>
              <p className="text-gray-300">
                Our pricing is project-based and depends on the scope and specific requirements. 
                Photography services are typically priced by session or day rate, while web development 
                is quoted based on complexity and features. Contact us for a personalized quote.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="h-96 relative">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="glass-gold p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2 text-gold">OFFICE LOCATION</h3>
            <p className="text-gray-300">Coming Soon!</p>
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