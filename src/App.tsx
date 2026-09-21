import React, { useState, useEffect } from 'react';
import { DEFAULT_DEVELOPER_PROFILE } from './data/portfolioData';
import { DeveloperProfile } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutMeSection } from './components/AboutMeSection';
import { TechStackSection } from './components/TechStackSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AssistantDrawer } from './components/AssistantDrawer';
import { ResumeModal } from './components/ResumeModal';
import { CustomizeProfileModal } from './components/CustomizeProfileModal';
import { ScrollProgress } from './components/ScrollProgress';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ThankYouModal } from './components/ThankYouModal';
import { CookieBanner } from './components/CookieBanner';
import { LegalModals } from './components/LegalModals';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  
  // ========== Dark Mode State ==========
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('portfolio_dark_mode', String(darkMode));
    } catch {}
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // ========== Profile State (Sanitized against stale cache) ==========
  const [profile, setProfile] = useState<DeveloperProfile>(() => {
    try {
      const saved = localStorage.getItem('developer_profile_custom');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.name === "Vinay Gupta" &&
          parsed.location &&
          !parsed.location.toLowerCase().includes("san francisco") &&
          !parsed.location.toLowerCase().includes("francisco") &&
          !parsed.location.toLowerCase().includes("california")
        ) {
          return { ...DEFAULT_DEVELOPER_PROFILE, ...parsed };
        }
      }
      localStorage.removeItem('developer_profile_custom');
      return DEFAULT_DEVELOPER_PROFILE;
    } catch (e) {
      return DEFAULT_DEVELOPER_PROFILE;
    }
  });

  // ========== Modal States ==========
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantInitialTopic, setAssistantInitialTopic] = useState<string | undefined>(undefined);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  // New Production Modals: Thank-You & Legal
  const [thankYouState, setThankYouState] = useState<{ isOpen: boolean; name: string; email: string }>({
    isOpen: false,
    name: '',
    email: '',
  });
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // ========== Intersection Observer for Active Section Tracking ==========
  useEffect(() => {
    const sectionIds = ['overview', 'about', 'techstack', 'projects', 'experience', 'testimonials', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // ========== Handlers ==========
  const handleUpdateProfile = (newProfile: DeveloperProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('developer_profile_custom', JSON.stringify(newProfile));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_DEVELOPER_PROFILE);
    try {
      localStorage.removeItem('developer_profile_custom');
    } catch (e) {
      console.error('Failed to remove from localStorage', e);
    }
  };

  const handleOpenAssistantWithTopic = (topic: string) => {
    setAssistantInitialTopic(topic);
    setAssistantOpen(true);
  };

  const handleExploreProjects = () => {
    setActiveSection('projects');
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    setActiveSection('contact');
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmitted = (name: string, email: string) => {
    setThankYouState({ isOpen: true, name, email });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 pb-16 md:pb-0">
        
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Top Header Navbar */}
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          profile={profile}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onOpenAssistant={() => {
            setAssistantInitialTopic(undefined);
            setAssistantOpen(true);
          }}
          onOpenResume={() => setResumeOpen(true)}
          onOpenCustomize={() => setCustomizeOpen(true)}
        />

        {/* 1. Hero Section (Above the fold CTAs) */}
        <HeroSection
          profile={profile}
          onOpenAssistant={() => {
            setAssistantInitialTopic(undefined);
            setAssistantOpen(true);
          }}
          onOpenResume={() => setResumeOpen(true)}
          onExploreProjects={handleExploreProjects}
          onContactClick={handleContactClick}
        />

        {/* 2. About Me Section */}
        <AboutMeSection profile={profile} />

        {/* 3. Tech Stack Breakdown */}
        <TechStackSection />

        {/* 4. Featured Production Projects */}
        <ProjectsSection
          onOpenAssistantWithTopic={handleOpenAssistantWithTopic}
        />

        {/* 5. Work Experience & History */}
        <ExperienceSection />

        {/* 6. Testimonials & Endorsements */}
        <TestimonialsSection />

        {/* 7. Contact Section (with inline validation, honeypot & WhatsApp) */}
        <ContactSection
          profile={profile}
          onOpenAssistant={() => {
            setAssistantInitialTopic(undefined);
            setAssistantOpen(true);
          }}
          onOpenThankYou={handleContactSubmitted}
        />

        {/* Footer (with Privacy & Terms links) */}
        <Footer
          profile={profile}
          setActiveSection={setActiveSection}
          onOpenPrivacy={() => setLegalModalType('privacy')}
          onOpenTerms={() => setLegalModalType('terms')}
        />

        {/* Sticky Mobile Bottom CTA Bar (Checklist #4) */}
        <StickyMobileBar
          onOpenAssistant={() => {
            setAssistantInitialTopic(undefined);
            setAssistantOpen(true);
          }}
          onOpenResume={() => setResumeOpen(true)}
          onContactClick={handleContactClick}
          phone={profile.phone}
        />

        {/* AI Career & Architecture Assistant Drawer */}
        <AssistantDrawer
          isOpen={assistantOpen}
          onClose={() => setAssistantOpen(false)}
          profile={profile}
          initialTopic={assistantInitialTopic}
        />

        {/* Curriculum Vitae / Resume Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
          profile={profile}
        />

        {/* Profile Customization Modal */}
        <CustomizeProfileModal
          isOpen={customizeOpen}
          onClose={() => setCustomizeOpen(false)}
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onResetProfile={handleResetProfile}
        />

        {/* Thank You Post-Submission Modal (Checklist #7, #35) */}
        <ThankYouModal
          isOpen={thankYouState.isOpen}
          onClose={() => setThankYouState((prev) => ({ ...prev, isOpen: false }))}
          senderName={thankYouState.name}
          senderEmail={thankYouState.email}
        />

        {/* Cookie Consent Manager Banner (Checklist #30) */}
        <CookieBanner
          onOpenPrivacy={() => setLegalModalType('privacy')}
        />

        {/* Legal Disclosures Modals (Checklist #28, #29) */}
        <LegalModals
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
          developerName={profile.name}
          email={profile.email}
          location={profile.location}
        />

      </div>
    </ErrorBoundary>
  );
}
