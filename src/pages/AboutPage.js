import React from 'react';

const AboutPage = ({ navigateTo }) => {
  return (
    <div className="min-h-screen">
      {/* About Hero */}
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gold">ABOUT ME</h1>
          <p className="text-lg md:text-xl max-w-3xl text-gray-300">
            CREATIVE PROFESSIONAL WITH A PASSION FOR DESIGN, DEVELOPMENT, AND
            PHOTOGRAPHY, DEDICATED TO BRINGING EXCEPTIONAL VISUAL STORYTELLING TO LIFE.
          </p>
        </div>
      </section>
      
      {/* Bio Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="glass rounded-lg overflow-hidden">
                <img 
                  src="/hero-image.jpg"
                  alt="Designer Portrait" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-gold">MY JOURNEY</h2>
              <p className="text-gray-300 mb-6">
                I'm a multi-disciplinary creative with over five years of experience in design, 
                development, and visual storytelling. My journey began with a deep passion for 
                photography, digital and visual arts, which evolved into a comprehensive understanding 
                of digital media and web technologies.
              </p>
              <p className="text-gray-300 mb-6">
                Through years of working with diverse clients across industries, I've developed 
                a unique approach that combines technical expertise with artistic vision. This 
                allows me to create solutions that are not only visually striking but also 
                functionally effective.
              </p>
              <p className="text-gray-300">
                My goal is simple: to help brands/companies and individuals tell their stories and cultivate communities through 
                exceptional digital experiences and visual content that resonates and drives meaningful results with the target audience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gold">MY SKILLS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-lg text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gold-gradient rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gold">Web Development</h3>
              <ul className="text-gray-300 space-y-2">
                <li>HTML5 / CSS3 / JavaScript</li>
                <li>React / Next.js</li>
                <li>Responsive Design</li>
                <li>Web Performance Optimization</li>
                <li>CMS Integration</li>
              </ul>
            </div>
            
            <div className="glass p-8 rounded-lg text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gold-gradient rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gold">Photography</h3>
              <ul className="text-gray-300 space-y-2">
                <li>Portrait Photography</li>
                <li>Product Photography</li>
                <li>Fashion Photography</li>
                <li>Event Coverage</li>
                <li>Commercial Photography</li>
              </ul>
            </div>
            
            <div className="glass p-8 rounded-lg text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gold-gradient rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gold">Design & Editing</h3>
              <ul className="text-gray-300 space-y-2">
                <li>UI/UX Design</li>
                <li>Brand Identity Design</li>
                <li>Photo Retouching</li>
                <li>Color Grading</li>
                <li>Digital Illustration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gold">MY EXPERIENCE</h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-secondary/30"></div>
            
            {/* Timeline items */}
            <div className="space-y-20">
              {/* Experience 1 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-gradient z-10"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 text-right">
                    <div className="glass-gold p-6 rounded-lg">
                      <span className="text-xs uppercase tracking-wider text-secondary-light">2019 - Present</span>
                      <h3 className="text-xl font-bold mt-2 mb-2 text-gold">Founder & Creative Director</h3>
                      <p className="text-sm text-gray-300">Third Power Lit</p>
                      <p className="mt-4 text-gray-300">
                        Founded a creative studio offering comprehensive design, development, and photography 
                        services to clients across various industries.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12"></div>
                </div>
              </div>
              
              {/* Experience 2 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-gradient z-10"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12"></div>
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pl-12">
                    <div className="glass p-6 rounded-lg">
                      <span className="text-xs uppercase tracking-wider text-secondary-light">2016 - 2019</span>
                      <h3 className="text-xl font-bold mt-2 mb-2 text-gold">Senior UX Designer</h3>
                      <p className="text-sm text-gray-300">Design Innovation Agency</p>
                      <p className="mt-4 text-gray-300">
                        Led user experience design for major clients, overseeing projects from concept 
                        through implementation while mentoring junior designers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Experience 3 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-gradient z-10"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 text-right">
                    <div className="glass p-6 rounded-lg">
                      <span className="text-xs uppercase tracking-wider text-secondary-light">2014 - 2016</span>
                      <h3 className="text-xl font-bold mt-2 mb-2 text-gold">Web Developer</h3>
                      <p className="text-sm text-gray-300">Digital Solutions Co.</p>
                      <p className="mt-4 text-gray-300">
                        Developed responsive websites and applications for clients while collaborating 
                        with designers to ensure optimal user experiences.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12"></div>
                </div>
              </div>
              
              {/* Experience 4 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-gradient z-10"></div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12"></div>
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pl-12">
                    <div className="glass p-6 rounded-lg">
                      <span className="text-xs uppercase tracking-wider text-secondary-light">2012 - 2014</span>
                      <h3 className="text-xl font-bold mt-2 mb-2 text-gold">Photographer & Retoucher</h3>
                      <p className="text-sm text-gray-300">Visual Arts Studio</p>
                      <p className="mt-4 text-gray-300">
                        Shot and edited commercial photography for brands, specializing in product 
                        and fashion photography with advanced retouching techniques.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section className="py-16 px-4 bg-dark-lighter">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gold">EDUCATION</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-gold">Master of Fine Arts</h3>
              <p className="text-secondary-light mb-6">Photography & Digital Media • 2012</p>
              <p className="text-gray-300">
                School of Visual Arts, New York
              </p>
            </div>
            
            <div className="glass p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-gold">Bachelor of Science</h3>
              <p className="text-secondary-light mb-6">Computer Science • 2010</p>
              <p className="text-gray-300">
                University of Technology, Boston
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 glass-gold">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">LET'S WORK TOGETHER</h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-300">
            Ready to collaborate on your next project? I'm available for freelance work
            and would love to hear about your ideas.
          </p>
          <button 
            onClick={() => navigateTo('contact')}
            className="bg-gold-gradient text-primary px-8 py-3 inline-flex items-center font-bold hover:opacity-90 transition-opacity duration-300 rounded-md"
          >
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

export default AboutPage; 