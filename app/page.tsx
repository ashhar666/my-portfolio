import MinimalistHeroDemo from "@/components/ui/demo";
import AboutSection from "@/components/ui/about-section";
import ProjectsSection from "@/components/ui/projects-section";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <main id="home" className="relative">
      <MinimalistHeroDemo />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
