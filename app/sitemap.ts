import { MetadataRoute } from 'next';

// SEO FIX: Generates /sitemap.xml for crawlers
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ashharshahan.vercel.app', // SEO FIX
      lastModified: new Date(),               // SEO FIX
      changeFrequency: 'monthly',             // SEO FIX
      priority: 1,                            // SEO FIX
    },
  ];
}
