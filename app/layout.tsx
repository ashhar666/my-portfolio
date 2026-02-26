import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ashhar Shahan | Python Full-Stack Developer",
  description: "Portfolio of Ashhar Shahan - Specializing in scalable web applications, modern UIs, and high-performance backend systems with Python and React.",
  keywords: ["Ashhar Shahan", "Full Stack Developer", "Python Developer", "React Developer", "Next.js Portfolio", "Software Engineer"],
  authors: [{ name: "Ashhar Shahan" }],
  creator: "Ashhar Shahan",
  metadataBase: new URL("https://ashharshahan.vercel.app"),
  openGraph: {
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Global premium effects */}
          <CursorFollower />
          <GrainOverlay />
          <ScrollToTop />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
