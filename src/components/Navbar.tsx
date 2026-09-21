import React, { useState } from 'react';
import { DeveloperProfile } from '../types';
import { 
  User, 
  Code2, 
  Layers, 
  Briefcase, 
  Mail, 
  Menu, 
  X, 
  Download, 
  Sliders, 
  CheckCircle2, 
  Sparkles, 
  MessageSquareQuote 
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  profile: DeveloperProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAssistant: () => void;
  onOpenResume: () => void;
  onOpenCustomize: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  profile,
  darkMode,
  onToggleDarkMode,
  onOpenAssistant,
  onOpenResume,
  onOpenCustomize,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'about', label: 'About Me', icon: CheckCircle2 },
    { id: 'techstack', label: 'Tech Stack', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Extract initials from name
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleNavClick('overview')}
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white flex items-center justify-center font-bold text-xs sm:text-base shadow-xs shrink-0 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 transition-colors">
              {initials}
            </div>
            <div className="truncate">
              <div className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-base leading-tight tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                {profile.name}
              </div>
              <div className="text-[10px] sm:text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center space-x-1 truncate">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse inline-block shrink-0" />
                <span className="truncate">{profile.title}</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs border border-slate-200/80 dark:border-slate-600 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />

            <button
              onClick={onOpenCustomize}
              title="Edit Profile & Admin Inbox"
              className="flex items-center space-x-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500 dark:text-slate-500" />
              <span>Admin</span>
            </button>

            <button
              onClick={onOpenAssistant}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>AI Assistant</span>
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-300 dark:text-white/70" />
              <span>Resume / CV</span>
            </button>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 lg:hidden">
            <ThemeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />
            
            <button
              onClick={onOpenAssistant}
              title="AI Assistant"
              className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60 touch-manipulation min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenResume}
              title="Resume / CV"
              className="p-2 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white touch-manipulation min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors touch-manipulation min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-5 space-y-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
            Navigation Menu
          </div>
          
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors touch-manipulation cursor-pointer ${
                    isActive 
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/80 dark:border-indigo-800/60' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomize();
              }}
              className="flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors touch-manipulation cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Admin / Inbox</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors touch-manipulation cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
