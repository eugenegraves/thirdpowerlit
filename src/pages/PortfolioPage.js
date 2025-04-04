import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'A Data Visualization: Nutrition → Obesity',
    category: 'Web Development',
    description: 'A data visualization project that explores the relationship between nutrition and obesity. The project uses a dataset of nutrition and obesity statistics to create a visual representation of the relationship between the two. This project is complete with responsive design principles & intereactive animations/effects.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['React', 'Node.js', 'Data Visualization', 'Responsive Design', 'Interactive Animations', 'Health & Nutrition']
  },
  {
    id: 2,
    title: 'Album Cover Photoshoot & Design',
    category: 'Photography',
    description: 'A photoshoot and design project for album covers of various genres. This project showcases a range of styles and techniques, from classic to modern, and includes a mix of color and black and white images.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['Photography', 'Adobe Photoshop', 'Adobe Lightroom', 'Music', 'Editing']
  },
  {
    id: 3,
    title: 'MINIMALIST PORTFOLIO',
    category: 'Web Design',
    description: 'A clean and minimal portfolio website for a graphic designer, featuring a custom grid layout, subtle animations, and optimized image loading for performance.',
    image: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    tags: ['Web Design', 'Portfolio', 'Minimalist', 'Animation']
  },
  {
    id: 4,
    title: 'PRODUCT RETOUCHING',
    category: 'Editing',
    description: 'Professional product photo retouching for a cosmetics brand, focusing on color correction, texture enhancement, and creating a cohesive visual style across the product line.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    tags: ['Retouching', 'Product', 'Photography', 'Editing']
  },
  {
    id: 5,
    title: 'CORPORATE IDENTITY',
    category: 'Branding',
    description: 'Complete brand identity design for a financial tech startup, including logo design, color palette, typography system, and digital asset guidelines.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['Branding', 'Logo Design', 'Identity', 'Guidelines']
  },
  {
    id: 6,
    title: 'MOBILE APP UI/UX',
    category: 'UI/UX Design',
    description: 'User interface and experience design for a health and wellness mobile application, with a focus on accessibility, intuitive navigation, and engaging visual elements.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    tags: ['UI/UX', 'Mobile App', 'Health', 'Design']
  }
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
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  
  const handleProjectClick = (project) => {
    setActiveProject(project);
  };
  
  const handleCloseModal = () => {
    setActiveProject(null);
  };
  
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
          <div className="max-w-4xl w-full glass-gold rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative h-96">
              <img 
                src={activeProject.image} 
                alt={activeProject.title} 
                className="w-full h-full object-cover"
              />
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
                    <span className="font-semibold text-secondary-light">Client:</span> Client Name
                  </li>
                  <li className="mb-2">
                    <span className="font-semibold text-secondary-light">Date:</span> January 2023
                  </li>
                  <li className="mb-2">
                    <span className="font-semibold text-secondary-light">Services:</span> {activeProject.category}
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
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <button className="text-gray-300 hover:text-gold transition-colors flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Previous Project
                </button>
                <button className="text-gray-300 hover:text-gold transition-colors flex items-center">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-lg">
              <div className="text-secondary text-3xl mb-6">❞</div>
              <p className="text-gray-300 mb-6">
                "Working with Third Power Lit was a game-changer for our brand. The website they designed perfectly captures our vision and has significantly increased our online presence."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-600 mr-4"></div>
                <div>
                  <p className="font-bold text-gold">Sarah Johnson</p>
                  <p className="text-gray-400 text-sm">CEO, Fashion Forward</p>
                </div>
              </div>
            </div>
            
            <div className="glass p-8 rounded-lg">
              <div className="text-secondary text-3xl mb-6">❞</div>
              <p className="text-gray-300 mb-6">
                "The photography and retouching services exceeded our expectations. Every detail was meticulously handled, and the final results perfectly highlighted our products."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-600 mr-4"></div>
                <div>
                  <p className="font-bold text-gold">Michael Rodriguez</p>
                  <p className="text-gray-400 text-sm">Marketing Director, LuxGoods</p>
                </div>
              </div>
            </div>
            
            <div className="glass p-8 rounded-lg">
              <div className="text-secondary text-3xl mb-6">❞</div>
              <p className="text-gray-300 mb-6">
                "Exceptional UI/UX design work on our app. The attention to detail and user-centered approach significantly improved our user engagement and retention rates."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-600 mr-4"></div>
                <div>
                  <p className="font-bold text-gold">Emily Chen</p>
                  <p className="text-gray-400 text-sm">Product Manager, HealthTech</p>
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