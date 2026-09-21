import React from 'react';
import { DeveloperProfile } from '../types';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  profile: DeveloperProfile;
  setActiveSection: (section: string) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  profile, 
  setActiveSection,
  onOpenPrivacy,
  onOpenTerms 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'about', label: 'About Me' },
    { id: 'techstack', label: 'Tech Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-8 sm:py-12 border-t border-slate-800 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Top Row: Brand & Quick Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-slate-800">
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                {profile.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-base sm:text-lg font-extrabold text-white">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {profile.role} • {profile.location}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap gap-2.5 sm:gap-4 text-xs font-semibold">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveSection(link.id);
                  const el = document.getElementById(link.id);
                  if (el) {
                    const headerOffset = 70;
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="hover:text-indigo-400 transition-colors cursor-pointer py-1"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center space-x-1.5 self-start md:self-auto cursor-pointer touch-manipulation min-h-[40px]"
          >
            <ArrowUp className="w-4 h-4 text-indigo-400" />
            <span>Top</span>
          </button>

        </div>

        {/* Bottom Row: Social, Legal & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1">
            <div>
              © {new Date().getFullYear()} {profile.name}. All rights reserved. Built with React, TypeScript & Tailwind CSS.
            </div>
            <div className="flex items-center space-x-3 text-[11px] text-slate-400">
              <button
                onClick={onOpenPrivacy}
                className="hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={onOpenTerms}
                className="hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <span>•</span>
              <span>Varanasi, India</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-400 transition-colors flex items-center space-x-1 py-1"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-400 transition-colors flex items-center space-x-1 py-1"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="hover:text-indigo-400 transition-colors flex items-center space-x-1 py-1"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
