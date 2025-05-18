import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function TestEmailJS() {
  const [status, setStatus] = useState('Checking configuration...');
  const [emailjsStatus, setEmailjsStatus] = useState('Loading EmailJS...');
  const [envVars, setEnvVars] = useState({
    serviceId: null,
    templateId: null,
    publicKey: null
  });

  useEffect(() => {
    // Check environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    
    setEnvVars({
      serviceId: serviceId ? `${serviceId.substring(0, 4)}...` : 'Missing',
      templateId: templateId ? `${templateId.substring(0, 4)}...` : 'Missing',
      publicKey: publicKey ? `${publicKey.substring(0, 4)}...` : 'Missing'
    });
    
    setStatus(
      serviceId && templateId && publicKey 
        ? 'All environment variables are set correctly.'
        : 'Missing required environment variables.'
    );
    
    // Check for EmailJS on window
    const checkEmailJS = () => {
      if (typeof window !== 'undefined' && window.emailjs) {
        setEmailjsStatus('EmailJS is loaded and available.');
        
        // Initialize EmailJS
        if (publicKey) {
          try {
            window.emailjs.init(publicKey);
            setEmailjsStatus('EmailJS is loaded and initialized successfully.');
          } catch (error) {
            setEmailjsStatus(`Error initializing EmailJS: ${error.message}`);
          }
        }
        
        return true;
      }
      return false;
    };
    
    // Check immediately and again after a delay
    if (!checkEmailJS()) {
      const timer = setTimeout(() => {
        if (!checkEmailJS()) {
          setEmailjsStatus('EmailJS failed to load. Check script inclusion in _document.js');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  const sendTestEmail = () => {
    if (typeof window === 'undefined' || !window.emailjs) {
      setStatus('EmailJS is not available');
      return;
    }
    
    const templateParams = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Email from Next.js',
      message: 'This is a test email sent from the test page at ' + new Date().toLocaleString(),
      serviceType: 'Test'
    };
    
    setStatus('Sending test email...');
    
    window.emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams
    )
    .then((response) => {
      setStatus(`Email sent successfully! Status: ${response.status}, Text: ${response.text}`);
    })
    .catch((error) => {
      setStatus(`Failed to send email: ${error.text || error.message || JSON.stringify(error)}`);
      console.error('EmailJS error:', error);
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Head>
        <title>EmailJS Test Page</title>
      </Head>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">EmailJS Test Page</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuration Status</h2>
          
          <div className="mb-4">
            <p className="text-white mb-2">EmailJS Status:</p>
            <p className={`px-3 py-2 rounded ${emailjsStatus.includes('successfully') ? 'bg-green-900' : 'bg-yellow-900'}`}>
              {emailjsStatus}
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-white mb-2">Environment Variables:</p>
            <ul className="list-disc list-inside px-3 py-2 rounded bg-gray-700">
              <li className={envVars.serviceId === 'Missing' ? 'text-red-400' : 'text-green-400'}>
                Service ID: {envVars.serviceId}
              </li>
              <li className={envVars.templateId === 'Missing' ? 'text-red-400' : 'text-green-400'}>
                Template ID: {envVars.templateId}
              </li>
              <li className={envVars.publicKey === 'Missing' ? 'text-red-400' : 'text-green-400'}>
                Public Key: {envVars.publicKey}
              </li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-white mb-2">Status:</p>
            <p className="px-3 py-2 rounded bg-gray-700">
              {status}
            </p>
          </div>
          
          <button 
            onClick={sendTestEmail}
            className="mt-4 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded transition"
            disabled={emailjsStatus.includes('failed') || !envVars.serviceId || !envVars.templateId || !envVars.publicKey}
          >
            Send Test Email
          </button>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Tips</h2>
          
          <ul className="list-disc list-inside space-y-2">
            <li>Make sure the EmailJS script is loaded in <code>_document.js</code></li>
            <li>Check that all environment variables are correctly set in <code>.env.local</code></li>
            <li>Verify the template parameters match your EmailJS template variables</li>
            <li>Check browser console for any JavaScript errors</li>
            <li>Try using the debug page at <code>/debug-emailjs</code> for detailed logging</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 