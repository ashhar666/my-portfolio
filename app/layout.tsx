import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // SEO FIX: removed unused Playfair Display font to reduce bandwidth
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO FIX: Playfair Display removed — the CSS variable was declared but never applied to any visible element

export const metadata: Metadata = {
  title: "Ashhar Shahan | Python Full-Stack Developer",
  description: "Portfolio of Ashhar Shahan - Specializing in scalable web applications, modern UIs, and high-performance backend systems with Python and React.",
  keywords: ["Ashhar Shahan", "Full Stack Developer", "Python Developer", "React Developer", "Next.js Portfolio", "Software Engineer"],
  authors: [{ name: "Ashhar Shahan" }],
  creator: "Ashhar Shahan",
  metadataBase: new URL("https://ashharshahan.vercel.app"),
  alternates: {
    canonical: "https://ashharshahan.vercel.app", // SEO FIX: explicit canonical URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "profile",            // SEO FIX: changed from "website" to "profile" for personal portfolio
    firstName: "Ashhar",        // SEO FIX
    lastName: "Shahan",         // SEO FIX
    username: "ashhar666",      // SEO FIX
    locale: "en_US",
    url: "https://ashharshahan.vercel.app",
    title: "Ashhar Shahan | Python Full-Stack Developer",
    description: "Explore the portfolio of Ashhar Shahan, featuring modern web applications and high-performance backend systems.",
    siteName: "Ashhar Shahan Portfolio",
    images: [
      {
        url: "/profile.webp",
        width: 1200,
        height: 630,
        alt: "Ashhar Shahan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ashharshahan",     // SEO FIX: Twitter/X site handle
    creator: "@ashharshahan", // SEO FIX: Twitter/X creator handle
    title: "Ashhar Shahan | Python Full-Stack Developer",
    description: "Explore the portfolio of Ashhar Shahan, featuring modern web applications.",
    images: ["/profile.webp"],
  },

  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // SEO FIX: removed unused playfair variable
      >
        <ThemeProvider>
          {/* Global premium effects */}
          <CursorFollower />
          <GrainOverlay />
          <ScrollToTop />
          {children}
          {/* SEO FIX: JSON-LD Person structured data for Google Knowledge Panel eligibility */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Ashhar Shahan",
                url: "https://ashharshahan.vercel.app",
                image: "https://ashharshahan.vercel.app/profile.webp",
                jobTitle: "Python Full-Stack Developer",
                description: "Specializing in scalable web applications, modern UIs, and high-performance backend systems with Python and React.",
                sameAs: [
                  "https://github.com/ashhar666",
                  "https://linkedin.com/in/ashharshahan",
                  "https://x.com/ashharshahan",
                ],
              }),
            }}
          />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
