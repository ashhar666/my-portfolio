'use client';

import { motion } from 'framer-motion';
import MinimalistHeroDemo from "@/components/ui/demo";
import AboutSection from "@/components/ui/about-section";
import ProjectsSection from "@/components/ui/projects-section";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/footer";



export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <MinimalistHeroDemo isLoaded={true} />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </motion.div>
  );
}
