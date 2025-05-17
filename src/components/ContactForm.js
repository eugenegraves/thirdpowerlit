import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/animations.module.css';
import Button from './Button';
import emailjs from '@emailjs/browser';

// VERY EXPLICIT DEBUG LOG
console.log('████████ ContactForm.js loaded ████████');

const ContactForm = ({ onSubmitSuccess, className = '' }) => {
  console.log('████████ ContactForm component rendering ████████');
  
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    serviceType: 'photography'
  });
  
  // Initialize EmailJS in the component as a fallback
  useEffect(() => {
    console.log('████████ ContactForm useEffect running ████████');
    
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      // Simple initialization, no advanced options
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      console.log('████████ EmailJS initialized in ContactForm ████████');
    } else {
      console.error('████████ EmailJS initialization FAILED - publicKey missing ████████');
    }
  }, []);
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('████████ Form submitted ████████');
    
    if (!validateForm()) {
      console.log('████████ Form validation failed ████████');
      return;
    }
    
    console.log('████████ Form validation passed ████████');
    
    setFormStatus({
      submitting: true,
      submitted: false,
      success: false,
      message: ''
    });

    // Debug: Log the environment variables (without showing full keys)
    console.log("████████ EmailJS Params ████████", {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? `✓ Set` : "✗ Not Set",
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? `✓ Set` : "✗ Not Set",
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? "✓ Set" : "✗ Not Set"
    });

    try {
      // Create the template parameters directly
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        serviceType: formData.serviceType
      };
      
      console.log('████████ Sending with template params ████████', templateParams);
      
      // SIMPLER APPROACH: use the sendForm method with the form reference
      console.log('████████ Using sendForm method ████████');
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current
      );
      
      console.log('████████ Email sent successfully ████████', result.text);
      
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
      
      // Call optional success callback
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('████████ EmailJS Error ████████', error);
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: `There was an error submitting your message: ${error.text || error.message || "Unknown error"}`
      });
    }
  };

  return (
    <div className={`glass p-8 rounded-lg ${className}`}>
      <div className="mb-6" data-animation={styles.fadeInUp}>
        <h2 className="text-3xl font-bold mb-4 text-gold">Get In Touch</h2>
        <p className="text-gray-300">Fill out the form below and I'll get back to you as soon as possible.</p>
      </div>
      
      {formStatus.submitted && (
        <div 
          className={`p-4 mb-6 rounded-lg ${formStatus.success ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}
          data-animation={styles.fadeIn}
        >
          {formStatus.message}
        </div>
      )}
      
      <form ref={form} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="form-group"
            data-animation={styles.fadeInUp}
            data-delay={styles['delay-100']}
          >
            <label htmlFor="name" className="block text-white mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none focus:border-gold transition ${errors.name ? 'border-red-500' : 'border-gray-700'}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div 
            className="form-group"
            data-animation={styles.fadeInUp}
            data-delay={styles['delay-200']}
          >
            <label htmlFor="email" className="block text-white mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none focus:border-gold transition ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>
        
        <div 
          className="form-group mt-6"
          data-animation={styles.fadeInUp}
          data-delay={styles['delay-300']}
        >
          <label htmlFor="subject" className="block text-white mb-2">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none focus:border-gold transition ${errors.subject ? 'border-red-500' : 'border-gray-700'}`}
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>
        
        <div 
          className="form-group mt-6"
          data-animation={styles.fadeInUp}
          data-delay={styles['delay-400']}
        >
          <label htmlFor="serviceType" className="block text-white mb-2">Service Type</label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gold"
          >
            <option value="photography">Photography</option>
            <option value="webDesign">Web Design</option>
            <option value="branding">Branding</option>
            <option value="editingRetouching">Editing & Retouching</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div 
          className="form-group mt-6"
          data-animation={styles.fadeInUp}
          data-delay={styles['delay-500']}
        >
          <label htmlFor="message" className="block text-white mb-2">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none focus:border-gold transition ${errors.message ? 'border-red-500' : 'border-gray-700'}`}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        
        <div 
          className="mt-8"
          data-animation={styles.fadeInUp}
          data-delay={styles['delay-600']}
        >
          <Button
            type="submit"
            variant="secondary"
            fullWidth
            disabled={formStatus.submitting}
            className={styles.hoverLift}
          >
            {formStatus.submitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 