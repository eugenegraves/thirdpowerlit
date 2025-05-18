import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function EmailTestPage() {
  const form = useRef();
  const [status, setStatus] = useState('');
  const [credentials, setCredentials] = useState({
    serviceId: '',
    templateId: '',
    publicKey: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { serviceId, templateId, publicKey } = credentials;
    
    // Validate inputs
    if (!serviceId || !templateId || !publicKey) {
      setStatus('Please fill in all the EmailJS credentials');
      return;
    }
    
    setStatus('Sending email...');
    
    // Initialize EmailJS (this is how the HTML test does it)
    window.emailjs.init(publicKey);
    
    // Send the email using the exact same pattern as the HTML test
    window.emailjs.sendForm(serviceId, templateId, form.current)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus(`Email sent successfully! Status: ${response.status}, Response: ${response.text}`);
      })
      .catch((error) => {
        console.log('FAILED...', error);
        setStatus(`Failed to send email: ${JSON.stringify(error)}`);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Head>
        <title>EmailJS Test Page</title>
      </Head>
      
      {/* Load EmailJS directly from CDN just like in the HTML test */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        strategy="beforeInteractive"
      />
      
      <h1>EmailJS Next.js Test</h1>
      <p>This page tests EmailJS using the exact same pattern as the successful HTML test.</p>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Service ID:</label>
        <input 
          type="text" 
          name="serviceId" 
          value={credentials.serviceId}
          onChange={handleChange}
          placeholder="service_xxxxxxx"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Template ID:</label>
        <input 
          type="text" 
          name="templateId" 
          value={credentials.templateId}
          onChange={handleChange}
          placeholder="template_xxxxxxx"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Public Key:</label>
        <input 
          type="text" 
          name="publicKey" 
          value={credentials.publicKey}
          onChange={handleChange}
          placeholder="xxxxxxxxxxxxxxxx"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      
      <hr style={{ margin: '20px 0' }} />
      
      <form ref={form} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input 
            type="text" 
            name="name" 
            defaultValue="Test User"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input 
            type="email" 
            name="email" 
            defaultValue="test@example.com"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Subject:</label>
          <input 
            type="text" 
            name="subject" 
            defaultValue="Test Email from Next.js Page"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
          <textarea 
            name="message" 
            rows="4"
            defaultValue="This is a test message sent from a Next.js page."
            style={{ width: '100%', padding: '8px' }}
          ></textarea>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Service Type:</label>
          <input 
            type="text" 
            name="serviceType" 
            defaultValue="testing"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <button 
          type="submit"
          style={{
            padding: '10px 15px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Send Test Email
        </button>
      </form>
      
      {status && (
        <div 
          style={{ 
            marginTop: '20px', 
            padding: '10px', 
            border: '1px solid #ddd',
            backgroundColor: status.includes('successfully') ? '#ddffdd' : 
                            status.includes('Sending') ? '#ffffdd' : '#ffdddd'
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
} 