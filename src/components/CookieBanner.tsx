import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('portfolio_cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  if (!isOpen) return null;

  const handleAccept = () => {
    try {
      localStorage.setItem('portfolio_cookie_consent', 'all');
    } catch {}
    setIsOpen(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('portfolio_cookie_consent', 'essential');
    } catch {}
    setIsOpen(false);
  };

  return (
    <aside aria-label="Privacy & Cookie Preferences" className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 z-40 max-w-md bg-slate-900/95 dark:bg-slate-900/95 text-slate-100 p-4 sm:p-5 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md space-y-3.5 print:hidden animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs">
          <Cookie className="w-4 h-4 text-amber-400" />
          <span>Privacy & Local Storage</span>
        </div>
        <button
          onClick={handleEssentialOnly}
          className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
        This portfolio uses local storage and performance telemetry to remember your dark mode theme, filter states, and verify contact inquiries.{' '}
        <button
          onClick={onOpenPrivacy}
          className="text-indigo-400 hover:underline font-semibold cursor-pointer"
        >
          Privacy Policy
        </button>
        .
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleAccept}
          className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Accept All
        </button>
        <button
          onClick={handleEssentialOnly}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
        >
          Essential Only
        </button>
      </div>
    </aside>
  );
};
