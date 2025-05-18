// This component ensures EmailJS is loaded properly
import React, { useEffect, useState } from 'react';

export default function EmailScript() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (typeof window !== 'undefined' && window.emailjs) {
      console.log('EmailJS already loaded');
      setLoaded(true);
      return;
    }

    // Load the EmailJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    script.id = 'emailjs-sdk';
    
    script.onload = () => {
      console.log('EmailJS loaded dynamically');
      if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        window.emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
        console.log('EmailJS initialized with public key');
      } else {
        console.error('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY not found');
      }
      setLoaded(true);
    };
    
    script.onerror = (e) => {
      console.error('Failed to load EmailJS script', e);
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up
      if (document.getElementById('emailjs-sdk')) {
        document.getElementById('emailjs-sdk').remove();
      }
    };
  }, []);

  return null;
} 