import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import EmailScript from '../components/EmailScript';

export default function TestEmailSend() {
  const [status, setStatus] = useState('Ready to test');
  const [debugInfo, setDebugInfo] = useState({
    emailjsAvailable: false,
    serviceId: null,
    templateId: null,
    publicKey: null,
    envs: []
  });

  useEffect(() => {
    // Wait a moment to check if emailjs is available
    const timer = setTimeout(() => {
      const emailjsAvailable = typeof window !== 'undefined' && window.emailjs;
      
      setDebugInfo({
        emailjsAvailable,
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'Not set',
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'Not set',
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'Set (hidden)' : 'Not set',
        envs: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_'))
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const sendTestEmail = async () => {
    setStatus('Sending test email...');
    
    if (!window.emailjs) {
      setStatus('Error: EmailJS is not available. Check console for details.');
      console.error('EmailJS is not available on window object');
      return;
    }
    
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      setStatus('Error: Missing environment variables. Check console for details.');
      console.error('Missing environment variables:');
      console.error('SERVICE_ID exists:', !!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
      console.error('TEMPLATE_ID exists:', !!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
      console.error('PUBLIC_KEY exists:', !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      return;
    }
    
    try {
      // Simple template parameters
      const templateParams = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'EmailJS Test',
        message: 'This is a test email from the test-email-send.js page.'
      };
      
      console.log('Sending email with params:', templateParams);
      console.log('Using SERVICE_ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
      console.log('Using TEMPLATE_ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
      
      const result = await window.emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      setStatus(`Email sent successfully! Status: ${result.text}`);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus(`Error sending email: ${error.text || error.message || 'Unknown error'}`);
    }
  };

  return (
    <>
      <Head>
        <title>EmailJS Test Page</title>
      </Head>
      
      <EmailScript />
      
      <div className="container mx-auto p-6 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">EmailJS Test Page</h1>
        
        <div className="bg-gray-800 rounded p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">Debug Information</h2>
          <ul className="space-y-2">
            <li><strong>EmailJS Available:</strong> {debugInfo.emailjsAvailable ? 'Yes ✅' : 'No ❌'}</li>
            <li><strong>Service ID:</strong> {debugInfo.serviceId}</li>
            <li><strong>Template ID:</strong> {debugInfo.templateId}</li>
            <li><strong>Public Key:</strong> {debugInfo.publicKey}</li>
            <li><strong>Environment Variables:</strong> {debugInfo.envs.length ? debugInfo.envs.join(', ') : 'None'}</li>
          </ul>
        </div>
        
        <div className="text-center">
          <button
            onClick={sendTestEmail}
            disabled={!debugInfo.emailjsAvailable}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Test Email
          </button>
          
          <div className="mt-6 text-lg">
            Status: <span className={status.includes('Error') ? 'text-red-500' : status.includes('success') ? 'text-green-500' : ''}>{status}</span>
          </div>
        </div>
      </div>
    </>
  );
} 