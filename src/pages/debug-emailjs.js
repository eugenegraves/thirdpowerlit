import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function DebugEmailJS() {
  const [debug, setDebug] = useState([]);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Add a debug log function
  const log = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setDebug(prev => [...prev, { message, timestamp, type }]);
  };

  // Handle script load
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    log('EmailJS script loaded');
    
    try {
      // Check if window.emailjs exists
      if (window.emailjs) {
        log('window.emailjs is available');
        
        // Check environment variables
        log(`SERVICE_ID: ${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? 'Available' : 'Missing'}`, 
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? 'success' : 'error');
        log(`TEMPLATE_ID: ${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? 'Available' : 'Missing'}`, 
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? 'success' : 'error');
        log(`PUBLIC_KEY: ${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'Available' : 'Missing'}`, 
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'success' : 'error');
        
        // Initialize EmailJS
        if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
          window.emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
          log('EmailJS initialized with public key');
        } else {
          log('Cannot initialize EmailJS - missing public key', 'error');
        }
      } else {
        log('window.emailjs is NOT available - script failed to load properly', 'error');
      }
    } catch (error) {
      log(`Error initializing EmailJS: ${error.message}`, 'error');
    }
  };

  // Send a test email
  const sendTestEmail = () => {
    log('Sending test email...');
    
    if (!window.emailjs) {
      log('window.emailjs is not available', 'error');
      return;
    }
    
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      log('Missing required environment variables', 'error');
      return;
    }
    
    const templateParams = {
      name: 'Debug Test',
      email: 'test@example.com',
      subject: 'Debug Test Email',
      message: 'This is a test email from the debug page.',
      serviceType: 'Debug'
    };
    
    try {
      window.emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      )
      .then((response) => {
        log(`Email sent successfully! Status: ${response.status}, Text: ${response.text}`, 'success');
      })
      .catch((error) => {
        log(`Failed to send email: ${error.text || error.message}`, 'error');
        console.error('Full error:', error);
      });
    } catch (error) {
      log(`Error calling emailjs.send: ${error.message}`, 'error');
      console.error('Try/catch error:', error);
    }
  };
  
  // Check global window.emailjs
  const checkGlobalEmailJS = () => {
    log('Checking window.emailjs...');
    
    if (window.emailjs) {
      log('window.emailjs is available', 'success');
      
      // Check available methods
      const methods = Object.keys(window.emailjs);
      log(`Available methods: ${methods.join(', ')}`);
    } else {
      log('window.emailjs is NOT available', 'error');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <Head>
        <title>EmailJS Debug</title>
      </Head>
      
      <Script 
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        strategy="beforeInteractive"
        onLoad={handleScriptLoad}
      />
      
      <h1>EmailJS Debug Page</h1>
      <p>This page helps debug EmailJS issues</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={sendTestEmail}
          disabled={!scriptLoaded}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: scriptLoaded ? 'pointer' : 'not-allowed',
            opacity: scriptLoaded ? 1 : 0.5
          }}
        >
          Send Test Email
        </button>
        
        <button 
          onClick={checkGlobalEmailJS}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Check window.emailjs
        </button>
      </div>
      
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '10px', 
        height: '400px',
        overflowY: 'auto',
        backgroundColor: '#f5f5f5'
      }}>
        <h2>Debug Log</h2>
        {debug.map((item, index) => (
          <div 
            key={index}
            style={{
              padding: '5px 10px',
              marginBottom: '5px',
              borderLeft: `4px solid ${item.type === 'error' ? 'red' : 
                           item.type === 'success' ? 'green' : 'blue'}`,
              backgroundColor: 'white'
            }}
          >
            <span style={{ color: '#888', marginRight: '10px' }}>[{item.timestamp}]</span>
            <span>{item.message}</span>
          </div>
        ))}
        {debug.length === 0 && <p>No logs yet...</p>}
      </div>
    </div>
  );
} 