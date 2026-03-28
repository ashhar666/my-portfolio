import { MetadataRoute } from 'next';

// SEO FIX: Generates /robots.txt for crawlers with sitemap reference
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // SEO FIX
      allow: '/',     // SEO FIX
    },
    sitemap: 'https://ashharshahan.vercel.app/sitemap.xml', // SEO FIX
  };
}
