import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function EmailJSDiagnose() {
  const [diagnostics, setDiagnostics] = useState({
    scriptLoaded: false,
    emailjsAvailable: false,
    publicKey: '',
    serviceId: '',
    templateId: '',
    initSuccess: false,
    domainInfo: '',
    log: []
  });

  const addLog = (message, type = 'info') => {
    setDiagnostics(prev => ({
      ...prev,
      log: [...prev.log, { message, type, time: new Date().toISOString() }]
    }));
  };

  useEffect(() => {
    // Capture domain info for debugging
    try {
      const domain = window.location.hostname;
      const protocol = window.location.protocol;
      const port = window.location.port;
      setDiagnostics(prev => ({
        ...prev,
        domainInfo: `${protocol}//${domain}${port ? ':'+port : ''}`
      }));
      addLog(`Running on: ${protocol}//${domain}${port ? ':'+port : ''}`);
    } catch (e) {
      addLog(`Error getting domain info: ${e.message}`, 'error');
    }

    // Check environment variables
    const envVars = {
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
    };

    setDiagnostics(prev => ({
      ...prev,
      publicKey: envVars.publicKey ? `${envVars.publicKey.substring(0, 4)}...` : 'Not set',
      serviceId: envVars.serviceId ? `${envVars.serviceId.substring(0, 4)}...` : 'Not set',
      templateId: envVars.templateId ? `${envVars.templateId.substring(0, 4)}...` : 'Not set'
    }));

    addLog(`Public Key: ${envVars.publicKey ? 'Set' : 'Not set'}`);
    addLog(`Service ID: ${envVars.serviceId ? 'Set' : 'Not set'}`);
    addLog(`Template ID: ${envVars.templateId ? 'Set' : 'Not set'}`);

    // Check if EmailJS script is loaded
    const checkScript = () => {
      const scriptElement = document.getElementById('emailjs-sdk');
      if (scriptElement) {
        addLog('EmailJS script tag found in DOM');
        setDiagnostics(prev => ({ ...prev, scriptLoaded: true }));
      } else {
        addLog('EmailJS script tag NOT found in DOM', 'warning');
      }
    };

    // Check if window.emailjs is available
    const checkEmailJS = () => {
      if (typeof window !== 'undefined' && window.emailjs) {
        addLog('window.emailjs is available');
        setDiagnostics(prev => ({ ...prev, emailjsAvailable: true }));
        
        // Try to initialize EmailJS
        if (envVars.publicKey) {
          try {
            window.emailjs.init(envVars.publicKey);
            addLog('EmailJS initialized successfully');
            setDiagnostics(prev => ({ ...prev, initSuccess: true }));
          } catch (error) {
            addLog(`Error initializing EmailJS: ${error.message}`, 'error');
          }
        } else {
          addLog('Cannot initialize EmailJS - missing public key', 'error');
        }
      } else {
        addLog('window.emailjs is NOT available', 'error');
      }
    };

    // Run initial checks
    setTimeout(() => {
      checkScript();
      checkEmailJS();
    }, 1000);

    // Set up a periodic check in case script loads late
    const intervalId = setInterval(() => {
      if (!diagnostics.emailjsAvailable) {
        addLog('Re-checking EmailJS availability...');
        checkEmailJS();
      } else {
        clearInterval(intervalId);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const sendTestEmail = () => {
    addLog('Attempting to send test email...');
    
    if (!window.emailjs) {
      addLog('window.emailjs is not available - cannot send email', 'error');
      return;
    }
    
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
      addLog('Missing required environment variables', 'error');
      return;
    }
    
    const templateParams = {
      name: 'EmailJS Diagnostic',
      email: 'test@example.com',
      subject: 'Diagnostic Test Email',
      message: `This is a diagnostic test from ${diagnostics.domainInfo} at ${new Date().toLocaleString()}`,
      serviceType: 'Diagnostic'
    };
    
    addLog(`Sending with params: ${JSON.stringify(templateParams)}`);
    
    try {
      window.emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      )
      .then((response) => {
        addLog(`Email sent successfully! Status: ${response.status}, Text: ${response.text}`, 'success');
      })
      .catch((error) => {
        addLog(`Failed to send email: ${error.text || error.message}`, 'error');
        console.error('Full error:', error);
      });
    } catch (error) {
      addLog(`Error calling emailjs.send: ${error.message}`, 'error');
      console.error('Try/catch error:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <Head>
        <title>EmailJS Diagnostics</title>
        <script 
          id="emailjs-sdk" 
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" 
          async 
        ></script>
      </Head>
      
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">EmailJS Diagnostics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Configuration Status</h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Environment:</span>
                <span className={process.env.NODE_ENV === 'production' ? 'text-yellow-400' : 'text-green-400'}>
                  {process.env.NODE_ENV}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Script Loaded:</span>
                <span className={diagnostics.scriptLoaded ? 'text-green-400' : 'text-red-400'}>
                  {diagnostics.scriptLoaded ? 'Yes' : 'No'}
                </span>
              </li>
              <li className="flex justify-between">
                <span>window.emailjs Available:</span>
                <span className={diagnostics.emailjsAvailable ? 'text-green-400' : 'text-red-400'}>
                  {diagnostics.emailjsAvailable ? 'Yes' : 'No'}
                </span>
              </li>
              <li className="flex justify-between">
                <span>EmailJS Initialized:</span>
                <span className={diagnostics.initSuccess ? 'text-green-400' : 'text-red-400'}>
                  {diagnostics.initSuccess ? 'Yes' : 'No'}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Public Key:</span>
                <span className={diagnostics.publicKey !== 'Not set' ? 'text-green-400' : 'text-red-400'}>
                  {diagnostics.publicKey}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Service ID:</span>
                <span className={diagnostics.serviceId !== 'Not set' ? 'text-green-400' : 'text-red-400'}>
                  {diagnostics.serviceId}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Template ID:</span>
                <span className={diagnostics.templateId !== 'Not set' ? 'text-green-400' : 'text-red-400'}>
                  {diagnostics.templateId}
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Tools</h2>
            <div className="space-y-4">
              <button
                onClick={sendTestEmail}
                disabled={!diagnostics.emailjsAvailable}
                className={`w-full py-2 px-4 rounded ${
                  diagnostics.emailjsAvailable 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-600 cursor-not-allowed'
                } transition`}
              >
                Send Test Email
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded transition"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-10">
          <h2 className="text-xl font-bold mb-4">Diagnostic Log</h2>
          
          <div className="bg-black/50 p-4 rounded h-80 overflow-y-auto font-mono text-sm">
            {diagnostics.log.length === 0 ? (
              <p className="text-gray-500">No logs yet...</p>
            ) : (
              diagnostics.log.map((entry, index) => (
                <div 
                  key={index}
                  className={`mb-2 ${
                    entry.type === 'error' ? 'text-red-400' : 
                    entry.type === 'warning' ? 'text-yellow-400' : 
                    entry.type === 'success' ? 'text-green-400' : 'text-blue-400'
                  }`}
                >
                  <span className="text-gray-500">[{entry.time.split('T')[1].split('.')[0]}]</span>{' '}
                  {entry.message}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Troubleshooting Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Make sure all environment variables are set in your deployment platform</li>
            <li>Verify that the EmailJS script is loading correctly (check browser console for errors)</li>
            <li>Check that your EmailJS account is active and the service/template IDs are correct</li>
            <li>If using Vercel, try redeploying the application after setting the environment variables</li>
            <li>Ensure there are no Content Security Policy issues blocking the script</li>
          </ul>
        </div>
      </main>
    </div>
  );
} 