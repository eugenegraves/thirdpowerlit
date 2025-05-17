import React from 'react';

export default function EnvTest() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', color: 'white' }}>
      <h1>Environment Variables Test</h1>
      <p>This page is to test if your environment variables are loading correctly.</p>
      <div>
        <h2>Server-side check:</h2>
        <pre>
          {`
SERVICE_ID: ${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? '✅ Present' : '❌ Missing'}
TEMPLATE_ID: ${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? '✅ Present' : '❌ Missing'}
PUBLIC_KEY: ${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? '✅ Present' : '❌ Missing'}
          `}
        </pre>
      </div>
      <div>
        <h2>Client-side check:</h2>
        <p>Check browser console for client-side environment variables check.</p>
        <button
          onClick={() => {
            console.log('ENV VARS CLIENT CHECK:', {
              serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? '✅ Present' : '❌ Missing',
              templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? '✅ Present' : '❌ Missing',
              publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? '✅ Present' : '❌ Missing'
            });
          }}
          style={{
            padding: '10px 20px',
            background: '#FFD700',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Check Client-Side Env Vars
        </button>
      </div>
    </div>
  );
} 