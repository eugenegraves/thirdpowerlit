import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');`
        }} />
        {/* End Google Tag Manager */}
        
        <meta name="theme-color" content="#121212" />
        <meta
          name="description"
          content="ThirdPowerLit - Professional web development, photography & digital services. We deliver custom websites, stunning photography, and expert editing to elevate your brand's digital presence."
        />
        <meta name="keywords" content="web development, photography, photo editing, retouching, UI design, UX design, website building, digital services, ThirdPowerLit" />
        <meta name="author" content="Eugene Lit Graves III" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thirdpowerlit.com/" />
        <meta property="og:title" content="ThirdPowerLit | Professional Web Development & Digital Services" />
        <meta property="og:description" content="Expert web development, photography & digital services to elevate your brand's online presence. Custom websites, stunning photography, and professional editing." />
        <meta property="og:image" content="/hero-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://thirdpowerlit.com/" />
        <meta property="twitter:title" content="ThirdPowerLit | Professional Web Development & Digital Services" />
        <meta property="twitter:description" content="Expert web development, photography & digital services to elevate your brand's online presence. Custom websites, stunning photography, and professional editing." />
        <meta property="twitter:image" content="/hero-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://thirdpowerlit.com/" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "ThirdPowerLit",
            "image": "https://thirdpowerlit.com/hero-image.jpg",
            "url": "https://thirdpowerlit.com",
            "telephone": "",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "New Jersey",
              "addressRegion": "NJ",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "",
              "longitude": ""
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "17:00"
            },
            "sameAs": [
              "https://facebook.com/thirdpowerlit",
              "https://www.instagram.com/thirdpowerlit/",
              "https://twitter.com/thirdpowerlit"
            ],
            "priceRange": "$$",
            "description": "ThirdPowerLit offers professional web development, photography, and digital services to help businesses establish a strong online presence. Services include custom website development, professional photography, photo editing/retouching, and UI/UX design.",
            "founder": {
              "@type": "Person",
              "name": "Eugene Lit Graves III"
            },
            "foundingDate": "2023",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services",
              "itemListElement": [
                {
                  "@type": "OfferCatalog",
                  "name": "Web Development",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Website Development"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "UI/UX Design"
                      }
                    }
                  ]
                },
                {
                  "@type": "OfferCatalog",
                  "name": "Photography",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Portrait Photography"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Commercial Photography"
                      }
                    }
                  ]
                },
                {
                  "@type": "OfferCatalog",
                  "name": "Digital Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Photo Editing"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Digital Design"
                      }
                    }
                  ]
                }
              ]
            }
          })
        }} />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />
        
        {/* Tailwind CSS via CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: '#121212',
                    secondary: {
                      DEFAULT: '#D4AF37',
                      light: '#F9D776',
                      dark: '#996515'
                    },
                    dark: {
                      lighter: '#1a1a1a',
                      light: '#222222',
                      DEFAULT: '#121212',
                      dark: '#0a0a0a'
                    }
                  },
                  backgroundImage: {
                    'gold-gradient': 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
                  }
                }
              }
            }
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            .glass {
              background: rgba(26, 26, 26, 0.5);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .glass-gold {
              background: rgba(212, 175, 55, 0.15);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              border: 1px solid rgba(212, 175, 55, 0.2);
            }
          `
        }} />
      </Head>
      <body className="bg-primary text-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 