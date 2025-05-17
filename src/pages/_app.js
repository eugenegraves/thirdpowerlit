import '../styles/globals.css';
import '../styles/App.css';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import PageTransition from '../components/PageTransition';
import ScrollAnimationObserver from '../components/ScrollAnimationObserver';
import emailjs from '@emailjs/browser';

function MyApp({ Component, pageProps, router }) {
  const [mounted, setMounted] = useState(false);
  
  // Handle client-side rendering
  useEffect(() => {
    setMounted(true);
    
    // Initialize EmailJS with simpler approach
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      // Simple initialization, no advanced options
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      console.log('EmailJS initialized in _app.js');
    }
    
    // Scroll to top on page change
    const handleRouteChangeComplete = () => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    };
    
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);
  
  // If we're rendering on the server or still mounting, just render the component
  // This prevents hydration issues and ensures SSR works properly
  if (!mounted) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </>
    );
  }
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <ScrollAnimationObserver>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <PageTransition>
              <Component {...pageProps} />
            </PageTransition>
          </main>
          <Footer />
        </div>
      </ScrollAnimationObserver>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default MyApp; 