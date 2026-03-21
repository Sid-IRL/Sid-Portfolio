import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import ScriptExecutor from '@/components/ScriptExecutor';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import ProjectsSection from '@/components/ProjectsSection';
import PresentationsSection from '@/components/PresentationsSection';
import ConferenceSection from '@/components/ConferenceSection';
import InterestsSection from '@/components/InterestsSection';
import Footer from '@/components/Footer';
import ExperienceBadge from '@/components/ExperienceBadge';

const Index = () => {
  const hasSeenLoading = sessionStorage.getItem('sid-loading-shown') === 'true';
  const [isLoading, setIsLoading] = useState(!hasSeenLoading);
  const [activeSection, setActiveSection] = useState('');
  const [executingScript, setExecutingScript] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(hasSeenLoading);

  const handleLoadingComplete = useCallback(() => {
    sessionStorage.setItem('sid-loading-shown', 'true');
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  useEffect(() => {
    if (hasSeenLoading) {
      setShowContent(true);
    }
  }, [hasSeenLoading]);

  const handleNavigate = useCallback((section: string) => {
    setExecutingScript(`${section}.run`);
  }, []);

  const handleScriptComplete = useCallback(() => {
    if (executingScript) {
      const sectionId = executingScript.replace('.run', '');
      setActiveSection(sectionId);

      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setExecutingScript(null);
  }, [executingScript]);

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {showContent && (
        <>
          <AnimatedBackground />

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
            <ExperienceBadge />

            <main className="scanlines">
              <HeroSection />
              <AboutSection />
              <ResumeSection />
              <ProjectsSection />
              <PresentationsSection />
              <ConferenceSection />
              <InterestsSection />
            </main>

            <Footer />
          </motion.div>

          <ScriptExecutor
            scriptName={executingScript || ''}
            isExecuting={!!executingScript}
            onComplete={handleScriptComplete}
          />
        </>
      )}
    </div>
  );
};

export default Index;
