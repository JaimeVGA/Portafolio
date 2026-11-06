import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroAgentic } from './components/HeroAgentic';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col selection:bg-[var(--accent)] selection:text-white">
      {/* Living Ambient Animated Background */}
      <AnimatedBackground />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-grow">
        {/* Hero Section with AI Agents Construction Simulation */}
        <HeroAgentic />

        {/* Sobre mí / About Me & Timeline */}
        <AboutSection />

        {/* Habilidades / Skills (No canvas, clean and structured) */}
        <SkillsSection />

        {/* Proyectos / Portfolio Builds */}
        <ProjectsSection />

        {/* Certificados / Achievements */}
        <CertificatesSection />

        {/* Contacto / Let's Connect */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
