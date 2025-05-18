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
import EmailScript from '../components/EmailScript';

function MyApp({ Component, pageProps, router }) {
  const [mounted, setMounted] = useState(false);
  
  // Handle client-side rendering
  useEffect(() => {
    setMounted(true);
    
    // EmailJS is now handled by the EmailScript component
    
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
        <EmailScript />
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
      <EmailScript />
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