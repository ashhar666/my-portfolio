import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MinimalistHeroDemo from "@/components/ui/demo";
import AboutSection from "@/components/ui/about-section";
import ProjectsSection from "@/components/ui/projects-section";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/footer";
import { PageLoader } from "@/components/ui/page-loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <PageLoader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <MinimalistHeroDemo isLoaded={!isLoading} />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
