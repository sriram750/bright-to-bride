import { useEffect } from 'react';
import { studioInfo } from '../data/studioData';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  schema?: Record<string, any>;
}

export const useSEO = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogType = 'website',
  ogImage = '/images/hero_wedding.png',
  schema
}: SEOProps) => {
  useEffect(() => {
    // 1. Set document title
    document.title = title;

    // 2. Helper to get or create meta elements
    const setMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 3. Set standard meta tags
    setMetaTag('name', 'description', description);
    
    const defaultKeywords = [
      "Wedding Photographer in Tamil Nadu",
      "Best Photographer in Tamil Nadu",
      "Photography Studio in Tamil Nadu",
      "Photography Studio in Mannachanallur",
      "Photographer in Mannachanallur",
      "Wedding Photographer in Trichy",
      "Seemantham Photography Tamil Nadu",
      "Thottil Vizha Photography",
      "Peyarsutu Vizha Photography",
      "Kaathukuthal Photography",
      "Nichayathartham Photography Tamil Nadu",
      "Muhurtham Photography Tamil Nadu",
      "Traditional Ceremony Photographer All Over Tamil Nadu"
    ];
    const mergedKeywords = Array.from(new Set([...defaultKeywords, ...keywords]));
    setMetaTag('name', 'keywords', mergedKeywords.join(', '));

    // 4. Set Open Graph tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    const absOgImage = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
    setMetaTag('property', 'og:image', absOgImage);
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('property', 'og:site_name', studioInfo.name);

    // 5. Set Twitter tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', absOgImage);

    // 6. Set Canonical Link
    let linkElement = document.querySelector('link[rel="canonical"]');
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('href', canonicalUrl || window.location.href);

    // 7. Inject JSON-LD Schema
    const scriptId = 'jsonld-seo-schema';
    let scriptElement = document.getElementById(scriptId);
    if (scriptElement) {
      scriptElement.remove();
    }

    // Default schemas
    const defaultLocalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": studioInfo.name,
      "image": absOgImage,
      "@id": window.location.origin,
      "url": window.location.origin,
      "telephone": studioInfo.phone,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mannachanallur",
        "addressLocality": "Trichy",
        "addressRegion": "TN",
        "postalCode": "621005",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 10.9061, // Trichy region approx
        "longitude": 78.7047
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      },
      "sameAs": [
        studioInfo.instagram
      ]
    };

    const defaultPhotographerSchema = {
      "@context": "https://schema.org",
      "@type": "Photographer",
      "name": studioInfo.photographer,
      "description": `Professional photographer with ${studioInfo.experience} experience based in ${studioInfo.location}.`,
      "url": window.location.origin,
      "knowsLanguage": ["Tamil", "English"],
      "memberOf": {
        "@type": "Organization",
        "name": studioInfo.name
      }
    };

    const finalSchema = schema || {
      "@context": "https://schema.org",
      "@graph": [defaultLocalBusinessSchema, defaultPhotographerSchema]
    };

    const newScriptElement = document.createElement('script');
    newScriptElement.id = scriptId;
    newScriptElement.type = 'application/ld+json';
    newScriptElement.innerHTML = JSON.stringify(finalSchema);
    document.head.appendChild(newScriptElement);

    return () => {
      // Clean up script on unmount to prevent stale tags
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, schema]);
};
